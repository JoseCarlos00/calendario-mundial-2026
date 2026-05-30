import { main as insertFlags } from './insertFlags.js';
import { setupFilter } from './filter.js';



window.addEventListener('load', () => {
	insertFlags();
	setupFilter();
});
