/**
 * EcoGreen Android AI Bot Hub - Core Script
 * Full Bilingual engine (ID & EN), Interactive Calculator, AI Prompt Generator
 */

// Global State
const appState = {
  lang: localStorage.getItem('aibot_lang') || 'id',
  theme: localStorage.getItem('aibot_theme') || 'dark'
};

// Comprehensive Bilingual Dictionary
const i18nData = {
  id: {
    // Nav
    nav_overview: "Ikhtisar",
    nav_calc: "Kalkulator Metode",
    nav_methods: "4 Metode",
    nav_prompt: "AI Prompt Generator",
    nav_hardware: "Hardware & EcoGreen",
    lang_btn: "English",
    
    // Hero
    hero_badge: "Daur Ulang E-Waste • Inisiatif EcoGreen Tech",
    hero_title: "Sulap Gadget Android Lawas Menjadi <span class='text-gradient'>Mesin AI Bot Cerdas</span>",
    hero_subtitle: "Manfaatkan STB bekas (ZTE B860H, HG680P) atau smartphone Android jadul (KitKat 4.4+, RAM 1GB) sebagai server AI bot 24/7 hemat energi. Ditenagai orkestrasi AI Agent, LLM Free-Tier (Gemini/Grok), dan arsitektur ultra-ringan.",
    btn_start_calc: "Cari Metode Gadget Anda",
    btn_explore_methods: "Pelajari 4 Metode",
    
    chip1_title: "Ramah RAM 1GB",
    chip1_desc: "Bisa jalan lancar di STB & KitKat 4.4",
    chip2_title: "100% Free-Tier AI",
    chip2_desc: "Gemini 1.5/2.0 Flash & Grok API",
    chip3_title: "Single Binary Go/Rust",
    chip3_desc: "Konsumsi RAM hanya ~12-18 MB",
    chip4_title: "EcoGreen 24/7",
    chip4_desc: "Hemat listrik < 5W & bebas baterai kembung",

    // Overview section
    sec_overview_tag: "Arsitektur & Konsep",
    sec_overview_title: "4 Metode Menghidupkan Kembali Gadget Lawas",
    sec_overview_desc: "Jangan buang STB atau HP Android lama Anda ke tempat sampah. Pilih metode yang tepat berdasarkan spesifikasi perangkat Anda untuk menjadikannya bot Telegram/Discord AI tanpa batas.",

    m1_tag: "Metode 1",
    m1_title: "Chroot Linux",
    m1_desc: "Menjalankan distro Linux (Alpine / Debian) langsung di atas kernel Android yang sudah di-root. Akses hardware penuh tanpa emulasi.",
    m1_spec_ram: "RAM Minimal",
    m1_spec_root: "Status Root",
    m1_spec_root_val: "Wajib Root (Su)",
    m1_spec_perf: "Overhead",
    m1_spec_perf_val: "Sangat Rendah (Native)",
    btn_view_m1: "Panduan Chroot",

    m2_tag: "Metode 2",
    m2_title: "PRoot Userland",
    m2_desc: "Menjalankan sistem Linux tiruan di ruang pengguna (userspace) via Termux tanpa butuh akses root sama sekali.",
    m2_spec_ram: "RAM Minimal",
    m2_spec_root: "Status Root",
    m2_spec_root_val: "Tanpa Root (Aman)",
    m2_spec_perf: "Overhead",
    m2_spec_perf_val: "Sedang (Emulasi ptrace)",
    btn_view_m2: "Panduan PRoot",

    m3_tag: "Metode 3",
    m3_title: "Python Micro-Bot",
    m3_desc: "Menulis skrip bot menggunakan Python ringan dengan asyncio dan library minimalis, dijalankan langsung di Termux.",
    m3_spec_ram: "RAM Minimal",
    m3_spec_root: "Status Root",
    m3_spec_root_val: "Bebas (Root / Non-Root)",
    m3_spec_perf: "Overhead",
    m3_spec_perf_val: "Ringan (~35-50 MB RAM)",
    btn_view_m3: "Panduan Python",

    m4_tag: "Metode 4 • Juara EcoGreen",
    m4_title: "Go / Rust Single Binary",
    m4_desc: "Kompilasi statis single executable (ELF armv7/arm64). Berjalan langsung di shell Android tanpa dependencies, hanya butuh belasan megabyte RAM!",
    m4_spec_ram: "RAM Minimal",
    m4_spec_root: "Status Root",
    m4_spec_root_val: "Bebas (Root / Non-Root)",
    m4_spec_perf: "Overhead",
    m4_spec_perf_val: "Ultra Rendah (~12 MB RAM)",
    btn_view_m4: "Panduan Single Binary",

    // Calculator Section
    sec_calc_tag: "Rekomendasi Cerdas",
    sec_calc_title: "Kalkulator Kecocokan Gadget",
    sec_calc_desc: "Masukkan detail gadget Android bekas Anda untuk melihat metode yang paling optimal, stabil, dan ramah RAM.",
    label_dev_type: "Jenis Gadget:",
    opt_stb: "STB Android Bekas (ZTE B860H, HG680P, X96, dll)",
    opt_phone: "Smartphone Android Jadul (Samsung, Xiaomi, Advan, dll)",
    label_ram: "Kapasitas RAM Perangkat:",
    label_root: "Status Akses Root:",
    opt_root_yes: "Sudah di-Root (Ada Magisk / SuperSU)",
    opt_root_no: "Belum di-Root (Standard / Bawaan Pabrik)",
    label_os: "Versi Android:",
    opt_os_kitkat: "Android 4.4 KitKat (Kernel lawas 3.4/3.10)",
    opt_os_lollipop: "Android 5.0 - 6.0 Lollipop/Marshmallow",
    opt_os_nougat: "Android 7.0 - 9.0 (Nougat/Oreo/Pie)",
    opt_os_modern: "Android 10+ atau Armbian Linux",
    label_target_bot: "Tujuan Penggunaan:",
    opt_target_tg: "Telegram AI Bot (Gemini / Grok Free Tier)",
    opt_target_dc: "Discord AI Bot & Webhook",
    opt_target_both: "Multi-Channel Telegram + Discord",

    calc_res_badge: "Hasil Analisis Gadget",
    calc_res_btn: "Buka Panduan Langkah Demi Langkah",

    // Deep Dive Section
    sec_methods_tag: "Panduan Lengkap",
    sec_methods_title: "Tutorial 4 Metode Menghidupkan AI Bot",
    sec_methods_desc: "Pilih tab metode di bawah untuk melihat arsitektur, kode, langkah setup, dan orkestrasi AI Agent.",
    tab_m4: "Metode 4: Go / Rust (Rekomendasi Utama)",
    tab_m3: "Metode 3: Python Micro-Bot",
    tab_m1: "Metode 1: Chroot (Rooted)",
    tab_m2: "Metode 2: PRoot (Non-Rooted)",

    // Step Cards M4
    step_go_1_title: "Mengapa Single Binary Adalah Raja di RAM 1GB & KitKat?",
    step_go_1_desc: "Pada Android KitKat 4.4 atau perangkat dengan RAM 1GB, menjalankan lingkungan penuh seperti Python interpreter (butuh ~40MB), Node.js (butuh ~80MB), atau distro Linux (butuh ~150MB) sering kali membuat sistem kehabisan memori. Akibatnya, mekanisme LowMemoryKiller (LMK) Android akan membunuh proses bot Anda di tengah jalan.<br><br>Dengan Go atau Rust, kita mengompilasi seluruh logika bot, pemanggilan Google Gemini API, dan polling Telegram ke dalam satu berkas biner ELF tunggal. Binary ini ditautkan secara statis (CGO_ENABLED=0), sehingga tidak bergantung pada library Bionic Android versi apapun dan hanya mengonsumsi ~12 MB RAM!",
    step_go_2_title: "Source Code Golang Bot (Gemini 1.5/2.0 Flash + Telegram)",
    step_go_2_desc: "Kode ini dibuat 100% murni menggunakan standard library Go (net/http, encoding/json), tanpa dependensi eksternal, sangat cepat dan anti-bocor memori:",
    step_go_3_title: "Cara Cross-Compile & Deploy ke Gadget Android",
    step_go_3_desc: "Kompilasi kode di atas dari laptop/PC Anda untuk prosesor ARM (kebanyakan STB/HP lawas menggunakan ARMv7 32-bit):",

    // Step Cards M3
    step_py_1_title: "Python Minimalis Tanpa Bloatware Framework",
    step_py_1_desc: "Banyak tutorial bot Telegram Python menggunakan library berat seperti python-telegram-bot lengkap dengan dependensi berat yang memakan 80MB+ RAM. Untuk gadget RAM 1GB, kita menggunakan skrip Python asinkron murni dengan requests atau urllib3 biasa, memangkas penggunaan memori hingga tersisa ~35 - 45 MB.",
    step_py_2_title: "Source Code Python Bot (Gemini + Telegram)",
    step_py_3_title: "Langkah Eksekusi di Termux Android",

    // Step Cards M1
    step_ch_1_title: "Konsep Chroot: Akses Penuh ke Kernel Tanpa Emulasi",
    step_ch_1_desc: "Metode Chroot memanfaatkan kernel Linux bawaan Android untuk mengisolasi lingkungan root file-system baru (seperti Alpine Linux atau Debian). Karena berjalan langsung di atas kernel tanpa layer emulasi ptrace, kecepatannya 100% native!<br><br>Syarat Utama: Gadget wajib sudah memiliki akses Root (su) dan disarankan memiliki RAM ≥ 2 GB (seperti STB B860H v5 atau HG680P).",
    step_ch_2_title: "Skrip Setup Alpine Linux Chroot (Paling Ringan)",
    step_ch_3_title: "Menjalankan Chroot Otomatis Saat Booting Android",
    step_ch_3_desc: "Agar bot langsung hidup saat STB disambungkan ke adaptor listrik, buat skrip di /system/etc/init.d/99aibot atau gunakan Magisk service.d.",

    // Step Cards M2
    step_pr_1_title: "Konsep PRoot: Linux Penuh Tanpa Perlu Root",
    step_pr_1_desc: "Jika gadget Anda tidak di-root (misalnya STB kantor atau HP keluarga yang tidak ingin Anda modifikasi firmware-nya), metode PRoot adalah solusinya. PRoot menggunakan syscall ptrace untuk mencegat panggilan sistem file dan mensimulasikan lingkungan root secara virtual.<br><br>Catatan Kinerja: Ada sedikit overhead CPU/RAM karena emulasi ptrace. Ideal untuk gadget dengan RAM 1.5 GB - 2 GB dan Android 5.0+.",
    step_pr_2_title: "Cara Install Debian / Ubuntu via PRoot-Distro di Termux",

    // AI Orchestration Section
    sec_ai_tag: "Peran AI Agent",
    sec_ai_title: "Orkestrasi Otomatis Menggunakan AI Agent",
    sec_ai_desc: "Anda tidak perlu jago coding Go atau Linux kernel. Anda cukup meminta AI Agent (seperti Antigravity, Claude, ChatGPT, atau Gemini) untuk menyusun kode, mengompilasi, dan membuatkan skrip watchdog.",
    ai_step1_title: "Deskripsikan Batasan Gadget",
    ai_step1_desc: "Jelaskan kepada AI Agent: 'Saya punya STB B860H RAM 1GB Android KitKat, buatkan bot Go tanpa CGO agar tidak Out-Of-Memory.'",
    ai_step2_title: "AI Menyusun Binary",
    ai_step2_desc: "AI Agent menghasilkan source code lengkap, menyetel endpoint Gemini Flash/Grok free-tier, serta memberikan baris perintah cross-compile ARMv7.",
    ai_step3_title: "Push Binary via ADB",
    ai_step3_desc: "AI Agent memandu Anda menghubungkan IP STB via WiFi ADB, mentransfer file binary, dan memasukkan token Telegram & API Key Gemini.",
    ai_step4_title: "Ketahanan 24/7",
    ai_step4_desc: "AI Agent menyusun skrip monitor bash yang secara otomatis merestart bot jika terjadi gangguan koneksi internet atau lonjakan memori.",

    // AI Prompt Generator
    sec_prompt_tag: "Generator Otomatis",
    sec_prompt_title: "Generator Prompt untuk AI Agent",
    sec_prompt_desc: "Pilih konfigurasi kebutuhan Anda di bawah ini, lalu klik tombol 'Salin Prompt'. Tempelkan (paste) prompt ini ke AI Agent Anda untuk menghasilkan solusi instan!",
    p_label_method: "Metode yang Dipilih:",
    p_label_llm: "Penyedia LLM (Free-Tier):",
    p_label_platform: "Platform Chat:",
    p_label_ram: "Batas RAM Gadget:",
    p_label_features: "Fitur Tambahan:",
    p_feat_watchdog: "Termasuk Skrip Auto-Restart / Watchdog",
    p_feat_boot: "Termasuk Skrip Auto-Boot saat Listrik Nyala",
    btn_gen_prompt: "Buat Prompt AI",
    btn_copy_prompt: "Salin Prompt ke Clipboard",
    toast_copied: "Prompt berhasil disalin ke clipboard!",

    // Matrix Table
    matrix_tag: "Matriks Perbandingan",
    matrix_title: "Perbandingan 4 Metode pada Gadget RAM 1GB",
    matrix_desc: "Pahami perbedaan konsumsi sumber daya dan batasan teknis dari masing-masing pendekatan.",

    // Hardware & EcoGreen Guide
    sec_hw_tag: "Daur Ulang Ramah Lingkungan",
    sec_hw_title: "Panduan Hardware & Pengoperasian 24/7",
    sec_hw_desc: "Kunci utama server eco-green adalah keandalan jangka panjang, pencegahan bahaya baterai kembung, dan konsumsi daya super hemat.",
    hw_card1_tag: "Keamanan Hardware",
    hw_card1_title: "Bahaya Baterai HP & Solusi Bypass",
    hw_card1_desc: "Jika Anda memakai smartphone bekas, JANGAN colok charger terus menerus dengan baterai terpasang! Baterai Lithium-Ion akan kembung dan berisiko terbakar dalam hitungan bulan.<br><br>Solusi Eco-Bypass: Lepas baterai fisik, gunakan modul Step-Down Buck Converter (LM2596) dari charger 5V diturunkan ke 4.0V - 4.2V dan solder langsung ke pin (+) dan (-) konektor baterai HP. HP akan menyala abadi tanpa baterai!",
    hw_card2_tag: "STB Bekas Juara EcoGreen",
    hw_card2_title: "Kenapa STB Android Sangat Ideal?",
    hw_card2_desc: "STB bekas (seperti ZTE B860H atau Fiberhome HG680P) tidak memiliki baterai bawaan. Menggunakan adaptor DC 12V/1A atau 5V/2A bawaan pabrik dengan konsumsi daya sangat rendah: kurang dari 3 Watt saat idle. Biaya listriknya kurang dari Rp 5.000 / bulan!",
    hw_card3_tag: "Manajemen Suhu & Jaringan",
    hw_card3_title: "Pendinginan Pasif & Port LAN",
    hw_card3_desc: "STB lawas sudah dilengkapi port Ethernet (RJ45). Gunakan kabel LAN daripada Wi-Fi agar koneksi bot ke server Telegram/Gemini tidak pernah putus akibat sleep mode Android. Buka casing atau tempelkan heatsink aluminium kecil di atas chipset SoC (Amlogic S905x) untuk suhu adem 45°C.",
    hw_card4_tag: "Auto-Boot Recovery",
    hw_card4_title: "Otomatis Hidup Saat Listrik Menyala",
    hw_card4_desc: "Pada smartphone, jika listrik mati dan menyala kembali, aktifkan fitur auto-boot dengan perintah fastboot: fastboot oem off-mode-charge 0. Dengan ini, begitu charger mendapat aliran listrik, HP akan langsung otomatis booting menyalakan bot tanpa perlu ditekan tombol power!",

    // Footer
    footer_title: "EcoGreen Android AI Bot Hub",
    footer_desc: "Gerakan upcycling perangkat elektronik bekas (e-waste) menjadi server AI mandiri berkonsumsi daya rendah. Dibuat dengan HTML murni, CSS, dan JavaScript tanpa dependensi eksternal, siap di-hosting langsung di GitHub Pages.",
    footer_quick_links: "Tautan Cepat",
    footer_tech: "Teknologi",
    footer_copy: "Dibuat untuk komunitas pengembang & pegiat EcoGreen Tech. Lisensi Open Source MIT."
  },

  en: {
    // Nav
    nav_overview: "Overview",
    nav_calc: "Method Calculator",
    nav_methods: "4 Methods",
    nav_prompt: "AI Prompt Generator",
    nav_hardware: "Hardware & EcoGreen",
    lang_btn: "Bahasa Indonesia",
    
    // Hero
    hero_badge: "E-Waste Upcycling • EcoGreen Tech Initiative",
    hero_title: "Transform Vintage Android Devices into <span class='text-gradient'>Intelligent AI Bot Stations</span>",
    hero_subtitle: "Repurpose unused Android TV STBs (ZTE B860H, HG680P) or vintage smartphones (KitKat 4.4+, 1GB RAM) into 24/7 low-power AI bot servers. Powered by AI Agent orchestration, free-tier LLMs (Gemini/Grok), and ultra-lean binaries.",
    btn_start_calc: "Find Method for Your Device",
    btn_explore_methods: "Explore 4 Methods",
    
    chip1_title: "1GB RAM Friendly",
    chip1_desc: "Runs smoothly on STBs & KitKat 4.4",
    chip2_title: "100% Free-Tier AI",
    chip2_desc: "Gemini 1.5/2.0 Flash & Grok APIs",
    chip3_title: "Single Binary Go/Rust",
    chip3_desc: "Only ~12-18 MB RAM consumption",
    chip4_title: "EcoGreen 24/7",
    chip4_desc: "Low power < 5W & battery-swelling safe",

    // Overview section
    sec_overview_tag: "Architecture & Concept",
    sec_overview_title: "4 Methods to Resurrect Vintage Gadgets",
    sec_overview_desc: "Don't send your old Android STBs or phones to the landfill. Choose the right method based on your device specs to build an autonomous 24/7 Telegram/Discord AI bot.",

    m1_tag: "Method 1",
    m1_title: "Linux Chroot",
    m1_desc: "Run a native Linux distribution (Alpine / Debian) directly on top of the rooted Android kernel. Full hardware access with zero virtualization overhead.",
    m1_spec_ram: "Minimum RAM",
    m1_spec_root: "Root Status",
    m1_spec_root_val: "Root Required (su)",
    m1_spec_perf: "Overhead",
    m1_spec_perf_val: "Very Low (Native Syscalls)",
    btn_view_m1: "Chroot Guide",

    m2_tag: "Method 2",
    m2_title: "PRoot Userland",
    m2_desc: "Run an emulated Linux userland via Termux / proot without requiring any root permissions. Ideal for locked or stock firmware devices.",
    m2_spec_ram: "Minimum RAM",
    m2_spec_root: "Root Status",
    m2_spec_root_val: "No Root Needed (Stock)",
    m2_spec_perf: "Overhead",
    m2_spec_perf_val: "Moderate (ptrace emulation)",
    btn_view_m2: "PRoot Guide",

    m3_tag: "Method 3",
    m3_title: "Python Micro-Bot",
    m3_desc: "Write lightweight bot scripts in modern Python using asyncio and minimal HTTP clients, running natively inside Termux or userland.",
    m3_spec_ram: "Minimum RAM",
    m3_spec_root: "Root Status",
    m3_spec_root_val: "Any (Root / Non-Root)",
    m3_spec_perf: "Overhead",
    m3_spec_perf_val: "Lightweight (~35-50 MB RAM)",
    btn_view_m3: "Python Guide",

    m4_tag: "Method 4 • EcoGreen Champion",
    m4_title: "Go / Rust Single Binary",
    m4_desc: "Statically compiled standalone executable (ELF armv7/arm64). Runs directly on raw Android Linux kernel without dependencies, using barely 12 MB RAM!",
    m4_spec_ram: "Minimum RAM",
    m4_spec_root: "Root Status",
    m4_spec_root_val: "Any (Root / Non-Root)",
    m4_spec_perf: "Overhead",
    m4_spec_perf_val: "Ultra Low (~12 MB RAM)",
    btn_view_m4: "Single Binary Guide",

    // Calculator Section
    sec_calc_tag: "Smart Recommendation",
    sec_calc_title: "Gadget Compatibility Calculator",
    sec_calc_desc: "Select your old Android device's hardware specifications to see the most optimal, rock-solid, and RAM-friendly deployment method.",
    label_dev_type: "Device Type:",
    opt_stb: "Vintage Android STB (ZTE B860H, HG680P, X96, etc.)",
    opt_phone: "Old Android Smartphone (Samsung, Xiaomi, generic)",
    label_ram: "Device RAM Capacity:",
    label_root: "Root Access Status:",
    opt_root_yes: "Rooted (Magisk / SuperSU present)",
    opt_root_no: "Not Rooted (Stock / Locked OEM)",
    label_os: "Android Version:",
    opt_os_kitkat: "Android 4.4 KitKat (Legacy 3.4/3.10 kernel)",
    opt_os_lollipop: "Android 5.0 - 6.0 Lollipop/Marshmallow",
    opt_os_nougat: "Android 7.0 - 9.0 (Nougat/Oreo/Pie)",
    opt_os_modern: "Android 10+ or Armbian Linux",
    label_target_bot: "Intended Bot Platform:",
    opt_target_tg: "Telegram AI Bot (Gemini / Grok Free Tier)",
    opt_target_dc: "Discord AI Bot & Webhook",
    opt_target_both: "Multi-Channel Telegram + Discord",

    calc_res_badge: "Device Analysis Result",
    calc_res_btn: "Open Step-by-Step Guide",

    // Deep Dive Section
    sec_methods_tag: "Comprehensive Tutorials",
    sec_methods_title: "4 Methods to Deploy Your AI Bot",
    sec_methods_desc: "Select a method tab below to explore architecture, runnable code, setup instructions, and AI Agent orchestration.",
    tab_m4: "Method 4: Go / Rust (Top Pick)",
    tab_m3: "Method 3: Python Micro-Bot",
    tab_m1: "Method 1: Chroot (Rooted)",
    tab_m2: "Method 2: PRoot (Non-Rooted)",

    // Step Cards M4
    step_go_1_title: "Why Single Binary is King on 1GB RAM & KitKat?",
    step_go_1_desc: "On Android KitKat 4.4 or devices with only 1GB RAM, running full runtimes like Python interpreter (~40MB), Node.js (~80MB), or full Linux distros (~150MB) often triggers Android's Out-Of-Memory LowMemoryKiller (LMK).<br><br>With Go or Rust, we compile the entire bot engine, Google Gemini API client, and Telegram polling into a single static ELF binary (CGO_ENABLED=0). It has zero runtime dependencies on Android's Bionic libc and consumes barely ~12 MB of RAM!",
    step_go_2_title: "Golang Bot Source Code (Gemini 1.5/2.0 Flash + Telegram)",
    step_go_2_desc: "Built purely with Go standard library (net/http, encoding/json) with zero external bloat, blazing speed, and zero memory leaks:",
    step_go_3_title: "Cross-Compilation & Deployment to Android",
    step_go_3_desc: "Compile this code from your PC/laptop for ARM processors (most vintage STBs/phones are ARMv7 32-bit):",

    // Step Cards M3
    step_py_1_title: "Minimalist Python Without Bloated Frameworks",
    step_py_1_desc: "Many tutorials use heavyweight libraries like python-telegram-bot that hoard 80MB+ RAM. For 1GB devices, we use pure asynchronous or lightweight requests/urllib3 scripts, cutting memory footprint down to ~35-45 MB.",
    step_py_2_title: "Python Bot Source Code (Gemini + Telegram)",
    step_py_3_title: "Execution Steps in Android Termux",

    // Step Cards M1
    step_ch_1_title: "Chroot Concept: Full Kernel Performance Without Emulation",
    step_ch_1_desc: "Chroot utilizes Android's underlying Linux kernel directly to isolate a new root filesystem (like Alpine Linux or Debian). Zero virtualization penalty means 100% native CPU and I/O speed!<br><br>Prerequisite: Device must be Rooted (su) and ideally have ≥ 2 GB RAM (such as STB B860H v5 or HG680P).",
    step_ch_2_title: "Alpine Linux Chroot Setup Script (Lightest)",
    step_ch_3_title: "Auto-Starting Chroot on Android Boot",
    step_ch_3_desc: "To start your bot automatically whenever the STB receives AC power, place a boot script in /system/etc/init.d/99aibot or use Magisk service.d.",

    // Step Cards M2
    step_pr_1_title: "PRoot Concept: Full Linux Without Root Access",
    step_pr_1_desc: "If your gadget is locked or unrooted (like a family or stock carrier STB you don't want to flash), PRoot is the solution. It uses the ptrace syscall to intercept file access and simulate root in userland.<br><br>Performance Note: Moderate CPU/RAM overhead due to ptrace emulation. Recommended for 1.5GB - 2GB RAM and Android 5.0+.",
    step_pr_2_title: "Installing Debian / Ubuntu via PRoot-Distro in Termux",

    // AI Orchestration Section
    sec_ai_tag: "The Role of AI Agents",
    sec_ai_title: "Automated Orchestration via AI Agent",
    sec_ai_desc: "You don't need to be an expert in Golang or Linux kernel internals. Simply ask an AI Agent (like Antigravity, Claude, ChatGPT, or Gemini) to craft the code, cross-compile, and write watchdog scripts.",
    ai_step1_title: "Describe Hardware Limits",
    ai_step1_desc: "Prompt the agent: 'I have a 1GB RAM STB running KitKat 4.4, generate a pure Go bot with zero CGO so it won't crash on LowMemoryKiller.'",
    ai_step2_title: "AI Compiles the Binary",
    ai_step2_desc: "The AI agent generates clean source code, configures free-tier Gemini Flash/Grok endpoints, and provides exact ARMv7 cross-compilation commands.",
    ai_step3_title: "Push Binary via ADB",
    ai_step3_desc: "The agent guides you to connect via wireless ADB, transfer the binary, set executable permissions, and configure API keys.",
    ai_step4_title: "24/7 Resilience",
    ai_step4_desc: "The AI agent writes a bash watchdog monitor that auto-restarts the bot if network drops or memory spikes occur.",

    // AI Prompt Generator
    sec_prompt_tag: "Automated Generator",
    sec_prompt_title: "AI Agent Prompt Generator",
    sec_prompt_desc: "Select your project parameters below, then click 'Copy Prompt'. Paste this prompt into your favorite AI Coding Agent to generate your customized bot stack instantly!",
    p_label_method: "Selected Method:",
    p_label_llm: "LLM Provider (Free-Tier):",
    p_label_platform: "Chat Platform:",
    p_label_ram: "Device RAM Limit:",
    p_label_features: "Additional Modules:",
    p_feat_watchdog: "Include Auto-Restart / Watchdog Script",
    p_feat_boot: "Include Auto-Boot Script on AC Power",
    btn_gen_prompt: "Generate AI Prompt",
    btn_copy_prompt: "Copy Prompt to Clipboard",
    toast_copied: "Prompt successfully copied to clipboard!",

    // Matrix Table
    matrix_tag: "Comparison Matrix",
    matrix_title: "Comparison of 4 Methods on 1GB RAM Devices",
    matrix_desc: "Understand resource footprints, kernel requirements, and technical tradeoffs for each approach.",

    // Hardware & EcoGreen Guide
    sec_hw_tag: "Eco-Friendly Upcycling",
    sec_hw_title: "Hardware Survival & 24/7 Operations",
    sec_hw_desc: "The hallmark of an eco-green home server is longevity, preventing battery swelling hazards, and minimizing standby power draw.",
    hw_card1_tag: "Hardware Safety",
    hw_card1_title: "Smartphone Battery Hazard & Bypass Solution",
    hw_card1_desc: "If using an old smartphone, NEVER keep it plugged into a charger 24/7 with the battery inside! The Li-Ion pouch will swell and pose a fire risk.<br><br>Eco-Bypass Solution: Remove the battery, step down a 5V charger to 4.0V - 4.2V using an LM2596 buck converter or 1N4007 diodes, and solder directly to the battery pins. Your phone will run forever safely!",
    hw_card2_tag: "STB: The EcoGreen Winner",
    hw_card2_title: "Why Android TV STBs are Ideal",
    hw_card2_desc: "Vintage Android STBs (ZTE B860H, Fiberhome HG680P) do not have batteries. They run off standard 12V/1A or 5V/2A DC power adapters and consume under 3 Watts at idle. Monthly electric cost is under $0.35!",
    hw_card3_tag: "Thermal & Network Health",
    hw_card3_title: "Passive Cooling & Wired LAN",
    hw_card3_desc: "Vintage STBs include built-in RJ45 Ethernet ports. Use Ethernet instead of Wi-Fi to avoid Wi-Fi sleep disconnects. Add a small passive aluminum heatsink on the SoC for silent 45°C operation.",
    hw_card4_tag: "Auto-Boot Recovery",
    hw_card4_title: "Automatic Booting on AC Power",
    hw_card4_desc: "For smartphones, enable auto-power-on after power outages via fastboot: fastboot oem off-mode-charge 0. The device will boot straight to Android without pressing the physical power button!",

    // Footer
    footer_title: "EcoGreen Android AI Bot Hub",
    footer_desc: "A green movement upcycling discarded electronic devices (e-waste) into autonomous low-power AI micro-servers. Crafted in pure HTML, CSS, and vanilla JS with zero external dependencies, ready for instant GitHub Pages deployment.",
    footer_quick_links: "Quick Links",
    footer_tech: "Technologies",
    footer_copy: "Built for developers and EcoGreen Tech enthusiasts. Open-source under MIT License."
  }
};

