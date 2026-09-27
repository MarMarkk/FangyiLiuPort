document.body.classList.add('enter');
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close −':'Menu +';nav.classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');menu.textContent='Menu +'}});
const route=location.pathname.split('/').pop()||'index.html';const current=route.includes('.')?route:route+'.html';document.querySelectorAll('nav a').forEach(a=>{if(a.getAttribute('href')===current)a.setAttribute('aria-current','page')});
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Reveal content in reading order without nesting multiple fades.
if(!reduced&&'IntersectionObserver' in window){
  document.querySelectorAll('.film-section.reveal').forEach(el=>el.classList.remove('reveal'));
  const candidates=document.querySelectorAll('.reveal,.work-heading,.work-toolbar,.work-card,.film-heading,.film-row,.section-link,.dark-experience>.pill,.timeline-row,.case-facts,.case-section,.aplus-demo,.aplus-screens,.footer-top,.footer-bottom');
  candidates.forEach(el=>{if(!el.closest('.portrait-scene'))el.classList.add('reveal');});
  const targets=[...document.querySelectorAll('.reveal')].filter(el=>!el.parentElement.closest('.reveal'));
  document.querySelectorAll('.reveal').forEach(el=>{if(el.parentElement.closest('.reveal'))el.classList.remove('reveal');});
  document.body.classList.add('motion');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target);}
  }),{threshold:0,rootMargin:'0px 0px -48px 0px'});
  targets.forEach(el=>{
    const rect=el.getBoundingClientRect();
    if(rect.top<innerHeight-48){el.classList.add('in');}else{observer.observe(el);}
  });
  const showAll=()=>{targets.forEach(el=>el.classList.add('in'));observer.disconnect();};
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{if(e.matches)showAll();});
  document.addEventListener('focusin',e=>{const el=e.target.closest('.reveal');if(el){el.classList.add('in');observer.unobserve(el);}});
  addEventListener('pageshow',e=>{if(e.persisted)showAll();});
}
const cursor=document.querySelector('.cursor');
if(!reduced&&matchMedia('(pointer:fine)').matches){document.addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});document.querySelectorAll('[data-cursor]').forEach(el=>{el.addEventListener('pointerenter',()=>cursor.classList.add('active'));el.addEventListener('pointerleave',()=>cursor.classList.remove('active'))});const art=document.querySelector('.hero-art');if(art){let scheduled=false;window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{art.style.backgroundPosition='center '+(50+Math.max(-10,Math.min(10,(art.getBoundingClientRect().top-innerHeight/2)*.018)))+'%';scheduled=false})}},{passive:true})}}
document.querySelectorAll('a[href$=".html"]').forEach(a=>a.addEventListener('click',e=>{if(reduced||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button!==0)return;e.preventDefault();document.querySelector('.transition').classList.add('leaving');setTimeout(()=>location.assign(a.href),310)}));
window.addEventListener('pageshow',()=>document.querySelector('.transition').classList.remove('leaving'));
const copy=document.querySelector('#copy-email');if(copy)copy.addEventListener('click',async()=>{const status=document.querySelector('.copy-status');try{await navigator.clipboard.writeText('emilyyxin1234@gmail.com');status.textContent='Email copied. Talk soon!';copy.textContent='Copied ✓'}catch{status.textContent='Please copy: emilyyxin1234@gmail.com'}});

// Keep home section navigation and its active state together.
function updateSectionNavigation(){
 if(current!=='index.html')return;
 const active=location.hash==='#education'||location.hash==='#experience'||location.hash==='#selected-work'?location.hash:'index.html';
 nav.querySelectorAll('a').forEach(a=>{a.removeAttribute('aria-current');if(a.getAttribute('href')===active)a.setAttribute('aria-current',active.startsWith('#')?'location':'page');});
}
updateSectionNavigation();
addEventListener('hashchange',updateSectionNavigation);
nav.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu +';}));
