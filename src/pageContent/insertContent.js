import { getData } from './getData.js';

const fetchStageGroup = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260627'
const fetchRoundOf32 = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260628-20260703'
const fetchRoundOf16 = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260704-20260707'
const fetchQuarterfinals = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260709-20260711'
const fetchSemifinals = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260714-20260715'
const fetch3rdPlace = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260718'
const fetchFinal = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260719';

let indexPartido = 1

const tbody = document.querySelector('tbody');

export async function insertContent() {
  const dateNow = new Intl.DateTimeFormat('es-MX', {
		day: 'numeric',
		month: 'short',
		timeZone: 'America/Mexico_City',
	}).format(new Date());

  // await insertData(fetchStageGroup, false);
  // +72
	
  // const trRoundOf32 = document.createElement('tr')
  // trRoundOf32.innerHTML = `<tr><td colspan="11" style="font-weight: bold; background-color: #880606;">Ronda de 32</td></tr>`
  // +88
  // tbody.appendChild(trRoundOf32)
  // await insertData(fetchRoundOf32);
  
  const trRoundOf16 = document.createElement('tr')
  trRoundOf16.innerHTML = `<tr><td colspan="11" style="font-weight: bold; background-color: #880606;">Octavos de final</td></tr>`;
  indexPartido+=88
  tbody.appendChild(trRoundOf16);
  await insertData(fetchRoundOf16);
  
  const trQuarterfinals = document.createElement('tr')
  trQuarterfinals.innerHTML = `<tr><td colspan="11" style="font-weight: bold; background-color: #880606;">Cuartos de final</td></tr>`;
  // +98
  tbody.appendChild(trQuarterfinals);
  await insertData(fetchQuarterfinals);

  const trSemifinal = document.createElement('tr');
  trSemifinal.innerHTML = `<tr><td colspan="11" style="font-weight: bold; background-color: #880606;">Semifinales</td></tr>`;
  tbody.appendChild(trSemifinal);
  await insertData(fetchSemifinals);

  const tr3rdPlace = document.createElement('tr');
  tr3rdPlace.innerHTML = `<tr><td colspan="11" style="font-weight: bold; background-color: #880606;">Tercer lugar</td></tr>`;
  tbody.appendChild(tr3rdPlace);
  await insertData(fetch3rdPlace);
  
  const trFinal = document.createElement('tr')
  trFinal.innerHTML = `<tr><td colspan="11" style="font-weight: bold; background-color: #880606;">Final</td></tr>`;
  tbody.appendChild(trFinal);
  await insertData(fetchFinal);

  async function insertData(url, noMark=true) {
		const data = await getData(url);

    const createClass = (avance) => {
			if (!noMark) return '';

      if (avance === undefined) return ''

			return avance ? '' : 'loser';
		};

    
		data.forEach((item) => {
      const tr = document.createElement('tr');
      
      const classLoserLocal = createClass(item.localAdvance);
      const classLoserVisitante = createClass(item.visitanteAdvance);
      

      if (item.fecha.shortDate === dateNow) {
        tr.classList.add('group-color');
      }

			const img = (src, alt) => `<img
          src=${src}
          alt = 'Bandera de ${alt}'
        />`;

			tr.innerHTML = `
      <td style="font-size: 12px;">${indexPartido++}</td>
      <td>
        <span class="date-full">${item.fecha.longDate}</span>
        <span class="date-short">${item.fecha.shortDate}</span>
      </td>
      <td>${item.fecha.timeDate} Hrs.</td>
      <td>${item.group}</td>
      <td class=${classLoserLocal}>${item.local}</td>
      <td>
        ${!item.teamLocal.isActive ? '' : img(item.teamLocal.logo, item.local)}
      </td>
      <td>
      <div class="versus">
        <span>${item.marcadorLocal}</span>
        <span>${item.contentSts}</span>
        <span>${item.marcadorVisitante}</span>
      </div>
      </td>
      <td>
        ${!item.teamVisitante.isActive ? '' : img(item.teamVisitante.logo, item.visitante)}
      
      </td>
      <td class=${classLoserVisitante}>${item.visitante}</td>

      <td>${item.estadio.name}</td>
      <td>${item.estadio.city}</td>
    `;

			tbody.appendChild(tr);
		});
	}
}
