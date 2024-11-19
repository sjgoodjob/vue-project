// electron.js
import { app, BrowserWindow } from 'electron';
import path from 'path';

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // 使用预加载脚本
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
        }
    });

    // 加载 Vite 提供的本地开发服务器
    win.loadFile(path.join(__dirname, 'dist/index.html'));
}

// 在 Electron 初始化完成后创建窗口
console.log('App is starting...');

app.whenReady().then(() => {
    console.log('Creating window...');

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// 退出应用程序时清理
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
