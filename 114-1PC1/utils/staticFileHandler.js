import fs from "fs/promises";
import path from "path";
import { getContentType } from "./mimeTypes.js";
import { render404 } from "./templateRenderer.js";

/**
 * 處理靜態文件（CSS、JS、圖片等）
 */
export async function handleStaticFile(res, filePath) {
  try {
    const content = await fs.readFile(filePath); // 不指定 utf8，支援圖片等二進位
    const ext = path.extname(filePath);
    const contentType = getContentType(ext);

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  } catch (err) {
    // 檔案不存在 → 404 頁
    //
    if (err.code === "ENOENT") {
      await render404(res);
      return;
    }

    // 包含錯誤處理（檔案讀取失敗時回傳 500 錯誤）
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("500 - 伺服器錯誤：讀取靜態檔案失敗\n" + err.message);
  }
}
