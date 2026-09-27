(()=>{
  'use strict';
  const scene=document.querySelector('.portrait-scene');
  if(!scene||!Element.prototype.animate)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches||scrollY>80)return;
  const animations=[];
  const enter=(element,from,duration,delay=0)=>{
    if(!element)return;
    const animation=element.animate([from,{opacity:1,translate:'0px 0px'}],{
      duration,delay,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'
    });
    animations.push(animation);
  };
  // Translate is independent of the existing scroll and responsive transforms.
  enter(scene.querySelector('.portrait-stage'),{opacity:0,translate:'0px 0px'},1100);
  enter(scene.querySelector('.portrait-name'),{opacity:0,translate:'0px 14px'},1300,120);
  enter(scene.querySelector('.hero-person'),{opacity:0,translate:'0px 150px'},1650,180);
  enter(scene.querySelector('.hero-bio'),{opacity:0,translate:'-100px 0px'},1350,360);
  scene.querySelectorAll('.hero-social a').forEach((link,index)=>{
    enter(link,{opacity:0,translate:'100px 0px'},1250,440+index*110);
  });
  const finish=()=>animations.forEach(animation=>animation.cancel());
  const onScroll=()=>{if(scrollY>80){finish();removeEventListener('scroll',onScroll);}};
  addEventListener('scroll',onScroll,{passive:true});
  reduced.addEventListener('change',event=>{if(event.matches)finish();});
  addEventListener('pagehide',finish,{once:true});
  Promise.all(animations.map(animation=>animation.finished.catch(()=>{}))).then(()=>removeEventListener('scroll',onScroll));
})();
