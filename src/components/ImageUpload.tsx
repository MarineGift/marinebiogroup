"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
// import toast from 'react-hot-toast'; // 주석 처리
import { Upload, X, Image as ImageIcon } from "lucide-react";
// import { motion } from "framer-motion"; // 주석 처리

// 간단한 toast 대체 함수
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  console.log(`${type}: ${message}`);
  // 실제로는 alert 또는 다른 알림 방식 사용 가능
};

export default function ImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      showToast("Please select files to upload", 'error');
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // 업로드 시뮬레이션
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setProgress(i);
      }
      
      showToast("Images uploaded successfully!", 'success');
      setSelectedFiles([]);
    } catch (error) {
      showToast("Upload failed. Please try again.", 'error');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-4">
        <div className="text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            Upload Images
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>

        <div className="mt-4">
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <span className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80">
                    Click to upload
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
              </div>
            </div>
            <Input
              id="file-upload"
              type="file"
              className="sr-only"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
            />
          </label>
        </div>

        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Selected files:</h4>
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <span className="text-sm truncate">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {uploading && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-center text-gray-500">{progress}%</p>
          </div>
        )}

        <Button
          onClick={handleUpload}
          disabled={uploading || selectedFiles.length === 0}
          className="w-full"
        >
          {uploading ? "Uploading..." : "Upload Images"}
        </Button>
      </div>
    </div>
  );
}