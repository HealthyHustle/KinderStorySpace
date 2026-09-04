const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_FILE = path.join(__dirname, '..', 'data', 'kinder_database.json');

// Ensure data folder exists
const dataDir = path.dirname(DB_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const defaultAdminPasswordHash = bcrypt.hashSync('admin123', 10);
const defaultUserPasswordHash = bcrypt.hashSync('user123', 10);

const initialDatabase = {
  users: [
    {
      id: 'usr-admin-01',
      name: 'Admin Kinder Story',
      email: 'admin@kinderstoryspace.com',
      password_hash: defaultAdminPasswordHash,
      role: 'admin',
      created_at: '2026-01-15T08:00:00.000Z',
      last_active: '2026-09-04T07:30:00.000Z',
      books_read: 18,
      status: 'active'
    },
    {
      id: 'usr-regular-01',
      name: 'Budi Santoso',
      email: 'budi@kinderstory.com',
      password_hash: defaultUserPasswordHash,
      role: 'user',
      created_at: '2026-02-10T10:00:00.000Z',
      last_active: '2026-09-03T15:20:00.000Z',
      books_read: 6,
      status: 'active'
    },
    {
      id: 'usr-regular-02',
      name: 'Siti Rahmawati',
      email: 'siti@kinderstory.com',
      password_hash: defaultUserPasswordHash,
      role: 'user',
      created_at: '2026-03-01T09:30:00.000Z',
      last_active: '2026-09-02T11:45:00.000Z',
      books_read: 9,
      status: 'active'
    },
    {
      id: 'usr-regular-03',
      name: 'Faisal Rizky',
      email: 'faisal@kinderstory.com',
      password_hash: defaultUserPasswordHash,
      role: 'user',
      created_at: '2026-04-12T14:15:00.000Z',
      last_active: '2026-09-04T06:10:00.000Z',
      books_read: 12,
      status: 'active'
    }
  ],
  books: [
    {
      id: 'book-malin-kundang',
      title_id: 'Malin Kundang',
      title_en: 'Malin Kundang: The Legend',
      author: 'Cerita Rakyat Minangkabau',
      origin: 'Sumatera Barat, Indonesia',
      category: 'Cerita Rakyat',
      age_range: '5–8 Tahun',
      read_time: '6 Menit',
      cover_url: '/assets/covers/malin_kundang.svg',
      has_pdf: true,
      pdf_url: '/api/books/book-malin-kundang/pdf',
      status: 'published',
      created_at: '2026-01-20T10:00:00.000Z',
      updated_at: '2026-09-01T12:00:00.000Z',
      description_id: 'Kisah rakyat tentang seorang anak yang merantau dan perjalanan hidupnya yang mengajarkan nilai menghormati orang tua, tanggung jawab, dan konsekuensi dari sebuah pilihan.',
      description_en: 'A classic folklore about a young man who journeyed far away, teaching valuable lessons on filial piety, humility, respect for parents, and life consequences.',
      pages: [
        {
          page_number: 1,
          image_url: '/assets/covers/malin_kundang.svg',
          text_id: 'Dahulu kala, di sebuah perkampungan nelayan Pantai Air Manis di Sumatera Barat, hiduplah seorang janda bernama Mande Rubayah bersama anak laki-lakinya yang bernama Malin Kundang. Mereka hidup sederhana dan saling menyayangi.',
          text_en: 'A long time ago, in a coastal village at Air Manis Beach in West Sumatra, lived a humble widow named Mande Rubayah and her beloved young son named Malin Kundang. They lived simply and loved each other dearly.'
        },
        {
          page_number: 2,
          image_url: '/assets/covers/malin_kundang.svg',
          text_id: 'Malin adalah anak yang rajin dan tangkas. Ketika beranjak dewasa, ia meminta izin kepada ibunya untuk merantau menaiki kapal besar ke negeri seberang demi mengubah nasib kehidupan mereka.',
          text_en: 'Malin grew into a diligent and hardworking youth. When he came of age, he asked his mother for permission to sail across the ocean on a merchant ship to seek a better future.'
        },
        {
          page_number: 3,
          image_url: '/assets/covers/malin_kundang.svg',
          text_id: 'Dengan berat hati bercampur doa tulus, Mande Rubayah merelakan Malin pergi. "Pergilah anakku, jaga dirimu baik-baik dan jangan pernah lupakan ibumu," bisik sang ibu di tepi dermaga.',
          text_en: 'With a heavy heart and tearful prayers, Mande Rubayah let him go. "Go, my son, take good care of yourself and never forget your mother," she whispered on the seashore.'
        },
        {
          page_number: 4,
          image_url: '/assets/covers/malin_kundang.svg',
          text_id: 'Tahun demi tahun berlalu. Malin bekerja sangat keras hingga menjadi saudagar kaya raya yang memiliki kapal megah bertiang tinggi dan anak buah yang banyak.',
          text_en: 'Years went by. Malin worked tirelessly and eventually became a prosperous merchant owning a magnificent tall-masted ship and many crew members.'
        },
        {
          page_number: 5,
          image_url: '/assets/covers/malin_kundang.svg',
          text_id: 'Suatu hari, kapal megah Malin berlabuh di pantai kelahirannya. Mande Rubayah yang sudah tua renta berlari menyambut sang anak dengan air mata bahagia. "Malin, anakku! Kau sudah pulang!" serunya riang.',
          text_en: 'One sunny day, Malin’s magnificent vessel anchored at his birthplace. The elderly Mande Rubayah hurried down to the shore with tears of joy, crying out: "Malin, my son! You have returned!"'
        },
        {
          page_number: 6,
          image_url: '/assets/covers/malin_kundang.svg',
          text_id: 'Namun Malin merasa malu mengakui ibunya yang berpakaian lusuh di hadapan istrinya yang bangsawan dan awak kapalnya. Ia mendorong ibunya hingga terjatuh ke pasir.',
          text_en: 'Ashamed of his mother’s humble, ragged clothes in front of his wealthy wife and crew, Malin harshly denied knowing her and pushed her onto the sands.'
        },
        {
          page_number: 7,
          image_url: '/assets/covers/malin_kundang.svg',
          text_id: 'Hati Mande Rubayah teramat hancur. Langit tiba-tiba menjadi gelap gulita, petir menggelegar, dan badai dahsyat menghantam kapal Malin hingga kapal dan dirinya membeku menjadi batu karang di tepi pantai.',
          text_en: 'Deeply broken-hearted, his mother wept. Sudden dark clouds covered the sky, thunder roared, and a fierce storm struck Malin’s ship, turning it and Malin into stone on the seashore.'
        },
        {
          page_number: 8,
          image_url: '/assets/covers/malin_kundang.svg',
          text_id: 'Pesan Moral: Hormatilah orang tua yang telah membesarkan kita dengan tulus kasih sayang. Kekayaan harta tidak ada artinya tanpa rasa bakti dan kerendahan hati.',
          text_en: 'Moral Lesson: Always honor and respect the parents who raised you with unconditional love. Worldly wealth is meaningless without gratitude and humility.'
        }
      ]
    },
    {
      id: 'book-timun-mas',
      title_id: 'Timun Mas',
      title_en: 'Timun Mas: The Golden Maiden',
      author: 'Cerita Rakyat Jawa',
      origin: 'Jawa Tengah, Indonesia',
      category: 'Cerita Rakyat',
      age_range: '4–7 Tahun',
      read_time: '5 Menit',
      cover_url: '/assets/covers/timun_mas.svg',
      has_pdf: true,
      pdf_url: '/api/books/book-timun-mas/pdf',
      status: 'published',
      created_at: '2026-01-22T11:00:00.000Z',
      updated_at: '2026-09-02T10:00:00.000Z',
      description_id: 'Petualangan Timun Mas yang berani dan cerdik menghadapi Raksasa dengan bekal empat bungkusan ajaib dari ibunya.',
      description_en: 'The brave adventure of Timun Mas, a clever girl who outwitted the Giant using four magical gifts bestowed by her caring mother.',
      pages: [
        {
          page_number: 1,
          image_url: '/assets/covers/timun_mas.svg',
          text_id: 'Mbok Srini adalah seorang wanita tua yang tinggal sendirian di dekat hutan. Setiap hari ia berdoa agar dikaruniai seorang anak untuk menemaninya.',
          text_en: 'Mbok Srini was an elderly woman living quietly near the green forest. Every evening she prayed for a child to keep her company.'
        },
        {
          page_number: 2,
          image_url: '/assets/covers/timun_mas.svg',
          text_id: 'Suatu hari, seorang raksasa memberinya sebutir biji mentimun ajaib. Ketika ditanam, dari buah mentimun emas yang membesar lahirlah seorang bayi perempuan cantik yang diberi nama Timun Mas.',
          text_en: 'One day, a forest giant gave her a magical cucumber seed. From the giant golden cucumber that grew, a lovely baby girl was born, whom she named Timun Mas.'
        },
        {
          page_number: 3,
          image_url: '/assets/covers/timun_mas.svg',
          text_id: 'Timun Mas tumbuh menjadi gadis yang ceria, pandai, dan berbudi luhur. Saat usia 16 tahun, raksasa datang untuk menagih janjinya.',
          text_en: 'Timun Mas grew into a cheerful, clever, and kind girl. When she turned sixteen, the giant returned to fulfill his claim.'
        },
        {
          page_number: 4,
          image_url: '/assets/covers/timun_mas.svg',
          text_id: 'Mbok Srini membekali Timun Mas empat kantong ajaib: biji mentimun, jarum, garam, dan terasi. Timun Mas pun berlari sekuat tenaga memasuki hutan.',
          text_en: 'Mbok Srini gave Timun Mas four magical pouches containing cucumber seeds, needles, salt, and shrimp paste, bidding her to run safely into the forest.'
        },
        {
          page_number: 5,
          image_url: '/assets/covers/timun_mas.svg',
          text_id: 'Biji mentimun dilempar menjadi kebun lebat, jarum menjadi hutan bambu runcing, garam berubah menjadi lautan luas, dan terasi menjadi lumpur mendidih yang menahan raksasa.',
          text_en: 'The cucumber seeds turned into a dense melon field, the needles into sharp bamboo woods, the salt into a wide sea, and the shrimp paste into bubbling mud that stopped the giant.'
        },
        {
          page_number: 6,
          image_url: '/assets/covers/timun_mas.svg',
          text_id: 'Timun Mas berhasil kembali ke pelukan Mbok Srini dengan selamat. Mereka hidup bahagia dan damai selamanya. Pesan moral: Keberanian dan kecerdikan dapat mengatasi rintangan terbesar.',
          text_en: 'Timun Mas returned safely to Mbok Srini’s loving embrace. They lived in lasting joy and peace. Moral: Courage, wit, and patience conquer the greatest obstacles.'
        }
      ]
    },
    {
      id: 'book-bawang-merah-putih',
      title_id: 'Bawang Merah Bawang Putih',
      title_en: 'The Red & White Sisters',
      author: 'Cerita Rakyat Nusantara',
      origin: 'Riau & Jawa, Indonesia',
      category: 'Moral',
      age_range: '4–7 Tahun',
      read_time: '5 Menit',
      cover_url: '/assets/covers/bawang_merah_putih.svg',
      has_pdf: true,
      pdf_url: '/api/books/book-bawang-merah-putih/pdf',
      status: 'published',
      created_at: '2026-01-25T09:00:00.000Z',
      updated_at: '2026-09-02T15:00:00.000Z',
      description_id: 'Kisah tentang Bawang Putih yang berhati lembut dan sabar, serta pelajaran berharga tentang ketulusan yang selalu mendatangkan kebaikan sejati.',
      description_en: 'A touching tale of kind-hearted Bawang Putih, teaching children that sincerity, diligence, and patience always yield genuine blessings.',
      pages: [
        {
          page_number: 1,
          image_url: '/assets/covers/bawang_merah_putih.svg',
          text_id: 'Bawang Putih adalah gadis desa yang rajin, penyayang, dan rendah hati. Ia tinggal bersama ibu tiri dan saudara tirinya, Bawang Merah, yang sering bersikap manja.',
          text_en: 'Bawang Putih was a diligent, gentle, and humble girl. She lived with her stepmother and stepsister, Bawang Merah, who was vain and spoiled.'
        },
        {
          page_number: 2,
          image_url: '/assets/covers/bawang_merah_putih.svg',
          text_id: 'Suatu hari saat mencuci di sungai, sehelai selendang kesayangan ibunya hanyut terbawa arus. Bawang Putih menyusuri aliran sungai untuk mencarinya.',
          text_en: 'One morning while washing clothes at the river, her stepmother’s favorite shawl drifted away with the current. Bawang Putih walked downstream to find it.'
        },
        {
          page_number: 3,
          image_url: '/assets/covers/bawang_merah_putih.svg',
          text_id: 'Di hulu sungai, ia bertemu seorang nenek tua yang ramah. Bawang Putih dengan tulus membantu membersihkan rumah dan memasak untuk sang nenek.',
          text_en: 'Deep in the valley, she met a kind elderly grandmother. Bawang Putih whole-heartedly assisted her with housekeeping and cooking tasty meals.'
        },
        {
          page_number: 4,
          image_url: '/assets/covers/bawang_merah_putih.svg',
          text_id: 'Sebagai rasa terima kasih, nenek mengembalikan selendang dan menawarkan labu kecil atau labu besar. Bawang Putih dengan rendah hati memilih labu kecil.',
          text_en: 'In gratitude, the grandmother returned the shawl and offered her a choice between a small pumpkin or a large one. Modest Bawang Putih chose the small pumpkin.'
        },
        {
          page_number: 5,
          image_url: '/assets/covers/bawang_merah_putih.svg',
          text_id: 'Ketika dibelah di rumah, labu kecil itu berisi perhiasan berkilau dan kebaikan melimpah. Kebaikan hati dan keikhlasan Bawang Putih berbuah kebahagiaan.',
          text_en: 'When opened at home, the small pumpkin was filled with glistening treasures. Bawang Putih’s pure heart and kindness brought her lasting happiness.'
        }
      ]
    },
    {
      id: 'book-kancil-buaya',
      title_id: 'Kancil dan Buaya',
      title_en: 'The Clever Mousedeer & The Crocodiles',
      author: 'Fabel Nusantara',
      origin: 'Nusantara',
      category: 'Fabel',
      age_range: '3–6 Tahun',
      read_time: '4 Menit',
      cover_url: '/assets/covers/kancil_buaya.svg',
      has_pdf: true,
      pdf_url: '/api/books/book-kancil-buaya/pdf',
      status: 'published',
      created_at: '2026-02-01T08:00:00.000Z',
      updated_at: '2026-09-03T11:00:00.000Z',
      description_id: 'Kancil yang cerdik ingin menyeberangi sungai untuk memetik buah-buahan segar di seberang dengan mengajak para buaya berbaris rapi.',
      description_en: 'The quick-witted mousedeer cleverly crossed a wide river to reach juicy fruits on the opposite bank by inviting the crocodiles to line up.',
      pages: [
        {
          page_number: 1,
          image_url: '/assets/covers/kancil_buaya.svg',
          text_id: 'Di tepi hutan yang asri, si Kancil memandang buah-buahan ranum yang manis di seberang sungai. Namun sungai itu dalam dan dipenuhi buaya.',
          text_en: 'At the edge of a lush green forest, little Kancil gazed at the ripe, sweet fruits across the river. However, the river was deep and full of crocodiles.'
        },
        {
          page_number: 2,
          image_url: '/assets/covers/kancil_buaya.svg',
          text_id: 'Kancil tidak kehabisan akal. Ia memanggil Sang Buaya: "Hai sahabat buaya! Raja Hutan ingin menghitung jumlah kalian untuk jamuan pesta!"',
          text_en: 'Kancil was quick on his feet. He called out: "Hey crocodile friends! The Forest King wishes to count all of you for a grand feast!"'
        },
        {
          page_number: 3,
          image_url: '/assets/covers/kancil_buaya.svg',
          text_id: 'Para buaya merasa senang dan langsung berbaris dari tepi ke seberang membentuk jembatan. Kancil melompat gembira sambil menghitung: "Satu, dua, tiga, empat..."',
          text_en: 'Excited by the news, the crocodiles lined up from one bank to the other. Kancil hopped from back to back, counting merrily: "One, two, three, four..."'
        },
        {
          page_number: 4,
          image_url: '/assets/covers/kancil_buaya.svg',
          text_id: 'Sesampainya di seberang dengan aman, Kancil berterima kasih sambil tersenyum. Kancil menikmati buah-buahan segar dengan sukacita.',
          text_en: 'Landing safely on the opposite bank, Kancil beamed with gratitude and enjoyed the delicious fruits. Wit and quick thinking make every problem solvable!'
        }
      ]
    },
    {
      id: 'book-sangkuriang',
      title_id: 'Sangkuriang & Tangkuban Parahu',
      title_en: 'Sangkuriang: The Legend of The Inverted Boat',
      author: 'Cerita Rakyat Sunda',
      origin: 'Jawa Barat, Indonesia',
      category: 'Cerita Rakyat',
      age_range: '6–9 Tahun',
      read_time: '6 Menit',
      cover_url: '/assets/covers/sangkuriang.svg',
      has_pdf: true,
      pdf_url: '/api/books/book-sangkuriang/pdf',
      status: 'published',
      created_at: '2026-02-05T12:00:00.000Z',
      updated_at: '2026-09-02T14:00:00.000Z',
      description_id: 'Legenda asal usul Gunung Tangkuban Parahu dari tanah Pasundan yang sarat pesan penting tentang kejujuran dan takdir alam.',
      description_en: 'The classic West Javanese legend recounting the origin of Mount Tangkuban Parahu, delivering timeless lessons on truthfulness and fate.',
      pages: [
        {
          page_number: 1,
          image_url: '/assets/covers/sangkuriang.svg',
          text_id: 'Di daerah Priangan yang sejuk, Dayang Sumbi adalah seorang putri yang cantik jelita dan gemar menenun kain.',
          text_en: 'In the tranquil highlands of Priangan, Dayang Sumbi was a radiant princess who loved weaving delicate fabrics.'
        },
        {
          page_number: 2,
          image_url: '/assets/covers/sangkuriang.svg',
          text_id: 'Ia memiliki seorang putra bernama Sangkuriang yang gemar berburu di hutan bersama anjing setianya yang bernama Tumang.',
          text_en: 'She had an energetic son named Sangkuriang who loved exploring the forest accompanied by his loyal companion, Tumang.'
        },
        {
          page_number: 3,
          image_url: '/assets/covers/sangkuriang.svg',
          text_id: 'Setelah bertahun-tahun mengembara di berbagai negeri, Sangkuriang kembali sebagai pemuda gagah. Namun ia tidak menyadari tanah asalnya.',
          text_en: 'After wandering across distant lands for many seasons, Sangkuriang returned as a tall and strong youth, unaware of his origins.'
        },
        {
          page_number: 4,
          image_url: '/assets/covers/sangkuriang.svg',
          text_id: 'Dayang Sumbi menyadari identitas putranya dan mengajukan syarat membuat danau dan perahu besar sebelum terbit fajar sebagai ujian mustahil.',
          text_en: 'Dayang Sumbi recognized him and set a monumental test: to construct a vast lake and a mighty boat before dawn broke.'
        },
        {
          page_number: 5,
          image_url: '/assets/covers/sangkuriang.svg',
          text_id: 'Ketika fajar tiruan berkibar, perahu besar itu ditendang dan terbalik menjadi Gunung Tangkuban Parahu yang kita kenal hingga kini.',
          text_en: 'As dawn lights appeared on the horizon, the grand boat was overturned, transforming into the majestic Mount Tangkuban Parahu admired to this day.'
        }
      ]
    },
    {
      id: 'book-lutung-kasarung',
      title_id: 'Lutung Kasarung',
      title_en: 'Lutung Kasarung: The Mystical Prince',
      author: 'Cerita Rakyat Sunda',
      origin: 'Jawa Barat, Indonesia',
      category: 'Petualangan',
      age_range: '5–8 Tahun',
      read_time: '5 Menit',
      cover_url: '/assets/covers/lutung_kasarung.svg',
      has_pdf: true,
      pdf_url: '/api/books/book-lutung-kasarung/pdf',
      status: 'published',
      created_at: '2026-02-10T10:00:00.000Z',
      updated_at: '2026-09-03T16:00:00.000Z',
      description_id: 'Kisah kasih dan kesetiaan Purbasari dan pangeran berwujud lutung yang membuktikan bahwa ketulusan hati melampaui rupa lahiriah.',
      description_en: 'The heartwarming story of Princess Purbasari and a mystical langur, proving that inner goodness always triumphs over superficial appearances.',
      pages: [
        {
          page_number: 1,
          image_url: '/assets/covers/lutung_kasarung.svg',
          text_id: 'Putri Purbasari adalah putri raja Pasir Batang yang berhati emas, selalu santun dan dicintai seluruh rakyat kerajaan.',
          text_en: 'Princess Purbasari was a kind-hearted royal from Pasir Batang, beloved by all her people for her grace and warm compassion.'
        },
        {
          page_number: 2,
          image_url: '/assets/covers/lutung_kasarung.svg',
          text_id: 'Saat diasingkan ke hutan oleh kakaknya yang iri hati, Purbasari ditemani seekor kera hitam bijaksana bernama Lutung Kasarung.',
          text_en: 'Exiled to the tranquil forest by an envious elder sister, Purbasari was sheltered and befriended by a wise langur named Lutung Kasarung.'
        },
        {
          page_number: 3,
          image_url: '/assets/covers/lutung_kasarung.svg',
          text_id: 'Lutung Kasarung menciptakan telaga air hangat jernih yang memulihkan kecantikan Purbasari seperti sedia kala.',
          text_en: 'Lutung Kasarung led her to a crystal-clear natural warm spring that revitalized Purbasari with renewed radiance and health.'
        },
        {
          page_number: 4,
          image_url: '/assets/covers/lutung_kasarung.svg',
          text_id: 'Pada akhirnya, Lutung Kasarung kembali ke wujud aslinya sebagai pangeran tampan Guruminda dan memimpin kerajaan bersama Purbasari dengan penuh keadilan.',
          text_en: 'In the end, Lutung Kasarung returned to his true form as Prince Guruminda, reigning peacefully alongside Purbasari with boundless wisdom.'
        }
      ]
    },
    {
      id: 'book-kelinci-putih',
      title_id: 'Petualangan Kelinci Putih',
      title_en: 'The White Bunny’s Adventure',
      author: 'Kak Danu (PGPAUD)',
      origin: 'Karya Guru PAUD',
      category: 'Fabel',
      age_range: '3–5 Tahun',
      read_time: '3 Menit',
      cover_url: '/assets/cover_kelinci.png',
      has_pdf: true,
      pdf_url: '/api/books/book-kelinci-putih/pdf',
      status: 'published',
      created_at: '2026-02-15T09:00:00.000Z',
      updated_at: '2026-09-01T08:00:00.000Z',
      description_id: 'Lulu adalah kelinci kecil yang penuh rasa ingin tahu, belajar bahwa keberanian dan sopan santun membuka pintu persahabatan baru.',
      description_en: 'Lulu the little white bunny explores the pine forest and discovers that courage and friendly manners welcome wonderful new companions.',
      pages: [
        {
          page_number: 1,
          image_url: '/assets/cover_kelinci.png',
          text_id: 'Di padang rumput hijau yang luas, hiduplah seekor kelinci putih kecil bernama Lulu. Lulu sangat suka melompat dan mengamati kupu-kupu.',
          text_en: 'In a wide green meadow lived a playful white bunny named Lulu. Lulu loved hopping around and watching colorful butterflies.'
        },
        {
          page_number: 2,
          image_url: '/assets/cover_kelinci.png',
          text_id: 'Suatu pagi, Lulu memberanikan diri berjalan ke Hutan Cemara. Di sana ia melihat bunga-bunga harum berwarna ungu dan kuning.',
          text_en: 'One bright morning, Lulu hopped curiously into the Pine Forest, discovering fragrant yellow and lavender wildflowers along the trail.'
        },
        {
          page_number: 3,
          image_url: '/assets/cover_kelinci.png',
          text_id: 'Tiba-tiba, ia berpapasan dengan Burung Hantu besar. Lulu menyapa dengan sopan, "Selamat pagi Paman Burung Hantu!"',
          text_en: 'Suddenly, he met a large wise Owl perched on a branch. Lulu greeted politely: "Good morning, Uncle Owl!"'
        },
        {
          page_number: 4,
          image_url: '/assets/cover_kelinci.png',
          text_id: 'Paman Burung Hantu tersenyum hangat dan menemani Lulu menjelajah. Lulu belajar bahwa bersikap ramah membuat kita punya banyak teman baru.',
          text_en: 'Uncle Owl smiled warmly and guided Lulu safely. Lulu learned that kindness and politeness bring great friends wherever we go.'
        }
      ]
    },
    {
      id: 'book-gajah-baik',
      title_id: 'Si Gajah yang Baik Hati',
      title_en: 'The Gentle Giant Elephant',
      author: 'Bunda Rini (PGPAUD)',
      origin: 'Karya Guru PAUD',
      category: 'Pendidikan',
      age_range: '3–5 Tahun',
      read_time: '3 Menit',
      cover_url: '/assets/cover_gajah.png',
      has_pdf: true,
      pdf_url: '/api/books/book-gajah-baik/pdf',
      status: 'published',
      created_at: '2026-02-18T10:00:00.000Z',
      updated_at: '2026-09-02T09:00:00.000Z',
      description_id: 'Gugi si gajah berbadan besar selalu siap sedia membantu teman-temannya di hutan yang sedang kesusahan.',
      description_en: 'Gugi the giant elephant uses his gentle strength and long trunk to help woodland friends whenever in need.',
      pages: [
        {
          page_number: 1,
          image_url: '/assets/cover_gajah.png',
          text_id: 'Gugi adalah anak gajah yang bertubuh besar. Walau badannya besar, Gugi selalu tersenyum manis dan suka menolong.',
          text_en: 'Gugi was a big young elephant. Despite his huge size, Gugi always wore a warm smile and loved extending a helping hand.'
        },
        {
          page_number: 2,
          image_url: '/assets/cover_gajah.png',
          text_id: 'Ketika angin kencang berhembus, sarang burung kecil terjatuh dari dahan pohon yang tinggi. Anak-anak burung menciap ketakutan.',
          text_en: 'When a strong breeze blew, a little bird nest slipped from a tall oak branch. The chicks chirped anxiously.'
        },
        {
          page_number: 3,
          image_url: '/assets/cover_gajah.png',
          text_id: 'Gugi dengan hati-hati mengangkat sarang itu dengan belalainya yang panjang dan mengembalikannya ke dahan yang aman.',
          text_en: 'Gugi carefully lifted the nest using his long, gentle trunk and placed it safely back upon the sturdy branch.'
        },
        {
          page_number: 4,
          image_url: '/assets/cover_gajah.png',
          text_id: 'Ibu Burung berkicau riang mengucapkan terima kasih. Semua hewan di hutan senang memiliki sahabat berhati mulia seperti Gugi.',
          text_en: 'Mother bird chirped joyfully in gratitude. All forest friends felt safe and thankful to have such a caring friend as Gugi.'
        }
      ]
    }
  ],
  modules: [
    {
      id: 'mod-01',
      title: 'Mengenal Warna di Sekitar Kita',
      category: 'Kognitif',
      age_range: '4–5 Tahun',
      description: 'Modul aktivitas sederhana untuk membantu anak mengenali warna primer dan sekunder melalui benda-benda nyata yang ditemukan dalam kehidupan sehari-hari.',
      thumbnail: '/assets/modules/modul_kognitif.svg',
      has_pdf: true,
      pdf_url: '/api/modules/mod-01/pdf',
      status: 'published',
      objectives: [
        'Anak mampu membedakan warna merah, kuning, biru, dan hijau',
        'Meningkatkan konsentrasi dan kepekaan visual',
        'Mengelompokkan mainan dan benda berdasarkan warna'
      ],
      created_at: '2026-02-01T08:00:00.000Z'
    },
    {
      id: 'mod-02',
      title: 'Mengenal Huruf & Fonik Riang',
      category: 'Bahasa & Literasi',
      age_range: '5–6 Tahun',
      description: 'Panduan stimulasi fonemik dan pengenalan bentuk huruf vokal (A, I, U, E, O) melalui nyanyian berirama dan kartu bergambar interaktif.',
      thumbnail: '/assets/modules/modul_bahasa.svg',
      has_pdf: true,
      pdf_url: '/api/modules/mod-02/pdf',
      status: 'published',
      objectives: [
        'Mengenal bunyi fonem dasar huruf vokal',
        'Menyebutkan kata benda berawalan huruf vokal',
        'Melatih pelafalan kata dengan jelas dan percaya diri'
      ],
      created_at: '2026-02-04T08:00:00.000Z'
    },
    {
      id: 'mod-03',
      title: 'Belajar Empati & Berbagi Kasih',
      category: 'Sosial Emosional',
      age_range: '3–5 Tahun',
      description: 'Kegiatan interaktif bercerita dan bermain peran untuk melatih kepekaan sosial, memahami perasaan teman, dan membiasakan budaya berbagi.',
      thumbnail: '/assets/modules/modul_sosial.svg',
      has_pdf: true,
      pdf_url: '/api/modules/mod-03/pdf',
      status: 'published',
      objectives: [
        'Mengenali ekspresi wajah senang, sedih, dan marah',
        'Membiasakan mengucap tolong, maaf, dan terima kasih',
        'Menumbuhkan rasa empati dan saling menghargai'
      ],
      created_at: '2026-02-08T08:00:00.000Z'
    },
    {
      id: 'mod-04',
      title: 'Gerak Ceria & Motorik Halus',
      category: 'Motorik',
      age_range: '4–6 Tahun',
      description: 'Panduan senam irama anak usia dini serta latihan koordinasi tangan-mata melalui melipat kertas origami dan meronce manik-manik besar.',
      thumbnail: '/assets/modules/modul_motorik.svg',
      has_pdf: true,
      pdf_url: '/api/modules/mod-04/pdf',
      status: 'published',
      objectives: [
        'Melatih kekuatan otot jemari tangan untuk persiapan menulis',
        'Melatih keseimbangan tubuh dan gerak ritmis',
        'Meningkatkan koordinasi mata dan tangan'
      ],
      created_at: '2026-02-12T08:00:00.000Z'
    },
    {
      id: 'mod-05',
      title: 'Sahabat Alam & Lingkungan Hijau',
      category: 'Pengenalan Lingkungan',
      age_range: '4–6 Tahun',
      description: 'Eksplorasi tanaman, merawat bunga di halaman sekolah, membuang sampah pada tempatnya, dan mencintai lingkungan hidup sedini mungkin.',
      thumbnail: '/assets/modules/modul_lingkungan.svg',
      has_pdf: true,
      pdf_url: '/api/modules/mod-05/pdf',
      status: 'published',
      objectives: [
        'Mengenal bagian tanaman (akar, batang, daun, bunga)',
        'Membiasakan memilah sampah organik dan anorganik',
        'Menyayangi hewan dan tanaman ciptaan Tuhan'
      ],
      created_at: '2026-02-16T08:00:00.000Z'
    },
    {
      id: 'mod-06',
      title: 'Berhitung Riang & Bentuk Geometri',
      category: 'Numerasi Dasar',
      age_range: '4–5 Tahun',
      description: 'Mengenal bilangan 1 hingga 10 melalui permainan jari, balok kayu angka, dan pengenalan bentuk geometri (lingkaran, segitiga, persegi).',
      thumbnail: '/assets/modules/modul_numerasi.svg',
      has_pdf: true,
      pdf_url: '/api/modules/mod-06/pdf',
      status: 'published',
      objectives: [
        'Membilang benda secara runtut 1 sampai 10',
        'Menghubungkan lambang bilangan dengan jumlah objek',
        'Mengenali bentuk lingkaran, persegi, dan segitiga'
      ],
      created_at: '2026-02-20T08:00:00.000Z'
    }
  ],
  reading_progress: {}
};

class Database {
  constructor() {
    this.init();
  }

  init() {
    if (!fs.existsSync(DB_FILE)) {
      this.data = JSON.parse(JSON.stringify(initialDatabase));
      this.save();
    } else {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        // Ensure initial books and users are maintained if empty
        if (!this.data.books || this.data.books.length === 0) {
          this.data.books = initialDatabase.books;
          this.save();
        }
        if (!this.data.modules || this.data.modules.length === 0) {
          this.data.modules = initialDatabase.modules;
          this.save();
        }
        if (!this.data.users || this.data.users.length === 0) {
          this.data.users = initialDatabase.users;
          this.save();
        }
      } catch (err) {
        console.error('Error reading database file, recreating:', err);
        this.data = JSON.parse(JSON.stringify(initialDatabase));
        this.save();
      }
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving database:', err);
    }
  }

  // Users
  getUsers() {
    return this.data.users || [];
  }

  getUserByEmail(email) {
    if (!email) return null;
    return this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id) {
    return this.getUsers().find(u => u.id === id);
  }

  createUser(userData) {
    const newUser = {
      id: 'usr-' + Date.now(),
      name: userData.name,
      email: userData.email.toLowerCase(),
      password_hash: userData.password_hash,
      role: userData.role || 'user',
      created_at: new Date().toISOString(),
      last_active: new Date().toISOString(),
      books_read: 0,
      status: 'active'
    };
    this.data.users.push(newUser);
    this.save();
    return newUser;
  }

  updateUser(id, updates) {
    const index = this.data.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.data.users[index] = { ...this.data.users[index], ...updates };
      this.save();
      return this.data.users[index];
    }
    return null;
  }

  // Books
  getBooks(filter = {}) {
    let books = [...(this.data.books || [])];
    if (filter.status) {
      books = books.filter(b => b.status === filter.status);
    }
    if (filter.category && filter.category !== 'Semua') {
      books = books.filter(b => b.category.toLowerCase() === filter.category.toLowerCase());
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      books = books.filter(b =>
        b.title_id.toLowerCase().includes(q) ||
        (b.title_en && b.title_en.toLowerCase().includes(q)) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      );
    }
    return books;
  }

  getBookById(id) {
    return (this.data.books || []).find(b => b.id === id);
  }

  createBook(bookData) {
    const newBook = {
      id: 'book-' + Date.now(),
      title_id: bookData.title_id || 'Buku Cerita Baru',
      title_en: bookData.title_en || 'New Story Book',
      author: bookData.author || 'Penulis PGPAUD',
      origin: bookData.origin || 'Indonesia',
      category: bookData.category || 'Cerita Rakyat',
      age_range: bookData.age_range || '4–7 Tahun',
      read_time: bookData.read_time || '5 Menit',
      cover_url: bookData.cover_url || '/assets/cover_bintang.svg',
      has_pdf: true,
      pdf_url: '',
      status: bookData.status || 'published',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      description_id: bookData.description_id || '',
      description_en: bookData.description_en || '',
      pages: bookData.pages && bookData.pages.length > 0 ? bookData.pages : [
        {
          page_number: 1,
          image_url: bookData.cover_url || '/assets/cover_bintang.svg',
          text_id: bookData.description_id || 'Awal dari sebuah kisah anak yang indah dan mendidik.',
          text_en: bookData.description_en || 'The beginning of a wonderful and educational children story.'
        }
      ]
    };
    newBook.pdf_url = `/api/books/${newBook.id}/pdf`;
    this.data.books.unshift(newBook);
    this.save();
    return newBook;
  }

  updateBook(id, updates) {
    const index = this.data.books.findIndex(b => b.id === id);
    if (index !== -1) {
      this.data.books[index] = {
        ...this.data.books[index],
        ...updates,
        updated_at: new Date().toISOString()
      };
      this.save();
      return this.data.books[index];
    }
    return null;
  }

  deleteBook(id) {
    const initialLen = this.data.books.length;
    this.data.books = this.data.books.filter(b => b.id !== id);
    if (this.data.books.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Modules
  getModules(filter = {}) {
    let mods = [...(this.data.modules || [])];
    if (filter.category && filter.category !== 'Semua') {
      mods = mods.filter(m => m.category.toLowerCase().includes(filter.category.toLowerCase()));
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      mods = mods.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      );
    }
    return mods;
  }

  getModuleById(id) {
    return (this.data.modules || []).find(m => m.id === id);
  }

  createModule(moduleData) {
    const newMod = {
      id: 'mod-' + Date.now(),
      title: moduleData.title || 'Modul Pembelajaran Baru',
      category: moduleData.category || 'Kognitif',
      age_range: moduleData.age_range || '4–5 Tahun',
      description: moduleData.description || '',
      thumbnail: moduleData.thumbnail || '/assets/modules/modul_kognitif.svg',
      has_pdf: true,
      pdf_url: '',
      status: moduleData.status || 'published',
      objectives: moduleData.objectives || ['Mendukung stimulasi tumbuh kembang AUD'],
      created_at: new Date().toISOString()
    };
    newMod.pdf_url = `/api/modules/${newMod.id}/pdf`;
    this.data.modules.unshift(newMod);
    this.save();
    return newMod;
  }

  updateModule(id, updates) {
    const index = this.data.modules.findIndex(m => m.id === id);
    if (index !== -1) {
      this.data.modules[index] = { ...this.data.modules[index], ...updates };
      this.save();
      return this.data.modules[index];
    }
    return null;
  }

  deleteModule(id) {
    const initialLen = this.data.modules.length;
    this.data.modules = this.data.modules.filter(m => m.id !== id);
    if (this.data.modules.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Reading Progress
  saveReadingProgress(userId, bookId, page, language = 'id') {
    if (!this.data.reading_progress) this.data.reading_progress = {};
    const key = `${userId}_${bookId}`;
    const book = this.getBookById(bookId);
    const totalPages = book && book.pages ? book.pages.length : 1;
    const progressPct = Math.min(100, Math.round((page / totalPages) * 100));

    this.data.reading_progress[key] = {
      user_id: userId,
      book_id: bookId,
      current_page: page,
      language: language,
      progress_pct: progressPct,
      updated_at: new Date().toISOString()
    };

    // Update user books read count if completed
    if (progressPct >= 100) {
      const user = this.getUserById(userId);
      if (user) {
        user.books_read = (user.books_read || 0) + 1;
        user.last_active = new Date().toISOString();
      }
    }
    this.save();
    return this.data.reading_progress[key];
  }

  getReadingProgress(userId, bookId) {
    if (!this.data.reading_progress) return null;
    return this.data.reading_progress[`${userId}_${bookId}`] || null;
  }

  // Stats for Admin
  getStats() {
    const totalBooks = (this.data.books || []).length;
    const totalUsers = (this.data.users || []).length;
    const totalModules = (this.data.modules || []).length;
    const recentBooks = (this.data.books || []).slice(0, 5);
    const activeUsers = (this.data.users || []).filter(u => u.status === 'active').length;
    return {
      total_books: totalBooks,
      total_users: totalUsers,
      total_modules: totalModules,
      new_books_count: Math.min(totalBooks, 6),
      active_users: activeUsers,
      recent_books: recentBooks
    };
  }
}

module.exports = new Database();
