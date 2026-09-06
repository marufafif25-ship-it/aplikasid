const PRODUCTS_SHEET_NAME = "products";
const AUTH_SHEET_NAME = "auth";

function doGet(event) {
  if (event && event.parameter && event.parameter.resource === "homepage") {
    return readHomepageSettings();
  }
  if (event && event.parameter && event.parameter.resource === "footer") {
    return readSettingsSheet("footer");
  }
  if (event && event.parameter && event.parameter.resource === "faq") {
    return readFaq();
  }
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

  if (data.action === "save_homepage") {
    return saveHomepageSettings(data.settings || {});
  }

  if (data.action === "save_footer") {
    return saveSettingsSheet("footer", data.settings || {});
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

function readHomepageSettings() {
  return readSettingsSheet("homepage_settings");
}

function readSettingsSheet(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) return jsonOutput({});
  const values = sheet.getDataRange().getValues();
  const settings = {};
  values.slice(1).forEach(row => {
    if (row[0]) settings[String(row[0]).trim()] = row[1] ?? "";
  });
  return jsonOutput(settings);
}

function readFaq() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("chat_faq");
  if (!sheet) return jsonOutput([]);
  const values = sheet.getDataRange().getValues();
  const headers = values.shift().map(header => String(header).trim().toLowerCase());
  const faq = values.filter(row => row[0]).map(row => {
    const item = {};
    headers.forEach((header, index) => item[header] = row[index]);
    item.active = String(item.active).toLowerCase() !== "false" && String(item.active) !== "0";
    item.sortOrder = item.sortOrder === "" ? 0 : Number(item.sortOrder) || 0;
    return item;
  }).filter(item => item.active).sort((a, b) => a.sortOrder - b.sortOrder);
  return jsonOutput(faq);
}

function saveHomepageSettings(settings) {
  return saveSettingsSheet("homepage_settings", settings);
}

function saveSettingsSheet(sheetName, settings) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow(["key", "value"]);
  }
  const values = sheet.getDataRange().getValues();
  const rows = new Map();
  values.slice(1).forEach((row, index) => rows.set(String(row[0]).trim(), index + 2));
  Object.keys(settings).forEach(key => {
    if (rows.has(key)) sheet.getRange(rows.get(key), 2).setValue(settings[key]);
    else sheet.appendRow([key, settings[key]]);
  });
  return jsonOutput({ success: true });
}

function jsonOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
