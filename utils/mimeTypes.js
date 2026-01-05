// ==========================================
// MIME 類型模組
// 檔案位置：utils/mimeTypes.js
// 功能：
// 1. 抽取原本 2b.js 中的 contentTypes 物件
// 2. 根據副檔名回傳正確的 MIME 類型
// 3. 使用 ES6 export 匯出供其他模組使用
// ==========================================

import path from "path";

// 原本在 2b.js 中的 contentTypes 物件
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".ejs": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

/**
 * getContentType
 * --------------------------
 * 根據副檔名回傳對應的 MIME 類型
 *
 * @param {string} extname
 *        副檔名（例如 ".css"）或檔名（例如 "style.css"）
 *
 * @returns {string}
 *        對應的 Content-Type，若找不到則回傳 text/plain
 */
export function getContentType(extname) {
  // 若傳入的是檔名，先取出副檔名
  const ext = extname.startsWith(".")
    ? extname
    : path.extname(extname);

  return contentTypes[ext] || "text/plain; charset=utf-8";
}

// （可選）若其他模組需要整個對照表，也可以匯出
export { contentTypes };
