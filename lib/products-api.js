const PRODUCTS_API_URL = process.env.NEXT_PUBLIC_PRODUCTS_API_URL || "https://script.google.com/macros/s/AKfycbx8dwn4n1Pq9LyDmsmz07Nagvnpwfb-l3RDWgw2pslIqR2y7u894HXDUyvKZPlJSDvWGQ/exec";

export async function fetchProductsFromSheet() {
  const response = await fetch(PRODUCTS_API_URL, { cache: "no-store" });
  if (!response.ok) throw new Error(`Products API returned ${response.status}`);
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error("Products API returned invalid data");
  return data;
}

export async function saveProductToSheet(product) {
  return sendToSheet({ action: "save", product });
}

export async function deleteProductFromSheet(id) {
  return sendToSheet({ action: "delete", id });
}

export async function authenticateAdmin(login, password) {
  return sendToSheet({ action: "auth", login, password });
}

export async function fetchHomepageSettings() {
  const response = await fetch(`${PRODUCTS_API_URL}?resource=homepage`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Homepage API returned ${response.status}`);
  return response.json();
}

export async function saveHomepageSettings(settings) {
  return sendToSheet({ action: "save_homepage", settings });
}

export async function fetchFooterSettings() {
  const response = await fetch(`${PRODUCTS_API_URL}?resource=footer`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Footer API returned ${response.status}`);
  return response.json();
}

export async function saveFooterSettings(settings) {
  return sendToSheet({ action: "save_footer", settings });
}

async function sendToSheet(payload) {
  const response = await fetch(PRODUCTS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(`Products API returned ${response.status}`);
  return response.json();
}