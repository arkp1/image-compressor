"use client";
import { Martian_Mono } from "next/font/google";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Footer from "../../Components/Footer";

const martianMono = Martian_Mono({
  subsets: ["latin"],
});

export default function Page() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [quality, setQuality] = useState(50);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleQuality = (value: number[]) => {
    setQuality(value[0]);
  };

  const handleCompress = async () => {
    if (!selectedFile) return;
    setIsCompressing(true);

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("quality", quality.toString());

    const res = await fetch("https://image-compressor-backend-0fvk.onrender.com/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Compression failed");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    setDownloadUrl(url);
    setIsCompressing(false);
  };

  const handleDownload = () => {
    if (!downloadUrl) return;

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "compressed.jpg";
    a.click();
    a.remove();
    window.URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 bg-[#6FA4AF] ${martianMono.className}`}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Compress It
        </h1>
        <p className="text-center text-gray-800 mb-6">
          <span className="text-xl">Make </span>
          <span className="text-lg ">your </span>
          <span className="text-sm">images </span>
          <span className="text-xs">small. </span>
        </p>
        <p className="text-center text-gray-700 mb-8">
          Drop your images here or click to upload
        </p>

        <div
          className={`border-4 border-dashed rounded-lg p-12 text-center transition-colors ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-700 hover:border-gray-500"
          }`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="fileInput"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          />
          <label htmlFor="fileInput" className="cursor-pointer">
            <div className="space-y-4">
              <svg
                className="mx-auto h-12 w-12 text-black"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-gray-800">
                {selectedFile
                  ? selectedFile.name
                  : "Drag and drop your image here"}
              </div>
            </div>
          </label>
        </div>

        <div className="mt-4 text-center justify-center items-center">
          <label htmlFor="quality-slider" className="block text-gray-800 p-3">
            Quality: {quality}%
          </label>
          <p className="mb-5 text-xs">Lesser the %, lesser the file size.</p>
          <Slider
            defaultValue={[quality]}
            max={100}
            min={1}
            step={1}
            className="w-50 h-2 mx-auto bg-lime-500 appearance-none rounded-full cursor-pointer"
            onValueChange={handleQuality}
          />
        </div>

        <div className="mt-6 text-center">
          <button
            className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            disabled={!selectedFile}
            onClick={handleCompress}
          >
            {isCompressing ? (<>Compressing<AiOutlineLoading3Quarters className="animate-spin inline-block ml-3" strokeWidth={5}/></>) : "Compress"}
          </button>
          {downloadUrl && !isCompressing && (
            <div className="mt-4 text-center">
              <button
                onClick={handleDownload}
                className="flex text-sm items-center justify-center mx-auto gap-2 bg-[#55AD9B] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors cursor-pointer"
              >
               <PiDownloadSimpleBold className="text-2xl" /> Download Compressed Image
              </button>
            </div>
          )}
        </div>
      </div>
        <Footer />
    </div>
  );
}
