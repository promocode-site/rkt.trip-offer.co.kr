(function () {
  'use strict';

  const AFFILIATE_FALLBACK = 'http://app.ac/YbwMP3l13';
  const TOAST_DURATION = 1500;

  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg || '복사됨!';
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), TOAST_DURATION);
  }

  async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(text); return true; } catch (e) {}
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); document.body.removeChild(ta); return true; }
    catch (e) { document.body.removeChild(ta); return false; }
  }

  document.querySelectorAll('[data-code]').forEach((card) => {
    card.addEventListener('click', async (e) => {
      e.preventDefault();
      const code = card.getAttribute('data-code') || '';
      const link = card.getAttribute('data-link') || AFFILIATE_FALLBACK;
      const ok = await copyToClipboard(code);
      showToast(ok ? `${code} 복사 완료` : '복사 실패');
      window.open(link, '_blank', 'noopener');
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
  });

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
})();