// Method Recommendation Logic
function calculateRecommendation() {
  const ram = parseInt(document.getElementById('calc-ram').value, 10);
  const isRooted = document.getElementById('calc-root').value === 'yes';
  const os = document.getElementById('calc-os').value;
  const isEn = appState.lang === 'en';

  let methodKey = 'single-binary';
  let title = '';
  let desc = '';
  let ramPercent = 15;
  let estimatedRam = '~12 - 18 MB RAM';
  let stability = '⭐⭐⭐⭐⭐ (Highest)';

  if (ram <= 1024) {
    methodKey = 'single-binary';
    title = isEn ? "Method 4: Go / Rust Single Binary (Champion)" : "Metode 4: Single Binary Go / Rust (Juara)";
    desc = isEn 
      ? "Because your device has only 1GB RAM (or less) and older Android OS, running heavy interpreters or distro containers will trigger Android LowMemoryKiller (LMK). A statically compiled Go or Rust single binary runs directly on the Linux kernel with zero runtime dependencies and uses less than 18 MB RAM!"
      : "Karena perangkat Anda memiliki RAM 1GB (atau kurang) dan OS Android lawas, menjalankan runtime berat atau distro Linux akan memicu Android LowMemoryKiller (LMK). Single binary Go atau Rust terkompilasi statis berjalan langsung di kernel Linux tanpa dependensi, menghabiskan kurang dari 18 MB RAM!";
    ramPercent = 12;
    estimatedRam = '~12 - 18 MB RAM';
    stability = isEn ? "⭐⭐⭐⭐⭐ (Rock Solid on 1GB)" : "⭐⭐⭐⭐⭐ (Sangat Stabil di 1GB)";
  } else if (ram >= 2048 && isRooted) {
    methodKey = 'chroot';
    title = isEn ? "Method 1: Linux Chroot (Alpine / Debian)" : "Metode 1: Linux Chroot (Alpine / Debian)";
    desc = isEn
      ? "Your device has 2GB+ RAM and full root access! Chroot allows you to run a true Linux distribution (Alpine Linux is best for light footprint) directly on the native kernel with zero virtualization penalty. You can install standard package managers (apk/apt)."
      : "Perangkat Anda memiliki RAM 2GB+ dan akses root penuh! Chroot memungkinkan Anda menjalankan distribusi Linux murni (Alpine Linux sangat disarankan karena ultra-ringan) langsung di kernel tanpa beban emulasi. Bisa install apt/apk sesuka hati.";
    ramPercent = 38;
    estimatedRam = '~45 - 90 MB RAM (Alpine)';
    stability = isEn ? "⭐⭐⭐⭐⭐ (High Native Performance)" : "⭐⭐⭐⭐⭐ (Performa Native Tinggi)";
  } else if (ram >= 2048 && !isRooted) {
    if (os === 'kitkat') {
      methodKey = 'single-binary';
      title = isEn ? "Method 4: Go / Rust Single Binary" : "Metode 4: Single Binary Go / Rust";
      desc = isEn
        ? "On unrooted Android 4.4 KitKat, modern Termux and PRoot are incompatible due to modern libc requirements. Compiling a Go single binary (with CGO_ENABLED=0) is by far the easiest and most reliable path to run on Android 4.4!"
        : "Pada Android 4.4 KitKat non-root, Termux modern dan PRoot sulit dipasang karena batasan libc lawas. Mengompilasi Go single binary (CGO_ENABLED=0) adalah jalur paling mulus dan terjamin jalan di KitKat!";
      ramPercent = 15;
      estimatedRam = '~14 MB RAM';
    } else {
      methodKey = 'proot';
      title = isEn ? "Method 2: PRoot Userland via Termux" : "Metode 2: PRoot Userland via Termux";
      desc = isEn
        ? "With 2GB RAM and Android 5.0+ (non-rooted), Termux with PRoot-distro provides a convenient sandbox. You can run Debian or Ubuntu in userspace without voiding warranties or requiring bootloader unlocking."
        : "Dengan RAM 2GB dan Android 5.0+ (tanpa root), Termux dengan PRoot-distro memberi ruang simulasi Linux aman di userspace tanpa perlu utak-atik firmware atau unlock bootloader.";
      ramPercent = 65;
      estimatedRam = '~120 - 250 MB RAM';
      stability = isEn ? "⭐⭐⭐⭐ (Good on Android 7+)" : "⭐⭐⭐⭐ (Bagus di Android 7+)";
    }
  } else {
    methodKey = 'python';
    title = isEn ? "Method 3: Python Micro-Bot" : "Metode 3: Python Micro-Bot";
    desc = isEn
      ? "If you want quick code iteration with easy script editing, a lean Python 3 script using raw asyncio and lightweight HTTP calls (without bloated frameworks) fits well inside a 1GB-2GB envelope."
      : "Jika Anda ingin kemudahan modifikasi kode dan scripting cepat, skrip Python 3 minimalis dengan asyncio dan HTTP murni (tanpa framework berat) sangat fleksibel untuk RAM 1GB - 2GB.";
    ramPercent = 35;
    estimatedRam = '~35 - 55 MB RAM';
    stability = isEn ? "⭐⭐⭐⭐ (Stable with lightweight libraries)" : "⭐⭐⭐⭐ (Stabil dengan lib ringan)";
  }

  document.getElementById('res-method-title').innerText = title;
  document.getElementById('res-method-desc').innerText = desc;
  document.getElementById('res-ram-val').innerText = estimatedRam;
  document.getElementById('res-stability-val').innerText = stability;
  document.getElementById('res-ram-fill').style.width = `${ramPercent}%`;

  const btn = document.getElementById('res-action-btn');
  btn.setAttribute('data-target-tab', methodKey);
  btn.onclick = () => switchTab(methodKey);
}

