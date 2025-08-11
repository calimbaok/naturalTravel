
console.log('CARRUSEL DEBUG: Iniciando script main.js');
document.querySelectorAll('.carousel').forEach(function(car){
  const slidesWrap = car.querySelector('.slides');
  const slides = Array.from(car.querySelectorAll('.slide'));
  const total = slides.length;
  let index = 0;
  // Debug: mostrar info de slides
  console.log('CARRUSEL DEBUG:', car.id || car, 'slides:', slides.map(s => s.querySelector('img')?.src));

  // create dots
  const dotsWrap = car.parentElement.querySelector('.dots');
  if(dotsWrap){
    for(let i=0;i<total;i++){
      const d=document.createElement('div');d.className='dot'+(i===0?' active':'');dotsWrap.appendChild(d);
    }
  }

  function update(){
    slidesWrap.style.transform = 'translateX('+(-index*100)+'%)';
    slides.forEach((s,i)=> s.classList.toggle('show', i===index));
    if(dotsWrap){
      Array.from(dotsWrap.children).forEach((d,i)=> d.classList.toggle('active', i===index));
    }
  }

  car.querySelectorAll('.ctrl-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(btn.dataset.action==='next') index = (index+1)%total; else index = (index-1+total)%total; update();
    })
  })

  // overlay toggle on touch/click on each image
  slides.forEach((s,i)=>{
    s.addEventListener('click', (ev)=>{
      // if already active, close it
      if(s.classList.contains('show') && s.querySelector('.overlay').style.opacity=== '1'){
        s.querySelector('.overlay').style.opacity='0';
      } else {
        // hide others
        slides.forEach(x=> x.querySelector('.overlay').style.opacity='0');
        s.querySelector('.overlay').style.opacity='1';
        // read the property into overlay (already present from data-prop)
        const prop = s.dataset.prop || '';
        s.querySelector('.prop').textContent = prop;
      }
    })
  })

  // init
  update();
})

// buy buttons
document.querySelectorAll('.card .buy').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const card = e.target.closest('.card');
    const title = card.querySelector('h3').textContent;
    const qty = card.querySelector('.qty input').value||1;
    alert('Añadido al carrito:\n'+title+' — Cantidad: '+qty);
  })
})
