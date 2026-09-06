const PRODUCTS_SHEET_NAME = "products";
const AUTH_SHEET_NAME = "auth";

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PRODUCTS_SHEET_NAME);
  const values = sheet.getDataRange().getValues();
  const headers = values.shift();
  const products = values.filter(row => row[0]).map(row => {
    const product = {};
    headers.forEach((header, index) => product[header] = row[index]);
    product.price = Number(product.price) || 0;
    product.originalPrice = Number(product.originalPrice) || 0;
    product.rating = Number(product.rating) || 0;
    product.sales = Number(product.sales) || 0;
    product.sortOrder = product.sortOrder === "" ? "" : Number(product.sortOrder);
    product.specs = product.specs ? String(product.specs).split(",").map(item => item.trim()) : [];
    return product;
  });

  return jsonOutput(products);
}

function doPost(event) {
  const data = JSON.parse(event.postData.contents || "{}");

  if (data.action === "auth") {
    return authenticate(data.login, data.password);
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PRODUCTS_SHEET_NAME);
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idIndex = headers.indexOf("id");

  if (data.action === "delete") {
    for (let row = values.length - 1; row >= 1; row--) {
      if (String(values[row][idIndex]) === String(data.id)) {
        sheet.deleteRow(row + 1);
        break;
      }
    }
  }

  if (data.action === "save") {
    const product = data.product;
    const rowData = headers.map(header => header === "specs" ? (product.specs || []).join(", ") : product[header] ?? "");
    let existingRow = -1;
    for (let row = 1; row < values.length; row++) {
      if (String(values[row][idIndex]) === String(product.id)) {
        existingRow = row + 1;
        break;
      }
    }
    if (existingRow === -1) sheet.appendRow(rowData);
    else sheet.getRange(existingRow, 1, 1, rowData.length).setValues([rowData]);
  }

  return jsonOutput({ success: true });
}

function authenticate(login, password) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(AUTH_SHEET_NAME);
  if (!sheet) return jsonOutput({ success: false, message: "Sheet auth tidak ditemukan." });

  const values = sheet.getDataRange().getValues();
  const headers = values.shift().map(header => String(header).trim().toLowerCase());
  const loginIndex = headers.indexOf("login");
  const passwordIndex = headers.indexOf("password");
  const roleIndex = headers.indexOf("role");
  if (loginIndex < 0 || passwordIndex < 0 || roleIndex < 0) return jsonOutput({ success: false, message: "Kolom auth harus login, password, role." });

  const account = values.find(row => String(row[loginIndex]).trim() === String(login).trim() && String(row[passwordIndex]) === String(password));
  if (!account) return jsonOutput({ success: false, message: "Login atau password salah." });

  return jsonOutput({ success: true, login: account[loginIndex], role: String(account[roleIndex]).trim().toLowerCase() });
}

function jsonOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
