// ==========================================
// 模板渲染模組
// 檔案位置：utils/templateRenderer.js
// 功能：
// 1. 抽取 EJS 模板渲染邏輯
// 2. 提供共用的模板渲染函式
// 3. 專門處理 404 與 500 錯誤頁面
// ==========================================

import fs from "fs/promises";
import ejs from "ejs";

/**
 * renderTemplate
 * --------------------------
 * 渲染 EJS 模板的共用函式
 *
 * @param {ServerResponse} res
 *        HTTP 回應物件
 *
 * @param {string} filePath
 *        EJS 檔案路徑（例如 "./index.ejs"）
 *
 * @param {object} data
 *        傳遞給模板的資料（預設為空物件）
 */
export async function renderTemplate(res, filePath, data = {}) {
  try {
    // 讀取 EJS 模板檔案
    const template = await fs.readFile(filePath, "utf8");

    // 使用 EJS 將模板與資料渲染成 HTML
    const html = ejs.render(template, data);

    // 回傳成功結果
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  } catch (err) {
    // 錯誤處理：檔案讀取或渲染失敗 → 500
    res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`500 - 伺服器錯誤：無法讀取模板檔案<br>${err.message}`);
  }
}

/**
 * render404
 * --------------------------
 * 專門處理 404 錯誤頁面
 *
 * @param {ServerResponse} res
 *        HTTP 回應物件
 */
export async function render404(res) {
  // 使用 index3.ejs 作為 404 頁面
  try {
    const template = await fs.readFile("./index3.ejs", "utf8");
    const html = ejs.render(template);

    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  } catch (err) {
    // 若 404 頁本身讀取失敗，仍回傳 500
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("500 - 伺服器錯誤：無法顯示 404 頁面");
  }
}
