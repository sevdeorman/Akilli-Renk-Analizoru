# 📊 Akıllı Renk Teorisi & Kombin Analizörü

Bu proje, frontend teknolojileri ve özel bir renk uyum matrisi algoritması kullanılarak geliştirilmiş **interaktif bir dijital gardırop asistanı ve kombin analizörüdür**. Kullanıcıların seçtiği kıyafetlerin renk teorisine göre anlık olarak uyum yüzdesini hesaplar ve geri bildirim verir.

## 🚀 Öne Çıkan Mühendislik Detayları

* **Dinamik Veri Yönetimi (JavaScript):** Kıyafet listesi HTML'e statik olarak yazılmamış, sektör standartlarına uygun olarak bir nesne dizisi (Array of Objects) olarak tutulmuş ve DOM manipülasyonu ile ekrana dinamik olarak basılmıştır.
* **Akıllı Uyum Algoritmaları:** Seçilen parçaların (`head`, `torso`, `legs`) renk değişkenleri arkada çalışan bir algoritma matrisine sokulur. Kusursuz yaz kombinleri, toprak tonları uyumu ve monokrom şıklık gibi kurallara göre anlık başarı skoru hesaplanır. Çakışan renklerde sistem otomatik ceza puanı uygular.
* **Modern UI/UX Düzeni (CSS Grid & Flexbox):** CSS Grid mimarisi (`repeat(auto-fill, minmax(...))`) sayesinde proje tamamen responsive (mobil uyumlu) yapıdadır. CSS `cubic-bezier` geçiş animasyonları ile premium bir kullanıcı deneyimi sunar.

## 💻 Kullanılan Teknolojiler

* **HTML5** - Semantik sayfa mimarisi ve interaktif iskelet.
* **CSS3** - Flexbox, Grid Layout, Custom Gradients ve Hover Efektleri.
* **JavaScript (ES6+)** - `forEach()`, `find()`, `filter()` ve `map()` dizi metotları, Dinamik Event Listeners.

## 🛠️ Kurulum ve Çalıştırma

Proje tamamen bağımsız çalışacak şekilde (internetsiz ortamlarda dahi) tasarlanmıştır. Herhangi bir kütüphane veya paket kurulumuna ihtiyaç duymaz.
1. Projeyi bilgisayarınıza indirin.
2. Klasör içindeki `index.html` dosyasına çift tıklayarak tarayıcınızda anında çalıştırabilirsiniz.
