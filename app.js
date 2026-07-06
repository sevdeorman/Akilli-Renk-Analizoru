// --- 1. BÖLÜM: GENİŞLETİLMİŞ RENKLİ GARDIROP VERİ TABANI ---
const gardirobVerisi = [
    // BAŞ / ŞAL PARÇALARI
    { id: 1, isim: "Mint Yeşili Viskoz Şal", bolge: "head", renk: "#22c55e", renkAdi: "yesil", aciklama: "Yumuşak dokusuyla terletmeyen dökümlü şal." },
    { id: 2, isim: "Safir Mavisi Saten Şal", bolge: "head", renk: "#0284c7", renkAdi: "mavi", aciklama: "Özel davetler için parlak ve şık doku." },
    { id: 3, isim: "Mürdüm Rengi Şal", bolge: "head", renk: "#701a75", renkAdi: "murdum", aciklama: "Sonbahar tonlarında, tok duruşlu pamuklu şal." },
    { id: 4, isim: "Pudra Pembe İpek Şal", bolge: "head", renk: "#f472b6", renkAdi: "pembe", aciklama: "Soft ve pastel tonlarda asil görünüm." },
    { id: 5, isim: "Ekru Krep Şal", bolge: "head", renk: "#fef08a", renkAdi: "ekru", aciklama: "Her kombine uyan kurtarıcı, dökümlü basic parça." },

    // ÜST GİYİM PARÇALARI
    { id: 6, isim: "Beyaz Keten Polo Tişört", bolge: "torso", renk: "#f8fafc", renkAdi: "beyaz", aciklama: "Sıcak yaz günleri için ferah, polo yaka üst." },
    { id: 7, isim: "Lila Skirt Set (Bluz)", bolge: "torso", renk: "#c084fc", renkAdi: "lila", aciklama: "Mezuniyet takımı için tasarlanmış şık bluz." },
    { id: 8, isim: "Haki Yeşili Polo Tişört", bolge: "torso", renk: "#166534", renkAdi: "haki", aciklama: "Spor ve günlük şıklık sunan keten doku." },
    { id: 9, isim: "Siyah Triko Bluz", bolge: "torso", renk: "#1e293b", renkAdi: "siyah", aciklama: "Vücudu saran şık ve ince örme bluz." },
    { id: 10, isim: "Kiremit Rengi Keten Ceket", bolge: "torso", renk: "#c2410c", renkAdi: "kiremit", aciklama: "Oversize kesim, dinamik ve sıcak yaz rengi." },

    // ALT GİYİM PARÇALARI
    { id: 11, isim: "Bej Keten Pantolon", bolge: "legs", renk: "#f59e0b", renkAdi: "bej", aciklama: "Yaz akşamları için ideal rahat kumaş pantolon." },
    { id: 12, isim: "Lila Skirt Set (Etek)", bolge: "legs", renk: "#a855f7", renkAdi: "lila", aciklama: "Mezuniyet takımını tamamlayan yüksek bel etek." },
    { id: 13, isim: "Siyah Viskoz Kumaş Etek", bolge: "legs", renk: "#0f172a", renkAdi: "siyah", aciklama: "Dökümlü ve esnek yapılı, çok rahat uzun etek." },
    { id: 14, isim: "Kömür Grisi Kumaş Pantolon", bolge: "legs", renk: "#475569", renkAdi: "gri", aciklama: "Modern kesim, her ortama uygun ütülü pantolon." }
];

// Mankenin o an üzerinde olan renk isimlerini tutacak nesne
let aktifKombin = { head: null, torso: null, legs: null };

// --- 2. BÖLÜM: KIYAFETLERİ SAĞ TARAFA DİNAMİK BASMA ---
function gardirobuGoster() {
    const gardirobAlani = document.getElementById("gardirob-alani");
    gardirobAlani.innerHTML = "";

    gardirobVerisi.forEach(kiyafet => {
        const kart = document.createElement("div");
        kart.className = "cloth-card";
        kart.onclick = () => mankeneGiydir(kiyafet.id);

        kart.innerHTML = `
            <h4>${kiyafet.isim}</h4>
            <p>${kiyafet.aciklama}</p>
            <div class="card-meta">
                <span style="color: #64748b;">Bölge: <b>${kiyafet.bolge === 'head' ? 'Baş' : kiyafet.bolge === 'torso' ? 'Üst' : 'Alt'}</b></span>
                <span class="color-dot" style="background-color: ${kiyafet.renk};"></span>
            </div>
        `;
        gardirobAlani.appendChild(kart);
    });
}

