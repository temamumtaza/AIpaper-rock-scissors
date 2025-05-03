#!/usr/bin/env python3
"""
Simple HTTP Server for the Paper-Rock-Scissors AI project.
This script starts a local web server to host the application.
"""

import http.server
import socketserver
import webbrowser
from pathlib import Path
import os

# Configuration
PORT = 8000
DIRECTORY = Path(__file__).parent.absolute()

class Handler(http.server.SimpleHTTPRequestHandler):
    """Custom handler to serve files from the current directory."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

def main():
    """Start the server and open the application in a web browser."""
    print(f"Starting server on port {PORT}...")
    
    # Change to the directory containing the server script
    os.chdir(DIRECTORY)
    
    # Create and start the HTTP server
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"Server running at: {url}")
        print("Opening the application in your default web browser...")
        
        # Open the application in the default web browser
        webbrowser.open(url)
        
        print("Press Ctrl+C to stop the server.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == "__main__":
    main()
