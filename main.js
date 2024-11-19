import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// 使用 import.meta.url 创建 __dirname 和 __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 加载 Vue 应用的入口文件
  const startUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173'  // Vue 开发服务器
    : `file://${path.join(__dirname, 'dist/index.html')}`;  // 生产模式打包的文件
  win.loadURL(startUrl);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