// --- 3. BÖLÜM: İNTERAKTİF GİYDİRME VE REAKSİYON MANTIĞI ---
function mankeneGiydir(kiyafetId) {
    const secilenKiyafet = gardirobVerisi.find(k => k.id === kiyafetId);
    
    let hedefID = "";
    if (secilenKiyafet.bolge === "head") hedefID = "manken-bas";
    if (secilenKiyafet.bolge === "torso") hedefID = "manken-govde";
    if (secilenKiyafet.bolge === "legs") hedefID = "manken-alt";

    const mankenParcasi = document.getElementById(hedefID);

    // Manken parçasını boya ve güncelle
    mankenParcasi.style.backgroundColor = secilenKiyafet.renk;
    mankenParcasi.style.borderStyle = "solid";
    mankenParcasi.style.borderColor = "#ffffff55";
    mankenParcasi.style.color = (secilenKiyafet.renk === "#f8fafc" || secilenKiyafet.renk === "#fef08a") ? "#0f172a" : "#ffffff";
    mankenParcasi.innerHTML = `<span>${secilenKiyafet.isim}</span>`;

    // Aktif kombin renk kaydını güncelle
    aktifKombin[secilenKiyafet.bolge] = secilenKiyafet.renkAdi;

    // Her giyinmede anlık olarak renk uyumunu hesapla
    uyumYuzdesiHesapla();
}

// --- 4. BÖLÜM: AKILLI RENK UYUMU ALGORİTMASI ---
function uyumYuzdesiHesapla() {
    const skorYazisi = document.getElementById("uyum-yuzdesi");
    const durumYazisi = document.getElementById("uyum-durumu");

    // Eğer 3 parça da henüz giydirilmediyse puan hesaplama, kullanıcıyı uyar
    if (!aktifKombin.head || !aktifKombin.torso || !aktifKombin.legs) {
        skorYazisi.innerHTML = "%--";
        skorYazisi.style.color = "#38bdf8";
        durumYazisi.innerHTML = "Lütfen kombini tamamlamak için tüm bölgeleri giydirin (Baş, Üst, Alt).";
        return;
    }

    let puan = 50; // Başlangıç taban puanı
    const { head, torso, legs } = aktifKombin;

    // --- ÖZEL UYUM KURALLARI VE YAZILIM MATRİSİ ---
    
    // Kusursuz Yaz Kombini (Mint Yeşili Şal + Beyaz Üst + Bej Alt)
    if (head === "yesil" && torso === "beyaz" && legs === "bej") puan += 45;
    
    // Monokrom Lila Kombini (Pudra/Ekru Şal + Lila Bluz + Lila Etek)
    if ((head === "ekru" || head === "pembe") && torso === "lila" && legs === "lila") puan += 45;
    
    // Doğal Toprak & Asil Tonlar (Mürdüm/Ekru Şal + Kiremit Üst + Bej/Siyah Alt)
    if ((head === "murdum" || head === "ekru") && torso === "kiremit" && (legs === "bej" || legs === "siyah")) puan += 40;

    // Kontrast Şıklık (Safir Mavi Şal + Siyah Üst + Gri/Siyah Alt)
    if (head === "mavi" && torso === "siyah" && (legs === "gri" || legs === "siyah")) puan += 40;

    // Toprak ve Doğa Uyumu (Ekru Şal + Haki Üst + Bej Alt)
    if (head === "ekru" && torso === "haki" && legs === "bej") puan += 45;

    // --- CEZA PUANLARI (Renklerin Çakışma Durumu) ---
    // Aynı anda çok fazla zıt renk bir araya gelirse (Mavi Şal + Kiremit Üst + Lila Etek gibi)
    if (head === "mavi" && torso === "kiremit" && legs === "lila") puan -= 20;
    if (head === "yesil" && torso === "lila" && legs === "gri") puan -= 15;

    // Puan sınırlarını koru (0 ile 100 arasında kalmalı)
    if (puan > 100) puan = 100;
    if (puan < 0) puan = 0;

    // Sonuçları Ekranda Göster ve Renklendir
    skorYazisi.innerHTML = `%${puan}`;

    if (puan >= 85) {
        skorYazisi.style.color = "#22c55e"; // Yeşil (Harika)
        durumYazisi.innerHTML = "🌟 Kusursuz Uyum! Renk teorisine göre harika bir gözün var, bakanlar bayılacak.";
    } else if (puan >= 65) {
        skorYazisi.style.color = "#eab308"; // Sarı (Güzel)
        durumYazisi.innerHTML = "✨ Güzel Kombin. Parçalar birbiriyle dengeli duruyor, günlük kullanım için şık.";
    } else {
        skorYazisi.style.color = "#ef4444"; // Kırmızı (Riskli)
        durumYazisi.innerHTML = "⚠️ Renk Karmaşası! Seçtiğin renkler birbirini biraz boğdu sanki, başka bir parça denemeye ne dersin?";
    }
}

// --- 5. BÖLÜM: GARDIROBU SIFIRLAMA ---
function gardirobuTemizle() {
    aktifKombin = { head: null, torso: null, legs: null };

    const bolgeler = [
        { id: "manken-bas", varsayilan: "Şal Alanı" },
        { id: "manken-govde", varsayilan: "Üst Giyim" },
        { id: "manken-alt", varsayilan: "Alt Giyim" }
    ];

    bolgeler.forEach(b => {
        const el = document.getElementById(b.id);
        el.style.backgroundColor = "transparent";
        el.style.borderStyle = "dashed";
        el.style.borderColor = "#334155";
        el.style.color = "#64748b";
        el.innerHTML = `<span>${b.varsayilan}</span>`;
    });

    uyumYuzdesiHesapla(); // Skoru da sıfırla
}

// Sayfa ilk açıldığında gardırobu yükle
gardirobuGoster();