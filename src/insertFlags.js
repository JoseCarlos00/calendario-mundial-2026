import { countries } from './countries.js';
import { VERSUS_INDEX, CONTRA_INDEX, VERSUS_FLAG_INDEX, CONTRA_FLAG_INDEX } from './constants.js';

function getFlag(countryName) {
	const code = countries[countryName.toLowerCase()];

	if (!code) {
		return '';
	}

	return `https://flagcdn.com/${code}.svg`;
}

function insertFlag(element, country) {
	const versusFlag = getFlag(country);

	if (!versusFlag) {
		console.error('[insertFlag] No se encontró un flag valido');
		return;
	}

	// <img src="https://flagcdn.com/w40/gb.png"
	const img = document.createElement('img');
	img.src = versusFlag;
	img.alt = 'Bandera de ' + country;

	element.appendChild(img);
}

export  function main() {
	const rows = document.querySelectorAll('tbody tr');

	rows.forEach((row) => {
		const versusValue = row.cells[VERSUS_INDEX]?.textContent;
		const contraValue = row.cells[CONTRA_INDEX]?.textContent;


		const versusValueE = row.cells[VERSUS_FLAG_INDEX];
		const contraValueE = row.cells[CONTRA_FLAG_INDEX];

		if (!versusValue || !contraValue || !versusValueE || !contraValueE) return;

		insertFlag(versusValueE, versusValue);
		insertFlag(contraValueE, contraValue);
	});
}
