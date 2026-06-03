import {CONTRA_INDEX, VERSUS_INDEX, GRUPO_INDEX } from './constants.js';

const noResultsMessage = document.getElementById('no-results');
const tableRows = document.querySelectorAll('table tbody tr');

const inputCountry = document.getElementById('country-filter');
const inputGroup = document.getElementById('group-filter');

export function setupFilter() {
	console.log('Setting up filters...');
	filterCountries();
	filterGroups();
}

function filterCountries() {
		if (!inputCountry){
			error('No se encontró el elemento de filtro de país');
			return;
		}

		// Función auxiliar para normalizar texto (quitar acentos y pasar a minúsculas)
		const normalizeText = (str) =>
			(str || '')
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.toLowerCase();

		inputCountry.addEventListener('input', () => {
			inputGroup.value = '';
			const searchTerm = normalizeText(inputCountry.value);
			let hasResults = false;

			tableRows.forEach((row) => {
				// Obtenemos el texto de las columnas de los equipos (índices 4 y 8)
				const team1 = normalizeText(row.cells[VERSUS_INDEX]?.textContent);
				const team2 = normalizeText(row.cells[CONTRA_INDEX]?.textContent);

				if (team1.includes(searchTerm) || team2.includes(searchTerm)) {
					row.style.display = '';
					hasResults = true;
				} else {
					row.style.display = 'none';
				}
			});

			if (noResultsMessage) {
				noResultsMessage.style.display = hasResults ? 'none' : 'block';
			}
		});
}

function filterGroups() {
	if (!inputGroup) {
		error('No se encontró el elemento de filtro de grupo');
		return;
	}

	inputGroup.addEventListener('input', () => {
		inputCountry.value = '';
		const searchTerm = inputGroup.value.toUpperCase();
		let hasResults = false;

		tableRows.forEach((row) => {
			const groupCell = row.cells[GRUPO_INDEX];
			const groupText = groupCell ? groupCell.textContent.toUpperCase() : '';

			if (groupText.includes(searchTerm)) {
				row.style.display = '';
				hasResults = true;
			} else {
				row.style.display = 'none';
			}
		});

		if (noResultsMessage) {
			noResultsMessage.style.display = hasResults ? 'none' : 'block';
		}
	});
}
