import {useEffect,useRef} from 'react';
import {content} from './content';

const steps=[
 {title:<>We put unused school land <em>to work.</em></>,text:'With the school’s permission, we bring the infrastructure, local workers and a route to market.'},
 {title:<>A harvest becomes <em>school meals.</em></>,text:'We sell what the farm produces and contribute towards nutritious school meals.'},
 {title:<>One farm. Part of <em>something bigger.</em></>,text:'Working together, school farms can support more children than each could alone.'},
];
function School({x=0,y=0,scale=1}:{x?:number;y?:number;scale?:number}){return <g transform={`translate(${x} ${y}) scale(${scale})`}><path d="M-62 0 0-38 62 0Z" fill="#123c2d"/><path d="M-52 0H52V63H-52Z" fill="#f7f5ef" stroke="currentColor" strokeWidth="2"/><path d="M-10 63V23H10V63M-38 14h16v17h-16ZM22 14h16v17H22Z" fill="#d7e96b" stroke="currentColor" strokeWidth="2"/></g>}
function Plot({x=0,y=0,scale=1}:{x?:number;y?:number;scale?:number}){return <g transform={`translate(${x} ${y}) scale(${scale})`}><path d="M-88-25 14-62 100-18-3 25Z" fill="#d7e96b" stroke="currentColor" strokeWidth="2"/>{[-40,-10,20,50].map((n,i)=><g className="how-sprout" key={n} transform={`translate(${n} ${-12-i*5})`}><path d="M0 0V-25M0-13Q-23-12-19-28Q0-28 0-13M0-18Q19-37 24-22Q21-10 0-13" fill="#123c2d" stroke="currentColor" strokeWidth="2"/></g>)}</g>}
function Scene({stage}:{stage:number}){return <svg className={`how-scene scene-${stage}`} viewBox="0 0 600 500" role="img" aria-label={['Unused school land becomes a working farm.','Farm produce is sold to buyers, with a contribution supporting school meals.','School farms share resources and income, with food sourced from local smallholder farmers.'][stage]}>
 <ellipse cx="300" cy="260" rx="260" ry="215" fill="#e8eadb"/>
 {stage===0?<><path className="how-line" d="M110 325Q310 420 490 305M115 342Q310 436 490 322" fill="none" stroke="currentColor" strokeWidth="2"/><School x={225} y={165}/><Plot x={345} y={310} scale={1.45}/><path d="M104 209V140H125V209M475 204V134" stroke="currentColor" strokeWidth="3" fill="none"/><circle cx="475" cy="124" r="24" fill="#d7e96b"/><text x="220" y="113">School</text><text x="320" y="405">Land put to work</text></>:stage===1?<><Plot x={135} y={175} scale={.8}/><path className="how-line" d="M215 160H385Q435 160 435 218M435 285V333Q435 355 395 355H240" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="7 7"/><path d="m425 203 10 15 10-15M256 345l-16 10 16 10" fill="none" stroke="currentColor" strokeWidth="3"/><g className="how-sprout"><path d="M385 225h100v52H385Z" fill="#d7e96b" stroke="currentColor" strokeWidth="2"/><path d="M395 241h80M395 260h80" stroke="currentColor" strokeWidth="2"/></g><text x="435" y="311">Buyer</text><text x="135" y="229">Harvest</text><path d="M106 338H222Q213 390 164 390Q117 390 106 338Z" fill="#d7e96b" stroke="currentColor" strokeWidth="3"/><ellipse cx="164" cy="338" rx="58" ry="13" fill="#f7f5ef" stroke="currentColor" strokeWidth="2"/><path className="how-line" d="M144 314q-13-13 0-26M167 314q-13-13 0-26M189 314q-13-13 0-26" fill="none" stroke="currentColor" strokeWidth="2"/><text x="164" y="426">Nutritious meals</text><text x="330" y="384" className="small-label">Towards meals</text></>:<><path className="how-line" d="M300 250 140 140M300 250 463 143M300 250 140 370M300 250 460 365" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="7 7"/><circle cx="300" cy="250" r="68" fill="#123c2d"/><text x="300" y="242" fill="#f7f5ef">Shared</text><text x="300" y="268" fill="#d7e96b">opportunity</text><School x={137} y={104} scale={.65}/><Plot x={144} y={196} scale={.55}/><School x={459} y={107} scale={.65}/><Plot x={465} y={195} scale={.35}/><School x={138} y={321} scale={.65}/><Plot x={142} y={410} scale={.7}/><Plot x={455} y={344} scale={.7}/><text x="452" y="398" className="small-label">Local smallholder</text><text x="452" y="419" className="small-label">farmers</text></>}
 </svg>}
