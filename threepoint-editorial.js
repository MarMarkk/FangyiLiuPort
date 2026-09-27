(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const targets=[...document.querySelectorAll('.case-section>h2,.threepoint-content__card .plan-preview')];
 if(!reduced.matches&&'IntersectionObserver' in window){
  document.body.classList.add('editorial-motion');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
  }),{threshold:0,rootMargin:'0px 0px -24px 0px'});
  targets.forEach(el=>{el.classList.add('editorial-reveal');if(el.getBoundingClientRect().top<innerHeight)el.classList.add('is-visible');else observer.observe(el);});
  document.addEventListener('focusin',event=>{const el=event.target.closest('.editorial-reveal');if(el){el.classList.add('is-visible');observer.unobserve(el);}});
  reduced.addEventListener('change',()=>{if(reduced.matches){targets.forEach(el=>el.classList.add('is-visible'));observer.disconnect();}});
 }
 const links=[...document.querySelectorAll('.project-overview-actions a')];
 const update=()=>links.forEach(link=>{if(link.hash===location.hash)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
 addEventListener('hashchange',update);update();
})();
