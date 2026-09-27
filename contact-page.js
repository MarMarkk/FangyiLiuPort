(() => {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = form.elements.namedItem('name').value.trim();
    const email = form.elements.namedItem('email').value.trim();
    const topic = form.elements.namedItem('subject').value.trim();
    const subject = `${topic} — from ${name}`;
    const message = form.elements.namedItem('body').value.trim();
    if (!name || !email || !topic || !message) {
      document.querySelector('#contact-status').textContent = 'Please complete all four fields.';
      return;
    }
    const body = `${message}\n\nFrom: ${name}\nEmail: ${email}`;
    window.location.href = `mailto:emilyyxin1234@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.querySelector('#contact-status').textContent = 'Your email draft is ready. Please review and send it in your email app. If it did not open, use the email link on the left.';
  });
})();
