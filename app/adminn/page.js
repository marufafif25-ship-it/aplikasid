"use client";

import { useEffect, useMemo, useState } from "react";
import { products as defaultProducts } from "../../lib/products";
import { deleteProductFromSheet, fetchProductsFromSheet, saveProductToSheet } from "../../lib/products-api";

const STORAGE_KEY = "aplikasiid_products";
const PAGE_SIZE = 15;

const emptyProduct = {
  id: "",
  title: "",
  category: "Design",
  os: "Win & Mac",
  versions: "",
  price: 0,
  originalPrice: 0,
  rating: 5,
  sales: 0,
  imageUrl: "/assets/logos/aplikasid.png",
  catalogImageUrl: "",
  buyUrl: "",
  color: "#2563eb",
  specs: []
};

const readProducts = () => {
  if (typeof window === "undefined") return defaultProducts;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) return defaultProducts;
  try {
    return JSON.parse(saved);
  } catch {
    return defaultProducts;
  }
};

const formatRp = (amount) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(amount) || 0);
const hasSortOrder = (value) => value !== "" && value !== null && value !== undefined && Number.isFinite(Number(value));
const withOrder = (items) => items.map((product, index) => ({ ...product, sortOrder: hasSortOrder(product.sortOrder) ? Number(product.sortOrder) : index }));
const mergeStoredOrder = (items) => {
  if (typeof window === "undefined") return withOrder(items);
  try {
    const sheetHasOrder = items.some((product) => hasSortOrder(product.sortOrder));
    if (sheetHasOrder) return withOrder(items).sort((a, b) => a.sortOrder - b.sortOrder);
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    const savedOrder = new Map(saved.map((product, index) => [product.id, hasSortOrder(product.sortOrder) ? Number(product.sortOrder) : index]));
    return withOrder(items).map((product, index) => ({ ...product, sortOrder: savedOrder.has(product.id) ? savedOrder.get(product.id) : index })).sort((a, b) => a.sortOrder - b.sortOrder);
  } catch {
    return withOrder(items);
  }
};

