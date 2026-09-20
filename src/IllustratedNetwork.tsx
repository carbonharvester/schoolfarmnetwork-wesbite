import {useEffect,useRef,useState} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import './illustrated-network.css';
const steps=[
 ['One school. More possibility.','We put unused school land to work, bringing the people and infrastructure to grow and sell produce.'],
 ['Connected, we grow stronger.','Our planned network shares resources and income across school farms. Each school becomes part of something bigger.'],
 ['A shared harvest of opportunity.','Farm income contributes towards nutritious school meals across the network, including at schools with less land.'],
 ['Rooted in the local community.','School kitchens or meal providers use the contribution to buy food from local smallholder farmers. More of the benefit stays close to home.']
];
const originalSchools=[[300,300,66],[170,165,32],[430,145,44],[480,330,28],[380,480,47],[155,460,23],[105,300,37]];
const originalFarmers=[[70,100,18],[530,470,20],[235,550,17]];
const originalLinks=['M300 300Q205 265 170 165','M300 300Q320 180 430 145','M300 300Q390 350 480 330','M300 300Q290 430 380 480','M300 300Q180 330 105 300','M105 300Q90 405 155 460','M155 460Q265 420 380 480','M430 145Q510 210 480 330'];
const originalLocalLinks=['M70 100Q80 165 170 165','M530 470Q550 395 480 330','M235 550Q325 560 380 480'];
const variants={
 constellation:{schools:originalSchools,farmers:originalFarmers,links:originalLinks,localLinks:originalLocalLinks},
 rings:{schools:[[300,300,45],[300,175,24],[425,300,33],[300,425,27],[175,300,22],[455,145,23],[140,460,32]],farmers:[[300,75,16],[525,300,18],[300,525,16]],links:['M300 175A125 125 0 0 1 425 300','M425 300A125 125 0 0 1 300 425','M300 425A125 125 0 0 1 175 300','M175 300A125 125 0 0 1 300 175','M300 300Q365 260 425 300','M300 300Q220 340 175 300','M425 300Q480 235 455 145','M175 300Q110 380 140 460'],localLinks:['M455 145A220 220 0 0 0 300 75','M455 145A220 220 0 0 1 525 300','M140 460Q220 535 300 525']},
 clusters:{schools:[[150,205,44],[85,150,22],[225,135,28],[120,295,25],[440,215,45],[380,140,23],[505,155,25],[480,305,29],[300,445,47],[220,485,23],[380,500,28]],farmers:[[62,350,16],[545,355,17],[290,550,16]],links:['M150 205Q100 210 85 150','M150 205Q170 130 225 135','M150 205Q175 270 120 295','M150 205C260 280 330 140 440 215','M440 215Q380 210 380 140','M440 215Q490 240 505 155','M440 215Q430 300 480 305','M440 215C470 390 365 360 300 445','M150 205C105 430 200 415 300 445','M300 445Q230 440 220 485','M300 445Q330 510 380 500'],localLinks:['M62 350Q65 290 120 295','M545 355Q505 375 480 305','M290 550Q285 515 300 445']}
};
export type NetworkVariant=keyof typeof variants;
export default function IllustratedNetwork({variant='constellation',production=false}:{variant?:NetworkVariant;production?:boolean}){
 const {schools,farmers,links,localLinks}=variants[variant];
 const Heading=production?'h2':'h1',StoryHeading=production?'h3':'h2';
 const root=useRef<HTMLElement>(null),jump=useRef<(n:number)=>void>(()=>{});const[active,setActive]=useState(0);
 useEffect(()=>{gsap.registerPlugin(ScrollTrigger);let observer:IntersectionObserver;let visible=false;let phase=0;let pulseTweens:gsap.core.Tween[]=[];
 const playback=()=>pulseTweens.forEach(t=>visible&&!document.hidden&&phase>=2?t.play():t.pause());
 const ctx=gsap.context(()=>{
  gsap.set('.network-satellite,.community-node',{autoAlpha:0,scale:.15,transformOrigin:'center',transformBox:'fill-box'});
  gsap.set('.orbit-guide',{autoAlpha:0,scale:.2,transformOrigin:'300px 300px'});
  gsap.set('.abstract-edge',{strokeDasharray:1,strokeDashoffset:1,autoAlpha:0});gsap.set('.community-key,.network-pulses',{autoAlpha:0});
  const stage=root.current!.querySelector<HTMLElement>('.abstract-stage')!;
  const tl=gsap.timeline({scrollTrigger:{trigger:stage,start:()=>`top ${document.querySelector('.header')?.getBoundingClientRect().height||(innerWidth<768?72:84)}px`,end:()=>'+='+innerHeight*(innerWidth<768?4.5:3.8),pin:true,pinType:'transform',scrub:.7,invalidateOnRefresh:true},onUpdate:()=>{const next=tl.time()<.24?0:tl.time()<.5?1:tl.time()<.76?2:3;if(next!==phase){phase=next;setActive(next);playback()}}});
  tl.to('.network-satellite',{autoAlpha:1,scale:1,duration:.22,stagger:.016,ease:'power2.out'},.05)
  .to('.orbit-guide',{autoAlpha:1,scale:1,duration:.5,stagger:.08},.1)
  .to('.anchor-label',{autoAlpha:0,duration:.15},.2)
  .to('.school-edge',{autoAlpha:1,strokeDashoffset:0,duration:.25,stagger:.015},.25)
  .to('.network-pulses',{autoAlpha:1,duration:.2},.5)
  .to('.community-node,.community-key',{autoAlpha:1,scale:1,duration:.2,stagger:.025},.76)
  .to('.community-edge',{autoAlpha:1,strokeDashoffset:0,duration:.22,stagger:.03},.78)
  .to({},{duration:.12});
  root.current!.querySelectorAll<SVGCircleElement>('.travelling-pulse').forEach((dot,i)=>{const path=root.current!.querySelectorAll<SVGPathElement>('.school-edge')[i];const length=path.getTotalLength();const progress={p:0};pulseTweens.push(gsap.to(progress,{p:1,duration:5+i*.4,delay:i*.5,repeat:-1,ease:'none',paused:true,onUpdate:()=>{const point=path.getPointAtLength(progress.p*length);dot.setAttribute('cx',String(point.x));dot.setAttribute('cy',String(point.y))}}))});
  jump.current=n=>{const t=tl.scrollTrigger!;window.scrollTo({top:t.start+(t.end-t.start)*[0,.4,.63,1][n],behavior:'smooth'})};
  observer=new IntersectionObserver(([e])=>{visible=e.isIntersecting;playback()});observer.observe(stage);document.addEventListener('visibilitychange',playback);ScrollTrigger.refresh();
 },root);return()=>{observer?.disconnect();document.removeEventListener('visibilitychange',playback);ctx.revert()}},[variant]);
 return <section className={`abstract-network variant-${variant}`} id={production?'purpose':undefined} aria-labelledby="network-heading" ref={root}><div className="abstract-stage"><div className="abstract-text"><Heading className="abstract-title" id="network-heading">How it <em>works.</em></Heading><div className="abstract-copies">{steps.map(([heading,copy],i)=><div className="abstract-copy" key={heading} aria-hidden={active!==i}><StoryHeading>{heading}</StoryHeading><p>{copy}</p></div>)}</div><nav className="abstract-nav" aria-label="Network story">{['School land','Connections','Meal support','Local food'].map((label,i)=><button key={label} aria-current={active===i?'step':undefined} onClick={()=>jump.current(i)}><span aria-hidden="true"/>{label}</button>)}</nav><p className="abstract-hint">Scroll to see the network grow ↓</p></div>
 <div className="abstract-visual"><svg viewBox="0 0 600 600" role="img" aria-label="An abstract network of differently sized school circles. Connections share resources and meal support. A second group represents local smallholder farmers who supply food for school meals.">
 {variant==='rings'&&<g className="orbit-guides"><circle className="orbit-guide" cx="300" cy="300" r="125"/><circle className="orbit-guide" cx="300" cy="300" r="220"/></g>}
 <g>{links.map((d,i)=><path key={d} className="abstract-edge school-edge" pathLength="1" d={d}/>)}{localLinks.map(d=><path key={d} className="abstract-edge community-edge" pathLength="1" d={d}/>)}</g>
 <g className="network-pulses">{links.map((d,i)=><circle key={d} className="travelling-pulse" r={i%2?4:5} cx="300" cy="300"/>)}</g>
 {schools.map(([x,y,r],i)=><g key={i} className={i?'network-satellite':'network-anchor'}><circle className="school-circle" cx={x} cy={y} r={r}/><circle className="school-ring" cx={x} cy={y} r={r+9}/></g>)}
 {farmers.map(([x,y,r],i)=><g key={i} className="community-node"><circle className="community-circle" cx={x} cy={y} r={r}/><circle className="community-ring" cx={x} cy={y} r={r+7}/></g>)}
 <text className="anchor-label" x={schools[0][0]} y={schools[0][1]+5} textAnchor="middle">School land</text></svg>
 <div className="abstract-key"><span><i/>School network</span><span className="community-key"><i/>Local smallholders</span></div></div></div></section>
}
