import http from "http";
import path from "path";
import { fileURLToPath } from "url";

import { renderTemplate, render404 } from "./utils/templateRenderer.js";
import { handleStaticFile } from "./utils/staticFileHandler.js";

// 取得目前檔案所在資料夾（ESM 沒有 __dirname，要自己做）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 你的檔案都在根目錄，所以 baseDir 就是目前資料夾
const baseDir = __dirname;

// 簡單防止亂跳路徑（../）
function safeResolve(requestUrlPath) {
  // 移除 querystring
  const cleanPath = requestUrlPath.split("?")[0];

  // decode（避免 %20）
  const decoded = decodeURIComponent(cleanPath);

  // 讓 "/style.css" 變成 "style.css"
  const relative = decoded.replace(/^\/+/, "");

  // 組成實體路徑
  const fullPath = path.resolve(baseDir, relative);

  // 確保沒有跳出 baseDir
  if (!fullPath.startsWith(baseDir)) return null;
  return fullPath;
}

http
  .createServer(async (req, res) => {
    // ✅ 建議：先取純路徑（避免 querystring 影響 switch）
    const urlPath = (req.url || "/").split("?")[0];

    // 主檔案只做路由分派（題目要求保留 switch）
    switch (urlPath) {
      case "/":
        // / → 渲染 index.ejs
        await renderTemplate(res, path.join(baseDir, "index.ejs"), {
          message: "您好 xxx",
        });
        break;

      case "/calculator":
        // /calculator → 渲染 index2.ejs
        await renderTemplate(res, path.join(baseDir, "index2.ejs"));
        break;

      default: {
        // 其他路徑 → 嘗試作為靜態檔案處理
        const fullPath = safeResolve(urlPath);

        if (!fullPath) {
          // 路徑不安全（例如 /../）→ 直接 404
          await render404(res);
          return;
        }

        await handleStaticFile(res, fullPath);
        break;
      }
    }
  })
  .listen(3000, () => {
    console.log("伺服器已啟動！請訪問 http://localhost:3000");
    console.log("可用路由：");
    console.log("  - http://localhost:3000");
    console.log("  - http://localhost:3000/calculator");
    console.log("  - 其他路徑將嘗試以靜態檔案處理（不存在則 404 頁）");
  });
