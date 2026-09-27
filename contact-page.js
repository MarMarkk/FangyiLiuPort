(() => {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const status = document.querySelector('#contact-status');
  const button = form.querySelector('[type="submit"]');
  const buttonLabel = button.querySelector('.button-label');

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    status.textContent = '';
    button.disabled = true;
    buttonLabel.textContent = 'Sending…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        status.textContent = response.status === 429
          ? 'Too many messages were sent recently. Please wait a moment and try again.'
          : 'Your message could not be sent. Please try again or email me directly.';
        return;
      }

      form.reset();
      status.textContent = 'Thanks for reaching out! Your message has been sent.';
    } catch {
      status.textContent = 'Could not connect. Please check your connection or email me directly.';
    } finally {
      button.disabled = false;
      buttonLabel.textContent = 'Send message';
    }
  });
})();
