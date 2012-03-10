#!/usr/bin/env python
#
# Communicates with the arduino and responds to changes in Office
# Communicator.  You can pass in an optional port, default is 8123.
#
# Examples:
#
#  server.py       # port 8123
#  server.py 8181  # port 8181
#

import BaseHTTPServer
import urlparse
import urllib
import string
import cgi
import time
import sys
import re
import os
from urlparse import urlparse

from common import *

# Routing regular expressions
STATUS_RE = re.compile('^\/StatusUpdate.*status=(\d+).*')
VALIDFILE_RE = re.compile('^\/index.html|^\/|\/.*\..js|\/.*\..png$')

def parse_url_args(url):
    p = urlparse(url)
    lst = [part.split('=') for part in p[4].split('&')]
    return {it[0]: it[1] for it in lst}

class MyHandler(BaseHTTPServer.BaseHTTPRequestHandler):

    def contentType(self,path):
        """
        Returns the Content-type for the full url path
        """
        if path.endswith('.html'):
            return 'text/html'
        if path.endswith('.js'):
            return 'text/javascript'
        if path.endswith('.png'):
            return 'image/png'

    def do_GET(self):
        path = self.path
        just_path = re.sub(r'\?.*','',path)
        if just_path == '/':
            path = re.sub(r'^\/','/index.html',just_path)
            just_path = path
        
        # Try to respond to a status update
        if re.match(STATUS_RE,path):
            args = parse_url_args(path)
            status = args.get('status')
            num = args.get('num')
            if status != None and num != None:
                self.send_response(200)
                serialSend(int(num))
                serialSend(int(status))
                return
            elif status != None:
                self.send_response(200)
                serialSend(int(status))
                return

        # Otherwise, just do the file
        if re.match(VALIDFILE_RE,path):
            ctype = self.contentType(path)
            if ctype is not None:
                fname = os.curdir + os.sep + path
                if os.path.exists(fname):
                    f = open(fname)
                    self.send_response(200)
                    self.send_header('Content-type',ctype)
                    self.end_headers()
                    self.wfile.write(f.read())
                    f.close()
                    return

        # Not found
        self.send_response(404)

def main(argv):

    # ALlow the user to pass in a port
    httpPort = 8123
    if len(argv) > 1:
        httpPort = int(argv[1])
    
    serialInit()
    try:
        server = BaseHTTPServer.HTTPServer(('', httpPort), MyHandler)
        print 'Started HTTP server on port %d' % httpPort
        server.serve_forever()
    except KeyboardInterrupt:
        print '^C received, shutting down server'
        server.socket.close()

if __name__ == '__main__':
    main(sys.argv)