// Tab Switching
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-pane-${tabId}`);
  });

  const methodsSec = document.getElementById('methods-section');
  if (methodsSec) {
    const yOffset = -80;
    const y = methodsSec.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

// AI Agent Prompt Generator
function generateAgentPrompt() {
  const method = document.getElementById('prompt-method').value;
  const llm = document.getElementById('prompt-llm').value;
  const platform = document.getElementById('prompt-platform').value;
  const ram = document.getElementById('prompt-ram').value;
  const watchdog = document.getElementById('prompt-watchdog').checked;
  const boot = document.getElementById('prompt-boot').checked;
  const isEn = appState.lang === 'en';

  let prompt = "";

  if (isEn) {
    prompt = `You are an expert Systems & Embedded AI Engineer. I need your assistance orchestrating and building an autonomous AI Bot to run 24/7 on a repurposed vintage Android device (E-Waste / EcoGreen project).

=== TARGET HARDWARE & CONSTRAINTS ===
- Hardware: Discarded Android device (STB / Smartphone)
- RAM Limit: ${ram} (strict memory budget, must not trigger Android LowMemoryKiller)
- Chosen Architecture: ${method}
- Messaging Interface: ${platform}
- AI Provider: ${llm} (Use Free Tier REST API)

=== YOUR TASK & ORCHESTRATION DELIVERABLES ===
1. SOURCE CODE:
   - Provide complete, production-grade source code for ${method}.
   - Zero external bloat: optimize for minimal memory footprint and zero memory leaks.
   - Implement graceful error handling with automatic exponential backoff retry for network drops or rate limits.
   - For LLM integration (${llm}): formulate correct system instructions, streaming/chat payload, and parse responses cleanly.
   - For ${platform}: implement long-polling or webhook receiver cleanly.

