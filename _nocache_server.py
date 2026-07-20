import http.server
import socketserver

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        super().end_headers()

with socketserver.TCPServer(("", 8123), NoCacheHandler) as httpd:
    httpd.allow_reuse_address = True
    httpd.serve_forever()
