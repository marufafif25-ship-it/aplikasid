/* ==========================================================================
   Aplikasi.id Digital Store - Core Logic & Automated Drive Email System
   ========================================================================== */

const INITIAL_PRODUCTS = [
  {
    id: "app-autocad",
    title: "AutoCAD (WIN & MAC)",
    category: "Engineering",
    os: "Win & Mac",
    versions: "2015 - 2016 - 2017 - 2018 - 2019 - 2020 - 2021 - 2022 - 2023 - 2024 - 2025 - 2026",
    price: 15000,
    originalPrice: 30000,
    rating: 4.9,
    sales: 27,
    icon: "fa-compass-drafting",
    imageUrl: "assets/logos/autocad.png",
    color: "#e11d48",
    driveUrl: "https://drive.google.com/drive/folders/autocad-2026-fullversion-aplikasiid",
    specs: ["FULL VERSION", "BUKAN TRIAL", "BEBAS UPDATE", "INSTAL MUDAH", "BEBAS VIRUS"],
    description: "AutoCAD software CAD terpopuler untuk arsitektur, teknik sipil, dan desain 3D. Paket lengkap versi 2015-2026 full version permanen tanpa expired."
  },
  {
    id: "app-photoshop",
    title: "Adobe Photoshop (WIN & MAC)",
    category: "Design",
    os: "Win & Mac",
    versions: "2025 - 2024 - 2023 - 2022 - 2021 - 2020 - 2019 - CS6",
    price: 15000,
    originalPrice: 30000,
    rating: 4.9,
    sales: 24,
    icon: "fa-palette",
    imageUrl: "assets/logos/photoshop.png",
    color: "#0284c7",
    driveUrl: "https://drive.google.com/drive/folders/adobe-photoshop-2025-aplikasiid",
    specs: ["FULL VERSION", "FITUR LENGKAP", "BEBAS UPDATE", "INSTAL MUDAH", "BEBAS VIRUS"],
    description: "Software pengolah foto & desain grafis standar industri dunia. Sudah termasuk Neural Filters, Generative Fill offline, dan garansi instalasi."
  },
  {
    id: "app-sketchup",
    title: "SketchUp Pro + Vray & Enscape (WIN & MAC)",
    category: "Engineering",
    os: "Win & Mac",
    versions: "2015 - 2016 - 2017 - 2018 - 2019 - 2020 - 2021 - 2022 - 2023 - 2024 - 2025",
    price: 15000,
    originalPrice: 30000,
    rating: 4.9,
    sales: 20,
    icon: "fa-cubes",
    imageUrl: "assets/logos/sketchpp.png",
    color: "#f0f5f7ff",
    driveUrl: "https://drive.google.com/drive/folders/sketchup-pro-vray-enscape-aplikasiid",
    specs: ["INCLUDE VRAY", "ENSCAPE", "3D WAREHOUSE", "FREE EXTENSION", "BONUS MATERIAL"],
    description: "Paket lengkap pemodelan 3D arsitektur SketchUp Pro dilengkapi renderer kelas atas V-Ray dan Enscape rendering 3D real-time."
  },
  {
    id: "app-davinci",
    title: "DaVinci Resolve Studio + Project (WIN & MAC)",
    category: "Video",
    os: "Win & Mac",
    versions: "14 - 15 - 16 - 17 - 18 - 19 - 20 Studio",
    price: 15000,
    originalPrice: 30000,
    rating: 4.9,
    sales: 18,
    icon: "fa-film",
    imageUrl: "assets/logos/davinci.png",
    color: "#e0ede9ff",
    driveUrl: "https://drive.google.com/drive/folders/davinci-resolve-studio-full-aplikasiid",
    specs: ["FULL VERSION", "FITUR LENGKAP", "BEBAS UPDATE", "INSTAL MUDAH", "BEBAS VIRUS"],
    description: "Software pengeditan video profesional, color grading, efek visual Fusion, dan pascaproduksi audio Fairlight dalam satu paket."
  },
  {
    id: "app-lightroom",
    title: "Lightroom Classic (WIN & MAC)",
    category: "Design",
    os: "Win & Mac",
    versions: "2018 - 2019 - 2020 - 2021 - 2022 - 2023 - 2024 - 2025",
    price: 15000,
    originalPrice: 30000,
    rating: 4.8,
    sales: 15,
    icon: "fa-camera-retro",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg",
    color: "#2563eb",
    driveUrl: "https://drive.google.com/drive/folders/lightroom-classic-2025-aplikasiid",
    specs: ["FULL VERSION", "FITUR LENGKAP", "BEBAS UPDATE", "INSTAL MUDAH", "BEBAS VIRUS"],
    description: "Aplikasi pengorganisasian dan penyuntingan foto berbasis alur kerja fotografi digital terbaik. Dilengkapi ribuan preset bonus."
  },
  {
    id: "app-premiere",
    title: "Adobe Premiere Pro (WIN & MAC)",
    category: "Video",
    os: "Win & Mac",
    versions: "CS3 - CS5 - CS6 - 2015 sd 2025",
    price: 15000,
    originalPrice: 30000,
    rating: 4.9,
    sales: 22,
    icon: "fa-video",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg",
    color: "#9333ea",
    driveUrl: "https://drive.google.com/drive/folders/premiere-pro-2025-aplikasiid",
    specs: ["FULL VERSION", "FITUR LENGKAP", "BEBAS UPDATE", "INSTAL MUDAH", "BEBAS VIRUS"],
    description: "Software pengeditan video terkemuka untuk film, TV, dan web. Termasuk fitur Speech-to-Text & Auto Reframe AI."
  },
  {
    id: "app-coreldraw",
    title: "CorelDRAW Graphics Suite 2025 (WIN)",
    category: "Design",
    os: "Windows",
    versions: "X6 - X7 - X8 - 2018 sd 2025",
    price: 15000,
    originalPrice: 30000,
    rating: 4.9,
    sales: 19,
    icon: "fa-vector-square",
    imageUrl: "assets/logos/coreldraw.png",
    color: "#60c806e8",
    driveUrl: "https://drive.google.com/drive/folders/coreldraw-graphics-suite-aplikasiid",
    specs: ["FULL VERSION", "FITUR LENGKAP", "BEBAS UPDATE", "INSTAL MUDAH", "BEBAS VIRUS"],
    description: "Perangkat lunak desain grafis vektor profesional untuk ilustrasi, tata letak halaman, penyuntingan foto, dan percetakan."
  },
  {
    id: "app-recoverit",
    title: "Wondershare Recoverit Pro (WIN & MAC)",
    category: "Utility",
    os: "Win & Mac",
    versions: "Versi Terbaru 2026 Full Activated",
    price: 15000,
    originalPrice: 30000,
    rating: 4.8,
    sales: 14,
    icon: "fa-file-shield",
    imageUrl: "assets/logos/wondershare-revocer-it.png",
    color: "#0284c7",
    driveUrl: "https://drive.google.com/drive/folders/wondershare-recoverit-pro-aplikasiid",
    specs: ["ULTIMATE DATA RECOVERY", "SOLUSI FILE TERHAPUS", "FULL VERSION", "GARANSI"],
    description: "Solusi pemulihan data profesional untuk mengembalikan file, foto, video, dokumen yang terhapus dari harddisk, SSD, atau Flashdisk."
  },
  {
    id: "app-office",
    title: "Microsoft Office 365 / 2024 Pro Plus",
    category: "Office",
    os: "Win & Mac",
    versions: "2016 - 2019 - 2021 - 2024 - Office 365",
    price: 18000,
    originalPrice: 35000,
    rating: 5.0,
    sales: 38,
    icon: "fa-file-word",
    imageUrl: "assets/logos/microsoft-office.png",
    color: "#ea580c",
    driveUrl: "https://drive.google.com/drive/folders/ms-office-2024-pro-plus-aplikasiid",
    specs: ["WORD EXCEL POWERPOINT", "FULL VERSION", "AKTIVASI PERMANEN", "UPDATE RESMI"],
    description: "Paket aplikasi perkantoran terpopuler Word, Excel, PowerPoint, Outlook, Access permanen tanpa perlu bayar langganan bulanan."
  },
  {
    id: "app-idm",
    title: "Internet Download Manager (IDM) Lifetime",
    category: "Utility",
    os: "Windows",
    versions: "Versi 6.42 Build Terbaru 2026",
    price: 12000,
    originalPrice: 25000,
    rating: 4.9,
    sales: 45,
    icon: "fa-download",
    imageUrl: "assets/logos/idm.png",
    color: "#1e6c0cff",
    driveUrl: "https://drive.google.com/drive/folders/idm-lifetime-fullversion-aplikasiid",
    specs: ["DOWNLOAD 5X LEBIH CEPAT", "NO TRIAL POPUP", "AKTIVASI SEUMUR HIDUP"],
    description: "Accelerate unduhan hingga 5x lipat dengan pemulihan unduhan terputus dan integrasi peramban otomatis."
  }
];

