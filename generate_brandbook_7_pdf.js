const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Flowerjuicee · The 7 Celestial Blooms Brand Book</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;800&family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4;
      margin: 10mm 12mm 12mm 12mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #2b2633;
      background-color: #faf8f5;
      font-size: 9.5pt;
      line-height: 1.5;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page {
      page-break-after: always;
      position: relative;
      padding-bottom: 20px;
    }
    .page:last-child {
      page-break-after: auto;
    }
    
    h1, h2, h3, h4 {
      font-family: 'Cinzel', serif;
      letter-spacing: 0.5px;
    }
    .serif-title {
      font-family: 'Playfair Display', serif;
    }
    
    /* Cover Page */
    .cover-container {
      background: radial-gradient(circle at 50% 20%, #201a35 0%, #0d0a17 100%);
      color: #fff;
      border-radius: 12px;
      padding: 35px 30px;
      text-align: center;
      min-height: 980px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid rgba(212, 175, 55, 0.3);
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }
    .cover-header {
      text-transform: uppercase;
      font-size: 11pt;
      letter-spacing: 4px;
      color: #d4af37;
      border-bottom: 1px solid rgba(212, 175, 55, 0.3);
      padding-bottom: 12px;
      margin-bottom: 15px;
    }
    .cover-title {
      font-size: 28pt;
      font-weight: 700;
      color: #f7eed3;
      letter-spacing: 2px;
      margin-bottom: 6px;
    }
    .cover-subtitle {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 14pt;
      color: #c9bfdb;
      margin-bottom: 20px;
    }
    .cover-hero-img {
      width: 100%;
      height: 480px;
      object-fit: cover;
      border-radius: 10px;
      border: 2px solid rgba(212, 175, 55, 0.4);
      box-shadow: 0 12px 25px rgba(0,0,0,0.4);
      margin: 10px 0;
    }
    .cover-footer {
      border-top: 1px solid rgba(212, 175, 55, 0.3);
      padding-top: 16px;
      font-size: 9pt;
      color: #a59cb8;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .section-header {
      border-bottom: 2px solid #e2d7c5;
      padding-bottom: 8px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .section-title {
      font-size: 14pt;
      color: #1a162b;
      font-weight: 700;
    }
    .section-badge {
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #b38728;
      font-weight: 600;
    }
    
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }
    
    .card {
      background: #ffffff;
      border: 1px solid #e8e2d8;
      border-radius: 8px;
      padding: 14px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.03);
      break-inside: avoid;
    }
    .card-dark {
      background: #1b1629;
      color: #fff;
      border: 1px solid #3c3254;
      border-radius: 8px;
      padding: 14px;
    }
    .card-title {
      font-size: 11pt;
      font-weight: 700;
      color: #1a162b;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .card-title-gold {
      color: #d4af37;
      font-size: 11pt;
      font-weight: 700;
      margin-bottom: 6px;
    }
    
    .product-spotlight {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 16px;
      background: #ffffff;
      border: 1px solid #e5dcce;
      border-radius: 10px;
      padding: 14px;
      margin-bottom: 14px;
      break-inside: avoid;
      box-shadow: 0 4px 10px rgba(0,0,0,0.03);
    }
    .spotlight-gallery {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .spotlight-img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      border-radius: 6px;
      border: 1px solid #ddd;
    }
    .spotlight-info h3 {
      font-size: 13pt;
      color: #181324;
      margin-bottom: 4px;
    }
    .spotlight-tag {
      display: inline-block;
      font-size: 7.5pt;
      font-weight: 600;
      letter-spacing: 0.5px;
      padding: 3px 8px;
      border-radius: 20px;
      background: #f4ecdc;
      color: #8c6514;
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    .quote-box {
      background: #fbf9f5;
      border-left: 3px solid #b38728;
      padding: 8px 12px;
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 9.5pt;
      color: #4a3e56;
      margin: 8px 0;
      border-radius: 0 6px 6px 0;
    }
    
    table.custom-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8pt;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #e0d8cc;
      margin-bottom: 16px;
    }
    table.custom-table th {
      background: #201a35;
      color: #f7eed3;
      font-family: 'Cinzel', serif;
      font-size: 8pt;
      font-weight: 600;
      padding: 8px 10px;
      text-align: left;
    }
    table.custom-table td {
      padding: 7px 10px;
      border-bottom: 1px solid #eee8df;
      vertical-align: middle;
    }
    table.custom-table tr:last-child td {
      border-bottom: none;
    }
    table.custom-table tr:nth-child(even) {
      background: #fbf9f6;
    }
    
    .printable-card-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 10px;
    }
    .print-card {
      background: #fff;
      border: 1px dashed #b8860b;
      border-radius: 6px;
      padding: 10px;
      position: relative;
      min-height: 165px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      break-inside: avoid;
    }
    .print-card-header {
      text-align: center;
      border-bottom: 1px solid #f0e6d6;
      padding-bottom: 4px;
      margin-bottom: 6px;
    }
    .print-card-header .title {
      font-family: 'Cinzel', serif;
      font-size: 9.5pt;
      font-weight: 700;
      color: #1a162b;
    }
    .print-card-header .subtitle {
      font-size: 6.5pt;
      color: #8c7f9d;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .print-card-body {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 8pt;
      color: #3b3247;
      text-align: center;
      line-height: 1.35;
      margin-bottom: 6px;
    }
    .print-card-footer {
      border-top: 1px solid #f0e6d6;
      padding-top: 4px;
      font-size: 7pt;
      color: #716782;
      display: flex;
      justify-content: space-between;
    }
    
    .pill {
      display: inline-block;
      font-size: 7pt;
      padding: 2px 7px;
      border-radius: 12px;
      background: #e9e4f0;
      color: #4b3d63;
      font-weight: 600;
    }
  </style>
