"use client";

import { useEffect, useMemo, useState } from "react";
import { products } from "../lib/products";
import { fetchFooterSettings, fetchHomepageSettings, fetchProductsFromSheet } from "../lib/products-api";

const defaultHeroSettings = {
  badge: "238+ Software Aktif",
  title: "Software Original",
  titleLineTwo: "untuk Tugas & Kerja",
  description: "Solusi software terpercaya untuk kebutuhan kerja, desain, editing, dan bisnis dengan proses aktivasi cepat serta bantuan pelanggan.",
  primaryLabel: "Mulai Belanja",
  primaryTarget: "produk",
  secondaryLabel: "Cek Pesanan",
  secondaryTarget: "bantuan",
  trustOne: "Full Version",
  trustTwo: "Aktivasi Cepat",
  trustThree: "Support Pelanggan"
};
const defaultFooterSettings = {
  brand: "Aplikasi.id",
  description: "Pusat software terpercaya untuk kebutuhan kerja dan bisnis.",
  copyright: "© 2026. Semua hak dilindungi.",
  whatsapp: "",
  instagram: "",
  email: ""
};

const formatRp = (amount) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
const orderProducts = (items) => [...items].sort((a, b) => {
  const aOrder = a.sortOrder === "" || a.sortOrder === null || a.sortOrder === undefined ? Number.MAX_SAFE_INTEGER : Number(a.sortOrder);
  const bOrder = b.sortOrder === "" || b.sortOrder === null || b.sortOrder === undefined ? Number.MAX_SAFE_INTEGER : Number(b.sortOrder);
  return (Number.isFinite(aOrder) ? aOrder : Number.MAX_SAFE_INTEGER) - (Number.isFinite(bOrder) ? bOrder : Number.MAX_SAFE_INTEGER);
});
const mergeStoredOrder = (items) => {
  if (typeof window === "undefined") return items;
  try {
    const saved = JSON.parse(window.localStorage.getItem("aplikasiid_products") || "[]");
    const savedOrder = new Map(saved.map((product, index) => [product.id, product.sortOrder !== "" && product.sortOrder !== null && product.sortOrder !== undefined && Number.isFinite(Number(product.sortOrder)) ? Number(product.sortOrder) : index]));
    const sheetHasOrder = items.some((product) => product.sortOrder !== "" && product.sortOrder !== null && product.sortOrder !== undefined && Number.isFinite(Number(product.sortOrder)));
    return orderProducts(items.map((product, index) => ({ ...product, sortOrder: sheetHasOrder ? product.sortOrder : (savedOrder.has(product.id) ? savedOrder.get(product.id) : index) })));
  } catch {
    return items;
  }
};

