import { FECHA_INDEX } from './constants.js';

export function setupResponsiveDates() {
	const dateCells = document.querySelectorAll(`table tbody tr td:nth-child(${FECHA_INDEX + 1})`);

	dateCells.forEach((cell) => {
		const originalText = cell.textContent.replace(/\s+/g, ' ').trim();
		// Buscamos el número del día y el nombre del mes (ej: "11 de junio")
		const match = originalText.match(/(\d+)\s+de\s+([a-z]+)/i);

		if (match) {
			const day = match[1];
			const month = match[2].substring(0, 3).toLowerCase();
			const shortDate = `${day} ${month}`;

			// Envolvemos el contenido para que el CSS pueda decidir qué mostrar
			cell.innerHTML = `
        <span class="date-full">${originalText}</span>
        <span class="date-short">${shortDate}</span>
        `;
		}
	});
}
