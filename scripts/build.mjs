import {renderPage} from '../render.js';
import {content} from '../content.js';
import {writeFileSync} from 'node:fs';
const t=content.es;
writeFileSync(new URL('../index.html',import.meta.url),`<!doctype html>
<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${t.description}"><meta name="theme-color" content="#0b1220"><title>${t.title}</title><link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%230b1220'/%3E%3Ctext x='50' y='65' text-anchor='middle' fill='%2392bdd9' font-size='44' font-family='sans-serif'%3Eez%3C/text%3E%3C/svg%3E"><link rel="stylesheet" href="style.css"><script type="module" src="main.js"></script></head><body><div id="app">${renderPage('es')}</div></body></html>`);
