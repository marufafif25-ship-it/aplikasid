const PRODUCTS_API_URL = process.env.NEXT_PUBLIC_PRODUCTS_API_URL || "https://script.google.com/macros/s/AKfycbz6mXfDeaHD0QVyksiJheVeVovSQpneNsQx9jd4CmCThdLUkaPKJzq7Tu6DkYCLlmAkFw/exec";

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

async function sendToSheet(payload) {
  const response = await fetch(PRODUCTS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(`Products API returned ${response.status}`);
  return response.json();
}