2. BUILD & CROSS-COMPILATION:
   - Provide exact shell/PowerShell commands to cross-compile this for Android's architecture (ARMv7 32-bit / ARM64 aarch64, statically linked without Bionic libc issues).

3. DEPLOYMENT & AUTO-RESTART:
   - Instructions to transfer binary/script to Android via ADB or curl/wget.
   - Linux permissions (\`chmod +x\`) and execution path.
   ${watchdog ? "- Provide a lightweight bash watchdog loop or supervisor script that monitors the process PID and auto-restarts it if memory exceeds limit or it crashes.\n" : ""}
   ${boot ? "- Provide an auto-boot configuration (e.g. init.d, Termux:Boot, Magisk service.d, or fastboot off-mode-charge 0) so the bot restarts automatically when AC power is restored.\n" : ""}

Please start by outputting the clean, complete source code and exact step-by-step terminal commands.`;
  } else {
    prompt = `Kamu adalah seorang Systems Engineer & Embedded AI Expert. Saya membutuhkan bantuanmu untuk melakukan orkestrasi dan membuat AI Bot otonom yang berjalan 24/7 di gadget Android lawas bekas (Proyek E-Waste / EcoGreen Tech).

=== SPESIFIKASI GADGET & BATASAN ===
- Perangkat: Gadget Android bekas (STB TV / Smartphone jadul)
- Batas RAM: ${ram} (sangat ketat, jangan sampai memicu Android LowMemoryKiller)
- Metode Arsitektur: ${method}
- Platform Chat: ${platform}
- Penyedia AI: ${llm} (Gunakan REST API Free Tier)

=== TUGAS & OUTPUT YANG DIBUTUHKAN DARI AI AGENT ===
1. KODE SUMBER UTAMA (LENGKAP & SIAP PAKAI):
   - Buatkan kode sumber lengkap dan siap dijalankan untuk ${method}.
   - Sangat hemat memori: optimalkan penggunaan RAM sekecil mungkin tanpa library yang tidak perlu.
   - Tangani error koneksi internet terputus dengan retry loop otomatis (exponential backoff).
   - Integrasi API ${llm}: kirim system prompt, kelola token API via environment variable atau file konfigurasi, dan parsing respons JSON dengan aman.
   - Integrasi ${platform}: jalankan long-polling atau receiver yang ringan.

2. INSTRUKSI CROSS-COMPILE / KOMPILASI:
   - Berikan perintah terminal (Linux / Windows PowerShell) untuk mengompilasi kode tersebut menjadi binary statis untuk arsitektur Android (ARMv7 32-bit / ARM64).

3. PENYEBARAN (DEPLOYMENT) & KEANDALAN:
   - Cara push binary/script ke Android via ADB atau download langsung (curl/wget).
   - Izin eksekusi Linux (\`chmod +x\`) dan cara menjalankannya di background.
   ${watchdog ? "- Sediakan skrip watchdog bash otomatis yang memantau proses dan me-restart bot jika crash atau memori over.\n" : ""}
   ${boot ? "- Sediakan skrip auto-boot saat listrik menyala (misal via init.d, Termux:Boot, atau Magisk service.d).\n" : ""}

Mohon mulai dengan memberikan source code lengkap yang siap di-compile dan panduan terminal langkah demi langkah.`;
  }

  document.getElementById('prompt-output').innerText = prompt;
}

