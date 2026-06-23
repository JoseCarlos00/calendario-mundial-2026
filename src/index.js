import { setupFilter } from './filter.js';
import { insertContent } from "./pageContent/insertContent.js";

window.addEventListener('load', async () => {
	await insertContent()
	setupFilter();
});
