import { mapCountries } from "./mapCountries.js";

export async function getData() {
	const response = await fetch(
		'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260617',
	);

	const data = await response.json();

	return data.events.map((event) => {
    const localNameOriginal = event.competitions[0].competitors.find((t) => t.homeAway === 'home').team.displayName;
    const localName = mapCountries.get(localNameOriginal) ?? localNameOriginal;

    const visitanteNameOriginal = event.competitions[0].competitors.find((t) => t.homeAway === 'away').team.displayName;
    const visitanteName = mapCountries.get(visitanteNameOriginal) ?? visitanteNameOriginal

    const season = event.season.slug;

    const altGameNoteValue = event.competitions[0].altGameNote;;
    const altGameNote = season === 'group-stage' ? altGameNoteValue.match(/Group\s(\w)/)?.[1] : altGameNoteValue;

    console.log('season:', season);
    
    return {
			id: event.id,
			fecha: event.date,
			local: localName,
			localLogo: event.competitions[0].competitors.find((t) => t.homeAway === 'home').team.logo,
			visitante: visitanteName,
			visitanteLogo: event.competitions[0].competitors.find((t) => t.homeAway === 'away').team.logo,
			marcadorLocal: event.competitions[0].competitors.find((t) => t.homeAway === 'home').score,
			marcadorVisitante: event.competitions[0].competitors.find((t) => t.homeAway === 'away').score,
			estado: event.status.type.description,
			estadio: {
				name: event.competitions[0].venue.fullName,
				city: event.competitions[0].venue.address.city,
			},
			group: altGameNote,
		};
  });
}
