// ===== PHOTO CAROUSEL =====
document.addEventListener('DOMContentLoaded', () => {

  const fivesTrack = document.getElementById('fives-track');
  const fivesLeft = document.getElementById('fives-left');
  const fivesRight = document.getElementById('fives-right');

  if (fivesTrack) initCarousel(fivesTrack, fivesLeft, fivesRight);

  const asideTrack = document.getElementById('11aside-track');
  const asideLeft = document.getElementById('11aside-left');
  const asideRight = document.getElementById('11aside-right');

  if (asideTrack) initCarousel(asideTrack, asideLeft, asideRight);
});

function initCarousel(track, leftBtn, rightBtn) {
  const images = Array.from(track.querySelectorAll('img')).filter(img => {
    // Only count visible images (not hidden due to error)
    return img.style.display !== 'none';
  });

  if (images.length === 0) {
    if(leftBtn) leftBtn.style.display = 'none';
    if(rightBtn) rightBtn.style.display = 'none';
    return;
  }

  const getCardWidth = () => {
    const viewport = window.innerWidth;
    if (viewport <= 480) return 180 + 24;
    if (viewport <= 768) return 220 + 24;
    return 280 + 24;
  };

  let currentPos = 0;

  const updateButtons = () => {
    const cardWidth = getCardWidth();
    const containerWidth = track.parentElement.clientWidth;
    const maxScroll = -(images.length * cardWidth - containerWidth);

    if(leftBtn) {
      leftBtn.disabled = currentPos >= 0;
      leftBtn.style.opacity = currentPos >= 0 ? '0.3' : '1';
    }
    if(rightBtn) {
      rightBtn.disabled = currentPos <= maxScroll;
      rightBtn.style.opacity = currentPos <= maxScroll ? '0.3' : '1';
    }
  };

  const scroll = () => {
    track.style.transform = `translateX(${currentPos}px)`;
    updateButtons();
  };

  if(leftBtn) {
    leftBtn.addEventListener('click', () => {
      currentPos += getCardWidth();
      if (currentPos > 0) currentPos = 0;
      scroll();
    });
  }

  if(rightBtn) {
    rightBtn.addEventListener('click', () => {
      currentPos -= getCardWidth();
      const maxScroll = -(images.length * getCardWidth() - track.parentElement.clientWidth);
      if (currentPos < maxScroll) currentPos = maxScroll;
      scroll();
    });
  }

  // Hide broken images
  track.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      updateButtons();
    });
  });

  window.addEventListener('resize', () => {
    currentPos = 0;
    scroll();
  });

  updateButtons();
}
