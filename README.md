# Health-Agent-Core (HAC) 🏥

![Status](https://img.shields.io/badge/Status-Prototype-blue)
![Tech](https://img.shields.io/badge/Tech-React_Typescript_Tailwind-teal)
![AI](https://img.shields.io/badge/AI-Google_Gemini_2.0-orange)

**Health-Agent-Core (HAC)** adalah simulasi Sistem Informasi Rumah Sakit berbasis Multi-Agent System (MAS). Sistem ini mendemonstrasikan bagaimana **Google Gemini API** dapat digunakan sebagai orkestrator pusat (Koordinator) yang mengelola dan mendelegasikan tugas ke berbagai sub-agen spesialis berdasarkan logika institusional rumah sakit.

---

## 🧠 Arsitektur Multi-Agen

Sistem ini menggunakan satu model LLM (Gemini 2.5 Flash) yang diinstruksikan untuk mensimulasikan arsitektur 5 agen:

1.  **Koordinator Sistem (Central Hub):**
    *   Bertindak sebagai *Router/Triase*.
    *   Menganalisis input pengguna.
    *   **Tidak pernah** menjawab pertanyaan operasional secara langsung.
    *   Mendelegasikan tugas ke sub-agen yang relevan.

2.  **Sub-Agen (Spesialis):**
    *   🚑 **Patient Management:** Pendaftaran, jadwal, info rawat inap.
    *   📋 **Medical Records:** Data klinis, diagnosis (ICD-10), riwayat medis.
    *   👔 **Staff Management:** HR, jadwal dokter/perawat, kebijakan staf.
    *   💳 **Billing & Finance:** Klaim asuransi, invoice, pembayaran.

---

## 🚀 Fitur Utama

*   **Intelligent Routing:** Sistem memahami konteks (misal: "Saya sakit kepala" -> Rekam Medis, "Berapa biaya rontgen?" -> Keuangan).
*   **Structured Output (JSON Mode):** Memaksa LLM menghasilkan output JSON untuk memisahkan "pemikiran koordinator" (*Internal Monologue*) dari "respon agen" (*User Facing*).
*   **Document Generation Simulation:** Agen dapat mensimulasikan pembuatan dokumen (PDF/DOCX) seperti surat rujukan atau invoice.
*   **Grounding:** Terintegrasi dengan Google Search untuk memverifikasi informasi medis atau regulasi terkini.

---

## 🛠️ Cara Menjalankan (Local Development)

Pastikan Anda memiliki Node.js terinstal.

1.  **Clone Repository**
    ```bash
    git clone https://github.com/username/health-agent-core.git
    cd health-agent-core
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Konfigurasi API Key**
    Buat file `.env` di root folder (atau rename `.env.example`):
    ```env
    # Dapatkan key di https://aistudio.google.com/
    API_KEY=your_google_gemini_api_key_here
    ```

    *Catatan: Pastikan bundler Anda (Vite/Webpack) dikonfigurasi untuk mengekspos variabel ini (misal: `Vite` menggunakan `import.meta.env`, namun kode ini menggunakan `process.env` sesuai standar library Google GenAI).*

4.  **Jalankan Aplikasi**
    ```bash
    npm start
    # atau jika menggunakan vite
    npm run dev
    ```

---

## ☁️ Cara Deploy ke Netlify

1.  **Push ke GitHub:** Upload kode Anda ke repository GitHub.
2.  **Buat Site Baru di Netlify:**
    *   Login ke Netlify -> "Add new site" -> "Import an existing project".
    *   Pilih repository GitHub Anda.
3.  **Konfigurasi Build:**
    *   **Build command:** `npm run build`
    *   **Publish directory:** `dist` (atau `build` tergantung setup Create-React-App/Vite Anda).
4.  **Environment Variables (PENTING):**
    *   Di dashboard Netlify, masuk ke **Site configuration > Environment variables**.
    *   Tambahkan Key: `API_KEY`
    *   Value: (Masukkan API Key Google Gemini Anda).
5.  **Deploy:** Klik "Deploy site".

---

## 📂 Struktur Proyek

```
/src
  /components     # Komponen UI (Chat Bubble, Sidebar, Input)
  /services       # Logika interaksi dengan Google Gemini API
  /types          # Definisi TypeScript untuk Schema Agen
  App.tsx         # Logic utama aplikasi
  index.tsx       # Entry point
```

---

## 📜 Lisensi

MIT License. Dibuat untuk tujuan edukasi dan demonstrasi kemampuan Google Gemini API.
