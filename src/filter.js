export function setupFilter() {
	const input = document.getElementById('country');
	const tableRows = document.querySelectorAll('.simple-table tbody tr');
	const noResultsMessage = document.getElementById('no-results');

	if (!input) return;

	// Función auxiliar para normalizar texto (quitar acentos y pasar a minúsculas)
	const normalizeText = (str) =>
		(str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

	input.addEventListener('input', () => {
		const searchTerm = normalizeText(input.value);
		let hasResults = false;

		tableRows.forEach((row) => {
			// Obtenemos el texto de las columnas de los equipos (índices 4 y 8)
			const team1 = normalizeText(row.cells[4]?.textContent);
			const team2 = normalizeText(row.cells[8]?.textContent);

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
