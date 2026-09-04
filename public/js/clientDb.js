// Client-side Database & Offline Storage for Kinder Story Space (GitHub Pages / Standalone)
const ClientDB = (() => {
  const STORAGE_KEY = 'kss_database';

  function fixAssetUrl(url) {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
    if (url.startsWith('/')) return url.substring(1);
    return url;
  }

  const initialData = {
    users: [
      {
        id: 'usr-admin-01',
        name: 'Admin Kinder Story',
        email: 'admin@kinderstoryspace.com',
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
        cover_url: 'assets/covers/malin_kundang.svg',
        has_pdf: true,
        status: 'published',
        created_at: '2026-01-20T10:00:00.000Z',
        updated_at: '2026-09-01T12:00:00.000Z',
        description_id: 'Kisah rakyat tentang seorang anak yang merantau dan perjalanan hidupnya yang mengajarkan nilai menghormati orang tua, tanggung jawab, dan konsekuensi dari sebuah pilihan.',
        description_en: 'A classic folklore about a young man who journeyed far away, teaching valuable lessons on filial piety, humility, respect for parents, and life consequences.',
        pages: [
          {
            page_number: 1,
            image_url: 'assets/covers/malin_kundang.svg',
            text_id: 'Dahulu kala, di sebuah perkampungan nelayan Pantai Air Manis di Sumatera Barat, hiduplah seorang janda bernama Mande Rubayah bersama anak laki-lakinya yang bernama Malin Kundang. Mereka hidup sederhana dan saling menyayangi.',
            text_en: 'A long time ago, in a coastal village at Air Manis Beach in West Sumatra, lived a humble widow named Mande Rubayah and her beloved young son named Malin Kundang. They lived simply and loved each other dearly.'
          },
          {
            page_number: 2,
            image_url: 'assets/covers/malin_kundang.svg',
            text_id: 'Malin adalah anak yang rajin dan tangkas. Ketika beranjak dewasa, ia meminta izin kepada ibunya untuk merantau menaiki kapal besar ke negeri seberang demi mengubah nasib kehidupan mereka.',
            text_en: 'Malin grew into a diligent and hardworking youth. When he came of age, he asked his mother for permission to sail across the ocean on a merchant ship to seek a better future.'
          },
          {
            page_number: 3,
            image_url: 'assets/covers/malin_kundang.svg',
            text_id: 'Dengan berat hati bercampur doa tulus, Mande Rubayah merelakan Malin pergi. "Pergilah anakku, jaga dirimu baik-baik dan jangan pernah lupakan ibumu," bisik sang ibu di tepi dermaga.',
            text_en: 'With a heavy heart and tearful prayers, Mande Rubayah let him go. "Go, my son, take good care of yourself and never forget your mother," she whispered on the seashore.'
          },
          {
            page_number: 4,
            image_url: 'assets/covers/malin_kundang.svg',
            text_id: 'Tahun demi tahun berlalu. Malin bekerja sangat keras hingga menjadi saudagar kaya raya yang memiliki kapal megah bertiang tinggi dan anak buah yang banyak.',
            text_en: 'Years went by. Malin worked tirelessly and eventually became a prosperous merchant owning a magnificent tall-masted ship and many crew members.'
          },
          {
            page_number: 5,
            image_url: 'assets/covers/malin_kundang.svg',
            text_id: 'Suatu hari, kapal megah Malin berlabuh di pantai kelahirannya. Mande Rubayah yang sudah tua renta berlari menyambut sang anak dengan air mata bahagia. "Malin, anakku! Kau sudah pulang!" serunya riang.',
            text_en: 'One sunny day, Malin’s magnificent vessel anchored at his birthplace. The elderly Mande Rubayah hurried down to the shore with tears of joy, crying out: "Malin, my son! You have returned!"'
          },
          {
            page_number: 6,
            image_url: 'assets/covers/malin_kundang.svg',
            text_id: 'Namun Malin merasa malu mengakui ibunya yang berpakaian lusuh di hadapan istrinya yang bangsawan dan awak kapalnya. Ia mendorong ibunya hingga terjatuh ke pasir.',
            text_en: 'Ashamed of his mother’s humble, ragged clothes in front of his wealthy wife and crew, Malin harshly denied knowing her and pushed her onto the sands.'
          },
          {
            page_number: 7,
            image_url: 'assets/covers/malin_kundang.svg',
            text_id: 'Hati Mande Rubayah teramat hancur. Langit tiba-tiba menjadi gelap gulita, petir menggelegar, dan badai dahsyat menghantam kapal Malin hingga kapal dan dirinya membeku menjadi batu karang di tepi pantai.',
            text_en: 'Deeply broken-hearted, his mother wept. Sudden dark clouds covered the sky, thunder roared, and a fierce storm struck Malin’s ship, turning it and Malin into stone on the seashore.'
          },
          {
            page_number: 8,
            image_url: 'assets/covers/malin_kundang.svg',
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
        cover_url: 'assets/covers/timun_mas.svg',
        has_pdf: true,
        status: 'published',
        created_at: '2026-01-22T11:00:00.000Z',
        updated_at: '2026-09-02T10:00:00.000Z',
        description_id: 'Petualangan Timun Mas yang berani dan cerdik menghadapi Raksasa dengan bekal empat bungkusan ajaib dari ibunya.',
        description_en: 'The brave adventure of Timun Mas, a clever girl who outwitted the Giant using four magical gifts bestowed by her caring mother.',
        pages: [
          {
            page_number: 1,
            image_url: 'assets/covers/timun_mas.svg',
            text_id: 'Mbok Srini adalah seorang wanita tua yang tinggal sendirian di dekat hutan. Setiap hari ia berdoa agar dikaruniai seorang anak untuk menemaninya.',
            text_en: 'Mbok Srini was an elderly woman living quietly near the green forest. Every evening she prayed for a child to keep her company.'
          },
          {
            page_number: 2,
            image_url: 'assets/covers/timun_mas.svg',
            text_id: 'Suatu hari, seorang raksasa memberinya sebutir biji mentimun ajaib. Ketika ditanam, dari buah mentimun emas yang membesar lahirlah seorang bayi perempuan cantik yang diberi nama Timun Mas.',
            text_en: 'One day, a forest giant gave her a magical cucumber seed. From the giant golden cucumber that grew, a lovely baby girl was born, whom she named Timun Mas.'
          },
          {
            page_number: 3,
            image_url: 'assets/covers/timun_mas.svg',
            text_id: 'Timun Mas tumbuh menjadi gadis yang ceria, pandai, dan berbudi luhur. Saat usia 16 tahun, raksasa datang untuk menagih janjinya.',
            text_en: 'Timun Mas grew into a cheerful, clever, and kind girl. When she turned sixteen, the giant returned to fulfill his claim.'
          },
          {
            page_number: 4,
            image_url: 'assets/covers/timun_mas.svg',
            text_id: 'Mbok Srini membekali Timun Mas empat kantong ajaib: biji mentimun, jarum, garam, dan terasi. Timun Mas pun berlari sekuat tenaga memasuki hutan.',
            text_en: 'Mbok Srini gave Timun Mas four magical pouches containing cucumber seeds, needles, salt, and shrimp paste, bidding her to run safely into the forest.'
          },
          {
            page_number: 5,
            image_url: 'assets/covers/timun_mas.svg',
            text_id: 'Biji mentimun dilempar menjadi kebun lebat, jarum menjadi hutan bambu runcing, garam berubah menjadi lautan luas, dan terasi menjadi lumpur mendidih yang menahan raksasa.',
            text_en: 'The cucumber seeds turned into a dense melon field, the needles into sharp bamboo woods, the salt into a wide sea, and the shrimp paste into bubbling mud that stopped the giant.'
          },
          {
            page_number: 6,
            image_url: 'assets/covers/timun_mas.svg',
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
        cover_url: 'assets/covers/bawang_merah_putih.svg',
        has_pdf: true,
        status: 'published',
        created_at: '2026-01-25T09:00:00.000Z',
        updated_at: '2026-09-02T15:00:00.000Z',
        description_id: 'Kisah tentang Bawang Putih yang berhati lembut dan sabar, serta pelajaran berharga tentang ketulusan yang selalu mendatangkan kebaikan sejati.',
        description_en: 'A touching tale of kind-hearted Bawang Putih, teaching children that sincerity, diligence, and patience always yield genuine blessings.',
        pages: [
          {
            page_number: 1,
            image_url: 'assets/covers/bawang_merah_putih.svg',
            text_id: 'Bawang Putih adalah gadis desa yang rajin, penyayang, dan rendah hati. Ia tinggal bersama ibu tiri dan saudara tirinya, Bawang Merah, yang sering bersikap manja.',
            text_en: 'Bawang Putih was a diligent, gentle, and humble girl. She lived with her stepmother and stepsister, Bawang Merah, who was vain and spoiled.'
          },
          {
            page_number: 2,
            image_url: 'assets/covers/bawang_merah_putih.svg',
            text_id: 'Suatu hari saat mencuci di sungai, sehelai selendang kesayangan ibunya hanyut terbawa arus. Bawang Putih menyusuri aliran sungai untuk mencarinya.',
            text_en: 'One morning while washing clothes at the river, her stepmother’s favorite shawl drifted away with the current. Bawang Putih walked downstream to find it.'
          },
          {
            page_number: 3,
            image_url: 'assets/covers/bawang_merah_putih.svg',
            text_id: 'Di hulu sungai, ia bertemu seorang nenek tua yang ramah. Bawang Putih dengan tulus membantu membersihkan rumah dan memasak untuk sang nenek.',
            text_en: 'Deep in the valley, she met a kind elderly grandmother. Bawang Putih whole-heartedly assisted her with housekeeping and cooking tasty meals.'
          },
          {
            page_number: 4,
            image_url: 'assets/covers/bawang_merah_putih.svg',
            text_id: 'Sebagai rasa terima kasih, nenek mengembalikan selendang dan menawarkan labu kecil atau labu besar. Bawang Putih dengan rendah hati memilih labu kecil.',
            text_en: 'In gratitude, the grandmother returned the shawl and offered her a choice between a small pumpkin or a large one. Modest Bawang Putih chose the small pumpkin.'
          },
          {
            page_number: 5,
            image_url: 'assets/covers/bawang_merah_putih.svg',
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
        cover_url: 'assets/covers/kancil_buaya.svg',
        has_pdf: true,
        status: 'published',
        created_at: '2026-02-01T08:00:00.000Z',
        updated_at: '2026-09-03T11:00:00.000Z',
        description_id: 'Kancil yang cerdik ingin menyeberangi sungai untuk memetik buah-buahan segar di seberang dengan mengajak para buaya berbaris rapi.',
        description_en: 'The quick-witted mousedeer cleverly crossed a wide river to reach juicy fruits on the opposite bank by inviting the crocodiles to line up.',
        pages: [
          {
            page_number: 1,
            image_url: 'assets/covers/kancil_buaya.svg',
            text_id: 'Di tepi hutan yang asri, si Kancil memandang buah-buahan ranum yang manis di seberang sungai. Namun sungai itu dalam dan dipenuhi buaya.',
            text_en: 'At the edge of a lush green forest, little Kancil gazed at the ripe, sweet fruits across the river. However, the river was deep and full of crocodiles.'
          },
          {
            page_number: 2,
            image_url: 'assets/covers/kancil_buaya.svg',
            text_id: 'Kancil tidak kehabisan akal. Ia memanggil Sang Buaya: "Hai sahabat buaya! Raja Hutan ingin menghitung jumlah kalian untuk jamuan pesta!"',
            text_en: 'Kancil was quick on his feet. He called out: "Hey crocodile friends! The Forest King wishes to count all of you for a grand feast!"'
          },
          {
            page_number: 3,
            image_url: 'assets/covers/kancil_buaya.svg',
            text_id: 'Para buaya merasa senang dan langsung berbaris dari tepi ke seberang membentuk jembatan. Kancil melompat gembira sambil menghitung: "Satu, dua, tiga, empat..."',
            text_en: 'Excited by the news, the crocodiles lined up from one bank to the other. Kancil hopped from back to back, counting merrily: "One, two, three, four..."'
          },
          {
            page_number: 4,
            image_url: 'assets/covers/kancil_buaya.svg',
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
        cover_url: 'assets/covers/sangkuriang.svg',
        has_pdf: true,
        status: 'published',
        created_at: '2026-02-05T12:00:00.000Z',
        updated_at: '2026-09-02T14:00:00.000Z',
        description_id: 'Legenda asal usul Gunung Tangkuban Parahu dari tanah Pasundan yang sarat pesan penting tentang kejujuran dan takdir alam.',
        description_en: 'The classic West Javanese legend recounting the origin of Mount Tangkuban Parahu, delivering timeless lessons on truthfulness and fate.',
        pages: [
          {
            page_number: 1,
            image_url: 'assets/covers/sangkuriang.svg',
            text_id: 'Di daerah Priangan yang sejuk, Dayang Sumbi adalah seorang putri yang cantik jelita dan gemar menenun kain.',
            text_en: 'In the tranquil highlands of Priangan, Dayang Sumbi was a radiant princess who loved weaving delicate fabrics.'
          },
          {
            page_number: 2,
            image_url: 'assets/covers/sangkuriang.svg',
            text_id: 'Ia memiliki seorang putra bernama Sangkuriang yang gemar berburu di hutan bersama anjing setianya yang bernama Tumang.',
            text_en: 'She had an energetic son named Sangkuriang who loved exploring the forest accompanied by his loyal companion, Tumang.'
          },
          {
            page_number: 3,
            image_url: 'assets/covers/sangkuriang.svg',
            text_id: 'Setelah bertahun-tahun mengembara di berbagai negeri, Sangkuriang kembali sebagai pemuda gagah. Namun ia tidak menyadari tanah asalnya.',
            text_en: 'After wandering across distant lands for many seasons, Sangkuriang returned as a tall and strong youth, unaware of his origins.'
          },
          {
            page_number: 4,
            image_url: 'assets/covers/sangkuriang.svg',
            text_id: 'Dayang Sumbi menyadari identitas putranya dan mengajukan syarat membuat danau dan perahu besar sebelum terbit fajar sebagai ujian mustahil.',
            text_en: 'Dayang Sumbi recognized him and set a monumental test: to construct a vast lake and a mighty boat before dawn broke.'
          },
          {
            page_number: 5,
            image_url: 'assets/covers/sangkuriang.svg',
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
        cover_url: 'assets/covers/lutung_kasarung.svg',
        has_pdf: true,
        status: 'published',
        created_at: '2026-02-10T10:00:00.000Z',
        updated_at: '2026-09-03T16:00:00.000Z',
        description_id: 'Kisah kasih dan kesetiaan Purbasari dan pangeran berwujud lutung yang membuktikan bahwa ketulusan hati melampaui rupa lahiriah.',
        description_en: 'The heartwarming story of Princess Purbasari and a mystical langur, proving that inner goodness always triumphs over superficial appearances.',
        pages: [
          {
            page_number: 1,
            image_url: 'assets/covers/lutung_kasarung.svg',
            text_id: 'Putri Purbasari adalah putri raja Pasir Batang yang berhati emas, selalu santun dan dicintai seluruh rakyat kerajaan.',
            text_en: 'Princess Purbasari was a kind-hearted royal from Pasir Batang, beloved by all her people for her grace and warm compassion.'
          },
          {
            page_number: 2,
            image_url: 'assets/covers/lutung_kasarung.svg',
            text_id: 'Saat diasingkan ke hutan oleh kakaknya yang iri hati, Purbasari ditemani seekor kera hitam bijaksana bernama Lutung Kasarung.',
            text_en: 'Exiled to the tranquil forest by an envious elder sister, Purbasari was sheltered and befriended by a wise langur named Lutung Kasarung.'
          },
          {
            page_number: 3,
            image_url: 'assets/covers/lutung_kasarung.svg',
            text_id: 'Lutung Kasarung menciptakan telaga air hangat jernih yang memulihkan kecantikan Purbasari seperti sedia kala.',
            text_en: 'Lutung Kasarung led her to a crystal-clear natural warm spring that revitalized Purbasari with renewed radiance and health.'
          },
          {
            page_number: 4,
            image_url: 'assets/covers/lutung_kasarung.svg',
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
        cover_url: 'assets/cover_kelinci.png',
        has_pdf: true,
        status: 'published',
        created_at: '2026-02-15T09:00:00.000Z',
        updated_at: '2026-09-01T08:00:00.000Z',
        description_id: 'Lulu adalah kelinci kecil yang penuh rasa ingin tahu, belajar bahwa keberanian dan sopan santun membuka pintu persahabatan baru.',
        description_en: 'Lulu the little white bunny explores the pine forest and discovers that courage and friendly manners welcome wonderful new companions.',
        pages: [
          {
            page_number: 1,
            image_url: 'assets/cover_kelinci.png',
            text_id: 'Di padang rumput hijau yang luas, hiduplah seekor kelinci putih kecil bernama Lulu. Lulu sangat suka melompat dan mengamati kupu-kupu.',
            text_en: 'In a wide green meadow lived a playful white bunny named Lulu. Lulu loved hopping around and watching colorful butterflies.'
          },
          {
            page_number: 2,
            image_url: 'assets/cover_kelinci.png',
            text_id: 'Suatu pagi, Lulu memberanikan diri berjalan ke Hutan Cemara. Di sana ia melihat bunga-bunga harum berwarna ungu dan kuning.',
            text_en: 'One bright morning, Lulu hopped curiously into the Pine Forest, discovering fragrant yellow and lavender wildflowers along the trail.'
          },
          {
            page_number: 3,
            image_url: 'assets/cover_kelinci.png',
            text_id: 'Tiba-tiba, ia berpapasan dengan Burung Hantu besar. Lulu menyapa dengan sopan, "Selamat pagi Paman Burung Hantu!"',
            text_en: 'Suddenly, he met a large wise Owl perched on a branch. Lulu greeted politely: "Good morning, Uncle Owl!"'
          },
          {
            page_number: 4,
            image_url: 'assets/cover_kelinci.png',
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
        cover_url: 'assets/cover_gajah.png',
        has_pdf: true,
        status: 'published',
        created_at: '2026-02-18T10:00:00.000Z',
        updated_at: '2026-09-02T09:00:00.000Z',
        description_id: 'Gugi si gajah berbadan besar selalu siap sedia membantu teman-temannya di hutan yang sedang kesusahan.',
        description_en: 'Gugi the giant elephant uses his gentle strength and long trunk to help woodland friends whenever in need.',
        pages: [
          {
            page_number: 1,
            image_url: 'assets/cover_gajah.png',
            text_id: 'Gugi adalah anak gajah yang bertubuh besar. Walau badannya besar, Gugi selalu tersenyum manis dan suka menolong.',
            text_en: 'Gugi was a big young elephant. Despite his huge size, Gugi always wore a warm smile and loved extending a helping hand.'
          },
          {
            page_number: 2,
            image_url: 'assets/cover_gajah.png',
            text_id: 'Ketika angin kencang berhembus, sarang burung kecil terjatuh dari dahan pohon yang tinggi. Anak-anak burung menciap ketakutan.',
            text_en: 'When a strong breeze blew, a little bird nest slipped from a tall oak branch. The chicks chirped anxiously.'
          },
          {
            page_number: 3,
            image_url: 'assets/cover_gajah.png',
            text_id: 'Gugi dengan hati-hati mengangkat sarang itu dengan belalainya yang panjang dan mengembalikannya ke dahan yang aman.',
            text_en: 'Gugi carefully lifted the nest using his long, gentle trunk and placed it safely back upon the sturdy branch.'
          },
          {
            page_number: 4,
            image_url: 'assets/cover_gajah.png',
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
        thumbnail: 'assets/modules/modul_kognitif.svg',
        has_pdf: true,
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
        thumbnail: 'assets/modules/modul_bahasa.svg',
        has_pdf: true,
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
        thumbnail: 'assets/modules/modul_sosial.svg',
        has_pdf: true,
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
        thumbnail: 'assets/modules/modul_motorik.svg',
        has_pdf: true,
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
        thumbnail: 'assets/modules/modul_lingkungan.svg',
        has_pdf: true,
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
        thumbnail: 'assets/modules/modul_numerasi.svg',
        has_pdf: true,
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

  function getData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        saveData(initialData);
        return initialData;
      }
      const parsed = JSON.parse(raw);
      if (!parsed.books || parsed.books.length === 0) {
        parsed.books = initialData.books;
      }
      if (!parsed.modules || parsed.modules.length === 0) {
        parsed.modules = initialData.modules;
      }
      if (!parsed.users || parsed.users.length === 0) {
        parsed.users = initialData.users;
      }
      return parsed;
    } catch {
      saveData(initialData);
      return initialData;
    }
  }

  function saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  // Users & Auth
  function verifyLogin(email, password) {
    const data = getData();
    const em = (email || '').toLowerCase().trim();
    const user = data.users.find(u => u.email.toLowerCase() === em);
    if (!user) {
      throw new Error('Email atau password tidak sesuai.');
    }
    // Simple password verification for static browser mode
    const pass = (password || '').trim();
    const isMatch = (user.role === 'admin' && (pass === 'admin123' || pass === 'admin')) ||
                    (user.role === 'user' && (pass === 'user123' || pass === 'budi123' || pass.length >= 4));

    if (!isMatch) {
      throw new Error('Password yang dimasukkan salah.');
    }

    user.last_active = new Date().toISOString();
    saveData(data);

    const token = 'ghp-mock-jwt-' + btoa(user.id + ':' + Date.now());
    return { token, user };
  }

  function register(userData) {
    const data = getData();
    const em = (userData.email || '').toLowerCase().trim();
    if (data.users.some(u => u.email.toLowerCase() === em)) {
      throw new Error('Email ini sudah terdaftar.');
    }

    const newUser = {
      id: 'usr-' + Date.now(),
      name: userData.name || 'Pengguna Baru',
      email: em,
      role: 'user',
      created_at: new Date().toISOString(),
      last_active: new Date().toISOString(),
      books_read: 0,
      status: 'active'
    };
    data.users.push(newUser);
    saveData(data);

    const token = 'ghp-mock-jwt-' + btoa(newUser.id + ':' + Date.now());
    return { token, user: newUser };
  }

  // Books
  function getBooks(params = {}) {
    const data = getData();
    let books = [...data.books];
    if (params.category && params.category !== 'Semua') {
      books = books.filter(b => b.category.toLowerCase() === params.category.toLowerCase());
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      books = books.filter(b =>
        b.title_id.toLowerCase().includes(q) ||
        (b.title_en && b.title_en.toLowerCase().includes(q)) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      );
    }
    // Normalize cover_url paths to relative
    return books.map(b => ({
      ...b,
      cover_url: fixAssetUrl(b.cover_url)
    }));
  }

  function getBookById(id) {
    const data = getData();
    const b = data.books.find(x => x.id === id);
    if (!b) throw new Error('Buku tidak ditemukan.');
    return {
      ...b,
      cover_url: fixAssetUrl(b.cover_url),
      pages: (b.pages || []).map(p => ({
        ...p,
        image_url: fixAssetUrl(p.image_url)
      }))
    };
  }

  function createBook(bookData) {
    const data = getData();
    const newBook = {
      id: 'book-' + Date.now(),
      title_id: bookData.title_id || 'Buku Cerita Baru',
      title_en: bookData.title_en || 'New Story Book',
      author: bookData.author || 'Penulis PGPAUD',
      origin: bookData.origin || 'Indonesia',
      category: bookData.category || 'Cerita Rakyat',
      age_range: bookData.age_range || '4–7 Tahun',
      read_time: bookData.read_time || '5 Menit',
      cover_url: fixAssetUrl(bookData.cover_url || 'assets/cover_bintang.svg'),
      has_pdf: true,
      status: 'published',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      description_id: bookData.description_id || '',
      description_en: bookData.description_en || '',
      pages: bookData.pages && bookData.pages.length > 0 ? bookData.pages : [
        {
          page_number: 1,
          image_url: fixAssetUrl(bookData.cover_url || 'assets/cover_bintang.svg'),
          text_id: bookData.description_id || 'Awal dari sebuah kisah anak yang indah dan mendidik.',
          text_en: bookData.description_en || 'The beginning of a wonderful and educational children story.'
        }
      ]
    };
    data.books.unshift(newBook);
    saveData(data);
    return newBook;
  }

  function updateBook(id, updates) {
    const data = getData();
    const idx = data.books.findIndex(b => b.id === id);
    if (idx === -1) throw new Error('Buku tidak ditemukan.');
    data.books[idx] = {
      ...data.books[idx],
      ...updates,
      cover_url: fixAssetUrl(updates.cover_url || data.books[idx].cover_url),
      updated_at: new Date().toISOString()
    };
    saveData(data);
    return data.books[idx];
  }

  function deleteBook(id) {
    const data = getData();
    data.books = data.books.filter(b => b.id !== id);
    saveData(data);
    return { success: true };
  }

  // Modules
  function getModules(params = {}) {
    const data = getData();
    let mods = [...data.modules];
    if (params.category && params.category !== 'Semua') {
      mods = mods.filter(m => m.category.toLowerCase().includes(params.category.toLowerCase()));
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      mods = mods.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      );
    }
    return mods.map(m => ({
      ...m,
      thumbnail: fixAssetUrl(m.thumbnail)
    }));
  }

  function getModuleById(id) {
    const data = getData();
    const m = data.modules.find(x => x.id === id);
    if (!m) throw new Error('Modul tidak ditemukan.');
    return {
      ...m,
      thumbnail: fixAssetUrl(m.thumbnail)
    };
  }

  function createModule(modData) {
    const data = getData();
    const newMod = {
      id: 'mod-' + Date.now(),
      title: modData.title || 'Modul Pembelajaran Baru',
      category: modData.category || 'Kognitif',
      age_range: modData.age_range || '4–5 Tahun',
      description: modData.description || '',
      thumbnail: fixAssetUrl(modData.thumbnail || 'assets/modules/modul_kognitif.svg'),
      has_pdf: true,
      status: 'published',
      objectives: modData.objectives || ['Mendukung stimulasi tumbuh kembang AUD'],
      created_at: new Date().toISOString()
    };
    data.modules.unshift(newMod);
    saveData(data);
    return newMod;
  }

  function updateModule(id, updates) {
    const data = getData();
    const idx = data.modules.findIndex(m => m.id === id);
    if (idx === -1) throw new Error('Modul tidak ditemukan.');
    data.modules[idx] = {
      ...data.modules[idx],
      ...updates,
      thumbnail: fixAssetUrl(updates.thumbnail || data.modules[idx].thumbnail)
    };
    saveData(data);
    return data.modules[idx];
  }

  function deleteModule(id) {
    const data = getData();
    data.modules = data.modules.filter(m => m.id !== id);
    saveData(data);
    return { success: true };
  }

  // Reading Progress
  function saveProgress(userId, bookId, page, lang = 'id') {
    const data = getData();
    if (!data.reading_progress) data.reading_progress = {};
    const key = `${userId || 'guest'}_${bookId}`;
    data.reading_progress[key] = {
      page: Number(page) || 1,
      language: lang,
      updated_at: new Date().toISOString()
    };
    saveData(data);
    return data.reading_progress[key];
  }

  function getProgress(userId, bookId) {
    const data = getData();
    if (!data.reading_progress) return null;
    return data.reading_progress[`${userId || 'guest'}_${bookId}`] || null;
  }

  // Admin Stats
  function getAdminStats() {
    const data = getData();
    const totalReads = Object.keys(data.reading_progress || {}).length + 45;
    return {
      total_books: data.books.length,
      total_modules: data.modules.length,
      total_users: data.users.length,
      total_reads: totalReads,
      active_readers: data.users.filter(u => u.status === 'active').length,
      recent_books: data.books.slice(0, 5).map(b => ({ ...b, cover_url: fixAssetUrl(b.cover_url) })),
      recent_modules: data.modules.slice(0, 5).map(m => ({ ...m, thumbnail: fixAssetUrl(m.thumbnail) })),
      category_distribution: {
        'Cerita Rakyat': data.books.filter(b => b.category === 'Cerita Rakyat').length,
        'Fabel': data.books.filter(b => b.category === 'Fabel').length,
        'Moral': data.books.filter(b => b.category === 'Moral').length,
        'Pendidikan': data.books.filter(b => b.category === 'Pendidikan').length,
        'Petualangan': data.books.filter(b => b.category === 'Petualangan').length
      }
    };
  }

  function getAdminUsers() {
    const data = getData();
    return data.users;
  }

  // Client-side PDF Printable Sheet Generator
  function printBookPdf(bookId, lang = 'id') {
    const b = getBookById(bookId);
    const isEn = lang === 'en';
    const title = isEn && b.title_en ? b.title_en : b.title_id;
    const desc = isEn && b.description_en ? b.description_en : b.description_id;

    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('Mohon izinkan pop-up browser untuk mencetak PDF.');
      return;
    }

    const pagesHtml = (b.pages || []).map(p => `
      <div style="page-break-after: always; padding: 40px; font-family: 'Outfit', sans-serif; text-align: center;">
        <div style="font-size: 0.9rem; color: #64748B; margin-bottom: 20px;">
          Kinder Story Space - PGPAUD | Halaman ${p.page_number} dari ${b.pages.length}
        </div>
        <img src="${fixAssetUrl(p.image_url)}" alt="Ilustrasi" style="max-width: 400px; max-height: 320px; border-radius: 16px; object-fit: contain; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.1);">
        <h2 style="color: #0B2447; margin-bottom: 16px;">${title}</h2>
        <p style="font-size: 1.25rem; line-height: 1.8; color: #1E293B; max-width: 650px; margin: 0 auto; text-align: justify;">
          ${isEn && p.text_en ? p.text_en : p.text_id}
        </p>
      </div>
    `).join('');

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title} - Kinder Story Space PDF</title>
        <style>
          @page { size: A4; margin: 20mm; }
          body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #FFF; }
          .cover-page { text-align: center; padding: 80px 20px; page-break-after: always; }
          .cover-img { max-width: 280px; max-height: 280px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
          .cover-title { font-size: 2.2rem; color: #0B2447; margin-top: 24px; }
          .badge { display: inline-block; background: #EEF7FF; color: #1687F8; padding: 6px 18px; border-radius: 20px; font-weight: bold; margin-top: 10px; }
          .cover-desc { max-width: 580px; margin: 20px auto; color: #475569; font-size: 1.1rem; line-height: 1.6; }
          .footer-note { margin-top: 60px; font-size: 0.85rem; color: #94A3B8; }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="background: #1687F8; color: white; padding: 12px; text-align: center; font-weight: bold;">
          Klik tombol cetak atau gunakan menu browser: Print (Ctrl+P) lalu pilih "Save as PDF"
          <button onclick="window.print()" style="margin-left: 15px; padding: 6px 16px; background: #FFF; color: #1687F8; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">🖨️ Cetak / Simpan PDF</button>
        </div>

        <div class="cover-page">
          <img src="${fixAssetUrl(b.cover_url)}" class="cover-img" alt="${title}">
          <h1 class="cover-title">${title}</h1>
          <div class="badge">${b.category} • Usia ${b.age_range}</div>
          <p class="cover-desc">${desc}</p>
          <div style="font-size: 0.95rem; color: #64748B; margin-top: 15px;">
            Karya: <strong>${b.author}</strong> | Asal: <strong>${b.origin}</strong>
          </div>
          <div class="footer-note">
            Diterbitkan oleh Digital Story Space - Penelitian PGPAUD UPI Kampus Cibiru (2026)
          </div>
        </div>

        ${pagesHtml}

        <script>
          setTimeout(() => { window.print(); }, 800);
        <\/script>
      </body>
      </html>
    `);
    printWin.document.close();
  }

  function printModulePdf(moduleId) {
    const m = getModuleById(moduleId);
    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('Mohon izinkan pop-up browser untuk mencetak PDF.');
      return;
    }

    const objHtml = (m.objectives || []).map(o => `<li style="margin-bottom: 10px; font-size: 1.1rem; color: #334155;">${o}</li>`).join('');

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${m.title} - Modul PGPAUD</title>
        <style>
          @page { size: A4; margin: 20mm; }
          body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 20px; background: #FFF; }
          .header { text-align: center; border-bottom: 2px solid #E2E8F0; padding-bottom: 24px; margin-bottom: 30px; }
          .badge { display: inline-block; background: #EEF7FF; color: #1687F8; padding: 6px 18px; border-radius: 20px; font-weight: bold; }
          @media print { .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="no-print" style="background: #1687F8; color: white; padding: 12px; text-align: center; font-weight: bold; margin-bottom: 20px; border-radius: 8px;">
          Pratinjau Modul Pembelajaran PGPAUD
          <button onclick="window.print()" style="margin-left: 15px; padding: 6px 16px; background: #FFF; color: #1687F8; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">🖨️ Cetak / Simpan PDF</button>
        </div>

        <div class="header">
          <img src="${fixAssetUrl(m.thumbnail)}" style="width: 120px; height: 120px; border-radius: 24px; object-fit: contain; margin-bottom: 12px;">
          <h1 style="color: #0B2447; margin: 8px 0;">${m.title}</h1>
          <div class="badge">${m.category} • Sasaran: ${m.age_range}</div>
        </div>

        <div style="max-width: 700px; margin: 0 auto;">
          <h3 style="color: #0B2447; border-bottom: 1px solid #CBD5E1; padding-bottom: 8px;">📖 Deskripsi Modul</h3>
          <p style="font-size: 1.15rem; line-height: 1.7; color: #334155;">${m.description}</p>

          <h3 style="color: #0B2447; border-bottom: 1px solid #CBD5E1; padding-bottom: 8px; margin-top: 32px;">🎯 Capaian Pembelajaran (Objectives)</h3>
          <ul style="padding-left: 24px; line-height: 1.6;">
            ${objHtml}
          </ul>

          <div style="margin-top: 50px; padding: 20px; background: #F8FAFC; border-radius: 12px; border-left: 4px solid #1687F8;">
            <strong style="color: #0B2447;">Pedoman Guru / Fasilitator:</strong>
            <p style="color: #475569; font-size: 0.95rem; margin-top: 6px;">
              Gunakan stimulasi konkret, apresiasi setiap partisipasi anak secara positif, dan dampingi kegiatan dengan lagu atau permainan sensorik.
            </p>
          </div>

          <div style="margin-top: 40px; text-align: center; font-size: 0.85rem; color: #94A3B8;">
            Modul Pembelajaran Resmi PGPAUD UPI Kampus Cibiru • Kinder Story Space (2026)
          </div>
        </div>

        <script>
          setTimeout(() => { window.print(); }, 800);
        <\/script>
      </body>
      </html>
    `);
    printWin.document.close();
  }

  return {
    getData,
    saveData,
    verifyLogin,
    register,
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    getModules,
    getModuleById,
    createModule,
    updateModule,
    deleteModule,
    saveProgress,
    getProgress,
    getAdminStats,
    getAdminUsers,
    printBookPdf,
    printModulePdf,
    fixAssetUrl
  };
})();