// Copy to Clipboard with Toast
function copyText(elementId, customText = null) {
  const text = customText || document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(text).then(() => {
    showToast(appState.lang === 'en' ? "Copied to clipboard!" : "Berhasil disalin ke clipboard!");
  }).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast(appState.lang === 'en' ? "Copied to clipboard!" : "Berhasil disalin ke clipboard!");
  });
}

function showToast(msg) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✓</span> <span>${msg}</span>`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

// Apply Language
function setLanguage(lang) {
  appState.lang = lang;
  localStorage.setItem('aibot_lang', lang);
  document.documentElement.lang = lang;

  const dict = i18nData[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.innerHTML = `<span>🌐</span> <span>${dict.lang_btn}</span>`;
  }

  calculateRecommendation();
  generateAgentPrompt();
}

// Toggle Language
function toggleLanguage() {
  const newLang = appState.lang === 'id' ? 'en' : 'id';
  setLanguage(newLang);
}

// Theme Toggle
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('aibot_theme', newTheme);
}

// Initialization on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('data-theme', appState.theme);
  setLanguage(appState.lang);

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      switchTab(target);
    });
  });

  ['calc-dev', 'calc-ram', 'calc-root', 'calc-os', 'calc-target'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', calculateRecommendation);
  });

  ['prompt-method', 'prompt-llm', 'prompt-platform', 'prompt-ram', 'prompt-watchdog', 'prompt-boot'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', generateAgentPrompt);
  });

  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.addEventListener('click', toggleLanguage);
  }

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  generateAgentPrompt();
});
