import {renderPage} from '../render.js';
import {content} from '../content.js';
import {writeFileSync,readFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url),assets=new URL('assets/',root);
mkdirSync(assets,{recursive:true});
function saveAsset(name,source,extension){const hash=createHash('sha256').update(source).digest('hex').slice(0,12);const path=`assets/${name}-${hash}.${extension}`;writeFileSync(new URL(path,root),source);return path;}
const contentPath=saveAsset('content',readFileSync(new URL('content.js',root),'utf8'),'js');
const renderSource=readFileSync(new URL('render.js',root),'utf8').replace("'./content.js'",`'./${contentPath.split('/').at(-1)}'`);
const renderPath=saveAsset('render',renderSource,'js');
const mainSource=readFileSync(new URL('main.js',root),'utf8').replace("'./content.js'",`'./${contentPath.split('/').at(-1)}'`).replace("'./render.js'",`'./${renderPath.split('/').at(-1)}'`);
const mainPath=saveAsset('main',mainSource,'js');
const stylePath=saveAsset('style',readFileSync(new URL('style.css',root),'utf8'),'css');
const t=content.es;
writeFileSync(new URL('index.html',root),`<!doctype html>
<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${t.description}"><meta name="theme-color" content="#0b1220"><title>${t.title}</title><link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%230b1220'/%3E%3Ctext x='50' y='65' text-anchor='middle' fill='%2392bdd9' font-size='44' font-family='sans-serif'%3Eez%3C/text%3E%3C/svg%3E"><link rel="stylesheet" href="${stylePath}"><script type="module" src="${mainPath}"></script></head><body><div id="app">${renderPage('es')}</div></body></html>`);
console.log(`Built ${stylePath} and ${mainPath}.`);
