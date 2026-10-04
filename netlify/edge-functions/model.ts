import type { Config } from "@netlify/edge-functions";
import payload from './model-payload.json' with { type: 'json' };

function bytes(s: string) { return Uint8Array.from(atob(s), c => c.charCodeAt(0)); }
function hex(b: ArrayBuffer) { return Array.from(new Uint8Array(b), v => v.toString(16).padStart(2, '0')).join(''); }
function login(error = false) {
  return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Funder access | School Farm Network</title><style>:root{color-scheme:light dark}body{font:18px/1.5 system-ui;margin:0;padding:24px;display:grid;min-height:90vh;place-items:center}main{width:100%;max-width:420px}h1{font-size:28px}label,input,button{display:block;box-sizing:border-box;width:100%}input,button{font:inherit;padding:12px;margin-top:8px;border:1px solid #888;border-radius:5px}button{background:#2f6b45;color:white;cursor:pointer;border:0;margin-top:18px}.error{color:#b85030}</style><main><p>School Farm Network</p><h1>Funder access</h1><p>Enter your password to open the interactive financial model.</p>${error ? '<p class="error" role="alert">That password was not recognised. Please try again.</p>' : ''}<form method="post" action="/model"><label for="password">Password</label><input id="password" name="password" type="password" autocomplete="current-password" required maxlength="200"><button type="submit">Open financial model</button></form></main></html>`;
}
export default async function (req: Request) {
  const headers = new Headers({'Content-Type':'text/html; charset=utf-8','Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow, noarchive','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'});
  const password = Netlify.env.get('SFN_MODEL_PASSWORD');
  if (!password) return new Response('Funder access is temporarily unavailable.', {status:503,headers});
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
  const signing = await crypto.subtle.importKey('raw', digest, {name:'HMAC',hash:'SHA-256'}, false, ['sign','verify']);
  if (req.method === 'POST') {
    const origin = req.headers.get('origin');
    if (origin && origin !== new URL(req.url).origin) return new Response('Forbidden',{status:403,headers});
    if (Number(req.headers.get('content-length')) > 4096) return new Response('Request too large',{status:413,headers});
    const form = await req.formData();
    const supplied = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(form.get('password') || '')));
    let mismatch = 0; const a = new Uint8Array(digest), b = new Uint8Array(supplied);
    for (let i=0;i<a.length;i++) mismatch |= a[i]^b[i];
    if (mismatch) return new Response(login(true),{status:401,headers});
    const expires = String(Math.floor(Date.now()/1000)+8*3600);
    const signature = hex(await crypto.subtle.sign('HMAC',signing,new TextEncoder().encode(expires)));
    headers.set('Set-Cookie',`__Host-sfn-model=${expires}.${signature}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=28800`);
    headers.set('Location','/model');
    return new Response(null,{status:303,headers});
  }
  if (!['GET','HEAD'].includes(req.method)) return new Response('Method not allowed',{status:405,headers});
  const token = req.headers.get('cookie')?.split(';').map(s=>s.trim()).find(s=>s.startsWith('__Host-sfn-model='))?.slice('__Host-sfn-model='.length) || '';
  const match = /^(\d{10})\.([0-9a-f]{64})$/.exec(token);
  let valid = false;
  if (match && Number(match[1]) > Date.now()/1000 && Number(match[1]) <= Date.now()/1000+28800) {
    const sig = Uint8Array.from(match[2].match(/../g)!,s=>parseInt(s,16));
    valid = await crypto.subtle.verify('HMAC',signing,sig,new TextEncoder().encode(match[1]));
  }
  if (!valid) return new Response(req.method==='HEAD'?null:login(),{headers});
  const encrypted = bytes(payload);
  const key = await crypto.subtle.importKey('raw',digest,'AES-GCM',false,['decrypt']);
  const html = await crypto.subtle.decrypt({name:'AES-GCM',iv:encrypted.slice(0,12)},key,encrypted.slice(12));
  return new Response(req.method==='HEAD'?null:html,{headers});
}
export const config: Config = { path: ['/model', '/model/'] };