export default function HomePage() {
  const [productList, setProductList] = useState(products);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
  const [invoiceQuery, setInvoiceQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [heroSettings, setHeroSettings] = useState(defaultHeroSettings);
  const [footerSettings, setFooterSettings] = useState(defaultFooterSettings);

  useEffect(() => {
    const savedCart = window.localStorage.getItem("aplikasiid_cart");
    if (savedCart) setCart(JSON.parse(savedCart));
    const savedProducts = window.localStorage.getItem("aplikasiid_products");
    if (savedProducts) setProductList(orderProducts(JSON.parse(savedProducts)));
    const savedHero = window.localStorage.getItem("aplikasiid_hero");
    if (savedHero) setHeroSettings({ ...defaultHeroSettings, ...JSON.parse(savedHero) });
    const savedFooter = window.localStorage.getItem("aplikasiid_footer");
    if (savedFooter) setFooterSettings({ ...defaultFooterSettings, ...JSON.parse(savedFooter) });
    fetchHomepageSettings()
      .then((settings) => {
        if (settings && !Array.isArray(settings)) {
          const nextHero = { ...defaultHeroSettings, ...settings };
          setHeroSettings(nextHero);
          window.localStorage.setItem("aplikasiid_hero", JSON.stringify(nextHero));
        }
      })
      .catch(() => {});
    fetchFooterSettings()
      .then((settings) => {
        if (settings && !Array.isArray(settings)) {
          const nextFooter = { ...defaultFooterSettings, ...settings };
          setFooterSettings(nextFooter);
          window.localStorage.setItem("aplikasiid_footer", JSON.stringify(nextFooter));
        }
      })
      .catch(() => {});
    fetchProductsFromSheet()
      .then((sheetProducts) => {
        const orderedProducts = mergeStoredOrder(sheetProducts);
        setProductList(orderedProducts);
        window.localStorage.setItem("aplikasiid_products", JSON.stringify(orderedProducts));
      })
      .catch(() => {});

    const syncProducts = (event) => {
      if (event.key === "aplikasiid_products" && event.newValue) setProductList(JSON.parse(event.newValue));
    };
    window.addEventListener("storage", syncProducts);
    return () => window.removeEventListener("storage", syncProducts);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("aplikasiid_cart", JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    const result = productList.filter((product) => {
      const matchesQuery = !normalized || `${product.title} ${product.category} ${product.versions}`.toLowerCase().includes(normalized);
      return matchesQuery && (category === "all" || product.category === category);
    });
    if (sort === "popular") return [...result].sort((a, b) => b.sales - a.sales);
    if (sort === "price-low") return [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-high") return [...result].sort((a, b) => b.price - a.price);
    return sort === "newest" ? orderProducts(result) : result;
  }, [category, productList, query, sort]);

  const addToCart = (product) => {
    if (product.buyUrl) {
      window.location.assign(product.buyUrl);
      return;
    }
    setCart((current) => current.some((item) => item.id === product.id) ? current : [...current, product]);
    setNotice(`${product.title} ditambahkan ke keranjang`);
    setSelectedProduct(null);
    window.setTimeout(() => setNotice(""), 2500);
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <header className="navbar-wrapper">
        <div className="container navbar">
          <button className="brand-logo" onClick={() => scrollTo("home")} aria-label="Kembali ke beranda">
            <span className="logo-icon"><img src="/assets/logos/aplikasid-hitamputih.png" alt="Aplikasi.id" /></span>
            <span className="logo-text"><strong>Aplikasi.id</strong><small>LICENSED SOFTWARE</small></span>
          </button>
          <nav className="nav-menu" aria-label="Navigasi utama">
            <button className="nav-link active" onClick={() => scrollTo("home")}>Beranda</button>
            <button className="nav-link" onClick={() => scrollTo("produk")}>Produk</button>
            <button className="nav-link" onClick={() => scrollTo("bantuan")}>Bantuan</button>
            <button className="nav-link" onClick={() => scrollTo("garansi")}>Garansi</button>
            <button className="nav-link" onClick={() => setActiveModal("invoice")}>Cek Invoice</button>
          </nav>
          <div className="nav-actions">
            <button className="action-btn" onClick={() => scrollTo("produk")} aria-label="Cari produk">⌕</button>
            <button className="action-btn cart-button" onClick={() => setActiveModal("cart")} aria-label="Lihat keranjang">🛒<span>{cart.length}</span></button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="container">
            <div className="hero-banner">
              <div className="hero-content">
                <span className="hero-badge">▱ &nbsp; {heroSettings.badge}</span>
                <h1>{heroSettings.title}<br />{heroSettings.titleLineTwo}</h1>
                <p>{heroSettings.description}</p>
                <div className="hero-cta"><button className="btn-primary" onClick={() => scrollTo(heroSettings.primaryTarget || "produk")}>{heroSettings.primaryLabel} <span>→</span></button><button className="btn-secondary" onClick={() => scrollTo(heroSettings.secondaryTarget || "bantuan")}>▤ &nbsp; {heroSettings.secondaryLabel}</button></div>
                <div className="trust-badges"><span>♧ &nbsp; {heroSettings.trustOne}</span><span>ϟ &nbsp; {heroSettings.trustTwo}</span><span>♧ &nbsp; {heroSettings.trustThree}</span></div>
              </div>
              <div className="category-quick-grid">
                {[['Office', 'Windows · Office', '▣'], ['Design', 'Adobe · Corel', '◈'], ['Engineering', 'AutoCAD · SketchUp', '✧'], ['Utility', 'IDM · Recovery', '⚿']].map(([name, description, icon]) => <button className="quick-cat-card" key={name} onClick={() => { setCategory(name); scrollTo("produk"); }}><strong>{icon}</strong><span><b>{name}</b><small>{description}</small></span></button>)}
              </div>
            </div>
          </div>
        </section>

        <section className="toolbar-section" id="produk">
          <div className="container toolbar-card">
            <label className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari software original..." /></label>
            <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Pilih kategori"><option value="all">Semua Kategori</option><option value="Design">Design &amp; Grafis</option><option value="Engineering">Engineering &amp; 3D</option><option value="Video">Video &amp; Animation</option><option value="Office">Office &amp; Produksi</option><option value="Utility">System &amp; Utility</option></select>
            <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Urutkan produk"><option value="newest">Terbaru</option><option value="popular">Terpopuler</option><option value="price-low">Harga Termurah</option><option value="price-high">Harga Tertinggi</option></select>
          </div>
        </section>

        <section className="products-section">
          <div className="container"><div className="section-header"><h2>Katalog Software Premium <small>{filteredProducts.length} Software</small></h2></div><div className="products-grid">
            {filteredProducts.map((product) => <ProductCard key={product.id} product={product} onDetail={setSelectedProduct} onBuy={addToCart} />)}
          </div></div>
        </section>

        <section className="info-section" id="garansi"><div className="container info-grid"><InfoCard icon="ϟ" title="Aktivasi Cepat" text="Pesanan diproses dengan cepat dan panduan instalasi tersedia untuk setiap software." /><InfoCard icon="♢" title="Garansi Selamanya" text="Garansi permanen update dan penggantian link jika ada masalah instalasi." /><InfoCard icon="⇩" title="Direct Google Drive" text="Akses download kencang, aman, dan dilengkapi panduan langkah demi langkah." /></div></section>
        <section className="help-section" id="bantuan"><div className="container"><h2>Butuh bantuan memilih software?</h2><p>Tim kami siap membantu menemukan paket yang sesuai kebutuhan kerja dan perangkat Anda.</p><button className="btn-primary" onClick={() => setActiveModal("request")}>Request Software →</button></div></section>
      </main>

      <footer className="footer"><div className="container"><div className="footer-brand"><strong>{footerSettings.brand}</strong><small>{footerSettings.description}</small></div><div className="footer-links">{footerSettings.whatsapp && <a href={footerSettings.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>}{footerSettings.instagram && <a href={footerSettings.instagram} target="_blank" rel="noreferrer">Instagram</a>}{footerSettings.email && <a href={`mailto:${footerSettings.email}`}>Email</a>}<span>{footerSettings.copyright}</span></div></div></footer>
      {notice && <div className="toast">✓ &nbsp; {notice}</div>}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onBuy={addToCart} />}
      {activeModal === "cart" && <CartModal cart={cart} onClose={() => setActiveModal(null)} onCheckout={() => setActiveModal("checkout")} onRemove={(id) => setCart((items) => items.filter((item) => item.id !== id))} />}
      {activeModal === "checkout" && <CheckoutModal buyer={buyer} setBuyer={setBuyer} cart={cart} onClose={() => setActiveModal(null)} onSuccess={() => { setCart([]); setActiveModal(null); setNotice("Pembayaran berhasil. Link Drive dikirim ke email Anda."); }} />}
      {activeModal === "invoice" && <InvoiceModal query={invoiceQuery} setQuery={setInvoiceQuery} onClose={() => setActiveModal(null)} />}
      {activeModal === "request" && <RequestModal onClose={() => setActiveModal(null)} onSubmit={() => { setActiveModal(null); setNotice("Request software berhasil dikirim."); }} />}
    </>
  );
}

function ProductCard({ product, onDetail, onBuy }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  return <article className="product-card"><div className={`card-artwork${product.catalogImageUrl ? " card-artwork-catalog" : ""}`}>{product.catalogImageUrl ? <img className="card-catalog-image" src={product.catalogImageUrl} alt={`Katalog ${product.title}`} /> : <><span className="thumbnail-watermark">PERMANEN! · Garansi</span><div className="artwork-logo-box" style={{ background: product.color }}><img src={product.imageUrl} alt="" /></div><strong>{product.title.split("(")[0]}</strong><small>{product.versions.slice(0, 35)}...</small><span className="drive-badge-pill">Drive Direct</span></>}</div><div className="card-body"><div className="card-specs-pills">{product.specs.slice(0, 2).map((spec) => <span key={spec}>{spec}</span>)}</div><h3>{product.title}</h3><div className="product-meta"><span>★ {product.rating}</span><i>·</i><span>{product.sales} terjual</span></div><div className="pricing-wrapper"><del>{formatRp(product.originalPrice)}</del><b>{formatRp(product.price)}</b><em>-{discount}%</em></div><button className="btn-card-detail" onClick={() => onDetail(product)}>Lihat Detail →</button><button className="btn-card-buy" onClick={() => onBuy(product)}>Beli Sekarang</button></div></article>;
}

function ProductModal({ product, onClose, onBuy }) {
  return <div className="modal-overlay" onClick={onClose}><div className="modal-container" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose}>×</button><div className="modal-product-head"><div className="artwork-logo-box" style={{ background: product.color }}><img src={product.imageUrl} alt="" /></div><div><h2>{product.title}</h2><p>★ {product.rating} · {product.sales} terjual · {product.os}</p></div></div><h3>Spesifikasi &amp; keunggulan</h3><ul className="spec-list">{product.specs.map((spec) => <li key={spec}>✓ {spec}</li>)}</ul><div className="version-box">Versi tersedia: {product.versions}</div><div className="modal-price"><div><small>Harga spesial promo</small><strong>{formatRp(product.price)}</strong></div><button className="btn-primary" onClick={() => onBuy(product)}>Tambah ke Keranjang</button></div></div></div>;
}

function InfoCard({ icon, title, text }) { return <article className="info-card"><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>; }

function ModalShell({ title, children, onClose }) { return <div className="modal-overlay" onClick={onClose}><div className="modal-container" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose}>×</button><h2 className="modal-heading">{title}</h2>{children}</div></div>; }

function CartModal({ cart, onClose, onCheckout, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  return <ModalShell title="Keranjang Belanja" onClose={onClose}>{cart.length === 0 ? <p className="empty-state">Keranjang Anda masih kosong.</p> : <><div className="cart-list">{cart.map((item) => <div className="cart-row" key={item.id}><span>{item.title}<small>{formatRp(item.price)}</small></span><button onClick={() => onRemove(item.id)}>Hapus</button></div>)}</div><div className="modal-price"><div><small>Total biaya</small><strong>{formatRp(total)}</strong></div><button className="btn-primary" onClick={onCheckout}>Lanjut Bayar</button></div></>}</ModalShell>;
}

function CheckoutModal({ buyer, setBuyer, cart, onClose, onSuccess }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const update = (field) => (event) => setBuyer({ ...buyer, [field]: event.target.value });
  return <ModalShell title="Checkout Pembelian" onClose={onClose}><p className="modal-note">Total pesanan: <b>{formatRp(total)}</b></p><label className="form-label">Nama Lengkap<input className="form-input" value={buyer.name} onChange={update("name")} placeholder="Nama Anda" /></label><label className="form-label">Email Pembeli<input className="form-input" type="email" value={buyer.email} onChange={update("email")} placeholder="email@contoh.com" /></label><label className="form-label">Nomor WhatsApp<input className="form-input" value={buyer.phone} onChange={update("phone")} placeholder="081234567890" /></label><button className="btn-primary full-button" onClick={() => buyer.name && buyer.email && buyer.phone ? onSuccess() : null}>Konfirmasi &amp; Bayar Sekarang</button></ModalShell>;
}

function InvoiceModal({ query, setQuery, onClose }) { return <ModalShell title="Cek Invoice & Akses Drive" onClose={onClose}><p className="modal-note">Masukkan kode invoice atau email pembeli untuk mencari pesanan.</p><input className="form-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Contoh: APL-84920" /><div className="invoice-result">{query ? `Pencarian untuk: ${query}` : "Belum ada pencarian."}</div></ModalShell>; }

function RequestModal({ onClose, onSubmit }) { return <ModalShell title="Request Software" onClose={onClose}><p className="modal-note">Software yang Anda cari belum ada? Kirimkan nama dan versi yang dibutuhkan.</p><label className="form-label">Nama Software<input className="form-input" placeholder="Contoh: Blender 4.2 Pro" /></label><label className="form-label">Email / WhatsApp<input className="form-input" placeholder="Kontak Anda" /></label><button className="btn-primary full-button" onClick={onSubmit}>Kirim Request</button></ModalShell>; }
