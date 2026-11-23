// Interactive Digital Storytelling Component: "Malin dan Perjalanan dari Kampung Laut"
// PGPAUD Early Childhood Education Edition - Social-Emotional Learning & Child-Friendly
const MalinInteractiveStory = (() => {
  let currentScene = 1;
  let audioEnabled = true;
  let isSpeaking = false;
  let currentBook = null;

  // Interaction States
  let scene1SelectedObj = 'perahu';
  let scene1Lang = 'id'; // 'id' | 'local' (Minang)
  let scene2Choice = null;
  let scene3SelectedObj = 'kapal';
  let scene3Reflection = null;
  let scene4FeelingsChoice = null;
  let scene4ActionChoice = null;
  let scene5SelectedEnding = 1;
  let scene5VoiceText = '';
  let finalReflectionChoice = null;

  // Modals
  let showVocabModal = false;
  let showValuesModal = false;
  let showReflectionModal = false;

  // Audio Recorder State
  let mediaRecorder = null;
  let audioChunks = [];
  let recordedAudioUrl = null;
  let isRecording = false;
  let isPlayingRecordedAudio = false;
  let recordTimerInterval = null;
  let recordSeconds = 0;
  let audioElement = null;

  // Scene Data
  const sceneData = {
    1: {
      number: 1,
      badge: 'SCENE 1 DARI 5 • PENGENALAN LINGKUNGAN',
      title: 'Kampung Laut Tempat Malin Tinggal',
      narration: 'Malin tinggal bersama ibunya di sebuah kampung dekat laut. Setiap hari mereka melihat perahu nelayan dan menikmati kehidupan di pantai.',
      image: 'assets/stories/malin/scene1.svg',
      literacy: ['Vocabulary development', 'Object-word connection', 'Environmental awareness', 'Listening comprehension'],
      objects: {
        perahu: {
          icon: '⛵',
          idName: 'PERAHU',
          syllable: 'PE - RA - HU',
          localName: 'Biduak / Parahu (Minang)',
          narrationId: 'Ini perahu. Nelayan menggunakan perahu untuk pergi ke laut.',
          narrationLocal: 'Iko biduak atau parahu. Nelayan manggunokan biduak untuak mancari lauak di lauik.'
        },
        laut: {
          icon: '🌊',
          idName: 'LAUT',
          syllable: 'LA - UT',
          localName: 'Lauik (Minang)',
          narrationId: 'Ini laut. Laut adalah tempat yang luas dan menjadi bagian penting dari kehidupan masyarakat pesisir.',
          narrationLocal: 'Iko lauik nan laweh. Lauik adolah bakeh hiduik urang pasisia nan sangaik barago.'
        },
        ikan: {
          icon: '🐟',
          idName: 'IKAN',
          syllable: 'I - KAN',
          localName: 'Ikan / Lauak (Minang)',
          narrationId: 'Ini ikan. Banyak nelayan menangkap ikan untuk memenuhi kebutuhan sehari-hari.',
          narrationLocal: 'Iko ikan atau lauak. Urang pamayang mancari lauak untuak makan jo dijua kasadonyo.'
        },
        rumah: {
          icon: '🏠',
          idName: 'RUMAH',
          syllable: 'RU - MAH',
          localName: 'Rumah (Minang)',
          narrationId: 'Ini rumah Malin. Di sinilah Malin tinggal bersama ibunya.',
          narrationLocal: 'Iko rumah Malin. Di sinilah Malin tingga basamo mandeh tacinto.'
        }
      }
    },
    2: {
      number: 2,
      badge: 'SCENE 2 DARI 5 • PENGAMBILAN KEPUTUSAN',
      title: 'Malin Ingin Melihat Dunia',
      narration: 'Malin ingin belajar dan melihat dunia yang lebih luas. Ibunya memberikan pesan agar Malin selalu mengingat rumahnya.',
      image: 'assets/stories/malin/scene2.svg',
      literacy: ['Prediction', 'Decision making', 'Comprehension', 'Reasoning sederhana'],
      question: 'Apa yang harus Malin bawa dalam perjalanan?',
      choices: [
        {
          key: 'A',
          label: 'A. Mainan saja',
          isOptimal: false,
          feedback: 'Mainan bisa menyenangkan, tetapi Malin juga membutuhkan sesuatu yang membantu perjalanan. Coba pilih lagi ya!'
        },
        {
          key: 'B',
          label: 'B. Bekal dan pesan ibu',
          isOptimal: true,
          feedback: 'Ya, hebat sekali! Malin membawa bekal hangat dan selalu mengingat doa tulus dari ibunya. Pilihan yang sangat bijak! ✨'
        },
        {
          key: 'C',
          label: 'C. Tidak membawa apa-apa',
          isOptimal: false,
          feedback: 'Perjalanan akan lebih mudah jika Malin membawa sesuatu yang dibutuhkan, seperti bekal dan nasihat ibu. Yuk coba lagi!'
        }
      ]
    },
    3: {
      number: 3,
      badge: 'SCENE 3 DARI 5 • EKSPLORASI & REFLEKSI',
      title: 'Malin Menjelajah Dunia',
      narration: 'Setelah lama pergi, Malin menjadi pedagang yang berhasil.',
      image: 'assets/stories/malin/scene3.svg',
      literacy: ['Observation', 'Perspective taking', 'Vocabulary', 'Emotional reflection'],
      objects: {
        kapal: {
          icon: '🚢',
          name: 'Kapal Besar',
          info: 'Kapal layar besar dan kokoh yang membawa Malin mengarungi samudra luas untuk berniaga antarpulau.'
        },
        pakaian: {
          icon: '👕',
          name: 'Pakaian Malin',
          info: 'Pakaian saudagar berselendang indah yang rapi dan megah, tanda ketekunan dan keberhasilan Malin bekerja keras.'
        },
        dagangan: {
          icon: '💰',
          name: 'Barang Dagangan',
          info: 'Peti-peti berisi rempah-rempah harum, kain tenun songket, dan aneka hasil bumi nusantara bernilai tinggi.'
        }
      },
      reflectiveQuestion: 'Menurutmu, apakah Malin masih ingat kampung halamannya?',
      reflectiveChoices: [
        {
          key: 'ingat',
          emoji: '😊',
          label: 'Ingat',
          feedback: 'Pikiran yang indah! Kenangan masa kecil bersama ibu tercinta dan hangatnya kampung pesisir tentu selalu ada di dalam hati Malin.'
        },
        {
          key: 'tidak_yakin',
          emoji: '😕',
          label: 'Tidak yakin',
          feedback: 'Pemikiran yang sangat wajar! Terkadang kehidupan baru yang serba sibuk membuat seseorang perlu waktu untuk merenung kembali.'
        },
        {
          key: 'ingin_tahu',
          emoji: '🤔',
          label: 'Ingin tahu',
          feedback: 'Rasa ingin tahu yang luar biasa! Mari kita lanjutkan cerita untuk melihat bagaimana isi hati Malin saat pulang ke kampung laut.'
        }
      ]
    },
    4: {
      number: 4,
      badge: 'SCENE 4 DARI 5 • EMPATI & KOMUNIKASI',
      title: 'Malin Bertemu Ibunya',
      narration: 'Ketika bertemu ibunya, Malin merasa malu karena hidupnya sudah berubah. Ia lupa bahwa ibunya selalu mendukungnya.',
      image: 'assets/stories/malin/scene4.svg',
      literacy: ['Social-emotional learning', 'Empathy', 'Conflict resolution', 'Family values'],
      question1: 'Bagaimana perasaan ibu Malin?',
      feelingsChoices: [
        {
          key: 'sedih',
          emoji: '❤️',
          label: 'Sedih',
          feedback: 'Mungkin ibu Malin merasa sedih karena sudah lama tidak bertemu Malin dan merindukan kehangatan pelukan anaknya.'
        },
        {
          key: 'senang',
          emoji: '😊',
          label: 'Senang',
          feedback: 'Ibu Malin mungkin merasa senang dan bersyukur karena akhirnya dapat melihat anak tersayangnya pulang dengan selamat.'
        },
        {
          key: 'marah',
          emoji: '😡',
          label: 'Marah',
          feedback: 'Ibu Malin mungkin merasa kecewa dan terluka karena Malin tampak ragu dan tidak langsung mengenali ibunya.'
        }
      ],
      question2: 'Apa yang bisa Malin lakukan?',
      actionChoices: [
        {
          key: 'A',
          label: 'A. Meminta maaf',
          feedback: 'Pilihan yang sangat bijak dan berani! Malin dapat meminta maaf dengan tulus, memeluk ibunya, dan berbicara dengan penuh kasih sayang. ❤️'
        },
        {
          key: 'B',
          label: 'B. Pergi lagi',
          feedback: 'Pergi mungkin membuat masalah belum selesai. Apa yang terjadi jika Malin mencoba memberanikan diri berbicara dengan ibunya?'
        },
        {
          key: 'C',
          label: 'C. Berpura-pura tidak melihat',
          feedback: 'Berpura-pura tidak melihat mungkin membuat hati ibu semakin sedih. Malin bisa mencoba berbicara jujur dengannya.'
        }
      ]
    },
    5: {
      number: 5,
      badge: 'SCENE 5 DARI 5 • CREATE SPACE & AKHIR CERITA',
      title: 'Bagaimana Akhir Cerita Malin?',
      narration: 'Bagaimana menurutmu akhir cerita Malin?',
      image: 'assets/stories/malin/scene5.svg',
      literacy: ['Creative expression', 'Oral language development', 'Critical thinking', 'Moral reasoning'],
      endings: [
        {
          id: 1,
          badge: 'ENDING 1',
          title: 'Malin meminta maaf dan kembali membantu ibunya.',
          narration: 'Malin menyadari bahwa ibunya selalu menyayanginya. Ia meminta maaf dengan tulus dan kembali membantu ibunya di kampung laut.'
        },
        {
          id: 2,
          badge: 'ENDING 2',
          title: 'Malin mengajak ibunya melihat dunia baru.',
          narration: 'Malin mengajak ibunya melihat dunia yang selama ini ia kenal dalam perjalanannya, berlayar bersama dengan bahagia.'
        },
        {
          id: 3,
          badge: 'ENDING 3',
          title: 'Malin belajar bahwa keluarga selalu penting.',
          narration: 'Malin memahami bahwa keberhasilan bukan hanya tentang memiliki banyak harta. Keluarga dan orang-orang yang menyayanginya adalah hal yang paling berharga.'
        }
      ]
    }
  };

  // Vocabulary Database
  const vocabDatabase = [
    {
      word: 'PERAHU',
      syllable: 'PE - RA - HU',
      icon: '⛵',
      desc: 'Kendaraan air dari kayu yang digunakan nelayan untuk berlayar dan mencari nafkah di laut.',
      local: 'Biduak / Parahu'
    },
    {
      word: 'LAUT',
      syllable: 'LA - UT',
      icon: '🌊',
      desc: 'Hamparan air asin yang luas, tempat hidup ikan dan menjadi sumber rezeki bagi masyarakat pesisir.',
      local: 'Lauik'
    },
    {
      word: 'IKAN',
      syllable: 'I - KAN',
      icon: '🐟',
      desc: 'Hewan berenang yang ditangkap nelayan untuk dimakan dan mencukupi kebutuhan gizi keluarga.',
      local: 'Ikan / Lauak'
    },
    {
      word: 'RUMAH',
      syllable: 'RU - MAH',
      icon: '🏠',
      desc: 'Tempat tinggal yang penuh kehangatan, kasih sayang, dan perlindungan bersama orang tua tercinta.',
      local: 'Rumah'
    },
    {
      word: 'BEKAL',
      syllable: 'BE - KAL',
      icon: '🍱',
      desc: 'Makanan dan doa yang disiapkan dengan penuh cinta oleh ibu untuk menjaga keselamatan anak dalam perjalanan.',
      local: 'Bekal / Samba'
    },
    {
      word: 'KELUARGA',
      syllable: 'KE - LU - AR - GA',
      icon: '👨‍👩‍👦',
      desc: 'Orang tua dan orang-orang tercinta yang selalu mendoakan, mendukung, dan menyayangi kita tanpa pamrih.',
      local: 'Kaluargo'
    },
    {
      word: 'PERJALANAN',
      syllable: 'PER - JA - LA - NAN',
      icon: '🧭',
      desc: 'Aktivitas bepergian ke tempat yang baru untuk belajar, menuntut ilmu, dan mencari pengalaman hidup.',
      local: 'Pajalanan'
    },
    {
      word: 'PEDAGANG',
      syllable: 'PE - DA - GANG',
      icon: '📦',
      desc: 'Seseorang yang tekun bekerja membawa barang berharga untuk dijual dan dibeli guna membantu sesama.',
      local: 'Padagang / Saudagar'
    }
  ];

  // Learning Values Database
  const learningValues = [
    {
      icon: '❤️',
      title: 'Menghargai Keluarga',
      desc: 'Kasih sayang dan doa orang tua adalah harta paling berharga yang selalu menjaga langkah hidup kita.'
    },
    {
      icon: '🌊',
      title: 'Mengenal Lingkungan Sekitar',
      desc: 'Memahami laut, pantai, dan kehidupan masyarakat pesisir menumbuhkan rasa syukur atas alam nusantara.'
    },
    {
      icon: '🧠',
      title: 'Berani Mengambil Keputusan',
      desc: 'Belajar memilih tindakan yang bijak, bertanggung jawab, dan memikirkan dampaknya bagi orang lain.'
    },
    {
      icon: '😊',
      title: 'Memahami Perasaan Orang Lain',
      desc: 'Melatih rasa empati terhadap ibu dan teman sekitar agar terjalin hubungan sosial yang harmonis.'
    },
    {
      icon: '🗣️',
      title: 'Berani Menyampaikan Pendapat',
      desc: 'Berani berbicara dengan santun, meminta maaf ketika khilaf, dan mengekspresikan gagasan secara positif.'
    },
    {
      icon: '📚',
      title: 'Mengenal Kosakata Baru',
      desc: 'Memperluas kecakapan bahasa dan literasi awal anak usia dini melalui cerita bergambar interaktif.'
    }
  ];

  // Final Reflection Questions
  const reflectionQuestions = [
    {
      key: 'keluarga',
      icon: '❤️',
      text: 'Keluarga itu penting',
      feedback: 'Hebat sekali! Keluarga adalah tempat kita pulang, saling mendukung, dan selalu menyayangi dalam keadaan apa pun.'
    },
    {
      key: 'lingkungan',
      icon: '🌊',
      text: 'Kita harus mengenal lingkungan kita',
      feedback: 'Bagus sekali! Menghargai dan menjaga alam laut serta kampung halaman membuat kita menjadi anak yang berkarakter luhur.'
    },
    {
      key: 'menghargai',
      icon: '🤝',
      text: 'Kita harus menghargai orang lain',
      feedback: 'Pilihan yang sangat indah! Menghormati orang lain dan tidak memandang rendah siapa pun adalah kunci kebahagiaan sejati.'
    },
    {
      key: 'berbicara',
      icon: '🗣️',
      text: 'Kita harus berani berbicara & meminta maaf',
      feedback: 'Luar biasa! Berani meminta maaf dan berbicara jujur adalah tanda anak yang kuat, bijak, dan berhati mulia.'
    }
  ];

  // Quick suggestion chips for Create Space voice recorder fallback
  const quickVoiceChips = [
    'Meminta maaf dengan tulus kepada ibu',
    'Memeluk ibu tercinta erat-erat',
    'Mengajak ibu makan bekal bersama',
    'Membantu ibu merawat rumah di kampung',
    'Membawa ibu berlayar melihat pulau indah'
  ];

  // ==========================================================================
  // AUDIO & SPEECH SYNTHESIS HELPER
  // ==========================================================================
  function stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
      updateAudioBtnUi();
    }
  }

  function speak(text, lang = 'id-ID') {
    if (!audioEnabled || !text) return;
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.88; // friendly, slow & clear for early childhood
    utterance.pitch = 1.05; // warm, gentle tone

    // Try finding Indonesian voice if available
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find(v => v.lang.startsWith('id') || v.lang.includes('ID'));
    if (idVoice) utterance.voice = idVoice;

    utterance.onstart = () => {
      isSpeaking = true;
      updateAudioBtnUi();
    };

    utterance.onend = () => {
      isSpeaking = false;
      updateAudioBtnUi();
    };

    utterance.onerror = () => {
      isSpeaking = false;
      updateAudioBtnUi();
    };

    window.speechSynthesis.speak(utterance);
  }

  function updateAudioBtnUi() {
    const btn = document.getElementById('malin-audio-toggle-btn');
    if (btn) {
      if (!audioEnabled) {
        btn.innerHTML = '<i class="fas fa-volume-xmark"></i> <span>Suara: Mati</span>';
        btn.classList.remove('audio-active');
      } else if (isSpeaking) {
        btn.innerHTML = '<i class="fas fa-volume-high fa-beat"></i> <span>Membaca...</span>';
        btn.classList.add('audio-active');
      } else {
        btn.innerHTML = '<i class="fas fa-volume-high"></i> <span>Suara: Hidup</span>';
        btn.classList.add('audio-active');
      }
    }
  }

  function toggleAudio() {
    audioEnabled = !audioEnabled;
    if (!audioEnabled) {
      stopSpeech();
    } else {
      speakSceneNarration();
    }
    updateAudioBtnUi();
  }

  function speakSceneNarration() {
    const s = sceneData[currentScene];
    if (!s) return;

    if (currentScene === 1) {
      const obj = s.objects[scene1SelectedObj] || s.objects.perahu;
      const text = scene1Lang === 'local' ? obj.narrationLocal : `${s.narration} ${obj.narrationId}`;
      speak(text);
    } else if (currentScene === 2) {
      speak(`${s.title}. ${s.narration}. ${s.question}`);
    } else if (currentScene === 3) {
      const obj = s.objects[scene3SelectedObj] || s.objects.kapal;
      speak(`${s.title}. ${s.narration}. ${obj.name}: ${obj.info}`);
    } else if (currentScene === 4) {
      speak(`${s.title}. ${s.narration}. Pertanyaan: ${s.question1}`);
    } else if (currentScene === 5) {
      const ending = s.endings.find(e => e.id === scene5SelectedEnding) || s.endings[0];
      speak(`${s.title}. ${ending.title}. ${ending.narration}`);
    }
  }

  // ==========================================================================
  // RENDER MAIN INTERACTIVE STORY VIEW
  // ==========================================================================
  function render(book) {
    currentBook = book;
    stopSpeech();

    // Auto-narrate initial scene if enabled
    setTimeout(() => {
      if (audioEnabled) {
        speakSceneNarration();
      }
    }, 400);

    return `
      <div class="malin-reader-root" id="malin-story-root">
        <!-- TOPBAR -->
        <header class="malin-topbar">
          <a href="#/books/${book.id}" class="malin-back-btn" onclick="MalinInteractiveStory.cleanup()">
            <i class="fas fa-arrow-left"></i> <span>Kembali</span>
          </a>

          <div class="malin-header-center">
            <span class="malin-story-badge">
              <i class="fas fa-sparkles"></i> DIGITAL STORYTELLING PGPAUD
            </span>
            <h1 class="malin-header-title">Malin dan Perjalanan dari Kampung Laut</h1>
          </div>

          <div class="malin-topbar-actions">
            <!-- Audio Narrator Toggle -->
            <button class="malin-action-pill ${audioEnabled ? 'audio-active' : ''}" id="malin-audio-toggle-btn" onclick="MalinInteractiveStory.toggleAudio()" title="Aktifkan/Matikan Narasi Suara">
              <i class="fas fa-volume-high"></i> <span>Suara: Hidup</span>
            </button>

            <!-- Vocabulary Button -->
            <button class="malin-action-pill vocab-btn" onclick="MalinInteractiveStory.openVocabModal()" title="Buka Kosakata Baru">
              <i class="fas fa-book-bookmark"></i> <span>Kata Baru (8)</span>
            </button>

            <!-- Learning Values Summary -->
            <button class="malin-action-pill" onclick="MalinInteractiveStory.openValuesModal()" title="Nilai Pembelajaran PAUD">
              <i class="fas fa-heart"></i> <span>Nilai Cerita</span>
            </button>
          </div>
        </header>

        <!-- PROGRESS BAR & SCENE DOTS -->
        <div class="malin-progress-strip">
          <span class="malin-scene-label">Progres Cerita:</span>
          <div class="malin-scene-dots">
            ${[1, 2, 3, 4, 5].map(n => `
              <button class="malin-scene-dot ${n === currentScene ? 'active' : ''} ${n < currentScene ? 'completed' : ''}" onclick="MalinInteractiveStory.goToScene(${n})" title="Buka Scene ${n}">
                ${n < currentScene ? '<i class="fas fa-check"></i>' : n}
              </button>
            `).join('')}
          </div>
          <span class="malin-scene-label" style="color: var(--color-primary, #1687F8);">Scene ${currentScene} dari 5</span>
        </div>

        <!-- MAIN SCENE CANVAS -->
        <main class="malin-stage-container">
          ${renderCurrentScene()}
        </main>

        <!-- MODALS -->
        ${showVocabModal ? renderVocabModal() : ''}
        ${showValuesModal ? renderValuesModal() : ''}
        ${showReflectionModal ? renderReflectionModal() : ''}
      </div>
    `;
  }

  function updateView() {
    const root = document.getElementById('app-root');
    if (root) {
      root.innerHTML = render(currentBook);
    }
  }

  // ==========================================================================
  // SCENE RENDERERS (1 to 5)
  // ==========================================================================
  function renderCurrentScene() {
    switch (currentScene) {
      case 1: return renderScene1();
      case 2: return renderScene2();
      case 3: return renderScene3();
      case 4: return renderScene4();
      case 5: return renderScene5();
      default: return renderScene1();
    }
  }

  // --- SCENE 1: MENGENAL TEMPAT DAN KARAKTER ---
  function renderScene1() {
    const s = sceneData[1];
    const currentObj = s.objects[scene1SelectedObj] || s.objects.perahu;
    const isLocal = scene1Lang === 'local';

    return `
      <div class="malin-scene-card">
        <!-- LEFT: Art Side with Clickable Hotspots -->
        <div class="malin-art-column">
          <div class="malin-art-wrapper">
            <img src="${s.image}" alt="${s.title}" class="malin-art-image">
          </div>

          <!-- Interactive Hotspot Buttons directly linked to objects -->
          <div class="malin-hotspots-row">
            <button class="malin-hotspot-pill ${scene1SelectedObj === 'perahu' ? 'active' : ''}" onclick="MalinInteractiveStory.selectScene1Object('perahu')">
              <span>⛵ Perahu</span>
            </button>
            <button class="malin-hotspot-pill ${scene1SelectedObj === 'laut' ? 'active' : ''}" onclick="MalinInteractiveStory.selectScene1Object('laut')">
              <span>🌊 Laut</span>
            </button>
            <button class="malin-hotspot-pill ${scene1SelectedObj === 'ikan' ? 'active' : ''}" onclick="MalinInteractiveStory.selectScene1Object('ikan')">
              <span>🐟 Ikan</span>
            </button>
            <button class="malin-hotspot-pill ${scene1SelectedObj === 'rumah' ? 'active' : ''}" onclick="MalinInteractiveStory.selectScene1Object('rumah')">
              <span>🏠 Rumah Malin</span>
            </button>
          </div>
        </div>

        <!-- RIGHT: Content & Interaction Column -->
        <div class="malin-content-column">
          <div class="malin-content-top">
            <div class="malin-scene-header-strip">
              <span class="malin-scene-tag"><i class="fas fa-compass"></i> ${s.badge}</span>
              <button class="malin-listen-btn" onclick="MalinInteractiveStory.speakCurrentScene()" title="Dengarkan Narasi">
                <i class="fas fa-volume-high"></i> <span>Dengarkan</span>
              </button>
            </div>

            <h2 class="malin-scene-heading">${s.title}</h2>

            <!-- Story Narration -->
            <div class="malin-story-text-box">
              <p class="malin-narration-p">${s.narration}</p>
            </div>

            <!-- Early Literacy Focus Tags -->
            <div class="malin-literacy-strip">
              <span style="font-size: 0.75rem; font-weight: 800; color: #64748B;">STIMULASI LITERASI:</span>
              ${s.literacy.map(l => `<span class="malin-lit-pill">★ ${l}</span>`).join('')}
            </div>

            <!-- SELECTED OBJECT VOCABULARY DETAIL CARD -->
            <div class="malin-obj-detail-card">
              <div class="malin-vocab-hero-word">
                <span>${currentObj.icon} ${isLocal ? currentObj.localName.split(' ')[0] : currentObj.idName}</span>
                <span class="malin-syllable-badge">${currentObj.syllable}</span>
              </div>

              <p class="malin-obj-explanation">
                ${isLocal ? currentObj.narrationLocal : currentObj.narrationId}
              </p>

              <!-- Language & Speech Bar -->
              <div class="malin-lang-toggle-bar">
                <button class="malin-action-pill" onclick="MalinInteractiveStory.pronounceWord('${currentObj.idName}')">
                  <i class="fas fa-volume-high" style="color: #D97706;"></i> <span>Ucapkan Kata</span>
                </button>

                <div style="display: flex; gap: 6px; align-items: center; margin-left: auto;">
                  <button class="malin-lang-btn ${!isLocal ? 'active' : ''}" onclick="MalinInteractiveStory.setScene1Lang('id')">
                    🇮🇩 Bahasa Indonesia
                  </button>
                  <button class="malin-lang-btn ${isLocal ? 'active' : ''}" onclick="MalinInteractiveStory.setScene1Lang('local')">
                    🌊 Bahasa Minang
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Navigation -->
          <div class="malin-bottom-nav">
            <span style="color: #64748B; font-size: 0.9rem; font-weight: 700;">Sentuh objek untuk belajar kosakata baru!</span>
            <button class="malin-nav-btn btn-next" onclick="MalinInteractiveStory.nextScene()">
              <span>Lanjut ke Scene 2</span> <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // --- SCENE 2: PERJALANAN MALIN ---
  function renderScene2() {
    const s = sceneData[2];
    const chosen = s.choices.find(c => c.key === scene2Choice);

    return `
      <div class="malin-scene-card">
        <!-- LEFT: Art Side -->
        <div class="malin-art-column">
          <div class="malin-art-wrapper">
            <img src="${s.image}" alt="${s.title}" class="malin-art-image">
          </div>
          <div class="malin-hotspots-row">
            <span class="malin-hotspot-pill">🎒 Tas Perjalanan</span>
            <span class="malin-hotspot-pill" style="border-color: #F59E0B; background: #FEF3C7; color: #92400E;">🍱 Bekal &amp; Pesan Ibu</span>
            <span class="malin-hotspot-pill">📜 Surat Doa</span>
            <span class="malin-hotspot-pill">⛵ Kapal Layar</span>
          </div>
        </div>

        <!-- RIGHT: Content & Interactive Decision Making -->
        <div class="malin-content-column">
          <div class="malin-content-top">
            <div class="malin-scene-header-strip">
              <span class="malin-scene-tag"><i class="fas fa-lightbulb"></i> ${s.badge}</span>
              <button class="malin-listen-btn" onclick="MalinInteractiveStory.speakCurrentScene()" title="Dengarkan Pertanyaan">
                <i class="fas fa-volume-high"></i> <span>Dengarkan</span>
              </button>
            </div>

            <h2 class="malin-scene-heading">${s.title}</h2>

            <div class="malin-story-text-box">
              <p class="malin-narration-p">${s.narration}</p>
            </div>

            <div class="malin-literacy-strip">
              <span style="font-size: 0.75rem; font-weight: 800; color: #64748B;">STIMULASI LITERASI:</span>
              ${s.literacy.map(l => `<span class="malin-lit-pill">★ ${l}</span>`).join('')}
            </div>

            <!-- INTERACTIVE QUESTION BOX -->
            <div class="malin-question-card">
              <div class="malin-question-title">
                <span>🤔</span> <span>${s.question}</span>
              </div>

              <div class="malin-choices-grid">
                ${s.choices.map(c => `
                  <button class="malin-choice-btn ${scene2Choice === c.key ? 'selected' : ''}" onclick="MalinInteractiveStory.chooseScene2('${c.key}')">
                    <span class="malin-choice-letter">${c.key}</span>
                    <span>${c.label.substring(3)}</span>
                  </button>
                `).join('')}
              </div>

              <!-- Positive Constructive Feedback Box -->
              ${chosen ? `
                <div class="malin-feedback-box" style="${chosen.isOptimal ? 'border-color: #10B981; background: #ECFDF5;' : 'border-color: #F59E0B; background: #FFFBEB;'}">
                  <p class="malin-feedback-text" style="${chosen.isOptimal ? 'color: #065F46;' : 'color: #92400E;'}">
                    ${chosen.feedback}
                  </p>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Bottom Navigation -->
          <div class="malin-bottom-nav">
            <button class="malin-nav-btn btn-prev" onclick="MalinInteractiveStory.prevScene()">
              <i class="fas fa-arrow-left"></i> <span>Scene 1</span>
            </button>
            <button class="malin-nav-btn btn-next" onclick="MalinInteractiveStory.nextScene()">
              <span>Lanjut ke Scene 3</span> <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // --- SCENE 3: MALIN MENJADI ORANG SUKSES ---
  function renderScene3() {
    const s = sceneData[3];
    const currentObj = s.objects[scene3SelectedObj] || s.objects.kapal;
    const currentRefl = s.reflectiveChoices.find(r => r.key === scene3Reflection);

    return `
      <div class="malin-scene-card">
        <!-- LEFT: Art Side -->
        <div class="malin-art-column">
          <div class="malin-art-wrapper">
            <img src="${s.image}" alt="${s.title}" class="malin-art-image">
          </div>
          <div class="malin-hotspots-row">
            <button class="malin-hotspot-pill ${scene3SelectedObj === 'kapal' ? 'active' : ''}" onclick="MalinInteractiveStory.selectScene3Object('kapal')">
              <span>🚢 Kapal Besar</span>
            </button>
            <button class="malin-hotspot-pill ${scene3SelectedObj === 'pakaian' ? 'active' : ''}" onclick="MalinInteractiveStory.selectScene3Object('pakaian')">
              <span>👕 Pakaian Malin</span>
            </button>
            <button class="malin-hotspot-pill ${scene3SelectedObj === 'dagangan' ? 'active' : ''}" onclick="MalinInteractiveStory.selectScene3Object('dagangan')">
              <span>💰 Barang Dagangan</span>
            </button>
          </div>
        </div>

        <!-- RIGHT: Exploration & Reflective Question -->
        <div class="malin-content-column">
          <div class="malin-content-top">
            <div class="malin-scene-header-strip">
              <span class="malin-scene-tag"><i class="fas fa-gem"></i> ${s.badge}</span>
              <button class="malin-listen-btn" onclick="MalinInteractiveStory.speakCurrentScene()" title="Dengarkan Cerita">
                <i class="fas fa-volume-high"></i> <span>Dengarkan</span>
              </button>
            </div>

            <h2 class="malin-scene-heading">${s.title}</h2>

            <div class="malin-story-text-box">
              <p class="malin-narration-p">${s.narration}</p>
            </div>

            <!-- Exploration Fact Box -->
            <div class="malin-obj-detail-card" style="background: #EFF6FF; border-color: #93C5FD; border-style: solid;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <h4 style="margin: 0; color: #1E40AF; font-size: 1.15rem; font-weight: 800;">
                  ${currentObj.icon} ${currentObj.name}
                </h4>
                <button class="malin-action-pill" style="padding: 4px 12px; font-size: 0.8rem;" onclick="MalinInteractiveStory.speak('${currentObj.name}. ${currentObj.info}')">
                  <i class="fas fa-volume-high"></i> <span>Dengar</span>
                </button>
              </div>
              <p style="margin: 0; color: #1E3A8A; font-size: 1rem; line-height: 1.6; font-weight: 500;">
                ${currentObj.info}
              </p>
            </div>

            <!-- REFLECTIVE QUESTION (NO RIGHT/WRONG) -->
            <div class="malin-question-card" style="background: #FFFBEB; border-color: #FDE68A;">
              <div class="malin-question-title" style="color: #92400E;">
                <span>💭</span> <span>${s.reflectiveQuestion}</span>
              </div>

              <div class="malin-expr-row">
                ${s.reflectiveChoices.map(r => `
                  <button class="malin-expr-btn ${scene3Reflection === r.key ? 'selected' : ''}" onclick="MalinInteractiveStory.chooseScene3Reflection('${r.key}')">
                    <span class="malin-expr-emoji">${r.emoji}</span>
                    <span class="malin-expr-label">${r.label}</span>
                  </button>
                `).join('')}
              </div>

              ${currentRefl ? `
                <div class="malin-feedback-box" style="background: #FFFFFF; border-color: #F59E0B; margin-top: 14px;">
                  <p class="malin-feedback-text" style="color: #92400E;">
                    ${currentRefl.feedback}
                  </p>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Bottom Navigation -->
          <div class="malin-bottom-nav">
            <button class="malin-nav-btn btn-prev" onclick="MalinInteractiveStory.prevScene()">
              <i class="fas fa-arrow-left"></i> <span>Scene 2</span>
            </button>
            <button class="malin-nav-btn btn-next" onclick="MalinInteractiveStory.nextScene()">
              <span>Lanjut ke Scene 4</span> <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // --- SCENE 4: PERTEMUAN DENGAN IBU (SOCIAL-EMOTIONAL CONFLICT) ---
  function renderScene4() {
    const s = sceneData[4];
    const currentFeeling = s.feelingsChoices.find(f => f.key === scene4FeelingsChoice);
    const currentAction = s.actionChoices.find(a => a.key === scene4ActionChoice);

    return `
      <div class="malin-scene-card">
        <!-- LEFT: Art Side -->
        <div class="malin-art-column">
          <div class="malin-art-wrapper">
            <img src="${s.image}" alt="${s.title}" class="malin-art-image">
          </div>
          <div class="malin-hotspots-row">
            <span class="malin-hotspot-pill" style="border-color: #EF4444; background: #FEE2E2; color: #991B1B;">❤️ Kasih Sayang Ibu</span>
            <span class="malin-hotspot-pill" style="border-color: #10B981; background: #ECFDF5; color: #065F46;">🧠 Perasaan Malin</span>
            <span class="malin-hotspot-pill">🧺 Keranjang Bekal Kenangan</span>
          </div>
        </div>

        <!-- RIGHT: Social Emotional Learning & Questions -->
        <div class="malin-content-column">
          <div class="malin-content-top">
            <div class="malin-scene-header-strip">
              <span class="malin-scene-tag" style="background: #FEE2E2; color: #B91C1C;"><i class="fas fa-heart-pulse"></i> ${s.badge}</span>
              <button class="malin-listen-btn" onclick="MalinInteractiveStory.speakCurrentScene()" title="Dengarkan Cerita">
                <i class="fas fa-volume-high"></i> <span>Dengarkan</span>
              </button>
            </div>

            <h2 class="malin-scene-heading">${s.title}</h2>

            <div class="malin-story-text-box" style="border-left-color: #EF4444;">
              <p class="malin-narration-p">${s.narration}</p>
            </div>

            <div class="malin-literacy-strip">
              <span style="font-size: 0.75rem; font-weight: 800; color: #64748B;">NILAI EMOSIONAL:</span>
              <span class="malin-lit-pill" style="background: #ECFDF5; color: #065F46;">✓ Ramah Anak &amp; Bebas Hukuman Seram</span>
              <span class="malin-lit-pill">★ Empati</span>
              <span class="malin-lit-pill">★ Refleksi Diri</span>
            </div>

            <!-- QUESTION 1: PERASAAN IBU -->
            <div class="malin-question-card" style="background: #FFF1F2; border-color: #FECDD3; margin-bottom: 20px;">
              <div class="malin-question-title" style="color: #9F1239;">
                <span>❤️</span> <span>${s.question1}</span>
              </div>

              <div class="malin-expr-row">
                ${s.feelingsChoices.map(f => `
                  <button class="malin-expr-btn ${scene4FeelingsChoice === f.key ? 'selected' : ''}" onclick="MalinInteractiveStory.chooseScene4Feeling('${f.key}')">
                    <span class="malin-expr-emoji">${f.emoji}</span>
                    <span class="malin-expr-label">${f.label}</span>
                  </button>
                `).join('')}
              </div>

              ${currentFeeling ? `
                <div class="malin-feedback-box" style="background: #FFFFFF; border-color: #F43F5E; margin-top: 12px;">
                  <p class="malin-feedback-text" style="color: #881337;">
                    ${currentFeeling.feedback}
                  </p>
                </div>
              ` : ''}
            </div>

            <!-- QUESTION 2: TINDAKAN MALIN -->
            <div class="malin-question-card" style="background: #F0FDF4; border-color: #BBF7D0;">
              <div class="malin-question-title" style="color: #14532D;">
                <span>💡</span> <span>${s.question2}</span>
              </div>

              <div class="malin-choices-grid">
                ${s.actionChoices.map(a => `
                  <button class="malin-choice-btn ${scene4ActionChoice === a.key ? 'selected' : ''}" onclick="MalinInteractiveStory.chooseScene4Action('${a.key}')">
                    <span class="malin-choice-letter">${a.key}</span>
                    <span>${a.label.substring(3)}</span>
                  </button>
                `).join('')}
              </div>

              ${currentAction ? `
                <div class="malin-feedback-box" style="background: #FFFFFF; border-color: #10B981; margin-top: 12px;">
                  <p class="malin-feedback-text" style="color: #065F46;">
                    ${currentAction.feedback}
                  </p>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Bottom Navigation -->
          <div class="malin-bottom-nav">
            <button class="malin-nav-btn btn-prev" onclick="MalinInteractiveStory.prevScene()">
              <i class="fas fa-arrow-left"></i> <span>Scene 3</span>
            </button>
            <button class="malin-nav-btn btn-next" onclick="MalinInteractiveStory.nextScene()">
              <span>Lanjut ke Scene 5 (Ending &amp; Rekaman)</span> <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // --- SCENE 5: CREATE SPACE & ENDING SELECTION ---
  function renderScene5() {
    const s = sceneData[5];
    const currentEnding = s.endings.find(e => e.id === scene5SelectedEnding) || s.endings[0];

    return `
      <div class="malin-scene-card">
        <!-- LEFT: Art Side -->
        <div class="malin-art-column">
          <div class="malin-art-wrapper">
            <img src="${s.image}" alt="${s.title}" class="malin-art-image">
          </div>
          <div class="malin-hotspots-row">
            <span class="malin-hotspot-pill" style="background: #FEF3C7; border-color: #F59E0B; color: #92400E;">✨ Ending Pilihanmu</span>
            <span class="malin-hotspot-pill" style="background: #ECFDF5; border-color: #10B981; color: #065F46;">🎤 Ruang Bersuara Anak</span>
          </div>
        </div>

        <!-- RIGHT: Ending Selection & Create Space Voice Recorder -->
        <div class="malin-content-column">
          <div class="malin-content-top">
            <div class="malin-scene-header-strip">
              <span class="malin-scene-tag" style="background: #FEF3C7; color: #B45309;"><i class="fas fa-wand-magic-sparkles"></i> ${s.badge}</span>
              <button class="malin-listen-btn" onclick="MalinInteractiveStory.speakCurrentScene()" title="Dengarkan Ending">
                <i class="fas fa-volume-high"></i> <span>Dengarkan</span>
              </button>
            </div>

            <h2 class="malin-scene-heading">${s.title}</h2>

            <p style="font-size: 1.05rem; font-weight: 700; color: #475569; margin-bottom: 14px;">
              Pilihlah akhir cerita yang menurutmu paling menyenangkan:
            </p>

            <!-- 3 ENDING CARDS -->
            <div class="malin-ending-cards">
              ${s.endings.map(e => `
                <div class="malin-ending-card ${scene5SelectedEnding === e.id ? 'selected' : ''}" onclick="MalinInteractiveStory.selectEnding(${e.id})">
                  <div class="malin-ending-title">
                    <span style="font-size: 0.8rem; font-weight: 900; background: ${scene5SelectedEnding === e.id ? '#10B981' : '#E2E8F0'}; color: ${scene5SelectedEnding === e.id ? '#FFF' : '#475569'}; padding: 3px 8px; border-radius: 6px;">${e.badge}</span>
                    <span>${e.title}</span>
                  </div>
                  <p class="malin-ending-desc">${e.narration}</p>
                </div>
              `).join('')}
            </div>

            <!-- FITUR CREATE SPACE: REKAM SUARA ANAK -->
            <div class="malin-createspace-box">
              <div class="malin-createspace-title">
                <i class="fas fa-microphone" style="color: #EA580C;"></i>
                <span>Menurut saya, Malin harus...</span>
              </div>

              <p style="font-size: 0.95rem; color: #78350F; margin-bottom: 14px; font-weight: 600;">
                Ayo ceritakan pendapatmu sendiri! Kamu bisa merekam suara atau memilih kata indah di bawah ini:
              </p>

              <!-- Audio Recording Controls Bar -->
              <div class="malin-recorder-strip">
                ${!isRecording ? `
                  <button class="malin-record-btn btn-rec" onclick="MalinInteractiveStory.startRecording()" title="Mulai Rekam Suara">
                    <i class="fas fa-circle"></i> <span>Rekam Suara</span>
                  </button>
                ` : `
                  <button class="malin-record-btn btn-rec recording" onclick="MalinInteractiveStory.stopRecording()" title="Berhenti Merekam">
                    <i class="fas fa-stop"></i> <span>Selesai Merekam</span>
                  </button>
                `}

                ${isRecording ? `
                  <div class="malin-rec-timer">${formatTime(recordSeconds)}</div>
                  <span class="malin-rec-status"><i class="fas fa-waveform-lines fa-fade"></i> Sedang mendengarkan suaramu...</span>
                ` : ''}

                ${recordedAudioUrl && !isRecording ? `
                  <button class="malin-record-btn btn-play" onclick="MalinInteractiveStory.playRecording()" title="Putar Rekaman">
                    <i class="fas ${isPlayingRecordedAudio ? 'fa-pause' : 'fa-play'}"></i> <span>${isPlayingRecordedAudio ? 'Jeda' : 'Putar Suaraku'}</span>
                  </button>
                  <button class="malin-record-btn btn-reset" onclick="MalinInteractiveStory.resetRecording()" title="Rekam Ulang">
                    <i class="fas fa-rotate-left"></i> <span>Rekam Ulang</span>
                  </button>
                ` : ''}
              </div>

              <!-- Quick Phrase Suggestions Chips -->
              <div style="margin-top: 10px;">
                <span style="font-size: 0.78rem; font-weight: 800; color: #92400E; text-transform: uppercase;">Pilihan Pendapat Cepat:</span>
                <div class="malin-suggestion-chips">
                  ${quickVoiceChips.map(chip => `
                    <button class="malin-chip" onclick="MalinInteractiveStory.selectSuggestionChip('${chip.replace(/'/g, "\\'")}')">
                      ★ ${chip}
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- Text Area / Voice Output Display -->
              <div style="margin-top: 14px;">
                <input type="text" id="malin-voice-text-input" class="search-input" style="background: #FFFFFF; font-weight: 700; color: #0B2447;" placeholder="Ketik atau pilih pendapatmu di sini..." value="${scene5VoiceText || ''}" oninput="MalinInteractiveStory.setVoiceText(this.value)">
              </div>
            </div>
          </div>

          <!-- Bottom Navigation & Finish CTA -->
          <div class="malin-bottom-nav">
            <button class="malin-nav-btn btn-prev" onclick="MalinInteractiveStory.prevScene()">
              <i class="fas fa-arrow-left"></i> <span>Scene 4</span>
            </button>
            <button class="malin-nav-btn btn-finish" onclick="MalinInteractiveStory.openReflectionModal()">
              <i class="fas fa-sparkles"></i> <span>Refleksi &amp; Apa yang Kita Pelajari?</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // MODALS: VOCABULARY, VALUES, & REFLECTION
  // ==========================================================================

  // 1. “Kata Baru Hari Ini” (Vocabulary Builder)
  function renderVocabModal() {
    return `
      <div class="malin-modal-backdrop" onclick="MalinInteractiveStory.closeModals(event)">
        <div class="malin-modal-card" onclick="event.stopPropagation()">
          <button class="malin-modal-close" onclick="MalinInteractiveStory.closeModals()">
            <i class="fas fa-times"></i>
          </button>

          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 6px;">
            <div style="width: 44px; height: 44px; border-radius: 14px; background: #FEF3C7; color: #D97706; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">
              📚
            </div>
            <div>
              <h2 style="font-family: var(--font-heading); font-size: 1.6rem; color: #0B2447; margin: 0;">Kata Baru Hari Ini</h2>
              <p style="color: #64748B; font-size: 0.95rem; margin: 2px 0 0;">Klik kata untuk mendengarkan pengucapan dan maknanya!</p>
            </div>
          </div>

          <div class="malin-vocab-grid">
            ${vocabDatabase.map(v => `
              <div class="malin-vocab-item-card" onclick="MalinInteractiveStory.pronounceWord('${v.word}')">
                <div class="malin-vocab-card-header">
                  <span class="malin-vocab-icon">${v.icon}</span>
                  <button class="malin-action-pill" style="padding: 4px 10px; font-size: 0.75rem;">
                    <i class="fas fa-volume-high" style="color: #1687F8;"></i> <span>Dengar</span>
                  </button>
                </div>
                <div class="malin-vocab-card-title">${v.word}</div>
                <div class="malin-vocab-card-syllable">${v.syllable} • Minang: ${v.local}</div>
                <p class="malin-vocab-card-meaning">${v.desc}</p>
              </div>
            `).join('')}
          </div>

          <div style="margin-top: 24px; text-align: center;">
            <button class="btn btn-primary" onclick="MalinInteractiveStory.closeModals()">
              Tutup &amp; Lanjutkan Cerita
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // 2. “Apa yang Kita Pelajari?” (Learning Values)
  function renderValuesModal() {
    return `
      <div class="malin-modal-backdrop" onclick="MalinInteractiveStory.closeModals(event)">
        <div class="malin-modal-card" onclick="event.stopPropagation()">
          <button class="malin-modal-close" onclick="MalinInteractiveStory.closeModals()">
            <i class="fas fa-times"></i>
          </button>

          <div style="text-align: center; margin-bottom: 24px;">
            <span class="malin-story-badge" style="background: #EFF6FF; color: #1D4ED8;">
              DIMENSI PERKEMBANGAN PAUD
            </span>
            <h2 style="font-family: var(--font-heading); font-size: 2rem; color: #0B2447; margin: 8px 0;">Apa yang Kita Pelajari?</h2>
            <p style="color: #64748B; font-size: 1.05rem; max-width: 600px; margin: 0 auto;">
              Melalui perjalanan Malin dari kampung laut, anak belajar mengenal nilai-nilai mulia budi pekerti:
            </p>
          </div>

          <div class="malin-values-grid">
            ${learningValues.map(lv => `
              <div class="malin-value-card">
                <div class="malin-value-icon">${lv.icon}</div>
                <h4 class="malin-value-title">${lv.title}</h4>
                <p class="malin-value-desc">${lv.desc}</p>
              </div>
            `).join('')}
          </div>

          <div style="margin-top: 28px; text-align: center;">
            <button class="btn btn-primary" onclick="MalinInteractiveStory.openReflectionModal()">
              <i class="fas fa-comments"></i> <span>Ayo Refleksi Bersama</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // 3. Refleksi Anak
  function renderReflectionModal() {
    const chosen = reflectionQuestions.find(q => q.key === finalReflectionChoice);

    return `
      <div class="malin-modal-backdrop" onclick="MalinInteractiveStory.closeModals(event)">
        <div class="malin-modal-card" style="max-width: 680px;" onclick="event.stopPropagation()">
          <button class="malin-modal-close" onclick="MalinInteractiveStory.closeModals()">
            <i class="fas fa-times"></i>
          </button>

          <div style="text-align: center; margin-bottom: 24px;">
            <span class="malin-story-badge" style="background: #ECFDF5; color: #065F46;">
              REFLEKSI &amp; DISKUSI CERIA
            </span>
            <h2 style="font-family: var(--font-heading); font-size: 1.85rem; color: #0B2447; margin: 8px 0;">Apa yang kamu pelajari dari cerita Malin?</h2>
            <p style="color: #64748B; font-size: 1rem;">Pilihlah hal baik yang paling berkesan di hatimu:</p>
          </div>

          <div class="malin-choices-grid" style="gap: 12px;">
            ${reflectionQuestions.map(q => `
              <button class="malin-choice-btn ${finalReflectionChoice === q.key ? 'selected' : ''}" style="padding: 16px 20px; font-size: 1.05rem;" onclick="MalinInteractiveStory.chooseReflection('${q.key}')">
                <span style="font-size: 1.5rem;">${q.icon}</span>
                <span>${q.text}</span>
              </button>
            `).join('')}
          </div>

          ${chosen ? `
            <div class="malin-feedback-box" style="margin-top: 20px; background: #F0FDF4; border-color: #10B981; padding: 20px;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
                <span style="font-size: 1.6rem;">🎉</span>
                <strong style="color: #065F46; font-size: 1.1rem;">Apresiasi Hebat!</strong>
              </div>
              <p class="malin-feedback-text" style="color: #14532D; font-size: 1.02rem;">
                ${chosen.feedback}
              </p>
            </div>
          ` : ''}

          <div style="margin-top: 32px; display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <button class="btn btn-secondary" onclick="MalinInteractiveStory.openValuesModal()">
              <i class="fas fa-heart"></i> Lihat Semua Nilai
            </button>
            <button class="btn btn-primary" onclick="MalinInteractiveStory.goToScene(1); MalinInteractiveStory.closeModals();">
              <i class="fas fa-rotate-left"></i> Baca Lagi Dari Awal
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // ACTION HANDLERS
  // ==========================================================================
  function goToScene(n) {
    if (n >= 1 && n <= 5) {
      currentScene = n;
      stopSpeech();
      updateView();
      if (audioEnabled) {
        setTimeout(speakSceneNarration, 250);
      }
      window.scrollTo(0, 0);
    }
  }

  function nextScene() {
    if (currentScene < 5) {
      goToScene(currentScene + 1);
    } else {
      openReflectionModal();
    }
  }

  function prevScene() {
    if (currentScene > 1) {
      goToScene(currentScene - 1);
    }
  }

  // Scene 1 Handlers
  function selectScene1Object(objKey) {
    scene1SelectedObj = objKey;
    const obj = sceneData[1].objects[objKey];
    if (obj) {
      updateView();
      if (audioEnabled) {
        const text = scene1Lang === 'local' ? obj.narrationLocal : obj.narrationId;
        speak(text);
      }
    }
  }

  function setScene1Lang(lang) {
    scene1Lang = lang;
    updateView();
    if (audioEnabled) {
      const obj = sceneData[1].objects[scene1SelectedObj];
      if (obj) {
        speak(lang === 'local' ? obj.narrationLocal : obj.narrationId);
      }
    }
  }

  function pronounceWord(word) {
    speak(word);
    Toast.success(`Mendengarkan pengucapan: ${word}`);
  }

  // Scene 2 Handlers
  function chooseScene2(key) {
    scene2Choice = key;
    const choice = sceneData[2].choices.find(c => c.key === key);
    updateView();
    if (audioEnabled && choice) {
      speak(choice.feedback);
    }
  }

  // Scene 3 Handlers
  function selectScene3Object(objKey) {
    scene3SelectedObj = objKey;
    const obj = sceneData[3].objects[objKey];
    updateView();
    if (audioEnabled && obj) {
      speak(`${obj.name}. ${obj.info}`);
    }
  }

  function chooseScene3Reflection(key) {
    scene3Reflection = key;
    const refl = sceneData[3].reflectiveChoices.find(r => r.key === key);
    updateView();
    if (audioEnabled && refl) {
      speak(refl.feedback);
    }
  }

  // Scene 4 Handlers
  function chooseScene4Feeling(key) {
    scene4FeelingsChoice = key;
    const feeling = sceneData[4].feelingsChoices.find(f => f.key === key);
    updateView();
    if (audioEnabled && feeling) {
      speak(feeling.feedback);
    }
  }

  function chooseScene4Action(key) {
    scene4ActionChoice = key;
    const act = sceneData[4].actionChoices.find(a => a.key === key);
    updateView();
    if (audioEnabled && act) {
      speak(act.feedback);
    }
  }

  // Scene 5 Handlers
  function selectEnding(id) {
    scene5SelectedEnding = id;
    const ending = sceneData[5].endings.find(e => e.id === id);
    updateView();
    if (audioEnabled && ending) {
      speak(`${ending.title}. ${ending.narration}`);
    }
  }

  function setVoiceText(text) {
    scene5VoiceText = text;
  }

  function selectSuggestionChip(chipText) {
    scene5VoiceText = chipText;
    updateView();
    speak(`Menurut saya, Malin harus ${chipText}.`);
    Toast.info(`Pendapat dipilih: "${chipText}"`);
  }

  // Modals & Reflection Handlers
  function openVocabModal() {
    showVocabModal = true;
    showValuesModal = false;
    showReflectionModal = false;
    updateView();
  }

  function openValuesModal() {
    showValuesModal = true;
    showVocabModal = false;
    showReflectionModal = false;
    updateView();
  }

  function openReflectionModal() {
    showReflectionModal = true;
    showVocabModal = false;
    showValuesModal = false;
    updateView();
  }

  function closeModals(e) {
    if (e && e.target && e.target.classList.contains('malin-modal-card')) return;
    showVocabModal = false;
    showValuesModal = false;
    showReflectionModal = false;
    updateView();
  }

  function chooseReflection(key) {
    finalReflectionChoice = key;
    const q = reflectionQuestions.find(r => r.key === key);
    updateView();
    if (audioEnabled && q) {
      speak(q.feedback);
    }
  }

  // ==========================================================================
  // VOICE RECORDER IMPLEMENTATION (MediaRecorder API with Safe Fallback)
  // ==========================================================================
  async function startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      Toast.error('Browser ini belum mendukung akses mikrofon. Anda dapat memilih salah satu pendapat cepat di bawah!');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunks = [];
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: 'audio/webm' });
        recordedAudioUrl = URL.createObjectURL(blob);
        audioElement = new Audio(recordedAudioUrl);
        audioElement.onended = () => {
          isPlayingRecordedAudio = false;
          updateView();
        };
        clearInterval(recordTimerInterval);
        isRecording = false;
        Toast.success('Rekaman suara berhasil disimpan!');
        updateView();
      };

      mediaRecorder.start();
      isRecording = true;
      recordSeconds = 0;
      clearInterval(recordTimerInterval);
      recordTimerInterval = setInterval(() => {
        recordSeconds++;
        const timerEl = document.querySelector('.malin-rec-timer');
        if (timerEl) timerEl.textContent = formatTime(recordSeconds);
        // Limit to 60 seconds
        if (recordSeconds >= 60) {
          stopRecording();
        }
      }, 1000);

      updateView();
    } catch (err) {
      console.warn('Microphone permission denied or unavailable:', err);
      Toast.error('Izin mikrofon tidak diberikan. Anda tetap dapat menggunakan pilihan pendapat cepat di bawah!');
    }
  }

  function stopRecording() {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      // Stop all audio tracks
      if (mediaRecorder.stream) {
        mediaRecorder.stream.getTracks().forEach(t => t.stop());
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

  function cleanup() {
    stopSpeech();
    if (mediaRecorder && isRecording) {
      stopRecording();
    }
    if (audioElement) {
      audioElement.pause();
      audioElement = null;
    }
  }

  return {
    render,
    goToScene,
    nextScene,
    prevScene,
    selectScene1Object,
    setScene1Lang,
    pronounceWord,
    chooseScene2,
    selectScene3Object,
    chooseScene3Reflection,
    chooseScene4Feeling,
    chooseScene4Action,
    selectEnding,
    setVoiceText,
    selectSuggestionChip,
    startRecording,
    stopRecording,
    playRecording,
    resetRecording,
    openVocabModal,
    openValuesModal,
    openReflectionModal,
    closeModals,
    chooseReflection,
    toggleAudio,
    speakCurrentScene: speakSceneNarration,
    speak,
    cleanup
  };
})();
