// ==========================================================================
// KINDER STORY SPACE - DIGITAL STORYBOOK READER (/reader/:bookId)
// Features Open-Book Slide Canvas, Audio Narration, and PGPAUD Storytelling
// ==========================================================================
const ReaderPage = (() => {
  let currentBook = null;
  let currentPageIndex = 0;
  let currentLang = 'id';
  let fontScale = 'md'; // 'sm' | 'md' | 'lg'
  let isBookmarked = false;
  let isFullscreen = false;
  let isSpeaking = false;

  // Malin Interactive Story Activities State
  let scene1SelectedObj = 'perahu';
  let scene1Lang = 'id'; // 'id' | 'local' (Minang)
  let scene2Choice = null;
  let scene3SelectedObj = 'kapal';
  let scene3Reflection = null;
  let scene4FeelingsChoice = null;
  let scene4ActionChoice = null;
  let scene5SelectedEnding = 1;
  let scene5VoiceText = '';

  // Modals state
  let showVocabModal = false;
  let showValuesModal = false;
  let showReflectionModal = false;

  // Audio recording state
  let mediaRecorder = null;
  let audioChunks = [];
  let recordedAudioUrl = null;
  let isRecording = false;
  let isPlayingRecordedAudio = false;
  let audioElement = null;
  let recordSeconds = 0;
  let recordTimer = null;

  // Vocabulary definition for Slide 1
  const scene1VocabData = {
    perahu: {
      icon: '⛵',
      idName: 'PERAHU',
      syllable: 'PE - RA - HU',
      localName: 'Biduak / Parahu (Minang)',
      descId: 'Nelayan menggunakan perahu untuk pergi ke laut mencari ikan.',
      descLocal: 'Nelayan manggunokan biduak untuak mancari lauak di lauik.'
    },
    laut: {
      icon: '🌊',
      idName: 'LAUT',
      syllable: 'LA - UT',
      localName: 'Lauik (Minang)',
      descId: 'Laut adalah tempat yang luas dan menjadi bagian penting dari masyarakat pesisir.',
      descLocal: 'Lauik adolah bakeh hiduik urang pasisia nan sangaik barago.'
    },
    ikan: {
      icon: '🐟',
      idName: 'IKAN',
      syllable: 'I - KAN',
      localName: 'Lauak / Ikan (Minang)',
      descId: 'Banyak nelayan menangkap ikan untuk sumber makanan bergizi keluarga.',
      descLocal: 'Urang pamayang mancari lauak untuak makan jo dijua kasadonyo.'
    },
    rumah: {
      icon: '🏠',
      idName: 'RUMAH',
      syllable: 'RU - MAH',
      localName: 'Rumah Gadang / Rumah (Minang)',
      descId: 'Di sinilah tempat tinggal hangat Malin bersama ibunya tercinta.',
      descLocal: 'Di sinilah Malin tingga basamo mandeh tacinto nan sangaik mangasihi.'
    }
  };

  async function render(bookId, targetPage = 1) {
    currentLang = window.appLanguage || 'id';
    const cleanId = (bookId || '').split('?')[0];

    try {
      currentBook = await API.getBookById(cleanId);
      const totalPages = currentBook.pages ? currentBook.pages.length : 1;

      // Set page index based on targetPage parameter
      if (typeof targetPage === 'number' && targetPage >= 1) {
        currentPageIndex = Math.min(Math.max(0, targetPage - 1), totalPages - 1);
      } else if (Auth.isLoggedIn()) {
        try {
          const prog = await API.getProgress(cleanId);
          if (prog && prog.current_page) {
            currentPageIndex = Math.min(Math.max(0, prog.current_page - 1), totalPages - 1);
          }
        } catch {
          currentPageIndex = 0;
        }
      } else {
        currentPageIndex = 0;
      }
    } catch (err) {
      return `
        <div class="reader-container">
          <div style="padding: 100px 20px; text-align: center;">
            <div style="width: 72px; height: 72px; background: #FEE2E2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: #DC2626; font-size: 2rem;">
              <i class="fas fa-triangle-exclamation"></i>
            </div>
            <h2 style="font-weight: 800; color: var(--color-dark-navy);">Buku Tidak Dapat Dimuat</h2>
            <p style="color: var(--color-text-muted); margin: 12px 0 24px;">Gagal memuat konten pembacaan buku atau buku tidak ditemukan.</p>
            <a href="#/home" class="btn btn-primary">Kembali ke Home</a>
          </div>
        </div>
      `;
    }

    return renderReaderView();
  }

  function renderReaderView() {
    const b = currentBook;
    const isEn = currentLang === 'en';
    const pages = b.pages || [];
    const totalPages = Math.max(pages.length, 1);
    const currentPage = pages[currentPageIndex] || {
      page_number: currentPageIndex + 1,
      image_url: b.cover_url,
      title_id: `Slide ${currentPageIndex + 1}`,
      title_en: `Slide ${currentPageIndex + 1}`,
      text_id: b.description_id,
      text_en: b.description_en
    };

    const isMalin = b.id === 'book-malin-kundang';
    const bookTitle = isEn && b.title_en ? b.title_en : b.title_id;
    const sceneTitle = isEn && currentPage.title_en ? currentPage.title_en : (currentPage.title_id || `Slide ${currentPageIndex + 1}`);
    const pageText = isEn && currentPage.text_en ? currentPage.text_en : currentPage.text_id;
    const progressPct = Math.round(((currentPageIndex + 1) / totalPages) * 100);

    const t = {
      id: {
        back: 'Detail Buku',
        prev: 'Slide Sebelumnya',
        next: 'Slide Selanjutnya',
        slide: 'Slide',
        of: 'dari',
        finished: 'Hebat! Anda Telah Menyelesaikan Cerita Ini',
        readAgain: 'Baca Dari Slide 1',
        listen: 'Dengarkan Narasi',
        stopListen: 'Berhenti Mendengarkan',
        vocabTitle: 'Kata Baru (8)',
        valuesTitle: 'Nilai Cerita',
        reflectionTitle: 'Refleksi'
      },
      en: {
        back: 'Book Detail',
        prev: 'Previous Slide',
        next: 'Next Slide',
        slide: 'Slide',
        of: 'of',
        finished: 'Great Job! You Have Completed This Story',
        readAgain: 'Start From Slide 1',
        listen: 'Listen Narration',
        stopListen: 'Stop Listening',
        vocabTitle: 'New Words (8)',
        valuesTitle: 'Story Values',
        reflectionTitle: 'Reflection'
      }
    }[currentLang];

    return `
      <div class="reader-container font-scale-${fontScale} ${isFullscreen ? 'fullscreen-active' : ''}" id="reader-root">
        <!-- TOPBAR -->
        <header class="reader-topbar">
          <a href="#/books/${b.id}" class="reader-back-btn" onclick="ReaderPage.stopSpeech()" title="${t.back}">
            <i class="fas fa-arrow-left"></i> <span>${t.back}</span>
          </a>

          <div style="display: flex; flex-direction: column; align-items: center; max-width: 420px;">
            ${isMalin ? `
              <span style="font-size: 0.72rem; font-weight: 800; color: var(--color-primary); background: rgba(22, 135, 248, 0.1); padding: 2px 10px; border-radius: 9999px; margin-bottom: 2px;">
                ✨ EDISI DIGITAL PGPAUD INTERAKTIF
              </span>
            ` : ''}
            <h2 class="reader-book-title" title="${bookTitle}">${bookTitle}</h2>
          </div>

          <div class="reader-controls-cluster">
            <!-- Malin Story Special Modals Triggers -->
            ${isMalin ? `
              <button class="reader-tool-btn" onclick="ReaderPage.openVocabModal()" title="Kosakata Edukasi PGPAUD" style="width: auto; padding: 0 14px; border-radius: 9999px; font-weight: 700; font-size: 0.8rem; gap: 6px; background: #EFF6FF; color: var(--color-primary); border-color: #BFDBFE;">
                <i class="fas fa-book-bookmark"></i> <span>${t.vocabTitle}</span>
              </button>
              <button class="reader-tool-btn" onclick="ReaderPage.openValuesModal()" title="Nilai Pembelajaran Karakter" style="width: auto; padding: 0 14px; border-radius: 9999px; font-weight: 700; font-size: 0.8rem; gap: 6px; background: #FEF3C7; color: #B45309; border-color: #FDE68A;">
                <i class="fas fa-heart"></i> <span>${t.valuesTitle}</span>
              </button>
              <button class="reader-tool-btn" onclick="ReaderPage.openReflectionModal()" title="Pertanyaan Refleksi Anak & Guru" style="width: auto; padding: 0 14px; border-radius: 9999px; font-weight: 700; font-size: 0.8rem; gap: 6px; background: #F3E8FF; color: #7E22CE; border-color: #E9D5FF;">
                <i class="fas fa-comment-dots"></i> <span>${t.reflectionTitle}</span>
              </button>
            ` : ''}

            <!-- Language Switcher -->
            <div class="lang-toggle" onclick="ReaderPage.toggleLanguage()" title="Ganti Bahasa / Switch Language">
              <span class="lang-opt ${!isEn ? 'active' : ''}">🇮🇩 ID</span>
              <span class="lang-opt ${isEn ? 'active' : ''}">🇬🇧 EN</span>
            </div>

            <!-- Font Size Adjuster -->
            <button class="reader-tool-btn" onclick="ReaderPage.cycleFontSize()" title="Ubah Ukuran Tulisan">
              <span style="font-weight: 800; font-size: 0.85rem;">A${fontScale === 'sm' ? '-' : fontScale === 'lg' ? '+' : ''}</span>
            </button>

            <!-- Bookmark Button -->
            <button class="reader-tool-btn ${isBookmarked ? 'bookmarked' : ''}" onclick="ReaderPage.toggleBookmark()" title="Tandai Slide">
              <i class="fas fa-bookmark"></i>
            </button>

            <!-- Fullscreen Toggle -->
            <button class="reader-tool-btn" onclick="ReaderPage.toggleFullscreen()" title="Layar Penuh">
              <i class="fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}"></i>
            </button>
          </div>
        </header>

        <!-- CANVAS: STORYBOOK SLIDE SPREAD -->
        <main class="reader-stage">
          <div class="storybook-book page-flip-enter" id="storybook-canvas">
            
            <!-- LEFT PAGE: SLIDE ART & AUDIO LISTEN -->
            <div class="storybook-art-side" style="display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;">
              <!-- Visual Artwork -->
              <div style="width: 100%; display: flex; align-items: center; justify-content: center; position: relative;">
                <img src="${currentPage.image_url || b.cover_url}" 
                     alt="${sceneTitle}" 
                     class="storybook-art-img" 
                     onerror="this.src='${b.cover_url}'" 
                     style="max-height: 340px; border-radius: 16px; object-fit: contain; box-shadow: 0 10px 25px rgba(11,36,71,0.08); background: #FAFDFE; padding: 8px;">

                <!-- Badge overlay on art -->
                <span style="position: absolute; top: 12px; left: 16px; background: rgba(11, 36, 71, 0.85); backdrop-filter: blur(4px); color: white; padding: 4px 12px; border-radius: 9999px; font-size: 0.78rem; font-weight: 800; letter-spacing: 0.5px;">
                  ${t.slide} ${currentPageIndex + 1} / ${totalPages}
                </span>
              </div>

              <!-- Narration Audio Player Strip -->
              <div style="margin-top: 18px; width: 100%; display: flex; align-items: center; justify-content: center; gap: 12px;">
                <button class="btn btn-secondary btn-sm" onclick="ReaderPage.speakCurrentSlide()" style="border-radius: 9999px; padding: 8px 20px; font-weight: 800; font-size: 0.85rem; background: ${isSpeaking ? '#FEE2E2' : '#F0F6FC'}; color: ${isSpeaking ? '#DC2626' : 'var(--color-primary)'}; border: 1.5px solid ${isSpeaking ? '#FCA5A5' : 'var(--color-primary)'}; box-shadow: 0 2px 8px rgba(22, 135, 248, 0.12);">
                  <i class="fas ${isSpeaking ? 'fa-pause' : 'fa-volume-high'}"></i> 
                  <span>${isSpeaking ? t.stopListen : t.listen}</span>
                </button>
              </div>

              <!-- Quick hotspots exploration hints for Malin story -->
              ${isMalin ? renderLeftArtBadges(currentPageIndex + 1) : ''}
            </div>

            <!-- RIGHT PAGE: STORY TEXT & INTERACTIVE ACTIVITIES -->
            <div class="storybook-text-side" style="display: flex; flex-direction: column; justify-content: flex-start; overflow-y: auto; max-height: 580px; padding: 36px 40px;">
              <!-- Scene Header Badge -->
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
                <span class="storybook-page-badge" style="margin-bottom: 0;">
                  <i class="fas fa-feather-pointed"></i> ${isMalin ? `SCENE ${currentPageIndex + 1} DARI ${totalPages}` : `${t.slide} ${currentPageIndex + 1} ${t.of} ${totalPages}`}
                </span>

                ${isMalin ? `
                  <span style="font-size: 0.76rem; font-weight: 800; color: #475569; background: #F1F5F9; padding: 4px 10px; border-radius: 9999px;">
                    ${getSceneFocusPill(currentPageIndex + 1)}
                  </span>
                ` : ''}
              </div>

              <!-- Scene Title -->
              <h3 style="font-family: var(--font-heading); font-size: 1.45rem; font-weight: 800; color: var(--color-dark-navy); margin: 6px 0 14px; line-height: 1.3;">
                ${sceneTitle}
              </h3>

              <!-- Core Story Narration Text -->
              <div class="storybook-body-text" style="background: #F8FAFC; border-left: 4px solid var(--color-primary); padding: 14px 18px; border-radius: 0 14px 14px 0; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 1.12rem; line-height: 1.8; color: #1E293B; font-weight: 500;">
                  ${pageText}
                </p>
              </div>

              <!-- INTERACTIVE EDUCATIONAL ACTIVITY (Directly on this slide!) -->
              ${isMalin ? renderSlideActivity(currentPageIndex + 1) : ''}

              <!-- Finish prompt if last page -->
              ${currentPageIndex === totalPages - 1 ? `
                <div style="margin-top: 24px; background: #FEF3C7; padding: 14px 18px; border-radius: 14px; border: 1.5px dashed #D97706; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.4rem;">🌟</span>
                    <div>
                      <div style="font-weight: 800; color: #92400E; font-size: 0.95rem;">${t.finished}</div>
                      <div style="font-size: 0.8rem; color: #B45309;">Cerita ini mengajarkan empati, kejujuran, dan cinta keluarga.</div>
                    </div>
                  </div>
                  <button class="btn btn-primary btn-sm" onclick="ReaderPage.goToPage(0)">${t.readAgain}</button>
                </div>
              ` : ''}
            </div>

          </div>
        </main>

        <!-- BOTTOMBAR: NAVIGATION & SLIDE DOTS -->
        <footer class="reader-bottombar">
          <div class="reader-nav-controls">
            <!-- Prev Slide Button -->
            <button class="btn btn-secondary btn-sm" onclick="ReaderPage.prevPage()" ${currentPageIndex === 0 ? 'disabled style="opacity: 0.35; cursor: not-allowed;"' : ''}>
              <i class="fas fa-chevron-left"></i> <span>${t.prev}</span>
            </button>

            <!-- Center Progress Dots & Bar -->
            <div class="reader-progress-tracker" style="width: auto; min-width: 320px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                ${Array.from({ length: totalPages }).map((_, idx) => `
                  <button onclick="ReaderPage.goToPage(${idx})" 
                          title="Buka Slide ${idx + 1}"
                          style="width: 32px; height: 32px; border-radius: 50%; font-size: 0.82rem; font-weight: 800; cursor: pointer; border: 1.5px solid ${idx === currentPageIndex ? 'var(--color-primary)' : 'var(--color-border)'}; background: ${idx === currentPageIndex ? 'var(--color-primary)' : idx < currentPageIndex ? '#E0F2FE' : '#FFFFFF'}; color: ${idx === currentPageIndex ? '#FFFFFF' : idx < currentPageIndex ? 'var(--color-primary)' : '#64748B'}; transition: all 0.2s ease;">
                    ${idx + 1}
                  </button>
                `).join('')}
              </div>

              <span class="reader-page-indicator" style="font-size: 0.82rem; color: var(--color-text-muted);">
                ${t.slide} ${currentPageIndex + 1} ${t.of} ${totalPages} (${progressPct}%)
              </span>
            </div>

            <!-- Next Slide Button -->
            <button class="btn btn-primary btn-sm" onclick="ReaderPage.nextPage()" ${currentPageIndex >= totalPages - 1 ? 'disabled style="opacity: 0.35; cursor: not-allowed;"' : ''}>
              <span>${t.next}</span> <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </footer>

        <!-- MODAL OVERLAYS (Available anywhere in reader) -->
        ${showVocabModal ? renderVocabModal() : ''}
        ${showValuesModal ? renderValuesModal() : ''}
        ${showReflectionModal ? renderReflectionModal() : ''}
      </div>
    `;
  }

  // ==========================================================================
  // SLIDE-BY-SLIDE INTERACTIVE LEARNING ACTIVITIES (MALIN KUNDANG PGPAUD)
  // ==========================================================================
  function renderSlideActivity(sceneNum) {
    switch (sceneNum) {
      case 1:
        return renderSlide1Activity();
      case 2:
        return renderSlide2Activity();
      case 3:
        return renderSlide3Activity();
      case 4:
        return renderSlide4Activity();
      case 5:
        return renderSlide5Activity();
      default:
        return '';
    }
  }

  // SLIDE 1: Pesisir & Pengenalan Kosakata
  function renderSlide1Activity() {
    const activeObj = scene1VocabData[scene1SelectedObj] || scene1VocabData.perahu;

    return `
      <div style="background: white; border: 1.5px solid #BFDBFE; border-radius: 16px; padding: 18px; margin-top: 8px; box-shadow: 0 4px 12px rgba(22, 135, 248, 0.05);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <span style="font-size: 0.82rem; font-weight: 800; color: var(--color-primary); display: flex; align-items: center; gap: 6px;">
            <i class="fas fa-hand-pointer"></i> Ketuk Kosakata Pesisir:
          </span>
          <span style="font-size: 0.74rem; background: #EEF7FF; color: var(--color-primary); padding: 2px 8px; border-radius: 9999px; font-weight: 700;">
            Literasi Suku Kata
          </span>
        </div>

        <!-- 4 Word Selectors -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 14px;">
          ${Object.keys(scene1VocabData).map(key => {
            const item = scene1VocabData[key];
            const isSel = scene1SelectedObj === key;
            return `
              <button onclick="ReaderPage.selectScene1Object('${key}')" 
                      style="padding: 8px 4px; border-radius: 12px; border: 1.5px solid ${isSel ? 'var(--color-primary)' : '#E2E8F0'}; background: ${isSel ? '#EFF6FF' : '#F8FAFC'}; cursor: pointer; text-align: center; transition: all 0.2s;">
                <div style="font-size: 1.2rem;">${item.icon}</div>
                <div style="font-size: 0.74rem; font-weight: 800; color: ${isSel ? 'var(--color-primary)' : '#334155'}; margin-top: 2px;">
                  ${item.idName}
                </div>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Active Word Card -->
        <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 14px; padding: 14px;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.6rem;">${activeObj.icon}</span>
              <div>
                <h4 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: #166534;">${activeObj.idName}</h4>
                <div style="font-size: 0.85rem; font-weight: 800; color: #15803D; letter-spacing: 1px;">
                  ${activeObj.syllable}
                </div>
              </div>
            </div>

            <button onclick="ReaderPage.pronounceWord('${activeObj.idName}')" class="btn btn-secondary btn-sm" style="border-radius: 9999px; padding: 4px 12px; font-size: 0.78rem; font-weight: 700; color: #166534; border-color: #86EFAC;">
              <i class="fas fa-volume-high"></i> Bunyi Kata
            </button>
          </div>

          <p style="margin: 0; font-size: 0.88rem; color: #14532D; line-height: 1.5;">
            ${scene1Lang === 'id' ? activeObj.descId : activeObj.descLocal}
          </p>

          <div style="margin-top: 8px; display: flex; align-items: center; justify-content: space-between; font-size: 0.76rem; border-top: 1px dashed #86EFAC; padding-top: 6px;">
            <span style="color: #15803D; font-weight: 700;">
              Bahasa Daerah: <em>${activeObj.localName}</em>
            </span>
            <button onclick="ReaderPage.toggleScene1Lang()" style="background: none; border: none; color: #15803D; font-weight: 800; cursor: pointer; text-decoration: underline;">
              ${scene1Lang === 'id' ? 'Ganti Minang' : 'Ganti Indonesia'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // SLIDE 2: Pengambilan Keputusan (Bekal & Pesan Ibu)
  function renderSlide2Activity() {
    const choices = [
      {
        key: 'A',
        icon: '🧸',
        label: 'A. Mainan saja',
        feedback: 'Mainan bisa menyenangkan, namun Malin membutuhkan bekal makanan dan nasihat berharga untuk perjalanannya. Coba pilih lagi ya!'
      },
      {
        key: 'B',
        icon: '🎒',
        label: 'B. Bekal dan doa pesan ibu',
        isOptimal: true,
        feedback: '✨ Hebat sekali! Malin membawa bekal makanan sehat dan selalu mengingat doa tulus ibunya. Pilihan yang sangat bijak!'
      },
      {
        key: 'C',
        icon: '👑',
        label: 'C. Perhiasan emas',
        feedback: 'Emas bukan kebutuhan utama seorang anak yang baru belajar mandiri. Kasih sayang dan doa ibu jauh lebih berharga.'
      }
    ];

    const currentChoice = choices.find(c => c.key === scene2Choice);

    return `
      <div style="background: white; border: 1.5px solid #FDE68A; border-radius: 16px; padding: 18px; margin-top: 8px; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.05);">
        <span style="font-size: 0.82rem; font-weight: 800; color: #B45309; display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
          <i class="fas fa-circle-question"></i> Pertanyaan Pilihan Bijak Anak:
        </span>
        <h4 style="margin: 0 0 12px; font-size: 1rem; font-weight: 800; color: var(--color-dark-navy);">
          Apa yang harus Malin bawa dalam perjalanannya?
        </h4>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${choices.map(c => {
            const isSel = scene2Choice === c.key;
            return `
              <button onclick="ReaderPage.chooseScene2('${c.key}')" 
                      style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 12px; border: 1.5px solid ${isSel ? (c.isOptimal ? '#10B981' : '#F59E0B') : '#E2E8F0'}; background: ${isSel ? (c.isOptimal ? '#ECFDF5' : '#FFFBEB') : '#F8FAFC'}; cursor: pointer; text-align: left; transition: all 0.2s;">
                <span style="font-size: 1.3rem;">${c.icon}</span>
                <span style="font-size: 0.9rem; font-weight: 700; color: ${isSel ? '#0F172A' : '#475569'}; flex-grow: 1;">
                  ${c.label}
                </span>
                ${isSel ? `<i class="fas ${c.isOptimal ? 'fa-circle-check' : 'fa-circle-info'}" style="color: ${c.isOptimal ? '#10B981' : '#F59E0B'};"></i>` : ''}
              </button>
            `;
          }).join('')}
        </div>

        ${currentChoice ? `
          <div style="margin-top: 12px; padding: 12px 14px; border-radius: 12px; background: ${currentChoice.isOptimal ? '#ECFDF5' : '#FFFBEB'}; border: 1px solid ${currentChoice.isOptimal ? '#A7F3D0' : '#FDE68A'}; font-size: 0.86rem; color: ${currentChoice.isOptimal ? '#065F46' : '#92400E'}; line-height: 1.5;">
            ${currentChoice.feedback}
          </div>
        ` : ''}
      </div>
    `;
  }

  // SLIDE 3: Eksplorasi Dunia & Refleksi Rindu Rumah
  function renderSlide3Activity() {
    const items = [
      { key: 'kapal', icon: '🚢', label: 'Kapal Megah', desc: 'Kapal layar besar yang membawa barang dagangan ke berbagai pulau nusantara.' },
      { key: 'pakaian', icon: '👘', label: 'Pakaian Baru', desc: 'Pakaian indah dari pedagang, menandakan keberhasilan Malin berniaga.' },
      { key: 'dagangan', icon: '📦', label: 'Hasil Niaga', desc: 'Rempah-rempah dan hasil bumi yang ditukar dengan tekun.' }
    ];

    const reflections = [
      { key: 'senang', emoji: '😊', label: 'Kagum & Senang', msg: 'Malin bangga bisa belajar banyak pengalaman baru di pelabuhan besar.' },
      { key: 'bingung', emoji: '😕', label: 'Merasa Asing', msg: 'Suasana kota besar sangat berbeda dengan kampung laut yang damai.' },
      { key: 'rindu', emoji: '🏡', label: 'Rindu Rumah', msg: 'Meskipun tempat ini megah, Malin teringat masakan dan pelukan hangat ibunya.' }
    ];

    const activeItem = items.find(i => i.key === scene3SelectedObj) || items[0];
    const activeRefl = reflections.find(r => r.key === scene3Reflection);

    return `
      <div style="background: white; border: 1.5px solid #CBD5E1; border-radius: 16px; padding: 18px; margin-top: 8px;">
        <span style="font-size: 0.82rem; font-weight: 800; color: #475569; display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
          <i class="fas fa-magnifying-glass"></i> Eksplorasi Hal Baru di Pelabuhan:
        </span>

        <!-- 3 Items -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 12px;">
          ${items.map(it => {
            const isSel = scene3SelectedObj === it.key;
            return `
              <button onclick="ReaderPage.selectScene3Object('${it.key}')"
                      style="padding: 8px; border-radius: 12px; border: 1.5px solid ${isSel ? 'var(--color-primary)' : '#E2E8F0'}; background: ${isSel ? '#EFF6FF' : '#F8FAFC'}; cursor: pointer; text-align: center;">
                <div style="font-size: 1.2rem;">${it.icon}</div>
                <div style="font-size: 0.76rem; font-weight: 800; color: ${isSel ? 'var(--color-primary)' : '#334155'};">${it.label}</div>
              </button>
            `;
          }).join('')}
        </div>

        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 10px 12px; font-size: 0.84rem; color: #334155; margin-bottom: 14px;">
          <strong>${activeItem.label}:</strong> ${activeItem.desc}
        </div>

        <!-- Emotion Check-in -->
        <div style="border-top: 1px dashed #CBD5E1; padding-top: 10px;">
          <div style="font-size: 0.8rem; font-weight: 800; color: #0F172A; margin-bottom: 6px;">
            Bagaimana perasaan Malin saat melihat dunia luar?
          </div>
          <div style="display: flex; gap: 8px;">
            ${reflections.map(r => {
              const isSel = scene3Reflection === r.key;
              return `
                <button onclick="ReaderPage.chooseScene3Reflection('${r.key}')"
                        style="flex: 1; padding: 6px 4px; border-radius: 10px; border: 1.5px solid ${isSel ? '#8B5CF6' : '#E2E8F0'}; background: ${isSel ? '#F5F3FF' : '#FFFFFF'}; cursor: pointer; font-size: 0.76rem; font-weight: 700; color: ${isSel ? '#7C3AED' : '#475569'};">
                  <span>${r.emoji}</span> <span>${r.label}</span>
                </button>
              `;
            }).join('')}
          </div>
          ${activeRefl ? `
            <div style="margin-top: 8px; font-size: 0.82rem; color: #6D28D9; background: #F5F3FF; padding: 8px 10px; border-radius: 10px;">
              ${activeRefl.msg}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // SLIDE 4: Empati & Keputusan Moral (NO STONE CURSE)
  function renderSlide4Activity() {
    return `
      <div style="background: white; border: 1.5px solid #FCA5A5; border-radius: 16px; padding: 18px; margin-top: 8px; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.05);">
        <!-- Empathy question -->
        <div style="margin-bottom: 14px;">
          <span style="font-size: 0.8rem; font-weight: 800; color: #DC2626; display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
            <i class="fas fa-heart-pulse"></i> 1. Empati: Bagaimana perasaan ibu saat Malin tampak ragu?
          </span>
          <div style="display: flex; gap: 8px;">
            <button onclick="ReaderPage.chooseScene4Feeling('sedih')" 
                    style="flex: 1; padding: 8px 10px; border-radius: 10px; border: 1.5px solid ${scene4FeelingsChoice === 'sedih' ? '#10B981' : '#E2E8F0'}; background: ${scene4FeelingsChoice === 'sedih' ? '#ECFDF5' : '#F8FAFC'}; font-size: 0.8rem; font-weight: 700; color: ${scene4FeelingsChoice === 'sedih' ? '#065F46' : '#334155'}; cursor: pointer; text-align: left;">
              😢 Sedih & Terluka (Tepat)
            </button>
            <button onclick="ReaderPage.chooseScene4Feeling('biasa')" 
                    style="flex: 1; padding: 8px 10px; border-radius: 10px; border: 1.5px solid ${scene4FeelingsChoice === 'biasa' ? '#F59E0B' : '#E2E8F0'}; background: ${scene4FeelingsChoice === 'biasa' ? '#FFFBEB' : '#F8FAFC'}; font-size: 0.8rem; font-weight: 700; color: ${scene4FeelingsChoice === 'biasa' ? '#92400E' : '#334155'}; cursor: pointer; text-align: left;">
              😐 Biasa saja
            </button>
          </div>
        </div>

        <!-- Action Question -->
        <div>
          <span style="font-size: 0.8rem; font-weight: 800; color: #2563EB; display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
            <i class="fas fa-hands-holding-child"></i> 2. Tindakan: Apa yang seharusnya Malin lakukan?
          </span>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <button onclick="ReaderPage.chooseScene4Action('peluk')" 
                    style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-radius: 10px; border: 1.5px solid ${scene4ActionChoice === 'peluk' ? '#10B981' : '#E2E8F0'}; background: ${scene4ActionChoice === 'peluk' ? '#ECFDF5' : '#F8FAFC'}; font-size: 0.84rem; font-weight: 700; color: ${scene4ActionChoice === 'peluk' ? '#065F46' : '#334155'}; cursor: pointer;">
              <span>🤗 Segera memeluk ibu dan meminta maaf dengan tulus</span>
              ${scene4ActionChoice === 'peluk' ? '<i class="fas fa-check-circle" style="color: #10B981;"></i>' : ''}
            </button>
            <button onclick="ReaderPage.chooseScene4Action('diam')" 
                    style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-radius: 10px; border: 1.5px solid ${scene4ActionChoice === 'diam' ? '#EF4444' : '#E2E8F0'}; background: ${scene4ActionChoice === 'diam' ? '#FEF2F2' : '#F8FAFC'}; font-size: 0.84rem; font-weight: 700; color: ${scene4ActionChoice === 'diam' ? '#991B1B' : '#334155'}; cursor: pointer;">
              <span>🙈 Pura-pura tidak mengenal ibunya</span>
              ${scene4ActionChoice === 'diam' ? '<i class="fas fa-times-circle" style="color: #EF4444;"></i>' : ''}
            </button>
          </div>
        </div>

        <!-- Anti-stone pedagogical badge -->
        <div style="margin-top: 12px; background: #FEF3C7; border: 1px solid #FCD34D; border-radius: 10px; padding: 10px 12px; display: flex; align-items: flex-start; gap: 8px;">
          <span style="font-size: 1.1rem; color: #D97706;">💡</span>
          <div style="font-size: 0.78rem; color: #92400E; line-height: 1.45;">
            <strong>Catatan Pembelajaran PGPAUD:</strong> Di versi ini, <em>tidak ada kutukan batu</em>. Cerita difokuskan pada kesadaran moral, rasa hormat kepada orang tua, dan nilai meminta maaf.
          </div>
        </div>
      </div>
    `;
  }

  // SLIDE 5: Pilihan Akhir Cerita & Ruang Rekam Suara Anak
  function renderSlide5Activity() {
    const endings = [
      { id: 1, icon: '🏡', title: 'Tinggal Bersama Ibu di Kampung Laut', desc: 'Malin memeluk ibunya, meminta maaf, dan hidup berbahagia merawat ibunya.' },
      { id: 2, icon: '⛵', title: 'Membangun Kampung Nelayan yang Maju', desc: 'Malin menggunakan hasil dagangannya untuk membantu perahu nelayan di kampung halamannya.' },
      { id: 3, icon: '🌏', title: 'Mengajak Ibu Berkeliling Dunia', desc: 'Malin mengajak ibunya berlayar menikmati keindahan laut bersama dengan penuh cinta.' }
    ];

    return `
      <div style="background: white; border: 1.5px solid #86EFAC; border-radius: 16px; padding: 18px; margin-top: 8px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.05);">
        <span style="font-size: 0.82rem; font-weight: 800; color: #059669; display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
          <i class="fas fa-star"></i> Pilih Akhir Cerita Favorit Anak:
        </span>

        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
          ${endings.map(e => {
            const isSel = scene5SelectedEnding === e.id;
            return `
              <button onclick="ReaderPage.selectEnding(${e.id})"
                      style="display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; border-radius: 12px; border: 1.5px solid ${isSel ? '#10B981' : '#E2E8F0'}; background: ${isSel ? '#ECFDF5' : '#F8FAFC'}; cursor: pointer; text-align: left; transition: all 0.2s;">
                <span style="font-size: 1.3rem;">${e.icon}</span>
                <div style="flex-grow: 1;">
                  <div style="font-size: 0.88rem; font-weight: 800; color: ${isSel ? '#065F46' : '#1E293B'};">${e.title}</div>
                  <div style="font-size: 0.78rem; color: #64748B; margin-top: 2px;">${e.desc}</div>
                </div>
                ${isSel ? '<i class="fas fa-check-circle" style="color: #10B981; font-size: 1rem; margin-top: 4px;"></i>' : ''}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Voice Recorder & Opinion Space -->
        <div style="border-top: 1.5px dashed #CBD5E1; padding-top: 12px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-size: 0.82rem; font-weight: 800; color: var(--color-dark-navy); display: flex; align-items: center; gap: 6px;">
              <i class="fas fa-microphone"></i> Ruang Berpendapat Anak:
            </span>
            <span style="font-size: 0.74rem; color: var(--color-text-muted);">Suara / Rekaman</span>
          </div>

          <!-- Record Controls -->
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; flex-wrap: wrap;">
            ${!isRecording ? `
              <button onclick="ReaderPage.startRecording()" class="btn btn-secondary btn-sm" style="border-radius: 9999px; padding: 6px 14px; font-size: 0.8rem; font-weight: 800; color: #DC2626; border-color: #FCA5A5;">
                <i class="fas fa-circle" style="color: #DC2626;"></i> Rekam Suara
              </button>
            ` : `
              <button onclick="ReaderPage.stopRecording()" class="btn btn-danger btn-sm" style="border-radius: 9999px; padding: 6px 14px; font-size: 0.8rem; font-weight: 800; animation: pulse 1s infinite;">
                <i class="fas fa-square"></i> Berhenti (${formatTime(recordSeconds)})
              </button>
            `}

            ${recordedAudioUrl ? `
              <button onclick="ReaderPage.playRecording()" class="btn btn-primary btn-sm" style="border-radius: 9999px; padding: 6px 14px; font-size: 0.8rem; font-weight: 800;">
                <i class="fas ${isPlayingRecordedAudio ? 'fa-pause' : 'fa-play'}"></i> ${isPlayingRecordedAudio ? 'Jeda' : 'Putar Pendapat'}
              </button>
              <button onclick="ReaderPage.resetRecording()" style="background: none; border: none; font-size: 0.76rem; color: #64748B; cursor: pointer; text-decoration: underline;">
                Ulangi
              </button>
            ` : ''}
          </div>

          <!-- Quick Opinion Chips -->
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            <button onclick="ReaderPage.selectSuggestionChip('Aku sangat menyayangi ibu dan keluargaku.')" style="background: #F1F5F9; border: 1px solid #CBD5E1; padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; color: #334155; cursor: pointer;">
              ❤️ Aku sayang ibu
            </button>
            <button onclick="ReaderPage.selectSuggestionChip('Meminta maaf itu perbuatan berani dan baik.')" style="background: #F1F5F9; border: 1px solid #CBD5E1; padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; color: #334155; cursor: pointer;">
              ✨ Minta maaf itu berani
            </button>
            <button onclick="ReaderPage.selectSuggestionChip('Selalu bersyukur dan mengingat kampung halaman.')" style="background: #F1F5F9; border: 1px solid #CBD5E1; padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; color: #334155; cursor: pointer;">
              🌊 Selalu ingat rumah
            </button>
          </div>

          <!-- Display selected voice/opinion text -->
          ${scene5VoiceText ? `
            <div style="margin-top: 8px; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 8px 12px; border-radius: 10px; font-size: 0.82rem; color: #1E293B;">
              <strong>Pendapat Anak:</strong> "${scene5VoiceText}"
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // Hotspot visual tags on left artwork
  function renderLeftArtBadges(sceneNum) {
    const badges = {
      1: ['⛵ Perahu Nelayan', '🌊 Pantai Pasir', '🏠 Rumah Malin'],
      2: ['🎒 Bekal Hangat', '💌 Pesan Ibu', '🌅 Pelabuhan'],
      3: ['🚢 Kapal Layar Besar', '👘 Pakaian Saudagar', '📦 Rempah Pesisir'],
      4: ['👵 Mandeh Penuh Kasih', '🙇 Malin Menyadari', '🤝 Pelukan Hangat'],
      5: ['🌟 Keluarga Bahagia', '🌊 Kampung Laut Lestari', '🕊️ Kedamaian Hati']
    }[sceneNum] || [];

    return `
      <div style="margin-top: 14px; display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; max-width: 320px;">
        ${badges.map(b => `
          <span style="font-size: 0.74rem; font-weight: 700; color: #334155; background: rgba(255,255,255,0.85); border: 1px solid #CBD5E1; padding: 3px 10px; border-radius: 9999px; backdrop-filter: blur(2px);">
            ${b}
          </span>
        `).join('')}
      </div>
    `;
  }

  function getSceneFocusPill(sceneNum) {
    switch (sceneNum) {
      case 1: return 'Lingkungan & Kosakata';
      case 2: return 'Pengambilan Keputusan';
      case 3: return 'Eksplorasi & Diri';
      case 4: return 'Empati & Keluarga';
      case 5: return 'Ekspresi & Karakter';
      default: return 'Literasi PAUD';
    }
  }

  // ==========================================================================
  // MODALS: VOCABULARY (8 WORDS), LEARNING VALUES & REFLECTIONS
  // ==========================================================================
  function renderVocabModal() {
    const vocabList = [
      { id: 'PERAHU', syl: 'PE - RA - HU', minang: 'Biduak / Parahu', desc: 'Kendaraan apung nelayan untuk mencari ikan di laut.' },
      { id: 'LAUT', syl: 'LA - UT', minang: 'Lauik', desc: 'Hamparan air asin luas tempat hidup beragam ikan.' },
      { id: 'IKAN', syl: 'I - KAN', minang: 'Lauak / Ikan', desc: 'Hewan laut bergizi tinggi yang ditangkap nelayan.' },
      { id: 'RUMAH', syl: 'RU - MAH', minang: 'Rumah', desc: 'Tempat tinggal penuh kehangatan bersama orang tua.' },
      { id: 'BEKAL', syl: 'BE - KAL', minang: 'Samba / Bekal', desc: 'Persiapan penting dan makanan saat bepergian.' },
      { id: 'PESAN IBU', syl: 'PE - SAN I - BU', minang: 'Pasan Mandeh', desc: 'Nasihat penuh kasih sayang yang harus selalu diingat.' },
      { id: 'KAPAL', syl: 'KA - PAL', minang: 'Kapa', desc: 'Perahu besar bertiang megah yang mengarungi lautan luas.' },
      { id: 'MEMAAFKAN', syl: 'ME - MA - AF - KAN', minang: 'Mambari Maaf', desc: 'Perbuatan berani dan terpuji untuk menjaga kasih sayang.' }
    ];

    return `
      <div class="modal-overlay" style="position: fixed; inset: 0; background: rgba(11, 36, 71, 0.7); backdrop-filter: blur(4px); z-index: 999999; display: flex; align-items: center; justify-content: center; padding: 20px;">
        <div style="background: white; border-radius: 24px; max-width: 620px; width: 100%; max-height: 85vh; overflow-y: auto; padding: 28px; box-shadow: 0 25px 60px rgba(0,0,0,0.3); animation: flipSlideIn 0.25s ease;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.6rem; background: #EFF6FF; width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--color-primary);">📖</span>
              <div>
                <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: var(--color-dark-navy);">Daftar Kosakata Baru (8 Kata)</h3>
                <span style="font-size: 0.8rem; color: var(--color-text-muted);">Pengenalan Suku Kata & Dwibahasa Minang</span>
              </div>
            </div>
            <button onclick="ReaderPage.closeModals()" style="background: #F1F5F9; border: none; width: 34px; height: 34px; border-radius: 50%; cursor: pointer; font-size: 1.1rem; color: #475569;">✕</button>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; margin-bottom: 20px;">
            ${vocabList.map(v => `
              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 12px 14px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                  <span style="font-weight: 800; color: var(--color-primary); font-size: 0.95rem;">${v.id}</span>
                  <button onclick="ReaderPage.pronounceWord('${v.id}')" style="background: none; border: none; color: var(--color-primary); cursor: pointer; font-size: 0.85rem;" title="Dengarkan"><i class="fas fa-volume-high"></i></button>
                </div>
                <div style="font-size: 0.78rem; font-weight: 700; color: #10B981; margin-bottom: 4px;">${v.syl}</div>
                <div style="font-size: 0.8rem; color: #475569; line-height: 1.4; margin-bottom: 4px;">${v.desc}</div>
                <div style="font-size: 0.74rem; color: #7C3AED; font-weight: 700;">Minang: <em>${v.minang}</em></div>
              </div>
            `).join('')}
          </div>

          <button onclick="ReaderPage.closeModals()" class="btn btn-primary" style="width: 100%; border-radius: 14px;">Tutup</button>
        </div>
      </div>
    `;
  }

  function renderValuesModal() {
    const values = [
      { icon: '❤️', title: 'Nilai Kasih Sayang & Keluarga', desc: 'Menghormati ibu yang telah membesarkan kita dan menjaga kehangatan hubungan keluarga.' },
      { icon: '🌊', title: 'Rasa Syukur & Identitas Pesisir', desc: 'Menghargai tempat kelahiran, kehidupan nelayan, dan keindahan alam laut Indonesia.' },
      { icon: '🧭', title: 'Pengambilan Keputusan Bijak', desc: 'Belajar memilih hal-hal berharga seperti bekal dan nasihat daripada kemewahan sesaat.' },
      { icon: '🤝', title: 'Empati & Meminta Maaf', desc: 'Menyadari kesalahan dan berani meminta maaf secara tulus tanpa takut.' },
      { icon: '🕊️', title: 'Bebas Hukuman Supernatural', desc: 'Tidak menggunakan kutukan batu, melainkan mengedepankan refleksi hati dan pemulihan kasih sayang.' }
    ];

    return `
      <div class="modal-overlay" style="position: fixed; inset: 0; background: rgba(11, 36, 71, 0.7); backdrop-filter: blur(4px); z-index: 999999; display: flex; align-items: center; justify-content: center; padding: 20px;">
        <div style="background: white; border-radius: 24px; max-width: 580px; width: 100%; max-height: 85vh; overflow-y: auto; padding: 28px; box-shadow: 0 25px 60px rgba(0,0,0,0.3); animation: flipSlideIn 0.25s ease;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.6rem; background: #FEF3C7; width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #B45309;">❤️</span>
              <div>
                <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: var(--color-dark-navy);">Nilai Pembelajaran PGPAUD</h3>
                <span style="font-size: 0.8rem; color: var(--color-text-muted);">Fondasi Karakter & Sosial Emosional AUD</span>
              </div>
            </div>
            <button onclick="ReaderPage.closeModals()" style="background: #F1F5F9; border: none; width: 34px; height: 34px; border-radius: 50%; cursor: pointer; font-size: 1.1rem; color: #475569;">✕</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
            ${values.map(v => `
              <div style="display: flex; align-items: flex-start; gap: 12px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 12px 14px;">
                <span style="font-size: 1.4rem;">${v.icon}</span>
                <div>
                  <div style="font-weight: 800; color: var(--color-dark-navy); font-size: 0.92rem;">${v.title}</div>
                  <div style="font-size: 0.82rem; color: #475569; line-height: 1.45; margin-top: 2px;">${v.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>

          <button onclick="ReaderPage.closeModals()" class="btn btn-primary" style="width: 100%; border-radius: 14px;">Tutup</button>
        </div>
      </div>
    `;
  }

  function renderReflectionModal() {
    const questions = [
      { q: 'Apa yang anak rasakan saat melihat Malin bertemu ibunya kembali?', target: 'Pengenalan Emosi' },
      { q: 'Mengapa doa dan pesan ibu lebih berharga daripada mainan atau harta?', target: 'Nilai Moral' },
      { q: 'Jika kita berbuat keliru, apa hal terbaik yang harus kita katakan kepada orang tua?', target: 'Resolusi Sikap' },
      { q: 'Benda apa saja yang bisa anak temukan di kampung laut?', target: 'Literasi Lingkungan' }
    ];

    return `
      <div class="modal-overlay" style="position: fixed; inset: 0; background: rgba(11, 36, 71, 0.7); backdrop-filter: blur(4px); z-index: 999999; display: flex; align-items: center; justify-content: center; padding: 20px;">
        <div style="background: white; border-radius: 24px; max-width: 580px; width: 100%; max-height: 85vh; overflow-y: auto; padding: 28px; box-shadow: 0 25px 60px rgba(0,0,0,0.3); animation: flipSlideIn 0.25s ease;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.6rem; background: #F3E8FF; width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #7E22CE;">💬</span>
              <div>
                <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: var(--color-dark-navy);">Panduan Diskusi Guru & Orang Tua</h3>
                <span style="font-size: 0.8rem; color: var(--color-text-muted);">Pertanyaan Pemantik Interaktif PGPAUD</span>
              </div>
            </div>
            <button onclick="ReaderPage.closeModals()" style="background: #F1F5F9; border: none; width: 34px; height: 34px; border-radius: 50%; cursor: pointer; font-size: 1.1rem; color: #475569;">✕</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
            ${questions.map((item, idx) => `
              <div style="background: #FAF5FF; border: 1px solid #E9D5FF; border-radius: 12px; padding: 12px 14px;">
                <span style="font-size: 0.74rem; font-weight: 800; color: #7E22CE; background: #E9D5FF; padding: 2px 8px; border-radius: 9999px;">${item.target}</span>
                <p style="margin: 6px 0 0; font-size: 0.88rem; font-weight: 700; color: #3B0764; line-height: 1.45;">${idx + 1}. ${item.q}</p>
              </div>
            `).join('')}
          </div>

          <button onclick="ReaderPage.closeModals()" class="btn btn-primary" style="width: 100%; border-radius: 14px;">Tutup</button>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // VIEW UPDATER & NAVIGATION CONTROLLERS
  // ==========================================================================
  function updateView() {
    const root = document.getElementById('app-root');
    if (root) {
      root.innerHTML = renderReaderView();
    }
  }

  function nextPage() {
    const totalPages = currentBook.pages ? currentBook.pages.length : 1;
    if (currentPageIndex < totalPages - 1) {
      currentPageIndex++;
      stopSpeech();
      saveProgress();
      window.location.hash = `#/reader/${currentBook.id}?page=${currentPageIndex + 1}`;
      updateView();
    }
  }

  function prevPage() {
    if (currentPageIndex > 0) {
      currentPageIndex--;
      stopSpeech();
      saveProgress();
      window.location.hash = `#/reader/${currentBook.id}?page=${currentPageIndex + 1}`;
      updateView();
    }
  }

  function goToPage(idx) {
    const totalPages = currentBook.pages ? currentBook.pages.length : 1;
    if (idx >= 0 && idx < totalPages) {
      currentPageIndex = idx;
      stopSpeech();
      saveProgress();
      window.location.hash = `#/reader/${currentBook.id}?page=${currentPageIndex + 1}`;
      updateView();
    }
  }

  function toggleLanguage() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    window.appLanguage = currentLang;
    localStorage.setItem('kss_lang', currentLang);
    stopSpeech();
    updateView();
  }

  function cycleFontSize() {
    if (fontScale === 'sm') fontScale = 'md';
    else if (fontScale === 'md') fontScale = 'lg';
    else fontScale = 'sm';
    updateView();
  }

  function toggleBookmark() {
    isBookmarked = !isBookmarked;
    Toast.info(isBookmarked ? `Slide ${currentPageIndex + 1} ditandai.` : 'Tanda slide dihapus.');
    updateView();
  }

  function toggleFullscreen() {
    isFullscreen = !isFullscreen;
    if (isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
    updateView();
  }

  function saveProgress() {
    if (Auth.isLoggedIn() && currentBook) {
      API.saveProgress(currentBook.id, {
        page: currentPageIndex + 1,
        language: currentLang
      }).catch(err => console.error('Failed to save progress:', err));
    }
  }

  // ==========================================================================
  // SPEECH SYNTHESIS & AUDIO
  // ==========================================================================
  function speakCurrentSlide() {
    if (!window.speechSynthesis) {
      Toast.info('Browser Anda tidak mendukung suara sintesis.');
      return;
    }

    if (window.speechSynthesis.speaking) {
      stopSpeech();
      return;
    }

    const pages = currentBook.pages || [];
    const cp = pages[currentPageIndex];
    if (!cp) return;

    const isEn = currentLang === 'en';
    const textToSpeak = isEn && cp.text_en ? cp.text_en : cp.text_id;

    try {
      const utter = new SpeechSynthesisUtterance(textToSpeak);
      utter.lang = isEn ? 'en-US' : 'id-ID';
      utter.rate = 0.9;
      utter.pitch = 1.05;

      utter.onstart = () => {
        isSpeaking = true;
        updateView();
      };
      utter.onend = () => {
        isSpeaking = false;
        updateView();
      };
      utter.onerror = () => {
        isSpeaking = false;
        updateView();
      };

      window.speechSynthesis.speak(utter);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
      isSpeaking = false;
      updateView();
    }
  }

  function stopSpeech() {
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    isSpeaking = false;
  }

  function pronounceWord(word) {
    if (!window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(word);
      utter.lang = 'id-ID';
      utter.rate = 0.8;
      utter.pitch = 1.1;
      window.speechSynthesis.speak(utter);
    } catch {}
  }

  // ==========================================================================
  // ACTIVITY STATE HANDLERS
  // ==========================================================================
  function selectScene1Object(key) {
    scene1SelectedObj = key;
    updateView();
  }

  function toggleScene1Lang() {
    scene1Lang = scene1Lang === 'id' ? 'local' : 'id';
    updateView();
  }

  function chooseScene2(key) {
    scene2Choice = key;
    updateView();
  }

  function selectScene3Object(key) {
    scene3SelectedObj = key;
    updateView();
  }

  function chooseScene3Reflection(key) {
    scene3Reflection = key;
    updateView();
  }

  function chooseScene4Feeling(feeling) {
    scene4FeelingsChoice = feeling;
    updateView();
  }

  function chooseScene4Action(action) {
    scene4ActionChoice = action;
    updateView();
  }

  function selectEnding(id) {
    scene5SelectedEnding = id;
    Toast.success(`Pilihan akhir cerita ${id} berhasil dipilih!`);
    updateView();
  }

  function selectSuggestionChip(text) {
    scene5VoiceText = text;
    Toast.info('Pendapat anak tercatat: "' + text + '"');
    updateView();
  }

  // ==========================================================================
  // VOICE RECORDER (SLIDE 5)
  // ==========================================================================
  async function startRecording() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        Toast.info('Perekam audio tidak didukung. Silakan gunakan tombol pendapat cepat di bawah!');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunks = [];
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) audioChunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        recordedAudioUrl = URL.createObjectURL(audioBlob);
        isRecording = false;
        clearInterval(recordTimer);
        recordSeconds = 0;
        Toast.success('Rekaman suara berhasil disimpan!');
        updateView();
      };

      mediaRecorder.start();
      isRecording = true;
      recordSeconds = 0;
      recordTimer = setInterval(() => {
        recordSeconds++;
        const btn = document.querySelector('.btn-danger');
        if (btn) btn.innerHTML = `<i class="fas fa-square"></i> Berhenti (${formatTime(recordSeconds)})`;
      }, 1000);

      updateView();
    } catch (err) {
      console.warn('Microphone permission denied:', err);
      Toast.error('Mikrofon tidak dapat diakses. Anda tetap dapat menggunakan pilihan pendapat cepat di bawah!');
    }
  }

  function stopRecording() {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      if (mediaRecorder.stream) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
    }
  }

  function playRecording() {
    if (!audioElement && recordedAudioUrl) {
      audioElement = new Audio(recordedAudioUrl);
      audioElement.onended = () => {
        isPlayingRecordedAudio = false;
        updateView();
      };
    }

    if (audioElement) {
      if (isPlayingRecordedAudio) {
        audioElement.pause();
        isPlayingRecordedAudio = false;
      } else {
        audioElement.play();
        isPlayingRecordedAudio = true;
      }
      updateView();
    }
  }

  function resetRecording() {
    if (audioElement) {
      audioElement.pause();
      audioElement = null;
    }
    recordedAudioUrl = null;
    audioChunks = [];
    isRecording = false;
    isPlayingRecordedAudio = false;
    recordSeconds = 0;
    updateView();
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  // Modals controllers
  function openVocabModal() { showVocabModal = true; updateView(); }
  function openValuesModal() { showValuesModal = true; updateView(); }
  function openReflectionModal() { showReflectionModal = true; updateView(); }
  function closeModals() {
    showVocabModal = false;
    showValuesModal = false;
    showReflectionModal = false;
    updateView();
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (window.location.hash.startsWith('#/reader/')) {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    }
  });

  // Stop speech when leaving reader
  window.addEventListener('hashchange', () => {
    if (!window.location.hash.startsWith('#/reader/')) {
      stopSpeech();
    }
  });

  return {
    render,
    nextPage,
    prevPage,
    goToPage,
    toggleLanguage,
    cycleFontSize,
    toggleBookmark,
    toggleFullscreen,
    speakCurrentSlide,
    stopSpeech,
    pronounceWord,
    selectScene1Object,
    toggleScene1Lang,
    chooseScene2,
    selectScene3Object,
    chooseScene3Reflection,
    chooseScene4Feeling,
    chooseScene4Action,
    selectEnding,
    selectSuggestionChip,
    startRecording,
    stopRecording,
    playRecording,
    resetRecording,
    openVocabModal,
    openValuesModal,
    openReflectionModal,
    closeModals
  };
})();
