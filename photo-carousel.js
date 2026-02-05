// ===== PHOTO CAROUSEL =====
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.photo-carousel-track');
  const leftBtn = document.querySelector('.carousel-btn-left');
  const rightBtn = document.querySelector('.carousel-btn-right');
  
  if (!track || !leftBtn || !rightBtn) return;
  
  const images = track.querySelectorAll('img');
  const imageWidth = 280; // Width of each image + gap
  const gap = 24; // 1.5rem gap
  const scrollAmount = imageWidth + gap;
  
  let currentPosition = 0;
  const maxScroll = -(scrollAmount * (images.length - Math.floor(track.parentElement.offsetWidth / scrollAmount)));
  
  // Update button states
  function updateButtons() {
    leftBtn.disabled = currentPosition >= 0;
    rightBtn.disabled = currentPosition <= maxScroll;
    
    leftBtn.style.opacity = currentPosition >= 0 ? '0.5' : '1';
    rightBtn.style.opacity = currentPosition <= maxScroll ? '0.5' : '1';
  }
  
  // Scroll left
  leftBtn.addEventListener('click', () => {
    currentPosition = Math.min(currentPosition + scrollAmount, 0);
    track.style.transform = `translateX(${currentPosition}px)`;
    updateButtons();
  });
  
  // Scroll right
  rightBtn.addEventListener('click', () => {
    currentPosition = Math.max(currentPosition - scrollAmount, maxScroll);
    track.style.transform = `translateX(${currentPosition}px)`;
    updateButtons();
  });
  
  // Touch support for mobile
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });
  
  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    const newPosition = currentPosition + diff;
    
    // Don't go beyond bounds
    if (newPosition <= 0 && newPosition >= maxScroll) {
      track.style.transform = `translateX(${newPosition}px)`;
    }
  });
  
  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    
    const diff = currentX - startX;
    
    // Snap to nearest image
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped right
        currentPosition = Math.min(currentPosition + scrollAmount, 0);
      } else {
        // Swiped left
        currentPosition = Math.max(currentPosition - scrollAmount, maxScroll);
      }
    }
    
    track.style.transform = `translateX(${currentPosition}px)`;
    updateButtons();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      leftBtn.click();
    } else if (e.key === 'ArrowRight') {
      rightBtn.click();
    }
  });
  
  // Initial button state
  updateButtons();
  
  // Update on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      currentPosition = 0;
      track.style.transform = 'translateX(0)';
      updateButtons();
    }, 250);
  });
});