export default function AdminPage() {
  const [productList, setProductList] = useState(defaultProducts);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setProductList(withOrder(readProducts()));
    fetchProductsFromSheet()
      .then((sheetProducts) => {
        const orderedProducts = mergeStoredOrder(sheetProducts);
        setProductList(orderedProducts);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orderedProducts));
      })
      .catch(() => setNotice("Spreadsheet tidak dapat diakses. Data lokal digunakan."));
  }, []);

  const filteredProducts = useMemo(() => {
    const query = search.toLowerCase().trim();
    return productList.filter((product) => !query || `${product.title} ${product.category} ${product.id}`.toLowerCase().includes(query));
  }, [productList, search]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const visibleProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const persist = (nextProducts, message) => {
    const orderedProducts = withOrder(nextProducts);
    setProductList(orderedProducts);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orderedProducts));
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2500);
  };

  const saveOrder = async (nextProducts) => {
    const orderedProducts = nextProducts.map((product, index) => ({ ...product, sortOrder: index }));
    try {
      for (const product of orderedProducts) {
        await saveProductToSheet(product);
      }
      persist(orderedProducts, "Urutan produk berhasil disimpan.");
    } catch {
      setNotice("Urutan tersimpan lokal, tetapi gagal disinkronkan ke spreadsheet.");
    }
  };

  const moveProduct = (productId, direction) => {
    const index = productList.findIndex((product) => product.id === productId);
    const targetIndex = index + direction;
    if (index < 0 || targetIndex < 0 || targetIndex >= productList.length) return;
    const nextProducts = [...productList];
    [nextProducts[index], nextProducts[targetIndex]] = [nextProducts[targetIndex], nextProducts[index]];
    saveOrder(nextProducts);
  };

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const editProduct = (product) => {
    setEditingId(product.id);
    setForm({ ...product, specs: product.specs || [] });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startNew = () => {
    setEditingId(null);
    setForm({ ...emptyProduct, id: `app-${Date.now()}` });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveProduct = async (event) => {
    event.preventDefault();
    const product = {
      ...form,
      id: form.id.trim() || `app-${Date.now()}`,
      title: form.title.trim(),
      price: Number(form.price) || 0,
      originalPrice: Number(form.originalPrice) || 0,
      rating: Number(form.rating) || 0,
      sales: Number(form.sales) || 0,
      versions: form.versions.trim(),
      specs: Array.isArray(form.specs) ? form.specs : form.specs.split(",").map((item) => item.trim()).filter(Boolean),
      imageUrl: form.imageUrl || form.catalogImageUrl || "/assets/logos/aplikasid.png"
    };
    if (!product.title) return;
    const nextProducts = editingId ? productList.map((item) => item.id === editingId ? product : item) : [product, ...productList];
    try {
      await saveProductToSheet(product);
    } catch {
      setNotice("Gagal menyimpan ke spreadsheet.");
      return;
    }
    persist(nextProducts, editingId ? "Produk berhasil diperbarui." : "Produk baru berhasil ditambahkan.");
    setEditingId(null);
    setForm(emptyProduct);
    setPage(1);
  };

  const removeProduct = async (id) => {
    if (!window.confirm("Hapus produk ini dari katalog?")) return;
    try {
      await deleteProductFromSheet(id);
    } catch {
      setNotice("Gagal menghapus dari spreadsheet.");
      return;
    }
    persist(productList.filter((product) => product.id !== id), "Produk berhasil dihapus.");
    if (visibleProducts.length === 1 && page > 1) setPage(page - 1);
  };

  const resetProducts = () => {
    if (!window.confirm("Gunakan kembali data terbaru dari file lib/products.js? Perubahan admin akan dihapus.")) return;
    window.localStorage.removeItem(STORAGE_KEY);
    persist(defaultProducts, "Data terbaru dari file products.js sudah digunakan.");
    setEditingId(null);
    setForm(emptyProduct);
    setPage(1);
  };

  const readUpload = (field) => (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateField(field, reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <a className="admin-back" href="/">← Kembali ke toko</a>
          <p className="admin-eyebrow">APLIKASI.ID CONTROL ROOM</p>
          <h1>Dashboard Produk</h1>
          <p className="admin-subtitle">Kelola katalog, gambar, harga, dan tujuan tombol beli tanpa mengubah kode toko.</p>
        </div>
        <button className="admin-primary" type="button" onClick={startNew}>+ Produk Baru</button>
      </header>

      <section className="admin-stats" aria-label="Ringkasan katalog">
        <div><strong>{productList.length}</strong><span>Total produk</span></div>
        <div><strong>{productList.filter((product) => product.catalogImageUrl).length}</strong><span>Dengan katalog</span></div>
        <div><strong>{productList.filter((product) => product.buyUrl).length}</strong><span>URL beli aktif</span></div>
      </section>

      <section className="admin-editor">
        <div className="admin-section-heading"><div><p className="admin-eyebrow">{editingId ? "EDIT PRODUK" : "TAMBAH PRODUK"}</p><h2>{editingId ? "Perbarui detail produk" : "Buat produk baru"}</h2></div>{editingId && <button className="admin-ghost" type="button" onClick={() => { setEditingId(null); setForm(emptyProduct); }}>Batal edit</button>}</div>
        <form className="admin-form" onSubmit={saveProduct}>
          <label>ID produk<input value={form.id} onChange={(event) => updateField("id", event.target.value)} placeholder="app-produk-baru" required /></label>
          <label>Nama produk<input value={form.title} onChange={(event) => updateField("title", event.target.value)} placeholder="Nama software" required /></label>
          <label>Kategori<select value={form.category} onChange={(event) => updateField("category", event.target.value)}><option>Design</option><option>Engineering</option><option>Video</option><option>Office</option><option>Utility</option></select></label>
          <label>Sistem operasi<input value={form.os} onChange={(event) => updateField("os", event.target.value)} placeholder="Win & Mac" /></label>
          <label>Harga jual<input type="number" min="0" value={form.price} onChange={(event) => updateField("price", event.target.value)} /></label>
          <label>Harga coret<input type="number" min="0" value={form.originalPrice} onChange={(event) => updateField("originalPrice", event.target.value)} /></label>
          <label>Rating<input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(event) => updateField("rating", event.target.value)} /></label>
          <label>Terjual<input type="number" min="0" value={form.sales} onChange={(event) => updateField("sales", event.target.value)} /></label>
          <label className="admin-wide">Daftar versi<textarea value={form.versions} onChange={(event) => updateField("versions", event.target.value)} placeholder="2024 - 2025 - 2026" /></label>
          <label className="admin-wide">Spesifikasi <small>Pisahkan dengan koma</small><textarea value={Array.isArray(form.specs) ? form.specs.join(", ") : form.specs} onChange={(event) => updateField("specs", event.target.value)} placeholder="Full Version, Instal Mudah, Garansi" /></label>
          <label>URL tombol beli <small>Contoh https://...</small><input type="url" value={form.buyUrl || ""} onChange={(event) => updateField("buyUrl", event.target.value)} placeholder="https://website-pembayaran.com" /></label>
          <label>URL gambar logo<input value={form.imageUrl || ""} onChange={(event) => updateField("imageUrl", event.target.value)} placeholder="/assets/logos/app.png" /></label>
          <label>URL gambar katalog<input value={form.catalogImageUrl || ""} onChange={(event) => updateField("catalogImageUrl", event.target.value)} placeholder="/assets/katalogApp.png" /></label>
          <label>Upload gambar katalog<input type="file" accept="image/*" onChange={readUpload("catalogImageUrl")} /></label>
          <label>Warna logo<input type="color" value={form.color || "#2563eb"} onChange={(event) => updateField("color", event.target.value)} /></label>
          <div className="admin-preview"><span>Preview katalog</span>{form.catalogImageUrl ? <img src={form.catalogImageUrl} alt="Preview katalog" /> : <strong>Belum ada gambar</strong>}</div>
          <div className="admin-form-actions"><button className="admin-primary" type="submit">{editingId ? "Simpan Perubahan" : "Tambah Produk"}</button><button className="admin-ghost" type="button" onClick={resetProducts}>Gunakan Data dari File Kode</button></div>
        </form>
      </section>

      <section className="admin-list-section">
        <div className="admin-section-heading"><div><p className="admin-eyebrow">KATALOG</p><h2>Semua produk</h2></div><label className="admin-search"><span>⌕</span><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Cari produk..." /></label></div>
        <p className="admin-drag-hint">Tarik kartu untuk mengubah urutan, atau gunakan tombol naik/turun.</p>
        <div className="admin-product-grid">{visibleProducts.map((product, index) => <article className="admin-product-row" key={product.id} draggable onDragStart={(event) => event.dataTransfer.setData("text/product-id", product.id)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { const sourceId = event.dataTransfer.getData("text/product-id"); const sourceIndex = productList.findIndex((item) => item.id === sourceId); const targetIndex = productList.findIndex((item) => item.id === product.id); if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return; const nextProducts = [...productList]; const [movedProduct] = nextProducts.splice(sourceIndex, 1); nextProducts.splice(targetIndex, 0, movedProduct); saveOrder(nextProducts); }}><span className="admin-drag-handle" title="Tarik untuk mengurutkan">⋮⋮</span><div className="admin-product-image">{product.catalogImageUrl ? <img src={product.catalogImageUrl} alt="" /> : <img src={product.imageUrl} alt="" />}</div><div className="admin-product-info"><strong>{product.title}</strong><span>{product.category} · {formatRp(product.price)}</span><small>Urutan {((page - 1) * PAGE_SIZE) + index + 1} · {product.buyUrl ? "URL beli aktif" : "Masuk keranjang"}</small></div><div className="admin-row-actions"><div className="admin-order-actions"><button className="admin-ghost" type="button" disabled={index === 0 && page === 1} onClick={() => moveProduct(product.id, -1)} aria-label={`Naikkan ${product.title}`}>↑</button><button className="admin-ghost" type="button" disabled={index === visibleProducts.length - 1 && page === pageCount} onClick={() => moveProduct(product.id, 1)} aria-label={`Turunkan ${product.title}`}>↓</button></div><button className="admin-ghost" type="button" onClick={() => editProduct(product)}>Edit</button><button className="admin-danger" type="button" onClick={() => removeProduct(product.id)}>Hapus</button></div></article>)}</div>
        {visibleProducts.length === 0 && <div className="admin-empty">Produk tidak ditemukan.</div>}
        <div className="admin-pagination"><span>Menampilkan {visibleProducts.length} dari {filteredProducts.length} produk</span><div><button className="admin-ghost" type="button" disabled={page === 1} onClick={() => setPage((current) => current - 1)}>← Sebelumnya</button><strong>Halaman {page} / {pageCount}</strong><button className="admin-ghost" type="button" disabled={page === pageCount} onClick={() => setPage((current) => current + 1)}>Berikutnya →</button></div></div>
      </section>
      {notice && <div className="admin-toast">✓ {notice}</div>}
    </main>
  );
}
