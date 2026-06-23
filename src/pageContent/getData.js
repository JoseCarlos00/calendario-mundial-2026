import { mapCountries } from "./mapCountries.js";

export async function getData() {
	const response = await fetch(
		'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260622-20260629',
	);

	const data = await response.json();

	return data.events.map((event) => {
    const teamLocal = event.competitions[0].competitors.find((t) => t.homeAway === 'home').team;
		const localName = mapCountries.get(teamLocal.displayName) ?? teamLocal.displayName;

    const teamVisitante = event.competitions[0].competitors.find((t) => t.homeAway === 'away').team;
		const visitanteName = mapCountries.get(teamVisitante.displayName) ?? teamVisitante.displayName;

		const season = event.season.slug;

		const altGameNoteValue = event.competitions[0].altGameNote;
		const altGameNote = season === 'group-stage' ? altGameNoteValue.match(/Group\s(\w)/)?.[1] : altGameNoteValue;

		console.log('season:', season);

		const fechaApi = event.date;
		const fecha = new Date(fechaApi);

		const longDate = new Intl.DateTimeFormat('es-MX', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			timeZone: 'America/Mexico_City',
		}).format(fecha);

    const shortDate = new Intl.DateTimeFormat('es-MX', {
			day: 'numeric',
			month: 'short',
			timeZone: 'America/Mexico_City',
		}).format(fecha);

		const timeDate = new Intl.DateTimeFormat('es-MX', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
			timeZone: 'America/Mexico_City',
		}).format(fecha);

    const status = event.status.type.description;
    const isFulltime = status === 'Full Time';
    const isScheduled = status === 'Scheduled';

    const marcadorLocal = isScheduled ? '-' : event.competitions[0].competitors.find((t) => t.homeAway === 'home').score;
    const marcadorVisitante = isScheduled ? '-' : event.competitions[0].competitors.find((t) => t.homeAway === 'away').score;

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
		};
	});
}
