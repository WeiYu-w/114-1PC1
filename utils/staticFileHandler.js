// ==========================================
// 靜態文件處理模組
// 檔案位置：utils/staticFileHandler.js
// 功能：
// 1. 抽取靜態文件（CSS、JS、圖片等）的處理邏輯
// 2. 根據副檔名設定正確的 Content-Type
// 3. 若檔案不存在，自動顯示 404 錯誤頁面
// ==========================================

import fs from "fs/promises";
import path from "path";

// 引入 MIME 類型模組
import { getContentType } from "./mimeTypes.js";

// 引入模板渲染模組（404 頁面）
import { render404 } from "./templateRenderer.js";

/**
 * handleStaticFile
 * --------------------------
 * 處理靜態文件的共用函式
 *
 * @param {ServerResponse} res
 *        HTTP 回應物件
 *
 * @param {string} filePath
 *        靜態檔案實體路徑（例如 "./style.css"、"./script.js"）
 */
export async function handleStaticFile(res, filePath) {
  try {
    // 讀取靜態檔案（不指定 utf8，支援圖片等二進位檔案）
    const content = await fs.readFile(filePath);

    // 取得副檔名
    const extname = path.extname(filePath);

    // 根據副檔名取得對應的 Content-Type
    const contentType = getContentType(extname);

    // 回傳靜態檔案內容
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  } catch (err) {
    // 檔案不存在 → 顯示 404 頁面
    if (err.code === "ENOENT") {
      await render404(res);
      return;
    }

    // 其他錯誤 → 回傳 500
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("500 - 伺服器錯誤：讀取靜態檔案失敗");
  }
}
