// Scroll reveal
(function(){
  var items = document.querySelectorAll('.reveal');
  var arcs = document.querySelectorAll('.arc-path');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(reduced){
    items.forEach(function(el){ el.classList.add('is-visible'); });
    arcs.forEach(function(el){ el.classList.add('is-drawn'); });
    return;
  }

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  items.forEach(function(el){ io.observe(el); });

  var arcIo = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-drawn');
        arcIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  arcs.forEach(function(el){ arcIo.observe(el); });
})();

// Accordion: only one open at a time
(function(){
  var items = document.querySelectorAll('.acc-item');
  items.forEach(function(item){
    item.addEventListener('toggle', function(){
      if(item.open){
        items.forEach(function(other){
          if(other !== item) other.open = false;
        });
      }
    });
  });
})();

// Lightbox
(function(){
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var closeBtn = document.getElementById('lightboxClose');
  var triggers = document.querySelectorAll('.gallery-item');

  function open(src, alt){
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  triggers.forEach(function(btn){
    btn.addEventListener('click', function(){
      var img = btn.querySelector('img');
      open(btn.dataset.full, img ? img.alt : '');
    });
  });
  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', function(e){
    if(e.target === lightbox) close();
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') close();
  });
})();
