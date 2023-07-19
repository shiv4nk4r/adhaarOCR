# adhaarOCR

This is a Node.js backend application that uses Tesseract OCR (Optical Character Recognition) for text extraction from images. It demonstrates how to set up the project, install dependencies, and run the server.

## Prerequisites

Before running the application, ensure you have the following installed on your system:

- Node.js: Make sure you have Node.js installed. You can download it from [https://nodejs.org](https://nodejs.org).

## Installation

Follow these steps to get the application up and running:

1. Clone this repository to your local machine:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd my-nodejs-backend-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   npm install tesseract
   ```

## Starting the Server

To start the backend server, run the following command:

```bash
npm start
```

The server will start running at the specified port (default is `3000`). It will expose endpoints to interact with the Tesseract OCR functionality, allowing you to send images and receive extracted text in response.