class AplikasiIdStore {
  constructor() {
    this.products = this.loadProducts();
    this.cart = [];
    this.orders = this.loadOrders();
    this.selectedProductForBuy = null;
    this.selectedPaymentMethod = "QRIS Instant";

    this.initUI();
  }

  // LocalStorage helper for persistence
  loadProducts() {
    const saved = localStorage.getItem("aplikasiid_products");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(product => ({
          ...product,
          buyUrl: product.buyUrl || ""
        }));
      } catch (e) { }
    }

    return INITIAL_PRODUCTS.map(product => ({
      ...product,
      buyUrl: product.buyUrl || ""
    }));
  }

  saveProducts() {
    localStorage.setItem("aplikasiid_products", JSON.stringify(this.products));
  }

  loadOrders() {
    const saved = localStorage.getItem("aplikasiid_orders");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    // Default seed order for demo/testing
    return [
      {
        orderId: "APL-84920",
        buyerName: "Budi Santoso",
        buyerEmail: "budi.santoso@example.com",
        buyerPhone: "08123456789",
        items: [INITIAL_PRODUCTS[1]], // Photoshop
        paymentMethod: "QRIS Instant",
        totalAmount: 15000,
        paidAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        status: "LUNAS"
      }
    ];
  }

  saveOrders() {
    localStorage.setItem("aplikasiid_orders", JSON.stringify(this.orders));
  }

  initUI() {
    this.renderProductsGrid(this.products);
    this.updateCartBadge();
  }

  // Smooth scroll
  scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Format currency Rp
  formatRp(amount) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  }

  // Render Product Grid (Aplikasi.id Store)
  renderProductsGrid(items) {
    const grid = document.getElementById("productsGrid");
    const countBadge = document.getElementById("productCountBadge");

    if (countBadge) {
      countBadge.innerText = `${items.length} Software`;
    }

    if (!items || items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding: 60px 20px; background:var(--bg-card); border-radius:var(--radius-lg);">
          <i class="fa-solid fa-folder-open" style="font-size:48px; color:var(--text-muted); margin-bottom:16px;"></i>
          <h3 style="font-size:18px;">Software Tidak Ditemukan</h3>
          <p style="color:var(--text-muted); font-size:14px; margin-top:8px;">Coba gunakan kata kunci lain atau kirim Request Software.</p>
          <button class="btn-primary" style="margin-top:20px;" onclick="app.openModal('requestModal')">Request Software Ini</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(item => {
      const discountPercent = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

      const specsPillsHtml = item.specs.slice(0, 3).map((spec, i) => `
        <span class="spec-pill ${i === 0 ? 'highlight' : ''}">${spec}</span>
      `).join("");

      return `
        <div class="product-card">
          <!-- Artwork Banner -->
          <div class="card-artwork">
            <div class="thumbnail-watermark">
              <i class="fa-solid fa-certificate"></i> PERMANEN! Garansi Selamanya
            </div>
            
            <div class="artwork-bg-glow" style="background:${item.color};"></div>
            
            <div class="artwork-logo-box" style="background:${item.color};">
              ${item.imageUrl
          ? `<img src="${item.imageUrl}" alt="${item.title}" class="artwork-logo-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                   <i class="fa-solid ${item.icon}" style="display:none;"></i>`
          : `<i class="fa-solid ${item.icon}"></i>`
        }
            </div>
            
            <div class="artwork-title">${item.title.split("(")[0]}</div>
            <div class="artwork-version-text">TERSEDIA VERSI: ${item.versions.substring(0, 24)}...</div>
            
            <div class="drive-badge-pill">
              <i class="fa-brands fa-google-drive"></i> Direct Drive
            </div>
          </div>

          <div class="card-body">
            <div class="card-specs-pills">
              ${specsPillsHtml}
            </div>

            <h3 class="product-title">${item.title}</h3>
            
            <div class="product-meta">
              <div class="rating"><i class="fa-solid fa-star"></i> ${item.rating}</div>
              <span style="opacity:0.3">•</span>
              <div class="sales-count">${item.sales} terjual</div>
            </div>

            <div class="pricing-wrapper">
              <div class="original-price">${this.formatRp(item.originalPrice)}</div>
              <div class="current-price">
                ${this.formatRp(item.price)}
                <span class="discount-badge">-${discountPercent}%</span>
              </div>
            </div>

            <div class="card-actions">
              <button class="btn-card-detail" onclick="app.openProductDetail('${item.id}')">
                Lihat Detail <i class="fa-solid fa-arrow-right"></i>
              </button>
              <button class="btn-card-buy" onclick="app.buyDirect('${item.id}')">
                <i class="fa-solid fa-bolt"></i> Beli
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // Search & Filters Handler
  handleSearch() {
    this.applyFilters();
  }

  handleFilterChange() {
    this.applyFilters();
  }

  filterByCategory(catName) {
    const catSelect = document.getElementById("categoryFilter");
    if (catSelect) {
      catSelect.value = catName;
      this.applyFilters();
      this.scrollToSection('produk');
    }
  }

  applyFilters() {
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    const category = document.getElementById("categoryFilter").value;
    const os = document.getElementById("osFilter").value;
    const sort = document.getElementById("sortFilter").value;

    let filtered = [...this.products];

    // Search query
    if (query) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.versions.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (category !== "all") {
      filtered = filtered.filter(p => p.category === category);
    }

    // OS Filter
    if (os !== "all") {
      filtered = filtered.filter(p => p.os.includes(os) || p.os === "Win & Mac");
    }

    // Sorting
    if (sort === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "popular") {
      filtered.sort((a, b) => b.sales - a.sales);
    }

    this.renderProductsGrid(filtered);
  }

  // Modal Open / Close
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";

      if (modalId === 'adminModal') {
        this.renderAdminTable();
      }
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }

  // Product Detail Modal
  openProductDetail(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) return;

    this.selectedProductForBuy = product;

    const modalBody = document.getElementById("modalProductBody");
    document.getElementById("modalProductTitle").innerText = product.title;

    modalBody.innerHTML = `
      <div style="display:flex; gap:20px; align-items:center; margin-bottom:20px; padding:16px; background:#090e1a; border-radius:12px; border:1px solid var(--border-color);">
        <div style="width:60px; height:60px; border-radius:14px; background:${product.color}; display:flex; align-items:center; justify-content:center; font-size:28px; color:#fff; overflow:hidden; padding:6px;">
          ${product.imageUrl
        ? `<img src="${product.imageUrl}" alt="${product.title}" style="width:100%; height:100%; object-fit:contain;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
               <i class="fa-solid ${product.icon}" style="display:none;"></i>`
        : `<i class="fa-solid ${product.icon}"></i>`
      }
        </div>
        <div>
          <h4 style="font-size:18px; font-weight:700;">${product.title}</h4>
          <div style="font-size:13px; color:var(--text-muted); margin-top:2px;">
            <i class="fa-solid fa-laptop"></i> System OS: <strong>${product.os}</strong> • Rating: ⭐ ${product.rating} (${product.sales} Terjual)
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label"><i class="fa-solid fa-list-check"></i> Spesifikasi & Keunggulan Paket:</label>
        <ul style="list-style:none; padding:0; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          ${product.specs.map(s => `
            <li style="font-size:13px; background:rgba(255,255,255,0.05); padding:8px 12px; border-radius:8px; border:1px solid var(--border-color); display:flex; align-items:center; gap:8px;">
              <i class="fa-solid fa-check" style="color:#10b981;"></i> ${s}
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="form-group">
        <label class="form-label"><i class="fa-solid fa-code-branch"></i> Versi Pilihan yang Tersedia di Inside Drive:</label>
        <div style="background:#090e1a; padding:12px 16px; border-radius:10px; font-size:13px; color:#60a5fa; font-weight:600;">
          ${product.versions}
        </div>
      </div>

      <div class="form-group">
        <label class="form-label"><i class="fa-solid fa-circle-info"></i> Deskripsi Software:</label>
        <p style="font-size:14px; color:var(--text-muted); line-height:1.6;">${product.description}</p>
      </div>

      <div class="form-group" style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); padding:14px; border-radius:12px; display:flex; align-items:center; gap:12px;">
        <i class="fa-brands fa-google-drive" style="font-size:24px; color:#34d399;"></i>
        <div style="font-size:13px;">
          <strong style="color:#34d399;">Pengiriman Otomatis via Google Drive!</strong><br>
          Link unduhan Google Drive server tinggi akan langsung masuk ke inbox email Anda sesaat setelah pembayaran lunas.
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:24px; padding-top:16px; border-top:1px solid var(--border-color);">
        <div>
          <span style="font-size:12px; color:var(--text-muted);">Harga Spesial Promo:</span>
          <div style="font-family:'Outfit',sans-serif; font-size:24px; font-weight:800; color:#fff;">
            ${this.formatRp(product.price)}
          </div>
        </div>

        <div style="display:flex; gap:10px;">
          <button class="btn-secondary" onclick="app.addToCart('${product.id}')">
            <i class="fa-solid fa-cart-plus"></i> + Keranjang
          </button>
          <button class="btn-primary" onclick="app.buyDirect('${product.id}')">
            <i class="fa-solid fa-bolt"></i> Beli Sekarang
          </button>
        </div>
      </div>
    `;

    this.openModal("productModal");
  }

  // Direct Buy Flow
  openPurchaseLink(url) {
    const cleanUrl = (url || "").trim();
    if (!cleanUrl) {
      this.showToast("Link pembelian belum diisi untuk produk ini.", "error");
      return;
    }

    window.open(cleanUrl, "_blank", "noopener,noreferrer");
  }

  buyDirect(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) return;

    this.closeModal("productModal");

    const buyUrl = (product.buyUrl || "").trim();
    if (buyUrl) {
      this.openPurchaseLink(buyUrl);
      return;
    }

    this.cart = [product];
    this.updateCartBadge();
    this.showCheckoutModal();
  }

  // Cart operations
  addToCart(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) return;

    if (!this.cart.some(p => p.id === id)) {
      this.cart.push(product);
      this.updateCartBadge();
      this.showToast(`"${product.title}" ditambahkan ke keranjang`, "success");
    } else {
      this.showToast(`Software sudah ada di keranjang!`, "error");
    }
  }

  updateCartBadge() {
    const badge = document.getElementById("cartBadgeCount");
    if (badge) {
      badge.innerText = this.cart.length;
    }
  }

  checkoutFromCart() {
    if (this.cart.length === 0) {
      this.showToast("Keranjang Anda kosong", "error");
      return;
    }
    this.closeModal("cartModal");
    this.showCheckoutModal();
  }

  showCheckoutModal() {
    const summaryBox = document.getElementById("checkoutSummaryBox");
    const total = this.cart.reduce((sum, item) => sum + item.price, 0);

    summaryBox.innerHTML = `
      <div style="font-size:14px; font-weight:700; color:#fff; margin-bottom:10px; display:flex; justify-content:space-between;">
        <span>Ringkasan Software (${this.cart.length} item)</span>
        <span>Total: ${this.formatRp(total)}</span>
      </div>
      ${this.cart.map(item => `
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:13px; color:var(--text-muted); margin-bottom:6px;">
          <span><i class="fa-solid fa-check" style="color:#10b981;"></i> ${item.title}</span>
          <span style="color:#fff; font-weight:600;">${this.formatRp(item.price)}</span>
        </div>
      `).join('')}
    `;

    this.openModal("checkoutModal");
  }

  selectPaymentMethod(el, methodName) {
    document.querySelectorAll(".payment-option").forEach(opt => opt.classList.remove("selected"));
    el.classList.add("selected");
    this.selectedPaymentMethod = methodName;
  }

  // Payment Processing & Email Generation Trigger
  processPayment(event) {
    event.preventDefault();

    const name = document.getElementById("buyerName").value.trim();
    const email = document.getElementById("buyerEmail").value.trim();
    const phone = document.getElementById("buyerPhone").value.trim();

    if (!name || !email || !phone) {
      this.showToast("Silakan lengkapi semua data pembeli", "error");
      return;
    }

    const total = this.cart.reduce((sum, item) => sum + item.price, 0);
    const orderId = "APL-" + Math.floor(10000 + Math.random() * 90000);

    const newOrder = {
      orderId: orderId,
      buyerName: name,
      buyerEmail: email,
      buyerPhone: phone,
      items: [...this.cart],
      paymentMethod: this.selectedPaymentMethod,
      totalAmount: total,
      paidAt: new Date().toISOString(),
      status: "LUNAS"
    };

    // Save order
    this.orders.unshift(newOrder);
    this.saveOrders();

    this.closeModal("checkoutModal");

    // Show Payment Processing / QRIS simulation
    const processBody = document.getElementById("paymentProcessBody");
    processBody.innerHTML = `
      <div style="padding:10px 0;">
        <div style="width:180px; height:180px; background:#fff; margin:0 auto 20px; padding:12px; border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <!-- Synthetic QRIS code layout -->
          <i class="fa-solid fa-qrcode" style="font-size:120px; color:#0f172a;"></i>
          <span style="font-size:10px; font-weight:800; color:#0f172a; margin-top:4px;">QRIS OFFICIAL APLIKASI.ID</span>
        </div>

        <h4 style="font-size:16px; font-weight:700; margin-bottom:6px;">Invoice: ${orderId}</h4>
        <p style="font-size:13px; color:var(--text-muted);">Metode: <strong>${this.selectedPaymentMethod}</strong> • Total: <strong style="color:#34d399;">${this.formatRp(total)}</strong></p>

        <div style="margin:24px 0; background:rgba(37,99,235,0.15); padding:14px; border-radius:12px; border:1px solid rgba(59,130,246,0.3); font-size:13px;">
          <i class="fa-solid fa-rotate fa-spin" style="color:#3b82f6;"></i> Simulasi Menunggu Pembayaran dari Gateway...
        </div>

        <button class="btn-primary" style="width:100%; justify-content:center; padding:12px; background:#10b981;" onclick="app.simulatedPaymentSuccess('${orderId}')">
          <i class="fa-solid fa-circle-check"></i> Simulasi Bayar Sekarang (LUNAS)
        </button>
      </div>
    `;

    this.openModal("paymentProcessModal");
  }

  // Simulation of automated email dispatch upon payment
  simulatedPaymentSuccess(orderId) {
    const order = this.orders.find(o => o.orderId === orderId);
    if (!order) return;

    this.closeModal("paymentProcessModal");

    // Clear active cart
    this.cart = [];
    this.updateCartBadge();

    this.showToast("Pembayaran LUNAS! Email berisi link Google Drive otomatis terkirim.", "success");

    // Open Simulated Email Inbox Modal showing automated email
    this.showAutomatedEmailModal(order);
  }

  // Render Automated Email Template with Google Drive Download Link (Core Feature!)
  showAutomatedEmailModal(order) {
    const content = document.getElementById("emailSimContent");
    const timeEl = document.getElementById("emailSimTime");

    if (timeEl) timeEl.innerText = new Date(order.paidAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    content.innerHTML = `
      <div class="email-store-header">
        <div>
          <div class="email-brand-logo">Aplikasi.id SOFTWARE</div>
          <div style="font-size:12px; color:var(--text-muted);">Official Digital Delivery Service</div>
        </div>
        <div style="text-align:right;">
          <span style="font-size:12px; background:rgba(16,185,129,0.2); color:#34d399; padding:4px 10px; border-radius:99px; font-weight:700;">
            STATUS: PAID / LUNAS
          </span>
          <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">Invoice #${order.orderId}</div>
        </div>
      </div>

      <div style="margin-bottom:20px;">
        <h3 style="font-size:18px; font-weight:700; margin-bottom:8px;">Halo ${order.buyerName},</h3>
        <p style="font-size:14px; color:var(--text-muted); line-height:1.6;">
          Pembayaran sebesar <strong>${this.formatRp(order.totalAmount)}</strong> via ${order.paymentMethod} telah berhasil dikonfirmasi. Berikut adalah akses langsung ke folder <strong>Google Drive Full Version & License</strong> aplikasi pesanan Anda.
        </p>
      </div>

      ${order.items.map(item => `
        <div class="drive-hero-download">
          <div style="font-size:13px; text-transform:uppercase; letter-spacing:1px; color:#34d399; font-weight:700; margin-bottom:6px;">
            <i class="fa-brands fa-google-drive"></i> GOOGLE DRIVE DIRECT ACCESS
          </div>
          <h4 style="font-size:20px; font-weight:800; color:#ffffff; margin-bottom:12px;">${item.title}</h4>
          
          <a href="${item.driveUrl}" target="_blank" class="btn-drive-main">
            <i class="fa-brands fa-google-drive" style="font-size:22px;"></i> KUNJUNGI GOOGLE DRIVE SOFTWARE
          </a>

          <div style="font-size:12px; color:var(--text-muted); margin-top:8px;">
            <i class="fa-solid fa-key" style="color:#f59e0b;"></i> Password File ZIP: <code style="background:#1e293b; padding:2px 8px; border-radius:4px; color:#60a5fa; font-weight:700;">aplikasiid2026</code>
          </div>

          <div style="margin-top:14px; display:flex; justify-content:center; gap:10px;">
            <button class="btn-secondary" style="font-size:12px; padding:6px 12px;" onclick="app.copyToClipboard('${item.driveUrl}')">
              <i class="fa-solid fa-copy"></i> Salin Link Drive
            </button>
            <button class="btn-secondary" style="font-size:12px; padding:6px 12px;" onclick="window.open('${item.driveUrl}', '_blank')">
              <i class="fa-solid fa-up-right-from-square"></i> Buka di Tab Baru
            </button>
          </div>
        </div>
      `).join('')}

      <div style="background:#131b2e; padding:16px; border-radius:12px; border:1px solid var(--border-color); margin-top:20px;">
        <h5 style="font-size:14px; font-weight:700; margin-bottom:8px; color:#60a5fa;">
          <i class="fa-solid fa-circle-info"></i> Petunjuk Instalasi Cepat:
        </h5>
        <ol style="font-size:13px; color:var(--text-muted); padding-left:20px; line-height:1.6;">
          <li>Klik tombol <strong>GOOGLE DRIVE DIRECT ACCESS</strong> di atas.</li>
          <li>Unduh file installer ZIP / ISO sesuai versi OS PC Anda.</li>
          <li>Ekstrak menggunakan WinRAR / Keka, masukkan password jika diminta.</li>
          <li>Jalankan <code>Setup.exe</code> / <code>.dmg</code> dan ikuti panduan video di dalam folder Drive.</li>
          <li>Butuh bantuan teknis? Hubungi tim support kami via WhatsApp dengan menyertakan Invoice <strong>#${order.orderId}</strong>.</li>
        </ol>
      </div>
    `;

    this.openModal("emailDeliveryModal");
  }

  // Invoice Redelivery / Search System
  lookupInvoice(event) {
    event.preventDefault();
    const query = document.getElementById("invoiceQueryInput").value.trim().toLowerCase();
    const resultBox = document.getElementById("invoiceResultBox");

    if (!query) return;

    const matchedOrders = this.orders.filter(o =>
      o.orderId.toLowerCase() === query ||
      o.buyerEmail.toLowerCase().includes(query)
    );

    if (matchedOrders.length === 0) {
      resultBox.innerHTML = `
        <div style="background:rgba(244,63,94,0.1); border:1px solid rgba(244,63,94,0.3); padding:16px; border-radius:12px; text-align:center; color:#fb7185;">
          <i class="fa-solid fa-circle-exclamation" style="font-size:24px; margin-bottom:8px;"></i>
          <p style="font-size:14px; font-weight:600;">Invoice atau Email "${query}" tidak ditemukan.</p>
          <small style="color:var(--text-muted);">Pastikan Kode Invoice atau email yang dimasukkan sudah benar.</small>
        </div>
      `;
      return;
    }

    resultBox.innerHTML = matchedOrders.map(order => `
      <div style="background:#090e1a; border:1px solid var(--border-color); padding:16px; border-radius:12px; margin-bottom:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div>
            <strong style="color:#fff; font-size:16px;">#${order.orderId}</strong>
            <span style="font-size:12px; color:var(--text-muted); display:block;">Pembeli: ${order.buyerName} (${order.buyerEmail})</span>
          </div>
          <span style="background:rgba(16,185,129,0.2); color:#34d399; font-size:11px; font-weight:700; padding:4px 8px; border-radius:6px;">
            ${order.status}
          </span>
        </div>

        <div style="border-top:1px solid var(--border-color); padding-top:10px; margin-top:10px;">
          <strong style="font-size:13px; color:var(--text-muted);">Software yang Dibeli:</strong>
          ${order.items.map(item => `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px; font-size:13px;">
              <span><i class="fa-brands fa-google-drive" style="color:#34d399;"></i> ${item.title}</span>
              <a href="${item.driveUrl}" target="_blank" class="btn-primary" style="padding:4px 12px; font-size:11px;">
                Akses Drive <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // Request Software submit
  submitRequest(event) {
    event.preventDefault();
    const name = document.getElementById("reqSoftName").value;
    this.closeModal("requestModal");
    this.showToast(`Request "${name}" berhasil dikirim! Tim kami akan segera meninjau.`, "success");
  }

  // Seller Admin Table & Drive Link Manager
  renderAdminTable() {
    const tableContainer = document.getElementById("adminProductListTable");

    tableContainer.innerHTML = `
      <table style="width:100%; border-collapse:collapse; text-align:left; font-size:12px;">
        <thead>
          <tr style="background:#090e1a; color:var(--text-muted); border-bottom:1px solid var(--border-color);">
            <th style="padding:10px;">Software</th>
            <th style="padding:10px;">Logo Image URL</th>
            <th style="padding:10px;">Link Google Drive</th>
            <th style="padding:10px;">Link Pembelian (Lynkid)</th>
            <th style="padding:10px;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${this.products.map(p => `
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:10px; font-weight:600; color:#fff; min-width:140px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <div style="width:28px; height:28px; border-radius:6px; background:${p.color}; display:flex; align-items:center; justify-content:center; overflow:hidden; padding:2px;">
                    ${p.imageUrl ? `<img src="${p.imageUrl}" style="width:100%; height:100%; object-fit:contain;">` : `<i class="fa-solid ${p.icon}" style="font-size:12px;"></i>`}
                  </div>
                  <span>${p.title.split("(")[0]}</span>
                </div>
              </td>
              <td style="padding:10px;">
                <input type="text" id="adminLogo_${p.id}" class="form-input" style="padding:4px 8px; font-size:11px;" placeholder="URL Gambar Logo PNG/SVG..." value="${p.imageUrl || ''}">
              </td>
              <td style="padding:10px;">
                <input type="text" id="adminDrive_${p.id}" class="form-input" style="padding:4px 8px; font-size:11px;" placeholder="https://drive.google.com/..." value="${p.driveUrl || ''}">
              </td>
              <td style="padding:10px;">
                <input type="text" id="adminBuy_${p.id}" class="form-input" style="padding:4px 8px; font-size:11px;" placeholder="https://lynk.id/your-link" value="${p.buyUrl || ''}">
              </td>
              <td style="padding:10px;">
                <button class="btn-primary" style="padding:4px 10px; font-size:11px; white-space:nowrap;" onclick="app.updateAdminProductData('${p.id}')">
                  Simpan
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  updateAdminProductData(id) {
    const logoInput = document.getElementById(`adminLogo_${id}`);
    const driveInput = document.getElementById(`adminDrive_${id}`);
    const buyInput = document.getElementById(`adminBuy_${id}`);
    if (!logoInput || !driveInput || !buyInput) return;

    const product = this.products.find(p => p.id === id);
    if (product) {
      product.imageUrl = logoInput.value.trim();
      product.driveUrl = driveInput.value.trim();
      product.buyUrl = buyInput.value.trim();
      this.saveProducts();
      this.renderProductsGrid(this.products);
      this.showToast(`Logo, Link Drive, & Link Pembelian untuk ${product.title} berhasil diperbarui!`, "success");
    }
  }

  resetDataToDefault() {
    localStorage.removeItem("aplikasiid_products");
    this.products = INITIAL_PRODUCTS;
    this.renderProductsGrid(this.products);
    this.renderAdminTable();
    this.showToast("Data katalog dikembalikan ke versi standar bawaan.", "success");
  }

  // Helper Copy to Clipboard
  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      this.showToast("Link Google Drive berhasil disalin ke clipboard!", "success");
    });
  }

  // Toast Notification System
  showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}" style="color:${type === 'success' ? '#10b981' : '#f43f5e'}; font-size:18px;"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

// Global App Instance Initialization
const app = new AplikasiIdStore();
