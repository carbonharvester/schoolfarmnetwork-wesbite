import { useEffect, useRef, useState } from 'react';
import { content } from './content';
import { media } from './media';
import pilotPhoto from '../assets/img/pilot-site-900.jpg';
import './style.css';
import IllustratedNetwork from './IllustratedNetwork';

function Mark(){return <img className="brand-symbol" src="/sfn-symbol.png" width="64" height="64" alt="" aria-hidden="true"/>}
const Arrow=({direction='diagonal'}:{direction?:'diagonal'|'down'|'up'})=> <span className={`action-icon arrow-${direction}`} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18 18 6M6 6h12v12"/></svg></span>;
export default function App(){
 const scope=useRef<HTMLDivElement>(null);
 const [ready,setReady]=useState(false);
 const motion=true;
 useEffect(()=>{setReady(true)},[]);
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
    // Keep the editorial transition separate from the longer, readable explanation.
    mm.add({wide:'(min-width: 1000px) and (min-height: 700px)',compact:'(max-width: 999px), (max-height: 699px)'},context=>{
     const wide=!!context.conditions?.wide;
     const headerHeight=()=>document.querySelector('.header')?.getBoundingClientRect().height||72;
     const stage=scope.current!.querySelector<HTMLElement>('.growth-stage')!;
     gsap.set('.growth-reveal',{autoAlpha:0,y:50});
     const story=gsap.timeline({scrollTrigger:{trigger:stage,start:()=>stage.offsetHeight>document.documentElement.clientHeight-headerHeight()+1?'bottom bottom':`top ${headerHeight()}px`,end:()=>'+='+Math.round(document.documentElement.clientHeight*1.35),pin:true,scrub:.6,anticipatePin:1,invalidateOnRefresh:true}});
     story.to('.hero-title',{y:-90,opacity:0,duration:.3},0)
      .to('.hero-meta',{y:30,autoAlpha:0,duration:.2},0)
      .to('.growth-object',wide?{clipPath:'inset(7% 4% 7% 51% round 4px)',duration:.8,ease:'power1.inOut'}:{top:()=>stage.offsetHeight-(document.documentElement.clientHeight-headerHeight())*.29,left:'5%',width:'90%',height:()=>(document.documentElement.clientHeight-headerHeight())*.25,clipPath:'inset(0% round 4px)',duration:.8,ease:'power1.inOut'},0)
      .to('.hero-shade',{opacity:0,duration:.4},0)
      .to('.growth-reveal',{y:0,autoAlpha:1,duration:.4},.4)
      .fromTo('.growth-reveal-rule',{scaleX:0},{scaleX:1,duration:.4},.55).to({},{duration:.15});
    });
    mm.add('(min-width: 1000px) and (min-height: 700px)',()=>{
     const field=gsap.timeline({scrollTrigger:{trigger:'.field-stage',start:'top 84px',end:()=>'+='+innerHeight*.95,pin:true,scrub:.5,invalidateOnRefresh:true}});
     field.fromTo('.field-image',{clipPath:'inset(28% 29% 12% 29% round 180px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',duration:1,ease:'none'},0)
      .to('.field-title',{y:-100,opacity:0,duration:.45},.12);

    });
    mm.add('(max-width: 999px), (max-height: 699px)',()=>{
     const headerHeight=()=>document.querySelector('.header')?.getBoundingClientRect().height||72;
     const field=gsap.timeline({scrollTrigger:{trigger:'.field-stage',start:()=>`top ${headerHeight()}px`,end:()=>'+='+Math.round(document.documentElement.clientHeight*.7),pin:true,scrub:.35,anticipatePin:1,invalidateOnRefresh:true}});
     field.fromTo('.field-image',{clipPath:'inset(30% 12% 12% 12% round 100px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',duration:1,ease:'none'},0)
      .to('.field-title',{opacity:0,y:-65,duration:.45,ease:'none'},.12);
    });
    mm.add('(max-width: 767px)',()=>{
     gsap.utils.toArray<HTMLElement>('.priorities-heading, .first-farm h2, .first-farm-copy p, .contact-top h2, .contact-copy').forEach(el=>{
      gsap.fromTo(el,{y:48,opacity:.25},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:el,start:'top 96%',end:'top 66%',scrub:.3,invalidateOnRefresh:true}});
     });
     gsap.utils.toArray<HTMLElement>('.priority-card').forEach((card,i,cards)=>{
      // Let tall cards be read fully before holding them behind the next card.
      const pinTop=()=>Math.min(88+i*10,document.documentElement.clientHeight-card.offsetHeight-16);
      if(i<cards.length-1){
       ScrollTrigger.create({trigger:card,start:()=>`top ${pinTop()}px`,endTrigger:'.priority-stack',end:'bottom bottom',pin:true,pinSpacing:false,anticipatePin:1,invalidateOnRefresh:true});
       gsap.fromTo(card,{scale:1,filter:'brightness(1)'},{scale:.94,filter:'brightness(.85)',ease:'none',scrollTrigger:{trigger:cards[i+1],start:'top 80%',end:()=>`top ${pinTop()+24}px`,scrub:.3,invalidateOnRefresh:true}});
      }
      const photo=card.querySelector('.priority-visual picture');
      gsap.fromTo(photo,{scale:1.16,yPercent:3},{scale:1,yPercent:0,ease:'none',scrollTrigger:{trigger:photo,start:'top bottom',end:'bottom 35%',scrub:.4,invalidateOnRefresh:true}});
     });
    });
    mm.add('(min-width: 768px)',()=>{
     gsap.utils.toArray<HTMLElement>('.priority-card').forEach((card,i,all)=>{if(i<all.length-1)gsap.to(card,{scale:.955,filter:'brightness(.82)',ease:'none',scrollTrigger:{trigger:all[i+1],start:'top 85%',end:'top 130px',scrub:true}})});
    });
    gsap.from('.footer-wordmark span',{yPercent:105,stagger:.12,ease:'power3.out',duration:1.2,scrollTrigger:{trigger:'.footer-wordmark',start:'top 90%',once:true}});
   },scope);
   clean=()=>{mm.revert();ctx.revert();};
   ScrollTrigger.sort();
   ScrollTrigger.refresh();
  }).catch(()=>{/* Static content stays complete. */});
  return()=>{cancelled=true;clean()};
 },[motion,ready]);
 const mailto=`mailto:${content.email}?subject=${encodeURIComponent(content.enquirySubject)}`;
 return <div ref={scope} id="top" className="direction-photo"><a className="skip-link" href="#main">Skip to content</a>
  <header className="header"><a href="#top" className="brand" aria-label="School Farm Network home"><Mark/><span>School Farm<br/>Network</span></a><nav aria-label="Main navigation"><a className="nav-link" href="#purpose">How it works</a><a className="nav-link" href="#first-farm">Our first farm</a><a className="pill" href="#contact">Let's talk <Arrow/></a></nav></header>
  <main id="main" tabIndex={-1}>
   <div className="growth-story"><div className="growth-stage">
    <section className="hero" aria-labelledby="hero-heading"><h1 className="hero-title" id="hero-heading"><span>School land,</span><span>funding</span><span>school meals</span></h1>
     <div className="growth-object"><div className="object-tilt"><picture><source srcSet={media.hero.srcSet} sizes="100vw"/><img src={media.hero.src} width="1344" height="752" fetchPriority="high" alt={media.hero.alt}/></picture><div className="hero-shade"/></div></div>
     <div className="hero-meta"><div className="hero-footnote"><a href="#purpose" className="explore">See how it works <Arrow direction="down"/></a></div><div className="hero-intro"><p>{content.intro}</p><a className="text-link" href="#contact">Start a conversation <Arrow/></a></div></div>
    </section>
    <div className="growth-reveal"><h2>School is a<br/>place to <em>grow.</em></h2><div className="growth-reveal-rule"/><p>We believe school farms can contribute to a better future for children and the communities around them. Our focus is lasting opportunity, rooted in the places where young people learn.</p><a href="#field" className="text-link">Explore the vision <Arrow direction="down"/></a></div>
   </div></div>
    <IllustratedNetwork variant="clusters" production/>

   <section className="priorities" aria-labelledby="priorities-heading"><div className="priorities-heading"><h2 id="priorities-heading">What the<br/><em>school gets.</em></h2></div><div className="priority-stack">{content.priorities.map((item,i)=><article className={`priority-card priority-${i}`} key={item.title}><div className="priority-copy"><h3>{i===0?<>Meals children<br/>can <span className="keep-together">rely on</span></>:item.title}</h3><p>{item.text}</p><Mark/></div><div className="priority-visual"><picture><source type="image/webp" srcSet={media.priorities[i].srcSet} sizes="(max-width:767px) 100vw, 45vw"/><img src={media.priorities[i].src} alt={media.priorities[i].alt} width={media.priorities[i].width} height={media.priorities[i].height} loading="lazy"/></picture></div></article>)}</div></section>

   <section className="first-farm" id="first-farm" aria-labelledby="first-farm-heading"><div className="first-farm-visual"><h2 id="first-farm-heading">Our <em>first farm.</em></h2><img src={pilotPhoto} width="900" height="600" loading="lazy" alt="The original school farm under cultivation, with classrooms and water tanks behind the field."/></div><div className="first-farm-copy"><p>{content.firstFarm}</p><p>{content.lessons}</p></div></section>
   <section className="field" id="field" aria-labelledby="field-heading"><div className="field-stage"><h2 className="field-title" id="field-heading">School days.<br/><em>Full of possibility.</em></h2><figure className="field-image"><picture><source type="image/webp" srcSet={media.school.srcSet} sizes="100vw"/><img src={media.school.src} alt={media.school.alt} width="1344" height="752" loading="lazy"/></picture></figure></div></section>
  </main>
  <footer className="contact" id="contact"><div className="contact-top"><h2>Let's grow<br/>something<br/><em>that lasts.</em></h2><div className="contact-copy"><p>{content.contact}</p><a className="pill pill-lime" href={mailto}>Start a conversation <Arrow/></a></div></div><div className="footer-wordmark" aria-hidden="true"><span>School Farm</span><span>Network<sup>●</sup></span></div><div className="footer-bottom"><p>School Farm Network · Nairobi, Kenya</p><p>© 2026</p></div></footer>
 </div>
}
