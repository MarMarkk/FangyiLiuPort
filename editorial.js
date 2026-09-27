(()=>{'use strict';
const filters=document.querySelectorAll('[data-work-filter]'),cards=document.querySelectorAll('[data-work-category]'),count=document.querySelector('.work-count');
filters.forEach(button=>button.addEventListener('click',()=>{const choice=button.dataset.workFilter;let n=0;filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));cards.forEach(card=>{const show=choice==='all'||card.dataset.workCategory===choice;card.hidden=!show;if(show){n++;card.classList.add('in')}});if(count)count.textContent=String(n).padStart(2,'0')+' selected projects';}));
const motion=matchMedia('(prefers-reduced-motion: reduce)'),hero=document.querySelector('.scroll-soften');let queued=false;
function update(){queued=false;if(!hero)return;if(motion.matches){hero.style.opacity='1';hero.style.transform='none';return}const r=hero.getBoundingClientRect(),progress=Math.min(1,Math.max(0,-r.top/(r.height*.85)));hero.style.opacity=String(1-progress*.85);hero.style.transform=`translateY(${progress*28}px)`;}
addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update)}},{passive:true});motion.addEventListener('change',update);update();
})();
