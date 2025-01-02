# My PWA App

## Overview
This project is a Progressive Web App (PWA) that allows users to interact with their device's camera to scan QR codes and capture photos. It utilizes vanilla JavaScript, jQuery, and Bootstrap for a responsive design.

## Project Structure
```
my-pwa-app
├── src
│   ├── index.html          # Main HTML document
│   ├── app.js             # JavaScript logic for camera and QR code scanning
│   ├── styles.css         # Custom styles for the application
│   ├── js
│   │   └── html5-qrcode.min.js  # Library for QR code scanning
│   └── images             # Directory for storing images
├── manifest.json          # Metadata for the PWA
├── service-worker.js      # Service worker for offline capabilities
└── README.md              # Project documentation
```

## Features
- **QR Code Scanning**: Users can click a button to activate the device's rear camera and scan QR codes using the `html5-qrcode` library. The scanned information is rendered in a form.
- **Photo Capture**: Users can click a button to take photos with the device's rear camera, and the captured images are displayed in a form.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd my-pwa-app
   ```
3. Open `src/index.html` in a web browser to run the application.

## Usage
- Click the "Scan QR Code" button to open the camera and scan a QR code.
- Click the "Capture Photo" button to take a photo and display it in the form.

## License
This project is licensed under the MIT License.