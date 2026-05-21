document.addEventListener('DOMContentLoaded', function () {
  // ---------- create overlay elements ----------
  var overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  overlay.innerHTML =
    '<span id="lightbox-close">&times;</span>' +
    '<span id="lightbox-prev">&#10094;</span>' +
    '<span id="lightbox-next">&#10095;</span>' +
    '<img id="lightbox-img" src="" alt="" />';
  document.body.appendChild(overlay);

  var lightboxImg = document.getElementById('lightbox-img');
  var closeBtn = document.getElementById('lightbox-close');
  var prevBtn = document.getElementById('lightbox-prev');
  var nextBtn = document.getElementById('lightbox-next');

  // ---------- collect content images ----------
  var images = [];
  var currentIndex = 0;

  function collectImages() {
    images = [];
    var imgs = document.querySelectorAll('.content img');
    for (var i = 0; i < imgs.length; i++) {
      images.push(imgs[i]);
    }
  }

  function show(index) {
    if (images.length === 0) return;
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt || '';
    overlay.classList.add('lightbox-visible');

    prevBtn.style.display = images.length > 1 ? 'block' : 'none';
    nextBtn.style.display = images.length > 1 ? 'block' : 'none';
  }

  function close() {
    overlay.classList.remove('lightbox-visible');
  }

  function showPrev(e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    show(currentIndex);
  }

  function showNext(e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    show(currentIndex);
  }

  // ---------- event binding ----------
  document.addEventListener('click', function (e) {
    var target = e.target;
    if (target.tagName === 'IMG' && target.closest('.content')) {
      collectImages();
      var idx = images.indexOf(target);
      show(idx >= 0 ? idx : 0);
    }
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('lightbox-visible')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') showPrev(e);
    if (e.key === 'ArrowRight') showNext(e);
  });
});
