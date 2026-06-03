import { main as insertFlags } from './insertFlags.js';
import { setupFilter } from './filter.js';
import { setupResponsiveDates } from './responsiveDates.js';


window.addEventListener('load', () => {
	insertFlags();
	setupResponsiveDates();
	setupFilter();
});