</head>
<body>

  <!-- ==================== HALAMAN 1: COVER ==================== -->
  <div class="page">
    <div class="cover-container">
      <div>
        <div class="cover-header">Flowerjuicee · Handmade Jewelry Brand Book</div>
        <div class="cover-title">THE 7 CELESTIAL BLOOMS</div>
        <div class="cover-subtitle">"Tujuh Bunga Semesta di Bawah Sinar Rembulan dan Bintang"</div>
      </div>

      <div>
        <img class="cover-hero-img" src="seven_celestial_blooms_refined_masterpiece.jpg" alt="The 7 Celestial Blooms Collection">
      </div>

      <div class="cover-footer">
        <div>Edisi Lengkap 7 Varian Bintang</div>
        <div>Visual Individual · Cerita Karakter · Copywriting · Strategi Harga</div>
        <div>Tahun 2026</div>
      </div>
    </div>
  </div>

  <!-- ==================== HALAMAN 2: OVERVIEW MATRIKS 7 VARIAN ==================== -->
  <div class="page">
    <div class="section-header">
      <div class="section-title">01. MATRIKS LENGKAP: 7 BINTANG SEMESTA (THE PLEIADES)</div>
      <div class="section-badge">The Complete Seven</div>
    </div>

    <p style="font-size: 9pt; color: #555; margin-bottom: 12px;">
      Angka 7 adalah angka sakral dalam mitologi kosmik (melambangkan 7 Bintang Pleiades / Tujuh Bidadari Surga). Koleksi Flowerjuicee kini lengkap dengan 7 varian warna yang masing-masing membawa karakter cinta yang berbeda:
    </p>

    <table class="custom-table">
      <thead>
        <tr>
          <th>No & Varian</th>
          <th>Warna Kelopak & Manik</th>
          <th>Simbol Kosmik</th>
          <th>Karakter Persona</th>
          <th>Pesan Emosional</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><b>1. Stella Maris</b></td>
          <td>Sky Azure Blue & Kristal Biru</td>
          <td>Bintang Kejora (Morning Star)</td>
          <td><b>Aoi</b> · Tenang, Setia, Teduh</td>
          <td>Tempat pulang paling tenang di tengah dunia bising.</td>
        </tr>
        <tr>
          <td><b>2. Solar Solstice</b></td>
          <td>Honey Peach & Amber Emas</td>
          <td>Surya Senja (Golden Hour)</td>
          <td><b>Kohaku</b> · Hangat, Penuh Kasih</td>
          <td>Senyuman yang selalu menghangatkan hati yang lelah.</td>
        </tr>
        <tr>
          <td><b>3. Luna Crescent</b></td>
          <td>Sakura Pink & Baby Pink</td>
          <td>Bulan Sabit Merona</td>
          <td><b>Sakurako</b> · Manis, Pemalu, Murni</td>
          <td>Debar cinta pertama yang selalu bersemi indah.</td>
        </tr>
        <tr>
          <td><b>4. Cosmic Nova</b></td>
          <td>Vivid Magenta & Raspberry</td>
          <td>Komet Jatuh (Shooting Star)</td>
          <td><b>Rion</b> · Ceria, Energik, Percaya Diri</td>
          <td>Tawa riang yang selalu membawa warna dan sukacita.</td>
        </tr>
        <tr>
          <td><b>5. Midnight Galaxy</b></td>
          <td>Royal Deep Purple & Ametis</td>
          <td>Bulan Purnama & Galaksi</td>
          <td><b>Shion</b> · Anggun, Berkelas, Magis</td>
          <td>Pesona abadi yang telah ditakdirkan oleh semesta.</td>
        </tr>
        <tr>
          <td><b>6. Ethereal Aurora</b></td>
          <td>Lilac Ombre & Lavender Quartz</td>
          <td>Cahaya Aurora Lembayung</td>
          <td><b>Sumire</b> · Puitis, Pemimpi, Lembut</td>
          <td>Cinta seindah mimpi yang menyejukkan sanubari.</td>
        </tr>
        <tr>
          <td><b>7. Glacial Dewdrop</b></td>
          <td>Frosted Ice Blue & Pearl White</td>
          <td>Embun Kristal & Salju Murni</td>
          <td><b>Yuki</b> · Murni, Sejuk, Menyegarkan</td>
          <td>Ketulusan hati yang sejernih kristal embun pagi.</td>
        </tr>
      </tbody>
    </table>

    <div style="text-align: center; margin: 12px 0;">
      <img src="seven_celestial_blooms_refined_masterpiece.jpg" style="width: 100%; height: 260px; object-fit: cover; border-radius: 8px; border: 1px solid #d4af37;" alt="Seven Bracelets in One Frame">
      <div style="font-size: 8pt; color: #777; margin-top: 6px; font-style: italic;">
        Master Frame: Ketujuh gelang asli buatan tangan Flowerjuicee dalam satu keselarasan semesta.
      </div>
    </div>
  </div>

  <!-- ==================== HALAMAN 3: SPOTLIGHT VARIAN 1 & 2 ==================== -->
  <div class="page">
    <div class="section-header">
      <div class="section-title">02. DETAIL VARIAN: STELLA MARIS & SOLAR SOLSTICE</div>
      <div class="section-badge">Gelang 1 & 2</div>
    </div>

    <!-- Gelang 1 -->
    <div class="product-spotlight">
      <div class="spotlight-gallery">
        <img class="spotlight-img" src="char_visual_1_blue_1791478163746.jpg" alt="Stella Maris Visual">
      </div>
      <div class="spotlight-info">
        <span class="spotlight-tag">Gelang 1 · Sky Azure Blue</span>
        <h3>STELLA MARIS (The Morning Star)</h3>
        <p style="font-size: 8.5pt; color: #666; margin-bottom: 6px;">
          <b>Simbol</b>: Bintang Kejora & Langit Fajar · <b>Material</b>: Kawat perak, kelopak resin biru transparan tepi emas, kristal biru laut.
        </p>
        <p style="font-size: 9pt; margin-bottom: 6px;">
          <b>Karakteristik & Cerita</b>: Mewakili kejernihan langit fajar sesaat sebelum mentari terbit. Karakter wanita yang tenang, dewasa, setia, pendengar terbaik, dan tidak suka drama. Kehadirannya selalu menjadi dermaga penenang di tengah badai kehidupan.
        </p>
        <div class="quote-box">
          "Di antara ombak dunia yang bising, senyumanmu adalah dermaga paling tenang di hatiku."
        </div>
        <p style="font-size: 8.5pt; color: #444;">
          <b>Alasan Menjual ke Cowok</b>: Kado untuk pacar yang menjadi sosok penyejuk hati dan selalu membuat cowok merasa aman untuk pulang.
        </p>
      </div>
    </div>

    <!-- Gelang 2 -->
    <div class="product-spotlight">
      <div class="spotlight-gallery">
        <img class="spotlight-img" src="char_visual_2_amber_1791478190291.jpg" alt="Solar Solstice Visual">
      </div>
      <div class="spotlight-info">
        <span class="spotlight-tag" style="background:#fef3c7; color:#92400e;">Gelang 2 · Honey Amber Peach</span>
        <h3>SOLAR SOLSTICE (The Sunlit Muse)</h3>
        <p style="font-size: 8.5pt; color: #666; margin-bottom: 6px;">
          <b>Simbol</b>: Surya Senja (Golden Hour) · <b>Material</b>: Kawat emas berkilau, kelopak peach madu tepi emas, manik kristal amber.
        </p>
        <p style="font-size: 9pt; margin-bottom: 6px;">
          <b>Karakteristik & Cerita</b>: Mewakili hangatnya sinar matahari sore musim gugur yang memeluk bumi dengan lembut. Sosok wanita yang penuh perhatian (*caring*), senyumnya tulus, dan kehadirannya menyembuhkan rasa lelah seharian.
        </p>
        <div class="quote-box">
          "Senyumanmu seperti cahaya matahari sore: selalu memberi kehangatan lembut yang merasuk ke dalam hati."
        </div>
        <p style="font-size: 8.5pt; color: #444;">
          <b>Alasan Menjual ke Cowok</b>: Cara paling manis untuk berterima kasih atas segala perhatian dan kehangatan yang diberikan pacar.
        </p>
      </div>
    </div>
  </div>

  <!-- ==================== HALAMAN 4: SPOTLIGHT VARIAN 3 & 4 ==================== -->
  <div class="page">
    <div class="section-header">
      <div class="section-title">03. DETAIL VARIAN: LUNA CRESCENT & COSMIC NOVA</div>
      <div class="section-badge">Gelang 3 & 4</div>
    </div>

    <!-- Gelang 3 -->
    <div class="product-spotlight">
      <div class="spotlight-gallery">
        <img class="spotlight-img" src="char_visual_3_pink_1791478220943.jpg" alt="Luna Crescent Visual">
      </div>
      <div class="spotlight-info">
        <span class="spotlight-tag" style="background:#fce7f3; color:#9d174d;">Gelang 3 · Sakura Blush Pink</span>
        <h3>LUNA CRESCENT (First Love Petals)</h3>
        <p style="font-size: 8.5pt; color: #666; margin-bottom: 6px;">
          <b>Simbol</b>: Bulan Sabit Muda & Debu Sakura · <b>Material</b>: Kawat perak halus, kelopak pink sakura tepi emas, manik baby pink.
        </p>
        <p style="font-size: 9pt; margin-bottom: 6px;">
          <b>Karakteristik & Cerita</b>: Terinspirasi dari debaran cinta pertama. Sosok gadis yang manis, pemalu, berhati murni, feminin sejati, dan menghargai hal-hal kecil penuh romansa. Kelopak pink merekah seperti pipi yang merona tersipu.
        </p>
        <div class="quote-box">
          "Mencintaimu itu seperti menatap bulan sabit pertama kali: manis, murni, dan selalu membuat hatiku berdebar."
        </div>
        <p style="font-size: 8.5pt; color: #444;">
          <b>Alasan Menjual ke Cowok</b>: <b>Best Seller kado anniversary & ulang tahun!</b> Memberi pesan bahwa dia adalah perempuan termanis di dunia.
        </p>
      </div>
    </div>

    <!-- Gelang 4 -->
    <div class="product-spotlight">
      <div class="spotlight-gallery">
        <img class="spotlight-img" src="char_visual_4_magenta_1791478250755.jpg" alt="Cosmic Nova Visual">
      </div>
      <div class="spotlight-info">
        <span class="spotlight-tag" style="background:#fdf2f8; color:#be185d;">Gelang 4 · Vivid Magenta Fuchsia</span>
        <h3>COSMIC NOVA (The Fireworks Spark)</h3>
        <p style="font-size: 8.5pt; color: #666; margin-bottom: 6px;">
          <b>Simbol</b>: Komet Bintang Jatuh & Harapan · <b>Material</b>: Kawat perak, kelopak magenta pekat tepi emas, daun hijau, kristal raspberry.
        </p>
        <p style="font-size: 9pt; margin-bottom: 6px;">
          <b>Karakteristik & Cerita</b>: Bintang jatuh yang membelah langit dengan kilau warna paling berani. Sosok wanita yang energik, ceria, hobi bercanda, percaya diri, dan selalu membawa tawa serta warna di hari yang suram.
        </p>
        <div class="quote-box">
          "Dulu aku selalu berdoa saat melihat bintang jatuh; sekarang doa itu terkabul dalam bentuk dirimu yang selalu membawa tawa."
        </div>
        <p style="font-size: 8.5pt; color: #444;">
          <b>Alasan Menjual ke Cowok</b>: Hadiah untuk pacar yang ekspresif, supel, dan membuat hubungan asmara selalu hidup dan berwarna.
        </p>
      </div>
    </div>
  </div>

  <!-- ==================== HALAMAN 5: SPOTLIGHT VARIAN 5 & 6 ==================== -->
  <div class="page">
    <div class="section-header">
      <div class="section-title">04. DETAIL VARIAN: MIDNIGHT GALAXY & ETHEREAL AURORA</div>
      <div class="section-badge">Gelang 5 & 6</div>
    </div>

    <!-- Gelang 5 -->
    <div class="product-spotlight">
      <div class="spotlight-gallery">
        <img class="spotlight-img" src="char_visual_5_violet_1791478305584.jpg" alt="Midnight Galaxy Visual">
      </div>
      <div class="spotlight-info">
        <span class="spotlight-tag" style="background:#f3e8ff; color:#6b21a8;">Gelang 5 · Twilight Deep Violet</span>
        <h3>MIDNIGHT GALAXY (The Celestial Destiny)</h3>
        <p style="font-size: 8.5pt; color: #666; margin-bottom: 6px;">
          <b>Simbol</b>: Bulan Purnama Malam & Galaksi · <b>Material</b>: Kawat perak, kelopak ungu lembayung tua tepi emas, kristal ametis berkilau.
        </p>
        <p style="font-size: 9pt; margin-bottom: 6px;">
          <b>Karakteristik & Cerita</b>: Langit tengah malam yang bertabur rasi bintang megah. Sosok wanita yang anggun, memiliki selera tinggi, sedikit misterius, mandiri, dan memancarkan pesona bangsawan malam yang tak tergantikan.
        </p>
        <div class="quote-box">
          "Dari miliaran bintang di seluruh galaksi ini, semesta menuntunku untuk menemukan satu-satunya dirimu."
        </div>
        <p style="font-size: 8.5pt; color: #444;">
          <b>Alasan Menjual ke Cowok</b>: Menunjukkan penghargaan tertinggi bahwa pacarnya adalah sosok istimewa yang sangat anggun dan berharga.
        </p>
      </div>
    </div>

    <!-- Gelang 6 (NEW) -->
    <div class="product-spotlight">
      <div class="spotlight-gallery">
        <img class="spotlight-img" src="char_visual_6_aurora_1791478507393.jpg" alt="Ethereal Aurora Visual">
      </div>
      <div class="spotlight-info">
        <span class="spotlight-tag" style="background:#ede9fe; color:#5b21b6;">Gelang 6 (Baru) · Pastel Lilac Ombre</span>
        <h3>ETHEREAL AURORA (The Dreamweaver)</h3>
        <p style="font-size: 8.5pt; color: #666; margin-bottom: 6px;">
          <b>Simbol</b>: Cahaya Aurora & Kabut Senja Fajar · <b>Material</b>: Kawat perak, kelopak ungu lilac gradasi pink tepi emas, kristal lavender quartz.
        </p>
        <p style="font-size: 9pt; margin-bottom: 6px;">
          <b>Karakteristik & Cerita</b>: Tarian cahaya aurora di langit kutub yang mistis nan lembut. Sosok wanita yang puitis, pemimpi (*daydreamer*), artistik, penuh imajinasi, dan membawa aura kedamaian manis seperti mimpi indah.
        </p>
        <div class="quote-box">
          "Untukmu yang selalu hadir seperti cahaya aurora di mimpiku—lembut, menenangkan, dan terlalu indah untuk dilupakan."
        </div>
        <p style="font-size: 8.5pt; color: #444;">
          <b>Alasan Menjual ke Cowok</b>: Kado manis untuk pacar yang artistik, lemah lembut, dan suka hal-hal bertema fantasi estetik.
        </p>
      </div>
    </div>
  </div>

  <!-- ==================== HALAMAN 6: SPOTLIGHT VARIAN 7 & KADO KOLEKSI ==================== -->
  <div class="page">
    <div class="section-header">
      <div class="section-title">05. DETAIL VARIAN: GLACIAL DEWDROP & STRATEGI 7 BINTANG</div>
      <div class="section-badge">Gelang 7 & Strategy</div>
    </div>

    <!-- Gelang 7 (NEW) -->
    <div class="product-spotlight">
      <div class="spotlight-gallery">
        <img class="spotlight-img" src="char_visual_7_glacial_1791478524604.jpg" alt="Glacial Dewdrop Visual">
      </div>
      <div class="spotlight-info">
        <span class="spotlight-tag" style="background:#e0f2fe; color:#0369a1;">Gelang 7 (Baru) · Frosted Ice Blue & Pearl</span>
        <h3>GLACIAL DEWDROP (The Crystal Maiden)</h3>
        <p style="font-size: 8.5pt; color: #666; margin-bottom: 6px;">
          <b>Simbol</b>: Embun Kristal Bintang & Salju Pertama · <b>Material</b>: Kawat perak, kelopak biru es transparan susu, manik putih mutiara, daun hijau segar.
        </p>
        <p style="font-size: 9pt; margin-bottom: 6px;">
          <b>Karakteristik & Cerita</b>: Bunga es yang mekar di pagi musim dingin yang suci. Sosok wanita yang murni, polos, elegan tanpa kepura-puraan, senyumnya menyegarkan hati (*refreshing*) seperti tetesan embun pagi yang bersih.
        </p>
        <div class="quote-box">
          "Hatimu semurni embun pagi dan sejernih kristal es—selalu memberi kesejukan di setiap langkah hidupku."
        </div>
        <p style="font-size: 8.5pt; color: #444;">
          <b>Alasan Menjual ke Cowok</b>: Hadiah untuk pacar yang berhati suci, sederhana, tulus, dan memiliki kepribadian menyejukkan.
        </p>
      </div>
    </div>

    <div class="card" style="margin-top: 14px;">
      <div class="card-title">👑 Potensi Bisnis: "The Lucky Seven Collector Box"</div>
      <p style="font-size: 9pt; color: #444; margin-bottom: 8px;">
        Dengan genapnya 7 varian warna, Flowerjuicee kini dapat membuka program <b>Koleksi 7 Hari / 7 Bintang</b>:
      </p>
      <div class="grid-2" style="margin-bottom: 0;">
        <div style="font-size: 8.5pt; color: #555;">
          <b>1. Daily Mood Bracelets:</b><br>
          Wanita dapat mengoleksi semua warna untuk dipakai bergantian dari Senin hingga Minggu sesuai suasana hati dan warna outfit harian.
        </div>
        <div style="font-size: 8.5pt; color: #555;">
          <b>2. Ultimate Friendship Box:</b><br>
          Paket untuk geng pertemanan (grup 7 sahabat) di mana setiap sahabat memakai warna yang mencerminkan karakternya masing-masing.
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== HALAMAN 7: TEMPLATE 7 KARTU UCAPAN SIAP CETAK ==================== -->
  <div class="page">
    <div class="section-header">
      <div class="section-title">06. TEMPLATE 7 KARTU UCAPAN SIAP CETAK (A7 CARDS)</div>
      <div class="section-badge">Printable Collaterals</div>
    </div>

    <div class="printable-card-grid">
      <!-- Card 1 -->
      <div class="print-card">
        <div class="print-card-header">
          <div class="title">✦ STELLA MARIS ✦</div>
          <div class="subtitle">The Morning Star · Flowerjuicee</div>
        </div>
        <div class="print-card-body">
          "Di antara dunia yang bising dan penuh badai, kehadiranmu adalah langit fajar yang jernih. Terima kasih selalu menjadi bintang kejora dan dermaga paling tenang di hidupku."
        </div>
        <div class="print-card-footer">
          <div>To : _______________</div>
          <div>From : _______________</div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="print-card">
        <div class="print-card-header">
          <div class="title">✦ SOLAR SOLSTICE ✦</div>
          <div class="subtitle">The Sunlit Muse · Flowerjuicee</div>
        </div>
        <div class="print-card-body">
          "Bagiku, senyumanmu seperti cahaya matahari senja: tidak pernah menyilaukan, tetapi selalu memberi kehangatan yang merasuk lembut hingga ke dalam hati."
        </div>
        <div class="print-card-footer">
          <div>To : _______________</div>
          <div>From : _______________</div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="print-card">
        <div class="print-card-header">
          <div class="title">✦ LUNA CRESCENT ✦</div>
          <div class="subtitle">First Love Petals · Flowerjuicee</div>
        </div>
        <div class="print-card-body">
          "Mencintaimu itu seperti menatap bulan sabit pertama kali: manis, murni, dan selalu membuat hatiku berdebar seperti kelopak bunga yang mekar di musim semi."
        </div>
        <div class="print-card-footer">
          <div>To : _______________</div>
          <div>From : _______________</div>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="print-card">
        <div class="print-card-header">
          <div class="title">✦ COSMIC NOVA ✦</div>
          <div class="subtitle">The Spark of Joy · Flowerjuicee</div>
        </div>
        <div class="print-card-body">
          "Dulu aku selalu berdoa saat melihat bintang jatuh; sekarang aku tahu doa itu terkabul dalam bentuk dirimu yang selalu mewarnai hariku dengan tawa dan sukacita."
        </div>
        <div class="print-card-footer">
          <div>To : _______________</div>
          <div>From : _______________</div>
        </div>
      </div>

      <!-- Card 5 -->
      <div class="print-card">
        <div class="print-card-header">
          <div class="title">✦ MIDNIGHT GALAXY ✦</div>
          <div class="subtitle">The Celestial Destiny · Flowerjuicee</div>
        </div>
        <div class="print-card-body">
          "Dari miliaran bintang di seluruh galaksi ini, semesta menuntunku untuk menemukan satu-satunya dirimu. Pesonamu adalah keajaiban yang ingin kujaga selamanya."
        </div>
        <div class="print-card-footer">
          <div>To : _______________</div>
          <div>From : _______________</div>
        </div>
      </div>

      <!-- Card 6 (NEW) -->
      <div class="print-card">
        <div class="print-card-header">
          <div class="title">✦ ETHEREAL AURORA ✦</div>
          <div class="subtitle">The Dreamweaver · Flowerjuicee</div>
        </div>
        <div class="print-card-body">
          "Untukmu yang selalu hadir seperti cahaya aurora di mimpiku—lembut, menenangkan, dan terlalu indah untuk pernah dilupakan oleh waktu."
        </div>
        <div class="print-card-footer">
          <div>To : _______________</div>
          <div>From : _______________</div>
        </div>
      </div>
    </div>

    <!-- Card 7 (NEW - Bottom Centered) -->
    <div style="max-width: 360px; margin: 10px auto 0 auto;">
      <div class="print-card" style="min-height: 155px;">
        <div class="print-card-header">
          <div class="title">✦ GLACIAL DEWDROP ✦</div>
          <div class="subtitle">The Crystal Maiden · Flowerjuicee</div>
        </div>
        <div class="print-card-body">
          "Hatimu semurni embun pagi dan sejernih kristal es pertama—selalu memberi kesejukan, ketulusan, dan rasa damai di setiap langkah hidupku."
        </div>
        <div class="print-card-footer">
          <div>To : _______________</div>
          <div>From : _______________</div>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== HALAMAN 8: STRATEGI PRICING & BUNDLING 7 BINTANG ==================== -->
  <div class="page">
    <div class="section-header">
      <div class="section-title">07. STRATEGI HARGA & PAKET BUNDLING 7 GELANG</div>
      <div class="section-badge">Sales Architecture</div>
    </div>

    <div class="grid-3">
      <!-- Tier 1 -->
      <div class="card">
        <span class="pill">Tier 1 · Everyday</span>
        <h4 style="margin: 6px 0; font-size: 11pt; color: #181324;">Single Essential</h4>
        <div style="font-size: 14pt; font-weight: 700; color: #b38728; margin-bottom: 8px;">Rp 49.000 – 59.000</div>
        <p style="font-size: 8pt; color: #666; margin-bottom: 8px;">Pembelian pribadi harian (pelajar / mahasiswi).</p>
        <ul style="font-size: 8pt; color: #444; padding-left: 14px; line-height: 1.4;">
          <li>1x Gelang Pilihan dari 7 varian</li>
          <li>Fabric Pouch serut cantik</li>
          <li>Kartu ucapan standar</li>
          <li>Kemasan bubble wrap tebal</li>
        </ul>
      </div>

      <!-- Tier 2 -->
      <div class="card" style="border: 2px solid #b8860b; background: #fffcf5;">
        <span class="pill" style="background:#b8860b; color:#fff;">Tier 2 · Best Seller</span>
        <h4 style="margin: 6px 0; font-size: 11pt; color: #181324;">Signature Gift Box</h4>
        <div style="font-size: 14pt; font-weight: 700; color: #b38728; margin-bottom: 8px;">Rp 89.000 – 119.000</div>
        <p style="font-size: 8pt; color: #666; margin-bottom: 8px;"><b>Kado Spesial Cowok.</b> Siap langsung diberikan.</p>
        <ul style="font-size: 8pt; color: #444; padding-left: 14px; line-height: 1.4;">
          <li>1x Gelang Pilihan Pilihan</li>
          <li>Hardbox pita satin mewah</li>
          <li>Bantalan beludru perhiasan</li>
          <li>Printable Story Card Karakter</li>
          <li>Free Handwritten Love Letter</li>
          <li>Mini Buket Bunga Kering</li>
        </ul>
      </div>

      <!-- Tier 3 -->
      <div class="card">
        <span class="pill">Tier 3 · Ultimate</span>
        <h4 style="margin: 6px 0; font-size: 11pt; color: #181324;">Lucky Seven Vault</h4>
        <div style="font-size: 14pt; font-weight: 700; color: #b38728; margin-bottom: 8px;">Rp 399.000 – 499.000</div>
        <p style="font-size: 8pt; color: #666; margin-bottom: 8px;"><b>Kotak Koleksi Lengkap 7 Varian.</b> Edisi Kolektor.</p>
        <ul style="font-size: 8pt; color: #444; padding-left: 14px; line-height: 1.4;">
          <li>Semua 7 Gelang Lengkap</li>
          <li>Luxury Wooden/Velvet Box</li>
          <li>Lengkap 7 Story Card Karakter</li>
          <li>Sertifikat Kolektor Edisi 2026</li>
          <li>Special Signature Floral Perfume</li>
        </ul>
      </div>
    </div>

    <div class="card" style="margin-top: 14px;">
      <div class="card-title">🛍️ Template Judul SEO Marketplace untuk 7 Varian</div>
      <p style="background: #f4f1ea; padding: 8px 12px; border-radius: 6px; font-family: monospace; font-size: 8.5pt; color: #333; margin-top: 4px;">
        [GIFT BOX 7 WARNA] Flowerjuicee · Gelang Bunga Resin Kawat Handmade Kado Pacar Wanita The 7 Celestial Blooms Bintang & Bulan
      </p>
    </div>

    <div style="margin-top: 25px; text-align: center; font-size: 8.5pt; color: #888;">
      © 2026 Flowerjuicee · Handmade with Love · Dokumen Resmi Koleksi 7 Bintang
    </div>
  </div>

</body>
</html>
`;

const htmlPath = path.join(__dirname, 'Flowerjuicee_The_7_Celestial_Blooms_BrandBook.html');
const pdfPath = path.join(__dirname, 'Flowerjuicee_The_7_Celestial_Blooms_BrandBook.pdf');

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('HTML written to ' + htmlPath);

const edgePath = "C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe";
console.log('Compiling 7-Variant PDF via Microsoft Edge...');
const cmd = '"' + edgePath + '" --headless=new --disable-gpu --allow-file-access-from-files --print-to-pdf="' + pdfPath + '" --no-pdf-header-footer "' + htmlPath + '"';
execSync(cmd);

if (fs.existsSync(pdfPath)) {
  const stats = fs.statSync(pdfPath);
  console.log('PDF successfully created at: ' + pdfPath + ' (' + stats.size + ' bytes)');
} else {
  console.error('Failed to create PDF');
  process.exit(1);
}
