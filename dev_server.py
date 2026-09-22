#!/usr/bin/env python3
"""
Dr. Anil's Physiotherapy - Enhanced Development Server
Serves static files and provides a local API endpoint (/api/submit-form)
to proxy form submissions to FormSubmit with appropriate Referer headers,
while logging all inquiries locally so no patient lead is ever missed.
"""

import http.server
import json
import os
import sys
import urllib.request
import urllib.error
from datetime import datetime

PORT = 8090
LEADS_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'leads_log.json')

class EnhancedHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Clean path from query and fragment
        clean_path = path.split('?', 1)[0].split('#', 1)[0]
        root = os.path.dirname(os.path.abspath(__file__))
        rel = clean_path.lstrip('/')

        # Support case-insensitive PPC landing page
        if rel.lower() in ('physiotherapy_service', 'physiotherapy-service'):
            return os.path.join(root, 'Physiotherapy_service.html')

        translated = super().translate_path(path)
        # If file doesn't exist but [file].html exists, serve that
        if not os.path.exists(translated) and os.path.exists(translated + '.html'):
            return translated + '.html'
        return translated

    def do_GET(self):
        # Canonical redirect: redirect .html to clean extensionless URL (mirrors .htaccess)
        clean_path = self.path.split('?', 1)[0].split('#', 1)[0]
        query_suffix = ('?' + self.path.split('?', 1)[1]) if '?' in self.path else ''

        if clean_path in ('/index.html', '/index'):
            self.send_response(301)
            self.send_header('Location', '/' + (query_suffix if query_suffix else ''))
            self.end_headers()
            return

        if clean_path.endswith('.html') and not clean_path.endswith('/index.html'):
            target = clean_path[:-5] + query_suffix
            self.send_response(301)
            self.send_header('Location', target)
            self.end_headers()
            return

        super().do_GET()

    def end_headers(self):
        # Enable CORS for local testing from any origin (including file://)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Requested-With')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200, "OK")
        self.end_headers()

    def do_POST(self):
        if self.path in ('/api/submit-form', '/api/contact', '/api/lead'):
            content_length = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_length).decode('utf-8')
            
            try:
                data = json.loads(post_body)
            except Exception:
                data = {'raw': post_body}

            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S IST')
            lead_record = {
                'timestamp': timestamp,
                'data': data
            }

            # 1. Log locally to leads_log.json
            try:
                existing_leads = []
                if os.path.exists(LEADS_FILE):
                    with open(LEADS_FILE, 'r', encoding='utf-8') as f:
                        try:
                            existing_leads = json.load(f)
                        except Exception:
                            existing_leads = []
                existing_leads.append(lead_record)
                with open(LEADS_FILE, 'w', encoding='utf-8') as f:
                    json.dump(existing_leads, f, indent=2, ensure_ascii=False)
                print(f"\n[LEAD CAPTURED {timestamp}]: {data.get('Patient Full Name', data.get('name', 'Anonymous'))} | {data.get('Mobile / WhatsApp', data.get('phone', 'No phone'))} | {data.get('Condition / Service Requested', data.get('service', 'General'))}")
            except Exception as e:
                print(f"[LOG ERROR]: Could not save to leads_log.json: {e}", file=sys.stderr)

            # 2. Forward to FormSubmit (dranilsphysio@gmail.com) with valid Referer
            formsubmit_url = 'https://formsubmit.co/ajax/dranilsphysio@gmail.com'
            forward_headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Referer': f'http://localhost:{PORT}/contact.html',
                'Origin': f'http://localhost:{PORT}',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }

            forward_data = json.dumps(data).encode('utf-8')
            req = urllib.request.Request(formsubmit_url, data=forward_data, headers=forward_headers)

            status_code = 200
            response_json = {'success': True, 'message': 'Lead recorded locally'}

            try:
                with urllib.request.urlopen(req, timeout=8) as resp:
                    resp_body = resp.read().decode('utf-8')
                    try:
                        response_json = json.loads(resp_body)
                    except Exception:
                        response_json = {'raw_response': resp_body}
                    print(f"[FORMSUBMIT RESPONSE]: {response_json}")
            except urllib.error.HTTPError as e:
                err_body = e.read().decode('utf-8')
                try:
                    response_json = json.loads(err_body)
                except Exception:
                    response_json = {'error': err_body, 'code': e.code}
                print(f"[FORMSUBMIT NOTICE ({e.code})]: {response_json}", file=sys.stderr)
            except Exception as e:
                print(f"[FORMSUBMIT DISPATCH ERROR]: {e}", file=sys.stderr)
                response_json = {'warning': str(e), 'local_saved': True}

            self.send_response(status_code)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response_json).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    server_address = ('', port)
    httpd = http.server.ThreadingHTTPServer(server_address, EnhancedHTTPRequestHandler)
    print(f"Dr. Anil's Clinic Dev Server running on http://localhost:{port}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down dev server.")
        httpd.server_close()
