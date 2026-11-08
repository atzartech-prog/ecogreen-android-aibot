# 🌱 EcoGreen Android AI Bot Station
> **Sulap Gadget Android Lawas Menjadi Server AI Bot Otonom 24/7 Hemat Daya**  
> *Transform Vintage Android Devices (STBs & Smartphones) into Autonomous, Low-Power 24/7 AI Bot Stations.*

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-brightgreen?logo=github)](https://pages.github.com/)
[![EcoGreen Tech](https://img.shields.io/badge/Initiative-EcoGreen%20Tech-emerald)](https://github.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![RAM Friendly](https://img.shields.io/badge/Min%20RAM-512MB%20--%201GB-cyan)](#)
[![Android KitKat](https://img.shields.io/badge/Min%20OS-Android%204.4%20KitKat-orange)](#)
[![Bilingual](https://img.shields.io/badge/Language-ID%20%7C%20EN-green)](#)

---

### 🌐 Language Selection / Pilih Bahasa
- [🇮🇩 **Bahasa Indonesia**](#-bahasa-indonesia)
- [🇬🇧 **English**](#-english)

---

## 🇮🇩 Bahasa Indonesia

### 📌 Latar Belakang & Gerakan EcoGreen Tech
Jutaan unit STB TV Android bekas (seperti **ZTE ZXV10 B860H**, **Fiberhome HG680P**, **X96 Mini**) dan smartphone Android jadul (versi **Android 4.4 KitKat** ke atas dengan RAM 1GB) menumpuk menjadi sampah elektronik (**e-waste**). Padahal, perangkat-perangkat ini ditenagai prosesor quad-core ARM (Cortex-A53 / A7) hemat listrik dan kartu jaringan yang sangat mumpuni.

Proyek ini menghadirkan aplikasi web interaktif, kalkulator kompatibilitas, generator prompt AI, dan panduan teknis mendalam untuk mendaur ulang gadget tersebut menjadi **Server AI Bot Telegram / Discord 24/7** yang ditenagai model LLM *free-tier* (Google Gemini 1.5/2.0 Flash, xAI Grok, OpenRouter, Cloudflare Workers AI) dengan konsumsi listrik **kurang dari 3-5 Watt** (< Rp 5.000/bulan).

---

### 🚀 4 Metode Arsitektur Utama

| Parameter | Metode 4: Go / Rust Single Binary | Metode 3: Python Micro-Bot | Metode 1: Chroot Linux | Metode 2: PRoot Userland |
| :--- | :--- | :--- | :--- | :--- |
| **Konsumsi RAM** | **~12 - 18 MB** (Juara) | ~35 - 55 MB | ~45 - 90 MB (Alpine) | ~120 - 250 MB |
| **Kebutuhan Root** | **Tidak Butuh** | Tidak Butuh | **Wajib Root (`su`)** | Tidak Butuh Root |
| **KitKat 4.4 Support** | **Sangat Bagus (Statis)** | Perlu Termux jadul | Bagus jika di-root | Sulit (Libc incompatibility) |
| **Overhead CPU** | 0% (Native ELF) | Ringan (Interpreter) | 0% (Native Kernel Syscalls) | Sedang (`ptrace` emulation) |
| **Risiko Android LMK** | **Sangat Rendah** | Rendah - Sedang | Rendah | Tinggi pada RAM 1GB |
| **Rekomendasi Hardware** | STB 1GB RAM / HP KitKat | STB / HP 1GB - 2GB RAM | STB Rooted 2GB RAM | HP / STB Non-root 2GB RAM |

---

### 🛠️ Rincian 4 Metode

#### 1. Metode 1: Chroot Linux (Wajib Root, RAM ≥ 2GB)
- **Konsep:** Memanfaatkan kernel Linux bawaan Android secara langsung untuk mengisolasi rootfs Linux (disarankan **Alpine Linux** karena ukurannya hanya ~3MB).
- **Keunggulan:** Kecepatan I/O dan CPU 100% native tanpa emulasi. Bebas install package Linux (`apk add python3 py3-pip`).
- **Langkah Singkat:**
  ```bash
  su
  mkdir -p /data/alpine && cd /data/alpine
  wget https://dl-cdn.alpinelinux.org/alpine/v3.19/releases/armv7/alpine-minirootfs-3.19.0-armv7.tar.gz
  tar -xzf alpine-minirootfs-*.tar.gz
  mount -o bind /dev /data/alpine/dev
  mount -o bind /sys /data/alpine/sys
  mount -o bind /proc /data/alpine/proc
  chroot /data/alpine /bin/sh
  ```

#### 2. Metode 2: PRoot Userland (Non-Root via Termux, RAM 1GB - 2GB)
- **Konsep:** Menggunakan syscall `ptrace` di userspace Android untuk memalsukan hak akses root dan struktur direktori Debian/Ubuntu.
- **Keunggulan:** Aman tanpa perlu unlock bootloader atau modifikasi firmware partisi sistem.
- **Langkah Singkat:**
  ```bash
  pkg update -y && pkg install proot proot-distro -y
  proot-distro install debian
  proot-distro login debian
  ```

#### 3. Metode 3: Python Micro-Bot (RAM 1GB - 2GB)
- **Konsep:** Menjalankan bot berbasis skrip Python asinkron minimalis menggunakan library `requests` atau `aiohttp` murni tanpa framework bot raksasa yang boros RAM.
- **Konsumsi Memori:** ~35-50 MB RAM.
- **Langkah Singkat:**
  ```bash
  pkg install python -y
  pip install requests
  termux-wake-lock
  nohup python bot_light.py > bot.log 2>&1 &
  ```

#### 4. Metode 4: Go / Rust Single Binary (Paling Disarankan untuk 1GB & KitKat 4.4)
- **Konsep:** Mengompilasi seluruh logika bot, pemanggilan Google Gemini REST API, dan polling Telegram menjadi **satu file biner ELF mandiri** yang ditautkan secara statis (`CGO_ENABLED=0`).
- **Keunggulan:**
  - Hanya butuh **~12 MB RAM**!
  - Tidak butuh runtime (tanpa Termux, tanpa Python, tanpa Node.js).
  - Berjalan langsung di kernel Linux Android 3.4/3.10 bawaan KitKat tanpa masalah Bionic libc.
  - Tahan banting terhadap Android *LowMemoryKiller* (LMK).
- **Cara Cross-Compile dari PC/Laptop:**
  ```powershell
  # Golang (PowerShell Windows)
  $env:CGO_ENABLED="0"; $env:GOOS="linux"; $env:GOARCH="arm"; $env:GOARM="7"; go build -ldflags="-s -w" -o aibot_arm7 main.go

  # Atau Rust:
  cargo build --target armv7-unknown-linux-musleabihf --release
  ```
- **Push ke Gadget via ADB:**
  ```bash
  adb connect 192.168.1.50:5555
  adb push aibot_arm7 /data/local/tmp/
  adb shell "chmod +x /data/local/tmp/aibot_arm7"
  adb shell "nohup /data/local/tmp/aibot_arm7 > /data/local/tmp/bot.log 2>&1 &"
  ```

---

### 🤖 Orkestrasi Menggunakan AI Agent
Anda tidak perlu menyusun kode biner atau memahami syscall kernel secara manual. Gunakan AI Agent (seperti **Antigravity**, **Claude 3.5**, **ChatGPT**, atau **Gemini**) dengan alur:
1. **Prompting Spesifikasi:** Berikan batasan hardware gadget Anda ke AI Agent menggunakan generator prompt di aplikasi web ini.
2. **Generasi Kode Mandiri:** AI Agent menuliskan source code Go/Rust/Python lengkap dengan penanganan retry jaringan.
3. **Kompilasi & Deployment:** Minta perintah cross-compilation dan skrip push ADB otomatis.
4. **Watchdog & Ketahanan 24/7:** AI Agent menyusun skrip monitor bash untuk memastikan bot selalu restart otomatis jika terjadi gangguan jaringan atau memori.

---

### 🔌 Integrasi AI Free-Tier & Bot Messenger
- **Google Gemini 1.5 / 2.0 Flash:** 15 Request Per Menit (RPM) gratis, kuota 1.500 RPD, latensi cepat, context window 1M tokens. Dapatkan API key di [Google AI Studio](https://aistudio.google.com/).
- **xAI Grok API:** Free credit trial untuk inferensi cepat.
- **OpenRouter Free Models:** Endpoint gratis untuk model open-source seperti DeepSeek-V3 dan Meta Llama 3.
- **Telegram Bot:** Buat bot melalui [@BotFather](https://t.me/BotFather) dalam 1 menit dan dapatkan `TELEGRAM_BOT_TOKEN`.
- **Discord Bot / Webhook:** Dapatkan Bot Token atau Incoming Webhook URL via [Discord Developer Portal](https://discord.com/developers/applications).

---

### 🔋 Panduan Keselamatan Hardware & EcoGreen 24/7
1. **Bahaya Baterai HP & Solusi Bypass:**  
   *PERINGATAN:* Jangan pernah membiarkan smartphone terus dicolokkan ke charger selama berbulan-bulan dengan baterai di dalamnya! Baterai Lithium-ion akan kembung dan berisiko terbakar.  
   *Solusi:* Lepaskan baterai HP. Gunakan modul *Step-Down Buck Converter (LM2596)* yang menurunkan voltase charger 5V menjadi **4.0V - 4.2V**, lalu solder kabel langsung ke pin (+) dan (-) konektor baterai HP. HP akan menyala abadi tanpa baterai!
2. **Kelebihan STB Bekas:**  
   STB TV (ZTE B860H, HG680P) **tidak memiliki baterai**, menjadikannya pilihan teraman dan paling stabil untuk server 24/7. Cukup colokkan adaptor bawaan.
3. **Koneksi Stabil & Suhu Dingin:**  
   Gunakan kabel LAN Ethernet (RJ45 bawaan STB) agar koneksi tidak terputus akibat sleep policy Wi-Fi Android. Tempelkan heatsink aluminium mini pada SoC jika diletakkan di ruangan tanpa AC.
4. **Auto-Boot Saat Listrik Pulih:**  
   Aktifkan auto-power-on via fastboot:  
   `fastboot oem off-mode-charge 0`  
   Dengan perintah ini, gadget akan otomatis hidup dan menjalankan bot tanpa perlu memencet tombol power manual saat listrik menyala kembali.

---

### 💻 Menjalankan Aplikasi Web & Deploy ke GitHub Pages

Aplikasi web ini dibuat murni dengan **HTML5, CSS3, dan Vanilla JavaScript**, tanpa butuh `npm`, `node_modules`, ataupun build tool.

#### Menjalankan Lokal:
Cukup buka file `index.html` langsung di browser Anda, atau gunakan live server sederhana:
```powershell
# Menggunakan Python:
python -m http.server 8080

# Lalu buka di browser: http://localhost:8080
```

#### Deploy ke GitHub Pages (30 Detik):
1. Buat repository baru di GitHub (misal: `ecogreen-android-aibot`).
2. Push semua file (`index.html`, `styles.css`, `app.js`, `README.md`) ke branch `main`.
3. Buka menu **Settings** > **Pages** di repository GitHub Anda.
4. Pada bagian **Build and deployment** > **Source**, pilih **Deploy from a branch**.
5. Pilih branch **`main`** dan folder **`/ (root)`**, lalu klik **Save**.
6. Situs web Anda langsung online dan dapat diakses publik di `https://username.github.io/ecogreen-android-aibot/`!

---
---

## 🇬🇧 English

### 📌 Background & The EcoGreen Tech Initiative
Millions of obsolete Android TV set-top boxes (**ZTE B860H**, **Fiberhome HG680P**, **X96 Mini**) and vintage Android smartphones (**Android 4.4 KitKat** and newer with 1GB RAM) end up as electronic waste (**e-waste**) every year. In reality, these devices possess capable quad-core ARM chips (Cortex-A53 / A7), low power draw, and dedicated networking hardware.

This project delivers an interactive web application, compatibility calculator, AI prompt generator, and in-depth engineering blueprint to resurrect these devices into **24/7 Autonomous AI Bot Stations** (Telegram / Discord) powered by free-tier LLMs (Google Gemini 1.5/2.0 Flash, xAI Grok, OpenRouter, Cloudflare Workers AI) consuming **under 3 to 5 Watts** of power.

---

### 🚀 The 4 Architectural Methods Compared

| Feature | Method 4: Go / Rust Single Binary | Method 3: Python Micro-Bot | Method 1: Chroot Linux | Method 2: PRoot Userland |
| :--- | :--- | :--- | :--- | :--- |
| **RAM Footprint** | **~12 - 18 MB** (Champion) | ~35 - 55 MB | ~45 - 90 MB (Alpine) | ~120 - 250 MB |
| **Root Required** | **No Root Needed** | No Root Needed | **Root Required (`su`)** | No Root Needed |
| **KitKat 4.4 Support** | **Flawless (Static ELF)** | Requires legacy Termux | Works if rooted | Poor (modern libc issues) |
| **CPU Overhead** | 0% (Native ELF) | Minor (Interpreter) | 0% (Direct Kernel Syscalls) | Moderate (`ptrace` emulation) |
| **Android LMK Risk** | **Extremely Low** | Low to Moderate | Low | High on 1GB RAM devices |
| **Ideal Hardware** | 1GB STBs / KitKat Phones | 1GB - 2GB RAM Devices | Rooted 2GB RAM STBs | Unrooted 2GB RAM Phones/STBs |

---

### 🛠️ Deep Dive into the 4 Methods

#### 1. Method 1: Linux Chroot (Rooted, RAM ≥ 2GB)
- **Concept:** Uses Android's underlying Linux kernel directly to isolate a secondary Linux root filesystem (**Alpine Linux** is recommended due to its minimal ~3MB footprint).
- **Advantage:** True native CPU and memory execution with zero virtualization penalty. Full access to package managers (`apk add python3 py3-pip`).
- **Quick Setup:**
  ```bash
  su
  mkdir -p /data/alpine && cd /data/alpine
  wget https://dl-cdn.alpinelinux.org/alpine/v3.19/releases/armv7/alpine-minirootfs-3.19.0-armv7.tar.gz
  tar -xzf alpine-minirootfs-*.tar.gz
  mount -o bind /dev /data/alpine/dev
  mount -o bind /sys /data/alpine/sys
  mount -o bind /proc /data/alpine/proc
  chroot /data/alpine /bin/sh
  ```

#### 2. Method 2: PRoot Userland (Non-Root via Termux, RAM 1GB - 2GB)
- **Concept:** Emulates root privileges and directory structures in userland via the Linux `ptrace` system call.
- **Advantage:** Completely safe; no bootloader unlocking or system partition flashing required.
- **Quick Setup:**
  ```bash
  pkg update -y && pkg install proot proot-distro -y
  proot-distro install debian
  proot-distro login debian
  ```

#### 3. Method 3: Python Micro-Bot (RAM 1GB - 2GB)
- **Concept:** A lean asynchronous Python script using standard `requests` or `aiohttp` without bloated frameworks that drain memory.
- **Memory Footprint:** ~35-50 MB RAM.
- **Quick Setup:**
  ```bash
  pkg install python -y
  pip install requests
  termux-wake-lock
  nohup python bot_light.py > bot.log 2>&1 &
  ```

#### 4. Method 4: Go / Rust Single Binary (The EcoGreen Champion for 1GB RAM & KitKat)
- **Concept:** Compiles the entire bot engine, Google Gemini REST API caller, and Telegram polling into a **single static ELF binary** (`CGO_ENABLED=0`).
- **Advantages:**
  - Consumes barely **~12 MB of RAM**!
  - Zero runtime dependencies (no Termux, no Python, no Node.js).
  - Runs natively on vintage Android 3.4/3.10 Linux kernels without Bionic libc incompatibility.
  - Immune to Android *LowMemoryKiller* (LMK) eviction.
- **Cross-Compilation from PC/Laptop:**
  ```powershell
  # Go (PowerShell):
  $env:CGO_ENABLED="0"; $env:GOOS="linux"; $env:GOARCH="arm"; $env:GOARM="7"; go build -ldflags="-s -w" -o aibot_arm7 main.go

  # Rust (Static musl target):
  cargo build --target armv7-unknown-linux-musleabihf --release
  ```
- **Deploy via ADB:**
  ```bash
  adb connect 192.168.1.50:5555
  adb push aibot_arm7 /data/local/tmp/
  adb shell "chmod +x /data/local/tmp/aibot_arm7"
  adb shell "nohup /data/local/tmp/aibot_arm7 > /data/local/tmp/bot.log 2>&1 &"
  ```

---

### 🤖 AI Agent Orchestration Workflow
You don't have to write low-level Go network code or manage Linux kernel syscalls from scratch. Leverage an AI Agent (such as **Antigravity**, **Claude 3.5**, **ChatGPT**, or **Gemini**) in a 4-step cycle:
1. **Specification Prompting:** Feed your exact hardware constraints (RAM, OS version) into the AI Agent using the built-in Prompt Generator tool in the web app.
2. **Code Synthesis & Tuning:** The AI Agent drafts production-grade Go/Rust/Python source code with built-in network retry exponential backoff.
3. **Cross-Compilation & Push:** The AI Agent gives you precise cross-compilation commands and wireless ADB push scripts.
4. **24/7 Resilience & Watchdog:** The AI Agent creates lightweight supervisor scripts to monitor memory and auto-restart the bot upon connection drops.

---

### 🔌 Free-Tier AI APIs & Bot Platforms
- **Google Gemini 1.5 / 2.0 Flash:** 15 Requests Per Minute (RPM) free tier, 1,500 Requests Per Day, sub-second latency, 1M context window. Obtain your key at [Google AI Studio](https://aistudio.google.com/).
- **xAI Grok API:** Free credit trials for cutting-edge reasoning.
- **OpenRouter Free Tier:** Community endpoints for DeepSeek-V3 and Meta Llama 3 models.
- **Telegram Bot:** Set up a bot with [@BotFather](https://t.me/BotFather) in under 60 seconds.
- **Discord Bot / Webhook:** Create a Bot Token or Webhook URL in the [Discord Developer Portal](https://discord.com/developers/applications).

---

### 🔋 24/7 Hardware Survival & Safe Operation Guide
1. **Smartphone Battery Hazard & The Dummy Bypass:**  
   *DANGER:* Never leave an old smartphone permanently plugged into a charger with its battery installed! Lithium-ion pouches degrade, swell, and create serious fire hazards.  
   *Solution:* Remove the battery pouch. Use an *LM2596 Buck Converter* to step down a 5V charger to **4.0V - 4.2V**, and solder directly to the phone's battery connector pins. The phone will run indefinitely and safely!
2. **Why Android TV STBs are Ideal:**  
   STBs (like ZTE B860H, HG680P) **do not have batteries**. They run on safe 12V/1A or 5V/2A DC power bricks and idle at **under 3 Watts**. Monthly electricity is negligible (< $0.35/month).
3. **Thermal Management & Wired Networking:**  
   Use the built-in Ethernet port (RJ45) instead of Wi-Fi to eliminate Android sleep disconnects. Place a small passive heatsink on top of the SoC to keep temperatures around 45°C.
4. **Auto-Boot on AC Power Restoration:**  
   Enable auto-booting using fastboot:  
   `fastboot oem off-mode-charge 0`  
   After a power outage, the device will automatically power on without needing a manual power button press!

---

### 💻 Local Run & GitHub Pages Deployment

The entire project is built with vanilla **HTML5, CSS3, and JavaScript** with zero external dependencies.

#### Run Locally:
Open `index.html` in any web browser, or launch a quick local web server:
```powershell
python -m http.server 8080
# Visit http://localhost:8080
```

#### Deploy to GitHub Pages (30 Seconds):
1. Create a repository on GitHub (e.g. `ecogreen-android-aibot`).
2. Push `index.html`, `styles.css`, `app.js`, and `README.md` to the `main` branch.
3. In GitHub, navigate to **Settings** > **Pages**.
4. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
5. Select branch **`main`** and folder **`/ (root)`**, then click **Save**.
6. Your web application is now live at `https://<your-username>.github.io/<repo-name>/`!

---

### 📄 License
Released under the open-source [MIT License](LICENSE). Contributions, forks, and e-waste repurposing stories are warmly welcomed!