export default function HowItWorks(){
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{let dispose=()=>{},cancelled=false;Promise.all([import('gsap'),import('gsap/ScrollTrigger')]).then(([{gsap},{ScrollTrigger}])=>{if(cancelled)return;gsap.registerPlugin(ScrollTrigger);const ctx=gsap.context(()=>{
  const mm=gsap.matchMedia();
  mm.add('(min-width: 900px)',()=>{
   const scenes=gsap.utils.toArray<SVGElement>('.how-desktop .how-scene');
   gsap.set(scenes.slice(1),{autoAlpha:0,scale:.9});
   const panels=gsap.utils.toArray<HTMLElement>('.how-step');
   let active=-1;
   const update=()=>{let i=0;panels.forEach((panel,index)=>{if(panel.getBoundingClientRect().top<innerHeight*.55)i=index;});if(i===active)return;active=i;gsap.to(scenes,{autoAlpha:0,scale:.94,duration:.4,overwrite:true});gsap.to(scenes[i],{autoAlpha:1,scale:1,duration:.6,overwrite:true});gsap.fromTo(scenes[i].querySelectorAll('.how-sprout'),{scaleY:0,transformOrigin:'50% 100%'},{scaleY:1,duration:.8,stagger:.08,overwrite:true});gsap.fromTo(scenes[i].querySelectorAll('.how-line'),{strokeDasharray:600,strokeDashoffset:600},{strokeDashoffset:0,duration:1.2,overwrite:true});};
   ScrollTrigger.create({trigger:root.current,start:'top bottom',end:'bottom top',onUpdate:update,onRefresh:update});
   update();
  });
  gsap.utils.toArray<HTMLElement>('.how-step').forEach(step=>{
   const tl=gsap.timeline({scrollTrigger:{trigger:step,start:'top 85%',end:'top 35%',scrub:.5}});
   tl.fromTo(step.querySelector('.how-copy'),{y:45,opacity:.3},{y:0,opacity:1},0);
   tl.fromTo(step.querySelectorAll('.how-mobile .how-sprout'),{scaleY:0,transformOrigin:'50% 100%'},{scaleY:1,stagger:.08},0);
   tl.fromTo(step.querySelectorAll('.how-mobile .how-line'),{strokeDasharray:600,strokeDashoffset:600},{strokeDashoffset:0},0);
  });
 },root);dispose=()=>ctx.revert();ScrollTrigger.refresh();});return()=>{cancelled=true;dispose()};},[]);
 return <section className="purpose how-section" id="purpose" aria-labelledby="purpose-heading" ref={root}>
  <h2 id="purpose-heading">How it <em>works.</em></h2>
  <div className="how-story"><div className="how-steps">{steps.map((step,i)=><article className="how-step" key={i}><div className="how-copy"><h3>{step.title}</h3><p>{step.text}</p>{i===2&&<p className="how-network-note">Our planned network shares resources and income, so schools with less land can benefit too.</p>}</div><div className="how-mobile"><Scene stage={i}/></div></article>)}</div><div className="how-desktop" aria-hidden="true">{steps.map((_,i)=><Scene key={i} stage={i}/>)}</div></div>
  <details className="how-detail" onToggle={()=>{void import('gsap/ScrollTrigger').then(({ScrollTrigger})=>ScrollTrigger.refresh())}}><summary>How the contribution works <span aria-hidden="true">＋</span></summary><div className="how-detail-body"><p>{content.purpose}</p><p>{content.meals}</p><div><h3>Stronger together.</h3><p>{content.network}</p></div></div></details>
 </section>
}
