import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
const html=await readFile(new URL('../dist/index.html',import.meta.url),'utf8');
const visibleText=html.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
test('Prerendered content and metadata survive without JavaScript',()=>{
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 for(const text of ['School Farm Network | A future without school hunger','School is a','School days. Full of possibility.','Better nutrition','Local opportunity','Learning that lasts','School%20Farm%20Network%20enquiry','noindex,nofollow,noarchive']) assert.ok(visibleText.includes(text)||html.includes(text),text);
 assert.ok(!html.includes('rel="canonical"'));
});
test('Homepage anchors resolve to real sections',()=>{
 const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
 for(const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(match[1]),match[1]);
});
test('Only approved output files ship; no legacy documents or pages',async()=>{
 const files=await readdir(new URL('../dist',import.meta.url));
 for(const file of files) assert.ok(['index.html','404.html','robots.txt','favicon.svg','assets','social-preview.png'].includes(file),file);
 assert.ok(!/funding request|export plan|meal.contribution|cost per meal|forecast|staffing ratio/i.test(html));
});
