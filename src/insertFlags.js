import { countries } from './countries.js';

const VERSUS_SELECTOR = 'td:nth-child(5)';
const CONTRA_SELECTOR = 'td:nth-child(9)';

const VERSUS_E_SELECTOR = 'td:nth-child(6)';
const CONTRA_E_SELECTOR = 'td:nth-child(8)';

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

	rows.forEach((tr) => {
		const versusValue = tr.querySelector(CONTRA_SELECTOR)?.textContent;
		const contraValue = tr.querySelector(VERSUS_SELECTOR)?.textContent;

		const versusValueE = tr.querySelector(CONTRA_E_SELECTOR);
		const contraValueE = tr.querySelector(VERSUS_E_SELECTOR);

		if (!versusValue || !contraValue || !versusValueE || !contraValueE) return;

		insertFlag(versusValueE, versusValue);
		insertFlag(contraValueE, contraValue);
	});
}
