export function openInstagram() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Try to open in Instagram app first
    window.location.href = 'instagram://user?username=allebelvoleibol';

    // Fallback to web after 1 second if app doesn't open
    setTimeout(() => {
      window.location.href = 'https://instagram.com/allebelvoleibol';
    }, 1000);
  } else {
    // Desktop: open web URL
    window.open('https://instagram.com/allebelvoleibol', '_blank');
  }
}

export function openWhatsApp() {
  const phoneNumber = '56935809132';
  window.open(`https://wa.me/${phoneNumber}`, '_blank');
}

export function openPhone() {
  window.location.href = 'tel:+56935809132';
}
