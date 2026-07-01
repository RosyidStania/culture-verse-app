export const defaultPhotos = [
  { 
    id: 1, top: "15%", left: "10%", rotate: -12, 
    title: "Tari Tradisional", 
    desc: "Gerak gemulai penuh makna magis peninggalan leluhur.",
    bgImage: "https://images.unsplash.com/photo-1518599904199-0ca897819ddb?q=80&w=2000&auto=format&fit=crop",
    story: [
      "Setiap gerak adalah doa, dan setiap nada adalah puji-pujian bagi semesta.",
      "Tarian ini bukan sekadar pertunjukan, melainkan jembatan spiritual antara manusia dan Sang Pencipta.",
      "Menjaga irama ini berarti kita merawat napas peradaban yang tak lekang oleh waktu."
    ]
  },
  { 
    id: 2, top: "55%", left: "15%", rotate: 8, 
    title: "Senjata Khas", 
    desc: "Ditempa dengan mantra, baja, dan keberanian.",
    bgImage: "https://images.unsplash.com/photo-1588600878108-578307a3cc9d?q=80&w=2000&auto=format&fit=crop",
    story: [
      "Bukan sekadar alat perang, bilah ini adalah simbol harga diri dan kehormatan keluarga.",
      "Pola pamor yang tergambar di atas baja adalah rahasia semesta yang dititipkan melalui tangan sang empu.",
      "Disimpan dengan pusaka, dirawat dengan rasa hormat yang mendalam."
    ]
  },
  { 
    id: 3, top: "10%", left: "65%", rotate: 15, 
    title: "Rumah Adat", 
    desc: "Pilar kayu kokoh yang menyangga filosofi kehidupan.",
    bgImage: "https://images.unsplash.com/photo-1604005955512-4028091176b6?q=80&w=2000&auto=format&fit=crop",
    story: [
      "Dibangun tanpa sebatang paku besi, mengandalkan harmoni dan presisi hitungan alam.",
      "Setiap ukiran di tiang utama menceritakan silsilah dan harapan bagi penghuninya.",
      "Menjadi tempat pulang, tempat tetua bercerita, dan tempat tradisi diwariskan."
    ]
  },
];

