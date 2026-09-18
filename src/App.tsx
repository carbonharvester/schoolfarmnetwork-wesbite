import { useEffect, useRef, useState } from 'react';
import { content } from './content';
import { media } from './media';
import './style.css';

function Arrow({direction='up'}:{direction?:'up'|'down'}) {
 return <span aria-hidden="true" className="arrow">{direction==='up'?'↗':'↓'}</span>;
}
function Mark({className=''}:{className?:string}) {
 return <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="10.4" cy="9.6" r="4.2" fill="currentColor"/><g stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4.3 17.9C9.3 14.2 22.7 14.2 27.7 17.9"/><path d="M4.3 22.6C9.3 18.9 22.7 18.9 27.7 22.6"/><path d="M4.3 27.3C9.3 23.6 22.7 23.6 27.7 27.3"/></g></svg>;
}
function FieldLines() {
 return <svg className="field-lines" viewBox="0 0 360 150" fill="none" aria-hidden="true"><circle cx="80" cy="33" r="24" fill="currentColor"/><g stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path className="draw-line" d="M6 91Q180 15 354 91"/><path className="draw-line" d="M6 116Q180 40 354 116"/><path className="draw-line" d="M6 141Q180 65 354 141"/></g></svg>;
}

export default function App() {
 const [ready,setReady]=useState(false);
 const [motion,setMotion]=useState(false);
 const [notice,setNotice]=useState('');
 const override=useRef<boolean|null>(null);
 const scope=useRef<HTMLDivElement>(null);
 const mounted=useRef(false);
 useEffect(()=>{
  const query=window.matchMedia('(prefers-reduced-motion: reduce)');
  try { const saved=localStorage.getItem('sfn-motion'); override.current=saved==='on'?true:saved==='off'?false:null; } catch { /* Device preference works without storage. */ }
  const sync=()=>setMotion(override.current??!query.matches);
  sync();setReady(true);
  query.addEventListener('change',sync);
  return ()=>query.removeEventListener('change',sync);
 },[]);
 useEffect(()=>{
  document.documentElement.dataset.motion=motion?'on':'off';
  if(!motion||!ready||(navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData) return;
  let cancelled=false;
  let clean=()=>{};
  Promise.all([import('gsap'),import('gsap/ScrollTrigger')]).then(([{gsap},{ScrollTrigger}])=>{
   if(cancelled||!scope.current) return;
   gsap.registerPlugin(ScrollTrigger);
   const contexts=gsap.matchMedia(scope);
   const context=gsap.context(()=>{
    if(!mounted.current) {
     gsap.from('.hero-photo img',{scale:1.025,duration:1.1,ease:'power2.out',clearProps:'transform'});
     mounted.current=true;
    }
    const lines=gsap.utils.toArray<SVGPathElement>('.draw-line');
    for(const line of lines) {
     const length=line.getTotalLength();
     gsap.fromTo(line,{strokeDasharray:length,strokeDashoffset:length},{strokeDashoffset:0,duration:1.3,ease:'power2.out',scrollTrigger:{trigger:'.purpose',start:'top 72%',once:true}});
    }
    contexts.add('(min-width: 1024px) and (min-height: 760px)',()=>{
     gsap.to('.hero-photo img',{y:20,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
     // The cleared landscape alternative stays in flow, with one short, reversible expansion.
     gsap.fromTo('.field-frame',{width:'76%'},{width:'100%',ease:'none',scrollTrigger:{trigger:'.field',start:'top 85%',end:'top 25%',scrub:true}});
    });
   },scope);
   const visibility=()=>{if(!document.hidden)ScrollTrigger.refresh();};
   document.addEventListener('visibilitychange',visibility);
   clean=()=>{document.removeEventListener('visibilitychange',visibility);contexts.revert();context.revert();};
  }).catch(()=>{/* Content remains fully visible if animation cannot load. */});
  return ()=>{cancelled=true;clean();};
 },[motion,ready]);
 function toggleMotion() {
  const next=!motion;
  override.current=next;
  try {localStorage.setItem('sfn-motion',next?'on':'off');} catch { /* Optional persistence. */ }
  setMotion(next);
 }
 async function copyEmail() {
  try {await navigator.clipboard.writeText(content.email);setNotice('Email address copied.');}
  catch {setNotice('Copy unavailable. Select the email address to copy it.');}
 }
 const mailto=`mailto:${content.email}?subject=${encodeURIComponent(content.enquirySubject)}`;
 return <div ref={scope} id="top">
  <a className="skip-link" href="#main">Skip to content</a>
  <header className="header"><div className="shell flex items-center justify-between gap-4 h-full">
   <a className="brand" href="#top" aria-label="School Farm Network home"><Mark/><span>School Farm<br/>Network</span></a>
   <nav className="flex items-center" aria-label="Main navigation"><a className="nav-link" href="#purpose">Our purpose</a><a className="nav-link" href="#field">In the field</a><a className="pill pill-outline" href="#contact">Let's talk <Arrow/></a></nav>
  </div></header>
  <main id="main" tabIndex={-1}>
   <section className="hero shell" aria-labelledby="hero-heading">
    <div className="hero-copy"><h1 id="hero-heading">A future<br className="hero-break"/> without<br/> school hunger.</h1><p className="hero-intro">{content.intro}</p><div className="hero-actions flex flex-wrap items-center"><a className="pill pill-primary" href="#contact">Start a conversation <Arrow/></a><a className="text-link" href="#field">See the fieldwork <Arrow direction="down"/></a></div></div>
    <div className="hero-photo"><picture><source type="image/webp" srcSet={media.hero.srcSet} sizes="(max-width: 767px) 100vw, 42vw"/><img src={media.hero.src} alt={media.hero.alt} width="2000" height="1333" fetchPriority="high"/></picture><div className="photo-mark"><Mark/></div></div>
    <p className="hero-location">{content.location}</p>
   </section>
   <section className="purpose shell section-space" id="purpose" aria-labelledby="purpose-heading"><div><p className="eyebrow">Our purpose</p><h2 id="purpose-heading">School is a<br/>place to grow.</h2><FieldLines/></div><p className="purpose-copy">{content.purpose}</p></section>
   <section className="field" id="field" aria-labelledby="field-heading"><div className="shell"><div className="field-heading"><p className="eyebrow">In the field</p><h2 id="field-heading">{content.fieldHeading}</h2></div><figure className="field-frame"><picture><source type="image/webp" srcSet={media.field.srcSet} sizes="(max-width: 767px) 100vw, 90vw"/><img src={media.field.src} alt={media.field.alt} width="900" height="600" loading="lazy" decoding="async"/></picture><figcaption><span>School land, Kenya</span><span>A place to begin.</span></figcaption></figure></div></section>
   <section className="priorities shell section-space" aria-labelledby="priorities-heading"><div className="priorities-heading"><p className="eyebrow">Our priorities</p><h2 id="priorities-heading">What we're<br/>working towards.</h2></div><div>{content.priorities.map((priority)=><article className="priority" key={priority.title}><h3>{priority.title}</h3><p>{priority.text}</p></article>)}</div></section>
  </main>
  <footer id="contact" className="contact"><div className="shell"><div className="contact-top"><div><p className="eyebrow">Start a conversation</p><h2>Let's grow<br/>something<br/><span>that lasts.</span></h2></div><div className="contact-copy"><p>{content.contact}</p><a className="pill pill-lime" href={mailto}>Start a conversation <Arrow/></a><div className="email-row"><a className="email" href={mailto}>{content.email}</a><button className="copy-button" onClick={copyEmail} aria-label="Copy email address" hidden={!ready}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M15 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h1"/></svg></button></div><p className="live-notice" aria-live="polite" role="status">{notice}</p></div></div>
   <div className="footer-wordmark" aria-hidden="true"><span>School Farm</span><span>Network<span className="sun"></span></span></div>
   <div className="footer-bottom"><p>© {new Date().getFullYear()} School Farm Network</p><div className="footer-controls"><button onClick={toggleMotion} aria-pressed={motion} aria-label={`Motion ${motion?'on':'off'}`} hidden={!ready}><span className={`motion-indicator ${motion?'active':''}`} aria-hidden="true"/>Motion {motion?'on':'off'}</button><a href="#top">Back to top <span aria-hidden="true">↑</span></a></div></div>
  </div></footer>
 </div>;
}
