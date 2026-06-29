import { mapCountries } from "./mapCountries.js";

export async function getData(url) {
	const response = await fetch(url);

	const data = await response.json();

	return data.events.map((event) => {
		const homeCompetitor = event.competitions[0].competitors.find((t) => t.homeAway === 'home');
		const awayCompetitor = event.competitions[0].competitors.find((t) => t.homeAway === 'away');

    const teamLocal = homeCompetitor.team;
		const localName = mapCountries.get(teamLocal.displayName) ?? teamLocal.displayName;

    const teamVisitante = awayCompetitor.team;
		const visitanteName = mapCountries.get(teamVisitante.displayName) ?? teamVisitante.displayName;

		const season = event.season.slug;

		const altGameNoteValue = event.competitions[0].altGameNote;
		const altGameNote = season === 'group-stage' ? altGameNoteValue.match(/Group\s(\w)/)?.[1] : altGameNoteValue;

		console.log('season:', season);

		const fechaApi = event.date;
		const fecha = new Date(fechaApi);
		const { longDate, shortDate, timeDate } = parseDate(fecha)

		

    const status = event.status.type.description;
    const isFulltime = status === 'Full Time';
    const isScheduled = status === 'Scheduled';

    const marcadorLocal = isScheduled ? '-' : homeCompetitor.score;
    const marcadorVisitante = isScheduled ? '-' : awayCompetitor.score;

    const contentSts = isFulltime ? 'FT' : isScheduled ? 'VS' : event.status.displayClock;

		return {
			id: event.id,
			season,
			fecha: {
				longDate,
				shortDate,
				timeDate,
			},
			local: localName,
			teamLocal,
			visitante: visitanteName,
			teamVisitante,
			marcadorLocal,
			marcadorVisitante,
			estado: status,
			estadio: {
				name: event.competitions[0].venue.fullName,
				city: event.competitions[0].venue.address.city,
			},
			group: altGameNote,
			contentSts,
			localAdvance: homeCompetitor.advance,
			visitanteAdvance: awayCompetitor.advance,
		};
	});
}


function parseDate(date) {
	const longDate = new Intl.DateTimeFormat('es-MX', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		timeZone: 'America/Mexico_City',
	}).format(date);

	const shortDate = new Intl.DateTimeFormat('es-MX', {
		day: 'numeric',
		month: 'short',
		timeZone: 'America/Mexico_City',
	}).format(date);

	const timeDate = new Intl.DateTimeFormat('es-MX', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: 'America/Mexico_City',
	}).format(date);

	return {
		longDate,
		shortDate,
		timeDate
	}
}