export const provinceData = {
  "Jawa Tengah": [
    { 
      id: 1, top: "10%", left: "15%", rotate: -8, 
      title: "Candi Borobudur", 
      bgImage: "/images/jawa-tengah/borobudur.jpg",
      story: [
        {
          text: "Borobudur dibangun pada masa Dinasti Syailendra (sekitar abad ke-8 dan ke-9 masehi). Struktur candi ini menggunakan sistem interlocking (saling mengunci) dari balok batu andesit tanpa menggunakan semen sama sekali. Arsitekturnya membagi perjalanan spiritual manusia menjadi tiga tingkatan:",
          images: ["/images/jawa-tengah/raja-syailendra.jpg", "/images/jawa-tengah/borobudur-diagram.jpg"]
        },
        {
          text: "Kamadhatu (Bagian Kaki): Mewakili alam dunia bawah, tempat manusia masih terikat oleh hawa nafsu dan keserakahan. Terdapat 160 relief Karmawibhangga yang menggambarkan hukum sebab-akibat (karma).",
          images: ["/images/jawa-tengah/borobudur-stupa.jpg"]
        },
        {
          text: "Rupadhatu (Bagian Tengah): Mewakili alam peralihan. Manusia sudah mulai meninggalkan nafsu duniawi tetapi masih terikat oleh rupa dan wujud. Bagian ini terdiri dari lima teras persegi dengan ribuan panel relief yang menceritakan kehidupan Buddha Gautama (Lalitavistara) dan cerita-cerita fabel kebijaksanaan (Jataka).",
          images: ["/images/jawa-tengah/borobudur-buddha.jpg"]
        },
        {
          text: "Arupadhatu (Bagian Atas): Mewakili alam tertinggi yang tidak berwujud, di mana manusia sudah terbebas dari segala ikatan duniawi. Ditandai dengan tiga teras melingkar yang berisi 72 stupa berlubang, mengelilingi satu stupa induk raksasa di puncaknya.",
          images: ["/images/jawa-tengah/borobudur-sunset.jpg"]
        }
      ]
    },
    { 
      id: 2, top: "15%", left: "60%", rotate: 12, 
      title: "Batik Jawa Tengah", 
      bgImage: "/images/jawa-tengah/batik.jpg",
      story: [
        "Batik diakui oleh UNESCO sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Nonbendawi pada 2 Oktober 2009. Di Jawa Tengah, karakteristiknya sangat dipengaruhi oleh lokasi geografis:",
        "Batik Pedalaman (Keraton Solo): Sangat terikat pada pakem dan aturan keraton. Didominasi warna sogan (cokelat kemerahan), hitam, dan putih kekuningan. Motifnya sarat filosofi, seperti motif Parang yang bergaris miring (melambangkan kekuasaan, dulunya hanya boleh dipakai raja) dan Kawung yang berbentuk seperti buah aren (melambangkan kesucian dan umur panjang).",
        "Batik Pesisir (Pekalongan): Lebih dinamis, bebas, dan sangat dipengaruhi oleh akulturasi budaya asing (Tiongkok, Arab, Belanda). Warnanya sangat cerah (merah, biru, hijau, kuning). Motif yang terkenal adalah Buketan (rangkaian bunga gaya Eropa) dan Jlamprang (berbentuk geometris yang terinspirasi dari kain Patola India)."
      ]
    },
    { 
      id: 3, top: "55%", left: "10%", rotate: -15, 
      title: "Wayang Kulit", 
      bgImage: "/images/jawa-tengah/wayang.jpg",
      story: [
        "Pertunjukan wayang kulit adalah sebuah orkestrasi yang kompleks. Tokoh wayang dipahat dari kulit kerbau yang dikeringkan, kemudian diberi warna dan tangkai penyangga dari tanduk kerbau. Dalam pementasannya, terdapat elemen-elemen penting:",
        "Dalang: Sang sutradara tunggal yang memainkan wayang, menyuarakan semua karakter, memimpin iringan musik, dan mengatur ritme cerita semalaman suntuk.",
        "Punakawan: Karakter khas Jawa yang tidak ada dalam epik asli Mahabharata dari India. Terdiri dari Semar, Gareng, Petruk, dan Bagong. Mereka adalah dewa yang mewujud sebagai rakyat jelata (abdi), berfungsi untuk memberikan jeda komedi sekaligus melontarkan kritik sosial dan nasihat bijak.",
        "Kelir & Blencong: Kelir adalah layar kain putih, sedangkan Blencong adalah lampu minyak kelapa yang digantung di atas Dalang. Cahaya blencong yang bergoyang-goyang menciptakan efek bayangan yang dramatis pada kelir, menghidupkan karakter wayang."
      ]
    },
    { 
      id: 4, top: "50%", left: "65%", rotate: 8, 
      title: "Rumah Joglo", 
      bgImage: "/images/jawa-tengah/joglo.jpg",
      story: [
        "Nama Joglo berasal dari kata \"Tajug Loro\" (dua tajug/gunung), merujuk pada bentuk atapnya. Struktur rumah ini sangat tahan terhadap gempa karena sistem sambungan kayunya yang fleksibel. Hierarki ruangannya mencerminkan privasi dan etika masyarakat Jawa:",
        "Soko Guru & Tumpang Sari: Di bagian tengah rumah terdapat empat tiang penyangga utama (Soko Guru) yang melambangkan empat penjuru mata angin. Di atas Soko Guru terdapat susunan balok kayu bertumpuk yang melebar ke atas, disebut Tumpang Sari.",
        "Pendopo: Area paling depan, tanpa dinding, digunakan untuk menerima tamu, rapat desa, atau pementasan seni. Menyimbolkan keterbukaan.",
        "Pringgitan: Ruang transisi antara Pendopo dan area dalam. Biasanya digunakan untuk menggelar pertunjukan wayang (ringgit) bagi tamu.",
        "Dalem Ageng: Area privat tempat keluarga beraktivitas. Di dalamnya terdapat Sentong Tengah, sebuah kamar sakral yang sering dikaitkan dengan penghormatan kepada Dewi Sri (Dewi Padi/Kesuburan)."
      ]
    }
  ],
  "Bali": [
    {
      id: 1, top: "15%", left: "10%", rotate: -10,
      title: "Tari Kecak",
      bgImage: "https://images.unsplash.com/photo-1552528761-e0e6c5fc34ed?q=80&w=2000&auto=format&fit=crop",
      story: [
        "Tari Kecak diciptakan pada tahun 1930-an oleh Wayan Limbak dan pelukis Jerman Walter Spies. Uniknya, tarian ini tidak menggunakan alat musik sama sekali.",
        "Iringannya murni berasal dari paduan suara puluhan hingga ratusan penari laki-laki yang duduk melingkar dan menyerukan kata 'cak' secara bersahut-sahutan, menciptakan harmoni yang magis dan ritmis.",
        "Kisah yang diangkat biasanya adalah epos Ramayana, menceritakan upaya Rama menyelamatkan Sita dari cengkeraman Rahwana dengan bantuan pasukan kera Hanoman."
      ]
    },
    {
      id: 2, top: "20%", left: "65%", rotate: 12,
      title: "Pura Ulun Danu Beratan",
      bgImage: "https://images.unsplash.com/photo-1538356111053-748a48e1acb8?q=80&w=2000&auto=format&fit=crop",
      story: [
        "Dibangun pada abad ke-17 oleh Raja Mengwi, pura ini merupakan candi air penting di Bali. Terletak di tepi Danau Beratan, pura ini seolah mengapung di atas air saat danau pasang.",
        "Kompleks ini didedikasikan untuk Dewi Danu, dewi air, danau, dan sungai, yang sangat penting bagi sistem irigasi subak di Bali.",
        "Arsitekturnya menampilkan ciri khas meru dengan atap jerami bertingkat (tumpang). Pura utama memiliki 11 tingkat yang didedikasikan untuk Siwa dan istrinya, Parwati."
      ]
    }
  ]
};
