import path from "path";

// 抽出 2b.js 的 contentTypes
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

// 根據副檔名回傳 MIME 類型
export function getContentType(extname) {
  // 允許傳 ".css" 或 "style.css" 兩種都可
  const ext = extname.startsWith(".") ? extname : path.extname(extname);
  return contentTypes[ext] || "text/plain; charset=utf-8";
}

export { contentTypes };
