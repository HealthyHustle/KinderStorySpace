// Modal System
const Modal = (() => {
  let backdrop = null;

  function init() {
    backdrop = document.getElementById('modal-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'modal-backdrop';
      backdrop.className = 'modal-backdrop';
      document.body.appendChild(backdrop);
    }
  }

  function close() {
    if (backdrop) {
      backdrop.classList.remove('open');
      backdrop.innerHTML = '';
    }
  }

  function confirm({ title, message, confirmText = 'Ya, Lanjutkan', cancelText = 'Batal', onConfirm, isDanger = false }) {
    init();
    backdrop.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close-btn" onclick="Modal.close()"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <p style="line-height: 1.6; color: var(--color-text-body);">${message}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary btn-sm" onclick="Modal.close()">${cancelText}</button>
          <button id="modal-confirm-btn" class="btn ${isDanger ? 'btn-danger' : 'btn-primary'} btn-sm" style="${isDanger ? 'background: var(--color-danger); color: white;' : ''}">
            ${confirmText}
          </button>
        </div>
      </div>
    `;

    backdrop.classList.add('open');

    document.getElementById('modal-confirm-btn').onclick = () => {
      close();
      if (typeof onConfirm === 'function') onConfirm();
    };
  }

  function open({ title, contentHtml, footerHtml = '' }) {
    init();
    backdrop.innerHTML = `
      <div class="modal-card" style="max-width: 640px;">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close-btn" onclick="Modal.close()"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body" style="max-height: 75vh; overflow-y: auto;">
          ${contentHtml}
        </div>
        ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
      </div>
    `;
    backdrop.classList.add('open');
  }

  return {
    confirm,
    open,
    close
  };
})();
