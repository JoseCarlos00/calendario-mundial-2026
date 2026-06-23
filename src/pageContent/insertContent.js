import { getData } from './getData.js';

export async function insertContent() {
	const data = await getData();
	console.log(data);

	const tbody = document.querySelector('tbody');

	data.forEach((item, index) => {
		const tr = document.createElement('tr');

    const img = (src, alt) => `<img
          src=${src}
          alt = 'Bandera de ${alt}'
        />`

		tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.fecha.longDate}</td>
      <td>${item.fecha.timeDate} Hrs.</td>
      <td>${item.group}</td>
      <td>${item.local}</td>
      <td>
        ${
          !item.teamLocal.isActive
          ? ''
          : img(item.teamLocal.logo, item.local)
        }
      </td>
      <td>
      <div class="versus">
        <span>${item.marcadorLocal}</span>
        <span>${item.contentSts}</span>
        <span>${item.marcadorVisitante}</span>
      </div>
      </td>
      <td>
        ${
          !item.teamVisitante.isActive
          ? ''
          : img(item.teamVisitante.logo, item.visitante)
        }
      
      </td>
      <td>${item.visitante}</td>

      <td>${item.estadio.name}</td>
      <td>${item.estadio.city}</td>
    `;

		tbody.appendChild(tr);
	});
}
