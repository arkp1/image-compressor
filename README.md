Compress It - Image Compressor Web App

A full-stack web application for compressing images efficiently. This app allows users to upload images, compress them to reduce file size, and download the compressed versions. It supports lossy (JPEG) compression, with file size reductions of up to 90%.

Features:

Lossy (JPEG) Compression: Compress images with up to 90% reduction in size without significant loss of quality.

Full-stack Application: Built with a Next.js frontend and a Python Flask backend.

File Format Handling: Automatically compresses PNG, JPG, and JPEG files.

Fast Compression: Average processing time under 5 seconds for file sizes up to 50MB.

Technologies Used:

Frontend - Next.js, TypeScript, React

Backend - Python, Flask, Pillow

Image Processing - Pillow (for compressing images)

Deployment - Vercel (for the frontend) and custom backend hosting

How to Use

Go to the live app: [Compress It](https://compressit-puce.vercel.app/)

Click on the Upload button to select an image from your device.
:
Use the slider to select the desired compression quality (0 to 100). The lower the quality, the smaller the file size.

After the image is compressed, click the Download button to get the optimized file.

Running Locally
Prerequisites
- Python 3.7+

- Node.js 14+

Setup Frontend:

Clone the repository:
git clone https://github.com/arkp1/image-compressor.git
cd image-compressor/frontend

Install dependencies:
npm install

Run the development server:
npm run dev

Setup Backend:

Navigate to the backend folder:
cd backend

Install Python dependencies:
pip install -r requirements.txt

Run the Flask server:
python app.py
