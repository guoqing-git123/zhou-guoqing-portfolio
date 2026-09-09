const sketches = [
  ['sketch-1.jpg','产品造型 · 蓝色熨斗','Product form · Blue iron'],
  ['sketch-2.jpg','产品表现 · 材质与配色','Product rendering · Material & color'],
  ['sketch-3.png','造型推演 · 熨斗设计','Form exploration · Iron design'],
  ['sketch-4.jpg','装饰画 · 海洋想象','Decorative illustration · Ocean imagination'],
  ['sketch-5.png','装饰画 · 线条构成','Decorative illustration · Line composition'],
  ['sketch-6.png','设计快题 · 星星计划','Design concept · Star Project']
];
function openSketchGallery() {
  dialog.classList.add('sketch-dialog');
  dialog.setAttribute('aria-label',english?'Design sketching':'设计手绘');
  $('#detail-body').innerHTML=`<span class="eyebrow">SKETCHBOOK / SELECTED WORKS</span><h2>${english?'Design sketching':'设计手绘'}</h2><p>${english?'From product form and material rendering to decorative illustration and concept presentation.':'从产品造型与材质表现，到装饰画与快题表达。'}</p><div class="sketch-intro"><span>06 / ${english?'SELECTED WORKS':'手绘选集'}</span><span>${english?'Select an image to enlarge':'点击图片，查看完整大图'} ↗</span></div><div class="sketch-grid">${sketches.map((s,i)=>`<figure class="sketch-item sketch-item-${i+1}"><button class="sketch-open" data-sketch="${i}" aria-label="${english?'Enlarge':'放大查看'} ${s[english?2:1]}"><img src="assets/${s[0]}" alt="${s[english?2:1]}" ${i>1?'loading="lazy"':''}><span class="sketch-zoom" aria-hidden="true">↗</span></button><figcaption><span>0${i+1}</span>${s[english?2:1]}</figcaption></figure>`).join('')}</div>`;
  dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';
}
const sketchViewer=document.createElement('dialog');
sketchViewer.className='sketch-viewer';
sketchViewer.innerHTML='<button class="viewer-close" aria-label="关闭大图 / Close image">×</button><button class="viewer-prev" aria-label="上一张 / Previous">←</button><figure><img alt=""><figcaption></figcaption></figure><button class="viewer-next" aria-label="下一张 / Next">→</button>';
document.body.append(sketchViewer);
let sketchIndex=0;
function displaySketch(index){sketchIndex=(index+sketches.length)%sketches.length;const s=sketches[sketchIndex];const img=sketchViewer.querySelector('img');img.src='assets/'+s[0];img.alt=s[english?2:1];sketchViewer.querySelector('figcaption').textContent=`0${sketchIndex+1} / 06 — ${s[english?2:1]}`;}
document.addEventListener('click',e=>{const b=e.target.closest('[data-sketch]');if(b){displaySketch(Number(b.dataset.sketch));sketchViewer.showModal();}});
sketchViewer.querySelector('.viewer-close').onclick=()=>sketchViewer.close();
sketchViewer.querySelector('.viewer-prev').onclick=()=>displaySketch(sketchIndex-1);
sketchViewer.querySelector('.viewer-next').onclick=()=>displaySketch(sketchIndex+1);
sketchViewer.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();displaySketch(sketchIndex-1);}if(e.key==='ArrowRight'){e.preventDefault();displaySketch(sketchIndex+1);}});
sketchViewer.addEventListener('click',e=>{if(e.target===sketchViewer)sketchViewer.close();});
