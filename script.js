const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const messageInput = document.getElementById('messageInput');
const formMessage = document.getElementById('formMessage');

function showMessage(text, isError = false) {
  formMessage.textContent = text;
  formMessage.style.color = isError ? '#fca5a5' : '#a5f3fc';
}

function validateField(field) {
  const value = field.value.trim();
  if (!value) {
    field.classList.add('invalid');
    return false;
  }
  field.classList.remove('invalid');
  return true;
}

function validateForm() {
  const isNameValid = validateField(nameInput);
  const isEmailValid = validateField(emailInput) && emailInput.checkValidity();
  const isMessageValid = validateField(messageInput);
  return isNameValid && isEmailValid && isMessageValid;
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!validateForm()) {
    showMessage('Please type into all fields before sending.', true);
    return;
  }

  showMessage(`Thanks ${nameInput.value.trim()}! Your message has been recorded.`);
  contactForm.reset();
});

[nameInput, emailInput, messageInput].forEach((field) => {
  field.addEventListener('input', () => {
    validateField(field);
    if (formMessage.textContent) {
      showMessage('');
    }
  });
});

// Video Gallery Interactions
const videoCards = document.querySelectorAll('.video-card');
const playButtons = document.querySelectorAll('.play-btn');

playButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const card = btn.closest('.video-card');
    const video = card.querySelector('video');
    
    if (video) {
      if (video.paused) {
        video.play();
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
      }
    }
  });
});

// Hide play button when video is playing
document.querySelectorAll('.video-card video').forEach((video) => {
  video.addEventListener('play', function() {
    const btn = this.closest('.video-card').querySelector('.play-btn');
    if (btn) {
      btn.style.opacity = '0';
      btn.style.pointerEvents = 'none';
    }
  });
  
  video.addEventListener('pause', function() {
    const btn = this.closest('.video-card').querySelector('.play-btn');
    if (btn) {
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    }
  });
  
  video.addEventListener('ended', function() {
    const btn = this.closest('.video-card').querySelector('.play-btn');
    if (btn) {
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    }
  });
});

// Add fullscreen support
videoCards.forEach((card) => {
  const video = card.querySelector('video');
  if (video) {
    video.addEventListener('dblclick', () => {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
    });
  }
});
