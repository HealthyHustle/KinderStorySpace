// Authentication Page Component (Slide 1 - Login & Register)
const AuthPage = (() => {
  let isRegisterMode = false;

  function render(mode = 'login') {
    isRegisterMode = mode === 'register';

    return `
      <div class="auth-viewport">
        <div class="auth-grid">
          <!-- LEFT SIDE: Illustration, Organic Blobs & Doodles -->
          <div class="auth-left">
            <!-- Organic Blobs behind illustration -->
            <div class="auth-blob-blue"></div>
            <div class="auth-blob-yellow"></div>

            <!-- Playful Doodles -->
            <div class="doodle doodle-sparkle" style="top: 12%; left: 14%; font-size: 1.8rem; color: #FFC928;">✨</div>
            <div class="doodle doodle-star" style="top: 18%; right: 16%; font-size: 1.6rem; color: #1687F8;">⭐</div>
            <div class="doodle doodle-cloud" style="top: 26%; left: 8%; font-size: 2.2rem; color: #93C5FD;">☁️</div>
            <div class="doodle doodle-sparkle" style="bottom: 22%; left: 15%; font-size: 1.6rem; color: #3B82F6;">✏️</div>
            <div class="doodle doodle-star" style="bottom: 15%; right: 18%; font-size: 2rem; color: #FFC928;">📖</div>
            <div class="doodle doodle-sparkle" style="bottom: 28%; right: 10%; font-size: 1.4rem; color: #10B981;">🌟</div>

            <!-- Main Content Container -->
            <div class="auth-left-content">
              <div class="auth-brand-badge">
                <i class="fas fa-book-open"></i> DIGITAL STORY & LEARNING SPACE
              </div>

              <h1 class="auth-heading">
                Selamat Datang di<br>
                <span class="text-primary">Kinder Story</span> <span class="font-handwritten text-yellow">Space</span>
              </h1>

              <p class="auth-subheading">
                Ruang cerita digital untuk membaca, belajar, dan bertumbuh bersama.
              </p>

              <!-- Child Reading Illustration -->
              <div class="auth-illustration-stage">
                <img src="assets/logo_kinder_story_space.jpeg" alt="Kinder Story Space" class="auth-hero-img" style="border-radius: 36px; box-shadow: 0 16px 40px rgba(11, 36, 71, 0.16); border: 4px solid #FFFFFF;">
              </div>
            </div>
          </div>

          <!-- RIGHT SIDE: Auth Card (Login / Register) -->
          <div class="auth-right">
            <div class="auth-card" id="auth-card-container">
              ${isRegisterMode ? renderRegisterForm() : renderLoginForm()}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderLoginForm() {
    return `
      <div class="auth-card-header">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <img src="assets/logo_kinder_story_space.jpeg" alt="Kinder Story Space Logo" style="width: 52px; height: 52px; border-radius: 16px; object-fit: cover; box-shadow: 0 4px 14px rgba(22, 135, 248, 0.2); border: 2px solid var(--color-border);">
          <div>
            <div style="font-family: var(--font-heading); font-weight: 800; font-size: 1.25rem; color: var(--color-dark-navy); line-height: 1.1;">Kinder <span style="color: var(--color-primary);">Story</span> Space</div>
            <div style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted); letter-spacing: 0.8px;">DIGITAL LEARNING & STORY</div>
          </div>
        </div>
        <h2 class="auth-card-title">Masuk ke Akun</h2>
        <p class="auth-card-desc">Selamat datang kembali! Silakan masukkan email dan password Anda.</p>
      </div>

      <form id="login-form" onsubmit="AuthPage.handleLogin(event)">
        <div class="form-group">
          <label class="form-label" for="login-email">Email</label>
          <div class="form-input-wrapper">
            <i class="fas fa-envelope form-icon"></i>
            <input type="email" id="login-email" class="form-input" placeholder="contoh: budi@kinderstory.com" required autocomplete="email">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="login-password">Password</label>
          <div class="form-input-wrapper">
            <i class="fas fa-lock form-icon"></i>
            <input type="password" id="login-password" class="form-input" placeholder="Masukkan password Anda" required autocomplete="current-password">
            <button type="button" class="btn-toggle-password" onclick="AuthPage.togglePasswordVisibility('login-password')">
              <i class="fas fa-eye" id="eye-login-password"></i>
            </button>
          </div>
        </div>

        <div class="form-options-row">
          <label class="remember-label">
            <input type="checkbox" id="remember-me" class="remember-checkbox" checked>
            <span>Ingat Saya</span>
          </label>
          <a href="javascript:void(0)" onclick="AuthPage.showForgotPassword()" class="forgot-link">Lupa Password?</a>
        </div>

        <button type="submit" id="btn-login-submit" class="btn btn-primary btn-auth-submit">
          <span>Masuk</span>
          <i class="fas fa-arrow-right"></i>
        </button>

        <div class="auth-switch-text">
          Belum memiliki akun?
          <a href="javascript:void(0)" onclick="AuthPage.switchMode('register')" class="auth-switch-link">Buat Akun</a>
        </div>

        <!-- Quick Demo Accounts Helper -->
        <div class="demo-accounts-box">
          <div class="demo-accounts-title">
            <i class="fas fa-bolt text-yellow"></i> Akun Uji Coba Cepat (1-Klik):
          </div>
          <button type="button" class="demo-pill-btn" onclick="AuthPage.fillDemo('user')">
            👤 User Demo (Budi)
          </button>
          <button type="button" class="demo-pill-btn" onclick="AuthPage.fillDemo('admin')">
            🛡️ Admin Demo
          </button>
        </div>
      </form>
    `;
  }

  function renderRegisterForm() {
    return `
      <div class="auth-card-header">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <img src="assets/logo_kinder_story_space.jpeg" alt="Kinder Story Space Logo" style="width: 52px; height: 52px; border-radius: 16px; object-fit: cover; box-shadow: 0 4px 14px rgba(22, 135, 248, 0.2); border: 2px solid var(--color-border);">
          <div>
            <div style="font-family: var(--font-heading); font-weight: 800; font-size: 1.25rem; color: var(--color-dark-navy); line-height: 1.1;">Kinder <span style="color: var(--color-primary);">Story</span> Space</div>
            <div style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted); letter-spacing: 0.8px;">DIGITAL LEARNING & STORY</div>
          </div>
        </div>
        <h2 class="auth-card-title">Buat Akun Baru</h2>
        <p class="auth-card-desc">Daftar sekarang untuk mengakses buku cerita interaktif dan modul PGPAUD.</p>
      </div>

      <form id="register-form" onsubmit="AuthPage.handleRegister(event)">
        <div class="form-group">
          <label class="form-label" for="reg-name">Nama Lengkap</label>
          <div class="form-input-wrapper">
            <i class="fas fa-user form-icon"></i>
            <input type="text" id="reg-name" class="form-input" placeholder="Masukkan nama lengkap Anda" required autocomplete="name">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="reg-email">Email</label>
          <div class="form-input-wrapper">
            <i class="fas fa-envelope form-icon"></i>
            <input type="email" id="reg-email" class="form-input" placeholder="nama@email.com" required autocomplete="email">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="reg-password">Password</label>
          <div class="form-input-wrapper">
            <i class="fas fa-lock form-icon"></i>
            <input type="password" id="reg-password" class="form-input" placeholder="Minimal 6 karakter" required minlength="6" autocomplete="new-password">
            <button type="button" class="btn-toggle-password" onclick="AuthPage.togglePasswordVisibility('reg-password')">
              <i class="fas fa-eye" id="eye-reg-password"></i>
            </button>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="reg-confirm-password">Konfirmasi Password</label>
          <div class="form-input-wrapper">
            <i class="fas fa-shield-alt form-icon"></i>
            <input type="password" id="reg-confirm-password" class="form-input" placeholder="Ulangi password Anda" required minlength="6" autocomplete="new-password">
          </div>
        </div>

        <button type="submit" id="btn-reg-submit" class="btn btn-primary btn-auth-submit">
          <span>Buat Akun</span>
          <i class="fas fa-user-plus"></i>
        </button>

        <div class="auth-switch-text">
          Sudah memiliki akun?
          <a href="javascript:void(0)" onclick="AuthPage.switchMode('login')" class="auth-switch-link">Masuk</a>
        </div>
      </form>
    `;
  }

  function switchMode(mode) {
    isRegisterMode = mode === 'register';
    window.location.hash = `#/${mode}`;
  }

  function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const eye = document.getElementById(`eye-${inputId}`);
    if (input) {
      if (input.type === 'password') {
        input.type = 'text';
        if (eye) {
          eye.classList.remove('fa-eye');
          eye.classList.add('fa-eye-slash');
        }
      } else {
        input.type = 'password';
        if (eye) {
          eye.classList.remove('fa-eye-slash');
          eye.classList.add('fa-eye');
        }
      }
    }
  }

  function fillDemo(type) {
    const emailInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-password');
    if (type === 'admin') {
      if (emailInput) emailInput.value = 'admin@kinderstoryspace.com';
      if (passInput) passInput.value = 'admin123';
      Toast.info('Akun Admin diisi. Klik Masuk untuk melanjutkan.');
    } else {
      if (emailInput) emailInput.value = 'budi@kinderstory.com';
      if (passInput) passInput.value = 'user123';
      Toast.info('Akun User diisi. Klik Masuk untuk melanjutkan.');
    }
  }

  function showForgotPassword() {
    Modal.open({
      title: 'Lupa Password Akun',
      contentHtml: `
        <p style="margin-bottom: 16px; color: var(--color-text-body); line-height: 1.6;">
          Masukkan email Anda yang terdaftar pada sistem Kinder Story Space untuk menerima instruksi reset password.
        </p>
        <div class="form-group">
          <label class="form-label">Email Anda</label>
          <input type="email" id="reset-email" class="form-input" placeholder="budi@kinderstory.com" value="${document.getElementById('login-email')?.value || ''}">
        </div>
      `,
      footerHtml: `
        <button class="btn btn-secondary btn-sm" onclick="Modal.close()">Batal</button>
        <button class="btn btn-primary btn-sm" onclick="AuthPage.handleResetSubmit()">Kirim Link Reset</button>
      `
    });
  }

  function handleResetSubmit() {
    const email = document.getElementById('reset-email')?.value;
    if (!email) {
      Toast.error('Silakan isi alamat email Anda.');
      return;
    }
    Modal.close();
    Toast.success(`Tautan pemulihan kata sandi telah dikirim ke ${email}.`);
  }

  async function handleLogin(e) {
    e.preventDefault();
    const submitBtn = document.getElementById('btn-login-submit');
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Memverifikasi...`;
    }

    try {
      const user = await Auth.login(email, password);
      Toast.success(`Selamat datang, ${user.name}!`);

      // Role based redirect verified by backend
      if (user.role === 'admin') {
        window.location.hash = '#/admin/dashboard';
      } else {
        window.location.hash = '#/home';
      }
    } catch (err) {
      Toast.error(err.message || 'Login gagal. Periksa kembali email dan password Anda.');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Masuk</span> <i class="fas fa-arrow-right"></i>`;
      }
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    const submitBtn = document.getElementById('btn-reg-submit');
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    if (password !== confirmPassword) {
      Toast.error('Konfirmasi password tidak cocok.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Mendaftar...`;
    }

    try {
      const user = await Auth.register({ name, email, password, confirmPassword });
      Toast.success(`Akun berhasil didaftarkan! Selamat datang, ${user.name}.`);

      if (user.role === 'admin') {
        window.location.hash = '#/admin/dashboard';
      } else {
        window.location.hash = '#/home';
      }
    } catch (err) {
      Toast.error(err.message || 'Pendaftaran gagal.');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Buat Akun</span> <i class="fas fa-user-plus"></i>`;
      }
    }
  }

  return {
    render,
    switchMode,
    togglePasswordVisibility,
    fillDemo,
    showForgotPassword,
    handleResetSubmit,
    handleLogin,
    handleRegister
  };
})();
