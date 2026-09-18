import { useEffect, useRef, useState } from 'react';
import { content } from './content';
import { directions } from './media';
import './style.css';

function Mark(){return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="10.4" cy="9.6" r="4.2" fill="currentColor"/><g stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4.3 17.9C9.3 14.2 22.7 14.2 27.7 17.9"/><path d="M4.3 22.6C9.3 18.9 22.7 18.9 27.7 22.6"/><path d="M4.3 27.3C9.3 23.6 22.7 23.6 27.7 27.3"/></g></svg>}
const Arrow=()=> <span aria-hidden="true">↗</span>;
export default function App(){
 const [direction,setDirection]=useState<'photo'|'illustrated'>('photo');
 const media=directions[direction];
 useEffect(()=>{setDirection(new URLSearchParams(location.search).get('direction')==='illustrated'?'illustrated':'photo')},[]);
 const scope=useRef<HTMLDivElement>(null), purposePosition=useRef<number|null>(null);
 const override=useRef<boolean|null>(null);
 const [ready,setReady]=useState(false),[motion,setMotion]=useState(false),[notice,setNotice]=useState('');
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');try{const s=localStorage.getItem('sfn-motion');override.current=s==='on'?true:s==='off'?false:null}catch{/* optional */}const sync=()=>setMotion(override.current??!mq.matches);sync();setReady(true);mq.addEventListener('change',sync);return()=>mq.removeEventListener('change',sync)},[]);
 useEffect(()=>{
  document.documentElement.dataset.motion=motion?'on':'off';
  if(!ready||!motion)return;
  let cancelled=false,clean=()=>{};
  Promise.all([import('gsap'),import('gsap/ScrollTrigger')]).then(([{gsap},{ScrollTrigger}])=>{
   if(cancelled||!scope.current)return;
   gsap.registerPlugin(ScrollTrigger);
   const mm=gsap.matchMedia(scope);
   const ctx=gsap.context(()=>{
    gsap.from('.hero-title span',{y:55,opacity:0,duration:1.1,stagger:.12,ease:'power3.out',clearProps:'all'});
    gsap.from('.object-tilt',{scale:1.045,duration:1.6,ease:'power3.out',clearProps:'transform'});
    mm.add('(min-width: 1000px) and (min-height: 700px)',()=>{
     gsap.set('.growth-stage',{height:'calc(100svh - 84px)'});
     gsap.set('.purpose',{position:'absolute',left:'5%',top:'19%',width:'39%',padding:0,opacity:0,y:80,pointerEvents:'none'});
     const story=gsap.timeline({scrollTrigger:{trigger:'.growth-stage',start:'top 84px',end:()=>'+='+innerHeight*1.35,pin:true,scrub:.6,invalidateOnRefresh:true,onRefresh:self=>{purposePosition.current=self.start+(self.end-self.start)*.9}}});
     story.to('.hero-title',{y:-90,opacity:0,duration:.3},0)
      .to('.hero-meta',{y:30,opacity:0,pointerEvents:'none',duration:.2},0)
      .to('.growth-object',{clipPath:'inset(7% 4% 7% 51% round 4px)',duration:.8,ease:'power1.inOut'},0)
      .to('.hero-shade',{opacity:0,duration:.4},0)
      .to('.purpose',{y:0,opacity:1,pointerEvents:'auto',duration:.4},.4)
      .fromTo('.purpose-rule',{scaleX:0},{scaleX:1,duration:.4},.55).to({},{duration:.15});
     const field=gsap.timeline({scrollTrigger:{trigger:'.field-stage',start:'top 84px',end:()=>'+='+innerHeight*.95,pin:true,scrub:.5,invalidateOnRefresh:true}});
     field.fromTo('.field-image',{clipPath:'inset(28% 29% 12% 29% round 180px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',duration:1,ease:'none'},0)
      .to('.field-title',{y:-100,opacity:0,duration:.45},.12)
      .fromTo('.field-caption',{y:25,opacity:0},{y:0,opacity:1,duration:.3},.7);
     return()=>{purposePosition.current=null};
    });
    mm.add('(max-width: 999px), (max-height: 699px)',()=>{
     gsap.from('.purpose h2',{y:40,opacity:0,duration:.9,scrollTrigger:{trigger:'.purpose',start:'top 85%',once:true}});
     gsap.fromTo('.field-image',{clipPath:'inset(28% 5% 6% 5% round 90px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'none',scrollTrigger:{trigger:'.field-stage',start:'top 60%',end:'top 5%',scrub:.4}});
     gsap.to('.field-title',{opacity:0,y:-30,scrollTrigger:{trigger:'.field-stage',start:'top 35%',end:'top 5%',scrub:.4}});
    });
    mm.add('(min-width: 768px)',()=>{
     gsap.utils.toArray<HTMLElement>('.priority-card').forEach((card,i,all)=>{if(i<all.length-1)gsap.to(card,{scale:.955,filter:'brightness(.82)',ease:'none',scrollTrigger:{trigger:all[i+1],start:'top 85%',end:'top 130px',scrub:true}})});
    });
    gsap.from('.footer-wordmark span',{yPercent:105,stagger:.12,ease:'power3.out',duration:1.2,scrollTrigger:{trigger:'.footer-wordmark',start:'top 90%',once:true}});
   },scope);
   clean=()=>{mm.revert();ctx.revert();purposePosition.current=null;};
   ScrollTrigger.refresh();
  }).catch(()=>{/* Static content stays complete. */});
  return()=>{cancelled=true;clean()};
 },[motion,ready,direction]);
 function toggleMotion(){const next=!motion;override.current=next;try{localStorage.setItem('sfn-motion',next?'on':'off')}catch{/* optional */}const el=document.elementFromPoint(innerWidth*.75,innerHeight*.4)?.closest('section');const before=el?.getBoundingClientRect().top;setMotion(next);requestAnimationFrame(()=>requestAnimationFrame(()=>{if(el&&before!==undefined)window.scrollBy({top:el.getBoundingClientRect().top-before,behavior:'instant'})}));}
 function goPurpose(e:React.MouseEvent<HTMLAnchorElement>){if(purposePosition.current!==null){e.preventDefault();window.scrollTo({top:purposePosition.current,behavior:'smooth'});history.replaceState(null,'','#purpose')}}
 async function copyEmail(){try{await navigator.clipboard.writeText(content.email);setNotice('Email address copied.')}catch{setNotice('Copy unavailable. Select the email address to copy it.')}}
 const mailto=`mailto:${content.email}?subject=${encodeURIComponent(content.enquirySubject)}`;
 return <div ref={scope} id="top" className={`direction-${direction}`}><a className="skip-link" href="#main">Skip to content</a>
  <header className="header"><a href="#top" className="brand" aria-label="School Farm Network home"><Mark/><span>School Farm<br/>Network</span></a><nav aria-label="Main navigation"><a className="nav-link" href="#purpose" onClick={goPurpose}>Our purpose</a><a className="nav-link" href="#field">Our vision</a><button className="header-motion" onClick={toggleMotion} aria-label={`Motion ${motion?'on':'off'}`} aria-pressed={motion} hidden={!ready}>{motion?'Ⅱ':'▷'}<span>Motion {motion?'on':'off'}</span></button><a className="pill" href="#contact">Let's talk <Arrow/></a></nav></header>
  <aside className="direction-switch" aria-label="Compare website directions"><a href="?direction=photo" aria-current={direction==='photo'?'page':undefined}>A · Joyful school life</a><a href="?direction=illustrated" aria-current={direction==='illustrated'?'page':undefined}>B · A world of possibility</a></aside>
  <main id="main" tabIndex={-1}>
   <div className="growth-story"><div className="growth-stage">
    <section className="hero" aria-labelledby="hero-heading"><h1 className="hero-title" id="hero-heading">{direction==='illustrated'?<><span>A future</span><span>without</span><span>school hunger.</span></>:<><span>A future without</span><span>school <em>hunger.</em></span></>}</h1>
     <div className="growth-object"><div className="object-tilt"><picture><source srcSet={media.srcSet} sizes="100vw"/><img src={media.src} width="1344" height="752" fetchPriority="high" alt={media.alt}/></picture><div className="hero-shade"/></div></div>
     <div className="hero-meta"><div className="hero-footnote"><span>Starting in Kenya.</span><span>Building for the long term.</span><a href="#purpose" onClick={goPurpose} className="explore">Explore the vision <span aria-hidden="true">↓</span></a></div><div className="hero-intro"><p>{content.intro}</p><a className="text-link" href="#contact">Start a conversation <Arrow/></a></div></div>
    </section>
    <section className="purpose" id="purpose" aria-labelledby="purpose-heading"><h2 id="purpose-heading">School is a<br/>place to <em>grow.</em></h2><div className="purpose-rule"/><p>{content.purpose}</p><a href="#field" className="text-link">Explore the vision <span aria-hidden="true">↓</span></a></section>
   </div></div>
   <section className="field" id="field" aria-labelledby="field-heading"><div className="field-stage"><h2 className="field-title" id="field-heading">School days.<br/><em>Full of possibility.</em></h2><figure className="field-image"><picture><source type="image/webp" srcSet={media.srcSet} sizes="100vw"/><img src={media.src} alt={media.alt} width="1344" height="752" loading="lazy"/></picture><figcaption className="field-caption"><span>A brighter school day</span><span>AI-generated imagery</span></figcaption></figure></div></section>
   <section className="priorities" aria-labelledby="priorities-heading"><div className="priorities-heading"><p>Our priorities</p><h2 id="priorities-heading">What we're<br/><em>working towards.</em></h2></div><div className="priority-stack">{content.priorities.map((item,i)=><article className={`priority-card priority-${i}`} key={item.title}><div className="priority-copy"><h3>{item.title.split(' ').slice(0,-1).join(' ')}<br/><em>{item.title.split(' ').at(-1)}</em></h3><p>{item.text}</p><Mark/></div><div className="priority-visual">{i===0?<img src={media.src} alt="" width="1344" height="752" loading="lazy"/>:i===1?<div className="opportunity-words" aria-hidden="true"><span>Rooted</span><span>in community.</span><Mark/></div>:<div className="learning-words" aria-hidden="true"><span>Food.</span><span>Farming.</span><span>Future.</span></div>}</div></article>)}</div></section>
  </main>
  <footer className="contact" id="contact"><div className="contact-top"><h2>Let's grow<br/>something<br/><em>that lasts.</em></h2><div className="contact-copy"><p>{content.contact}</p><a className="pill pill-lime" href={mailto}>Start a conversation <Arrow/></a><div className="email-row"><a href={mailto}>{content.email}</a><button onClick={copyEmail} aria-label="Copy email address" hidden={!ready}>Copy</button></div><p className="live-notice" role="status" aria-live="polite">{notice}</p></div></div><div className="footer-wordmark" aria-hidden="true"><span>School Farm</span><span>Network<sup>●</sup></span></div><p className="image-disclosure">Imagery is AI-generated to illustrate our vision.</p><div className="footer-bottom"><p>© {new Date().getFullYear()} School Farm Network</p><button onClick={toggleMotion} aria-pressed={motion} hidden={!ready}>Motion {motion?'on':'off'}</button><a href="#top">Back to top ↑</a></div></footer>
 </div>
}
