(() => {
  const triggers = [...document.querySelectorAll('button.aplus-screen__image, button[data-screen-preview]')];
  if (!triggers.length) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'screen-lightbox';
  dialog.setAttribute('aria-label', 'Enlarged project image');
  dialog.innerHTML = '<div class="screen-lightbox__toolbar"><span id="screen-lightbox-title"></span><button type="button" aria-label="Close enlarged image" autofocus>Close ×</button></div><div class="screen-lightbox__scroll"><img alt=""></div>';
  document.body.append(dialog);
  const image = dialog.querySelector('img');
  const title = dialog.querySelector('#screen-lightbox-title');
  const close = dialog.querySelector('button');
  let opener, previousOverflow;
  triggers.forEach(trigger => trigger.addEventListener('click', () => {
    opener = trigger;
    const original = trigger.querySelector('img');
    image.src = original.src;
    image.alt = original.alt;
    title.textContent = trigger.closest('figure').querySelector('h3').textContent;
    previousOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
    dialog.querySelector('.screen-lightbox__scroll').scrollTop = 0;
  }));
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog || event.target.classList.contains('screen-lightbox__scroll')) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = previousOverflow;
    opener?.focus({preventScroll:true});
  });
})();
