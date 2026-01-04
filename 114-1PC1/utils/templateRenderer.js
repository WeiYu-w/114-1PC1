import fs from "fs/promises";
import ejs from "ejs";

/**
 * 渲染 EJS 模板
 * res : HTTP 回應物件
 * filePath : EJS 檔案路徑（例如 "./index.ejs"）
 * data : 傳遞給模板的資料（預設為空物件）
 */
export async function renderTemplate(res, filePath, data = {}, statusCode = 200) {
  try {
    const template = await fs.readFile(filePath, "utf8");
    const html = ejs.render(template, data);

    res.writeHead(statusCode, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  } catch (err) {
    // 讀檔或 render 出錯 → 500
    res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`500 - 伺服器錯誤：無法讀取/渲染模板<br>${err.message}`);
  }
}

/**
 * 專門處理 404 錯誤頁面
 */
export async function render404(res) {
  // 你原本 404 用 index3.ejs
  await renderTemplate(res, "./index3.ejs", {}, 404);
}
