import {existsSync} from 'node:fs';
if(existsSync('.sites-runtime/production-qa')) await import('./qa-server.mjs');
else {const {createServer}=await import('vite');const server=await createServer();await server.listen();server.printUrls();}
