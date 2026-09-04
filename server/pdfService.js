const PDFDocument = require('pdfkit');

function generateBookPdf(book, language = 'id', res) {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 50,
    info: {
      Title: language === 'en' ? book.title_en || book.title_id : book.title_id,
      Author: book.author,
      Subject: 'Kinder Story Space - E-Book Anak PGPAUD'
    }
  });

  // Pipe to HTTP response
  doc.pipe(res);

  // Title Banner / Header
  doc.rect(0, 0, 595.28, 120).fill('#EEF7FF');

  // Decorative Accent
  doc.circle(520, 40, 20).fill('#FFC928');
  doc.circle(80, 90, 12).fill('#1687F8');

  doc.fillColor('#1687F8')
     .fontSize(12)
     .font('Helvetica-Bold')
     .text('KINDER STORY SPACE • EDISI BUKU CERITA DIGITAL PGPAUD', 50, 35);

  const title = language === 'en' ? (book.title_en || book.title_id) : book.title_id;
  doc.fillColor('#0B2447')
     .fontSize(24)
     .font('Helvetica-Bold')
     .text(title, 50, 55);

  const subtitle = `${book.category} • Usia: ${book.age_range} • ${book.origin}`;
  doc.fillColor('#475569')
     .fontSize(10)
     .font('Helvetica')
     .text(subtitle, 50, 85);

  doc.moveDown(4);

  // Metadata Card
  doc.rect(50, 140, 495.28, 70).fillAndStroke('#F5F7FA', '#E2E8F0');
  doc.fillColor('#0B2447')
     .fontSize(11)
     .font('Helvetica-Bold')
     .text(language === 'en' ? 'Story Overview:' : 'Tentang Cerita:', 65, 150);

  const synopsis = language === 'en' ? (book.description_en || book.description_id) : book.description_id;
  doc.fillColor('#334155')
     .fontSize(9.5)
     .font('Helvetica')
     .text(synopsis, 65, 168, { width: 465, align: 'left', lineGap: 3 });

  // Story Content Pages
  doc.y = 230;
  doc.fillColor('#1687F8')
     .fontSize(14)
     .font('Helvetica-Bold')
     .text(language === 'en' ? 'Story Chapters' : 'Isi Cerita Lengkap', 50, doc.y);
  
  doc.moveDown(0.8);

  const pages = book.pages || [];
  pages.forEach((page, idx) => {
    // Check page break
    if (doc.y > 680) {
      doc.addPage();
      doc.y = 50;
    }

    doc.rect(50, doc.y, 495.28, 22).fill('#EEF7FF');
    doc.fillColor('#0B2447')
       .fontSize(10)
       .font('Helvetica-Bold')
       .text(`${language === 'en' ? 'Page' : 'Halaman'} ${idx + 1}`, 60, doc.y + 6);

    doc.moveDown(1.2);

    const storyText = language === 'en' ? (page.text_en || page.text_id) : page.text_id;
    doc.fillColor('#1E293B')
       .fontSize(10.5)
       .font('Helvetica')
       .text(storyText, 60, doc.y, { width: 475, lineGap: 4 });

    doc.moveDown(1.5);
  });

  // Footer on current page
  if (doc.y > 720) doc.addPage();
  
  doc.rect(50, 750, 495.28, 1).fill('#CBD5E1');
  doc.fillColor('#64748B')
     .fontSize(8.5)
     .font('Helvetica')
     .text('© 2026 Kinder Story Space • Universitas Pendidikan Indonesia – Kampus Cibiru', 50, 762, { align: 'center', width: 495.28 });

  doc.end();
}

function generateModulePdf(moduleItem, res) {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 50,
    info: {
      Title: moduleItem.title,
      Subject: 'Modul Pembelajaran PGPAUD'
    }
  });

  doc.pipe(res);

  // Top header banner
  doc.rect(0, 0, 595.28, 120).fill('#EEF7FF');
  doc.circle(530, 45, 22).fill('#FFC928');

  doc.fillColor('#1687F8')
     .fontSize(11)
     .font('Helvetica-Bold')
     .text('KINDER STORY SPACE • MODUL PEMBELAJARAN PGPAUD', 50, 35);

  doc.fillColor('#0B2447')
     .fontSize(22)
     .font('Helvetica-Bold')
     .text(moduleItem.title, 50, 55);

  doc.fillColor('#475569')
     .fontSize(10)
     .font('Helvetica')
     .text(`Kategori: ${moduleItem.category} | Rekomendasi Usia: ${moduleItem.age_range}`, 50, 85);

  doc.moveDown(4);

  // Description Card
  doc.rect(50, 140, 495.28, 75).fillAndStroke('#F8FAFC', '#E2E8F0');
  doc.fillColor('#0B2447')
     .fontSize(12)
     .font('Helvetica-Bold')
     .text('Deskripsi Modul:', 65, 152);

  doc.fillColor('#334155')
     .fontSize(10)
     .font('Helvetica')
     .text(moduleItem.description, 65, 172, { width: 465, lineGap: 3 });

  // Objectives
  doc.y = 235;
  doc.fillColor('#1687F8')
     .fontSize(13)
     .font('Helvetica-Bold')
     .text('Tujuan Pembelajaran AUD (Aspek Perkembangan):', 50, doc.y);

  doc.moveDown(0.8);

  const objectives = moduleItem.objectives || [
    'Mendukung perkembangan motorik dan stimulasi kognitif anak usia dini',
    'Membangun keterlibatan aktif siswa dalam kegiatan eksplorasi ruang kelas',
    'Menumbuhkan rasa ingin tahu serta kemampuan literasi dan komunikasi'
  ];

  objectives.forEach((obj, idx) => {
    doc.fillColor('#0B2447')
       .fontSize(10.5)
       .font('Helvetica-Bold')
       .text(`${idx + 1}.`, 65, doc.y, { continued: true });
    doc.fillColor('#1E293B')
       .font('Helvetica')
       .text(` ${obj}`, { lineGap: 4 });
    doc.moveDown(0.5);
  });

  doc.moveDown(1.5);

  // Teaching Tips
  doc.rect(50, doc.y, 495.28, 120).fill('#FEF9C3');
  const tipY = doc.y;
  doc.fillColor('#854D0E')
     .fontSize(11)
     .font('Helvetica-Bold')
     .text('💡 Panduan Guru & Orang Tua (PGPAUD):', 65, tipY + 15);

  doc.fillColor('#713F12')
     .fontSize(9.5)
     .font('Helvetica')
     .text(
       '1. Awali kegiatan dengan lagu riang atau apersepsi cerita pendek yang relevan.\n' +
       '2. Berikan apresiasi dan kalimat positif atas setiap respon serta keterlibatan anak.\n' +
       '3. Libatkan anak dalam interaksi aktif dua arah untuk merangsang rasa percaya diri.\n' +
       '4. Evaluasi perkembangan anak melalui catatan anekdot dan portofolio karya.',
       65, tipY + 35, { width: 465, lineGap: 4 }
     );

  // Footer
  doc.rect(50, 750, 495.28, 1).fill('#CBD5E1');
  doc.fillColor('#64748B')
     .fontSize(8.5)
     .font('Helvetica')
     .text('© 2026 Kinder Story Space • Universitas Pendidikan Indonesia – Kampus Cibiru', 50, 762, { align: 'center', width: 495.28 });

  doc.end();
}

module.exports = {
  generateBookPdf,
  generateModulePdf
};
