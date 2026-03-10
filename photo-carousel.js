// ===== PHOTO CAROUSEL WITH HORIZONTAL 11-A-SIDE SUPPORT =====
console.log('🎠 Carousel script loading...');

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM loaded, initializing carousels...');

  // FIVES CAROUSEL - Vertical photos
  const fivesTrack = document.getElementById('fives-track');
  const fivesLeft = document.getElementById('fives-left');
  const fivesRight = document.getElementById('fives-right');

  if (fivesTrack && fivesLeft && fivesRight) {
    console.log('✅ Fives carousel elements found');
    initCarousel(fivesTrack, fivesLeft, fivesRight, 'Fives');
  }

  // 11-A-SIDE CAROUSEL - Horizontal photos
  const asideTrack = document.getElementById('11aside-track');
  const asideLeft = document.getElementById('11aside-left');
  const asideRight = document.getElementById('11aside-right');

  if (asideTrack && asideLeft && asideRight) {
    console.log('✅ 11-a-side carousel elements found');
    initCarousel(asideTrack, asideLeft, asideRight, '11-a-side');
  }
});

function initCarousel(track, leftBtn, rightBtn, name) {
  const images = track.querySelectorAll('img');
  console.log(`📸 ${name}: Found ${images.length} images`);

  if (images.length === 0) {
    leftBtn.style.display = 'none';
    rightBtn.style.display = 'none';
    return;
  }

  // Get image dimensions based on viewport and carousel type
  function getDimensions() {
    const viewport = window.innerWidth;
    const isAside = track.id === '11aside-track';

    if (isAside) {
      // 11-a-side: horizontal photos
      if (viewport <= 480) return { width: 250, height: 175, gap: 24 };
      if (viewport <= 768) return { width: 300, height: 210, gap: 24 };
      return { width: 400, height: 280, gap: 24 };
    } else {
      // Fives: vertical photos
      if (viewport <= 480) return { width: 180, height: 320, gap: 24 };
      if (viewport <= 768) return { width: 220, height: 390, gap: 24 };
      return { width: 280, height: 500, gap: 24 };
    }
  }

  let currentPosition = 0;
  let maxScroll = 0;

  function calculateMaxScroll() {
    const dims = getDimensions();
    const containerWidth = track.parentElement.clientWidth;
    const totalWidth = images.length * (dims.width + dims.gap);
    maxScroll = -(totalWidth - containerWidth + dims.gap);
    if (maxScroll > 0) maxScroll = 0;
    console.log(`${name}: w=${dims.width}, max=${maxScroll}px`);
  }

  function scrollCarousel() {
    track.style.transform = `translateX(${currentPosition}px)`;
    updateButtons();
  }

  function updateButtons() {
    leftBtn.disabled = currentPosition >= 0;
    leftBtn.style.opacity = currentPosition >= 0 ? '0.3' : '1';
    rightBtn.disabled = currentPosition <= maxScroll;
    rightBtn.style.opacity = currentPosition <= maxScroll ? '0.3' : '1';
  }

  leftBtn.addEventListener('click', () => {
    if (currentPosition >= 0) return;
    const dims = getDimensions();
    currentPosition += (dims.width + dims.gap);
    if (currentPosition > 0) currentPosition = 0;
    scrollCarousel();
  });

  rightBtn.addEventListener('click', () => {
    if (currentPosition <= maxScroll) return;
    const dims = getDimensions();
    currentPosition -= (dims.width + dims.gap);
    if (currentPosition < maxScroll) currentPosition = maxScroll;
    scrollCarousel();
  });

  // Handle image load errors
  images.forEach(img => {
    img.addEventListener('error', () => {
      console.log(`❌ ${name}: Image failed to load, hiding: ${img.src}`);
      img.style.display = 'none';
    });

    img.addEventListener('load', () => {
      if (img.naturalWidth === 0) {
        img.style.display = 'none';
      }
    });
  });

  // Recalculate on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      calculateMaxScroll();
      if (currentPosition < maxScroll) {
        currentPosition = maxScroll;
        scrollCarousel();
      }
      updateButtons();
    }, 100);
  });

  calculateMaxScroll();
  updateButtons();
  console.log(`✅ ${name}: Carousel ready!`);
}
