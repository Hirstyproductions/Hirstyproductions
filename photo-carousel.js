// ===== SIMPLE PHOTO CAROUSEL - TWO CAROUSELS =====
console.log('🎠 Carousel script loading...');

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM loaded, initializing carousels...');
  
  // FIVES CAROUSEL
  const fivesTrack = document.getElementById('fives-track');
  const fivesLeft = document.getElementById('fives-left');
  const fivesRight = document.getElementById('fives-right');
  
  if (fivesTrack && fivesLeft && fivesRight) {
    console.log('✅ Fives carousel elements found');
    initCarousel(fivesTrack, fivesLeft, fivesRight, 'Fives');
  } else {
    console.log('❌ Fives carousel elements NOT found');
  }
  
  // 11-A-SIDE CAROUSEL
  const asideTrack = document.getElementById('11aside-track');
  const asideLeft = document.getElementById('11aside-left');
  const asideRight = document.getElementById('11aside-right');
  
  if (asideTrack && asideLeft && asideRight) {
    console.log('✅ 11-a-side carousel elements found');
    initCarousel(asideTrack, asideLeft, asideRight, '11-a-side');
  } else {
    console.log('❌ 11-a-side carousel elements NOT found');
  }
});

function initCarousel(track, leftBtn, rightBtn, name) {
  const images = track.querySelectorAll('img');
  console.log(`📸 ${name}: Found ${images.length} images`);
  
  if (images.length === 0) {
    console.log(`❌ ${name}: No images found!`);
    return;
  }
  
  // Settings
  const imageWidth = 280;
  const gap = 24;
  const scrollAmount = imageWidth + gap;
  
  let currentPosition = 0;
  let maxScroll = -(scrollAmount * Math.max(0, images.length - 3));
  
  console.log(`${name}: Max scroll = ${maxScroll}px`);
  
  // Update button states
  function updateButtons() {
    if (currentPosition >= 0) {
      leftBtn.disabled = true;
      leftBtn.style.opacity = '0.3';
    } else {
      leftBtn.disabled = false;
      leftBtn.style.opacity = '1';
    }
    
    if (currentPosition <= maxScroll) {
      rightBtn.disabled = true;
      rightBtn.style.opacity = '0.3';
    } else {
      rightBtn.disabled = false;
      rightBtn.style.opacity = '1';
    }
  }
  
  // Left button click
  leftBtn.addEventListener('click', () => {
    if (currentPosition >= 0) return;
    
    currentPosition += scrollAmount;
    if (currentPosition > 0) currentPosition = 0;
    
    track.style.transform = `translateX(${currentPosition}px)`;
    console.log(`${name}: ← Scrolled left to ${currentPosition}px`);
    updateButtons();
  });
  
  // Right button click
  rightBtn.addEventListener('click', () => {
    if (currentPosition <= maxScroll) return;
    
    currentPosition -= scrollAmount;
    if (currentPosition < maxScroll) currentPosition = maxScroll;
    
    track.style.transform = `translateX(${currentPosition}px)`;
    console.log(`${name}: → Scrolled right to ${currentPosition}px`);
    updateButtons();
  });
  
  // Check for image load errors
  images.forEach((img, index) => {
    img.addEventListener('error', () => {
      console.log(`❌ ${name}: Image ${index + 1} failed to load: ${img.src}`);
    });
    
    img.addEventListener('load', () => {
      console.log(`✅ ${name}: Image ${index + 1} loaded successfully`);
    });
  });
  
  // Initial state
  updateButtons();
  console.log(`✅ ${name}: Carousel initialized!`);
  
  // Recalculate on window resize
  window.addEventListener('resize', () => {
    maxScroll = -(scrollAmount * Math.max(0, images.length - 3));
    currentPosition = 0;
    track.style.transform = 'translateX(0)';
    updateButtons();
  });
}
