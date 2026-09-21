import {useEffect,useRef,useState} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {africaOutline} from './africa-outline';
import './root-network.css';
import './africa-network.css';

const stories=[
 ['One school. More possibility.','We put unused school land to work, bringing the people and infrastructure to grow and sell produce.'],
 ['Connected, we grow stronger.','Our planned network shares resources and income across school farms. Each school becomes part of something bigger.'],
 ['A shared harvest of opportunity.','Farm income contributes towards nutritious school meals across the network.'],
 ['Rooted in the local community.','School kitchens or meal providers use the contribution to buy food from local smallholder farmers. More of the benefit stays close to home.']
];
const kenya=[36.82,-1.29];
const inside=(p:number[])=>africaOutline.some(ring=>{let yes=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;});
const points=[kenya];
for(let y=-33,row=0;y<37;y+=4.2,row++)for(let x=-17+(row%2)*2.2;x<51;x+=4.5){const p=[x+Math.sin(x*8+y)*.6,y+Math.cos(y*3+x)*.6];if(inside(p)&&Math.hypot(p[0]-kenya[0],p[1]-kenya[1])>2.8)points.push(p);}
const distance=(p:number[])=>Math.hypot(p[0]-kenya[0],p[1]-kenya[1]);
const edges=points.flatMap((p,a)=>points.slice(a+1).map((q,j)=>({a,b:a+j+1,length:Math.hypot(p[0]-q[0],p[1]-q[1])}))).filter(e=>e.length<6.6&&inside(points[e.a].map((v,k)=>(v+points[e.b][k])/2)));
const clamp=(n:number)=>Math.max(0,Math.min(1,n));

export default function AfricaNetwork(){
 const root=useRef<HTMLElement>(null),canvas=useRef<HTMLCanvasElement>(null);const[active,setActive]=useState(0);
 useEffect(()=>{
  gsap.registerPlugin(ScrollTrigger);const c=canvas.current!,g=c.getContext('2d');if(!g)return;
  let width=500,height=500,visible=false,frame=0,last=0,clock=0,phase=0;const state={progress:0};const progress=root.current!.querySelector<HTMLElement>('.africa-progress')!;const bars=progress.querySelectorAll<HTMLElement>('.africa-progress-fill');
  const draw=(dt:number)=>{clock+=dt*.00015;g.clearRect(0,0,width,height);const scale=Math.min(width/82,height/84);const project=(p:number[])=>({x:width/2+(p[0]-17)*scale,y:height/2+(1-p[1])*scale});
   g.beginPath();africaOutline.forEach(ring=>{ring.forEach((p,i)=>{const q=project(p);if(i)g.lineTo(q.x,q.y);else g.moveTo(q.x,q.y)});g.closePath()});g.fillStyle='rgba(215,233,107,.025)';g.fill();g.strokeStyle='rgba(215,233,107,.42)';g.lineWidth=1;g.stroke();
   const reveal=(i:number)=>i===0?1:clamp((state.progress*.95-distance(points[i])/105)*6);
   const connect=clamp((state.progress-.15)*4),flow=clamp((state.progress-.48)*7),local=clamp((state.progress-.76)*6);
   const projected=points.map(project);
   edges.forEach((e,i)=>{const a=projected[e.a],b=projected[e.b],alpha=Math.min(reveal(e.a),reveal(e.b))*connect;if(alpha<=0)return;g.strokeStyle=`rgba(215,233,107,${alpha*.38})`;g.lineWidth=.8;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke();if(flow&&i%11===0){const t=(clock+i*.173)%1;g.fillStyle=`rgba(255,255,229,${alpha*flow})`;g.beginPath();g.arc(a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t,1.8,0,Math.PI*2);g.fill()}});
   projected.forEach((p,i)=>{const alpha=reveal(i);const supplier=i%17===8;g.fillStyle=supplier&&local>.2?`rgba(247,245,239,${.16+alpha*.84})`:`rgba(215,233,107,${.12+alpha*.88})`;g.beginPath();g.arc(p.x,p.y,i===0?4.2:Math.max(1.3,scale*.38),0,Math.PI*2);g.fill();if(supplier&&local){g.strokeStyle=`rgba(247,245,239,${local*.5})`;g.beginPath();g.arc(p.x,p.y,5+Math.sin(clock*4+i)*.7,0,Math.PI*2);g.stroke()}});
   const k=projected[0],pulse=(clock*.8)%1;g.strokeStyle=`rgba(215,233,107,${(1-pulse)*.6})`;g.lineWidth=1.2;g.beginPath();g.arc(k.x,k.y,7+pulse*15,0,Math.PI*2);g.stroke();g.font='14px Arial';g.fillStyle='#f7f5ef';g.fillText('Kenya',k.x+16,k.y+5);
  };
  const resize=()=>{const b=c.getBoundingClientRect();const dpr=Math.min(devicePixelRatio||1,2);const w=Math.round(b.width*dpr),h=Math.round(b.height*dpr);if(c.width===w&&c.height===h)return;width=b.width;height=b.height;c.width=w;c.height=h;g.setTransform(dpr,0,0,dpr,0,0);draw(0)};
  const tick=(time:number)=>{draw(last?Math.min(time-last,40):0);last=time;frame=requestAnimationFrame(tick)};
  const playback=()=>{cancelAnimationFrame(frame);last=0;if(visible&&!document.hidden)frame=requestAnimationFrame(tick)};
  const ctx=gsap.context(()=>{gsap.to(state,{progress:1,ease:'none',scrollTrigger:{trigger:root.current!,start:()=>`top ${document.querySelector('.header')?.getBoundingClientRect().height||72}px`,end:'bottom bottom',scrub:.15,invalidateOnRefresh:true},onUpdate:()=>{progress.setAttribute('aria-valuenow',String(Math.round(state.progress*100)));bars.forEach((bar,i)=>{bar.style.transform=`scaleX(${clamp(state.progress*4-i)})`});const n=state.progress<.25?0:state.progress<.5?1:state.progress<.76?2:3;if(n!==phase){phase=n;setActive(n)}if(!visible)draw(0)}})},root);
  const ro=new ResizeObserver(resize);ro.observe(c);const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;playback()});observer.observe(c);document.addEventListener('visibilitychange',playback);resize();
  return()=>{ctx.revert();ro.disconnect();observer.disconnect();cancelAnimationFrame(frame);document.removeEventListener('visibilitychange',playback)};
 },[]);
 return <section className="roots-network africa-network" id="purpose" ref={root} aria-labelledby="africa-title"><div className="roots-stage"><h2 id="africa-title">How it <em>works.</em></h2><div className="roots-copy">{stories.map(([title,copy],i)=><div key={title} aria-hidden={active!==i}><h3>{title}</h3><p>{copy}</p></div>)}</div><div className="africa-visual"><canvas ref={canvas} role="img" aria-label="An illustrative Africa-shaped network growing out from Kenya. Connections represent shared resources and income; pale nodes represent local smallholder food suppliers. These are not existing farm locations."/></div><div className="africa-progress" role="progressbar" aria-label="Network story progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}><div className="africa-progress-track" aria-hidden="true">{[0,1,2,3].map(i=><span key={i}><i className="africa-progress-fill"/></span>)}</div><span className="africa-scroll-cue" aria-hidden="true">Scroll to explore ↓</span></div></div></section>;
}
