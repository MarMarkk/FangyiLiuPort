(()=>{
 'use strict';
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let scrollQueued=false;
 function scrollFrame(){scrollQueued=false;const max=document.documentElement.scrollHeight-innerHeight;document.documentElement.style.setProperty('--scroll',String(max>0?Math.min(1,scrollY/max):0));}
 addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(scrollFrame)}},{passive:true});addEventListener('resize',scrollFrame);scrollFrame();
 const canvas=document.querySelector('#name-particles');if(!canvas)return;
 const ctx=canvas.getContext('2d');if(!ctx)return;
 const stage=canvas.parentElement,mask=document.createElement('canvas'),m=mask.getContext('2d');if(!m)return;
 let points=[],w=0,h=0,frame=0,active=true,last=0,resizeTimer;
 const pointer={x:-1000,y:-1000,active:false};
 const colors=['#171717','#383838','#606060','#8c8c8c','#b5b5b5','#4a4a4a'];
 function build(){
  w=stage.clientWidth;h=stage.clientHeight;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);mask.width=Math.ceil(w);mask.height=Math.ceil(h);m.clearRect(0,0,w,h);
  let size=w*.147;m.font=`700 ${size}px "Space Grotesk", Arial, sans-serif`;const text='FANGYI LIU';const measure=m.measureText(text).width;if(measure>w*.96)size*=w*.96/measure;m.font=`700 ${size}px "Space Grotesk", Arial, sans-serif`;m.textAlign='center';m.textBaseline='middle';m.fillStyle='#000';m.fillText(text,w/2,h*.46);
  const data=m.getImageData(0,0,mask.width,mask.height).data,step=w<600?3:4;points=[];
  for(let y=0;y<h;y+=step)for(let x=0;x<w;x+=step)if(data[(y*mask.width+x)*4+3]>125){const tx=x+(Math.random()-.5)*.8,ty=y+(Math.random()-.5)*.8;points.push({tx,ty,x:tx+(Math.random()-.5)*90,y:ty+(Math.random()-.5)*90,vx:0,vy:0,r:w<600?.8+Math.random()*.45:1+Math.random()*.65,c:colors[Math.floor(Math.random()*colors.length)],seed:Math.random()*6.28})}
  stage.classList.add('ready');
 }
 function draw(t){frame=0;if(motion.matches||!active||document.hidden)return;const dt=Math.min(2,(t-last)/16.67||1);last=t;ctx.clearRect(0,0,w,h);const radius=w<600?58:90;
  for(const p of points){const dx=p.x-pointer.x,dy=p.y-pointer.y,dist=Math.hypot(dx,dy);if(pointer.active&&dist<radius){const force=(1-dist/radius)*2.8;const angle=dist>.01?Math.atan2(dy,dx):p.seed;p.vx+=Math.cos(angle)*force*dt;p.vy+=Math.sin(angle)*force*dt}p.vx+=(p.tx-p.x)*.028*dt;p.vy+=(p.ty-p.y)*.028*dt;p.vx*=Math.pow(.85,dt);p.vy*=Math.pow(.85,dt);p.x+=p.vx*dt;p.y+=p.vy*dt;ctx.fillStyle=p.c;ctx.globalAlpha=.78+Math.sin(t*.0008+p.seed)*.15;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;frame=requestAnimationFrame(draw);
 }
 function start(){if(!frame&&!motion.matches&&active&&!document.hidden){last=performance.now();frame=requestAnimationFrame(draw)}}
 canvas.addEventListener('pointermove',e=>{const b=canvas.getBoundingClientRect();pointer.x=e.clientX-b.left;pointer.y=e.clientY-b.top;pointer.active=true},{passive:true});canvas.addEventListener('pointerleave',()=>pointer.active=false);canvas.addEventListener('pointerup',e=>{if(e.pointerType!=='mouse')pointer.active=false});canvas.addEventListener('pointercancel',()=>pointer.active=false);
 addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{build();start()},150)});document.addEventListener('visibilitychange',start);
 if('IntersectionObserver'in window)new IntersectionObserver(entries=>{active=entries[0].isIntersecting;start()}).observe(stage);
 motion.addEventListener('change',()=>{if(motion.matches){cancelAnimationFrame(frame);frame=0;stage.classList.remove('ready')}else{build();start()}});
 if(!motion.matches){build();start();document.fonts.ready.then(()=>{build();start()})}
})();
