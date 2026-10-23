# 本地预览服务器：在 http://localhost:8000 打开网站，并禁用缓存（改完文件刷新即可看到）
import http.server, os, sys, webbrowser, functools

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = 8000

class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

handler = functools.partial(NoCache, directory=ROOT)
with http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler) as httpd:
    print(f"网站已在 http://localhost:{PORT} 运行，关闭此窗口即可停止。")
    if "--no-browser" not in sys.argv:
        webbrowser.open(f"http://localhost:{PORT}")
    httpd.serve_forever()
