import {readFile,writeFile,rm} from 'node:fs/promises';
import {render} from '../.prerender/entry-server.js';
const path=new URL('../dist/index.html',import.meta.url);
const template=await readFile(path,'utf8');
await writeFile(path,template.replace('<!--app-html-->',render()));
await writeFile(new URL('../dist/404.html',import.meta.url),'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | School Farm Network</title></head><body style="background:#f7f5ef;color:#0e3b2e;font:20px system-ui;padding:10%"><h1>Page not found.</h1><a href="/">Return to School Farm Network</a></body></html>');
await rm(new URL('../.prerender',import.meta.url),{recursive:true,force:true});
console.log('Prerendered public homepage. Deployment directory: dist only.');
