import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import toast from 'react-hot-toast';
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  category: "gallery" | "news" | "blog" | "products" | "common";
  currentImage?: string;
  className?: string;
}

export default function ImageUpload({ 
  onImageUpload, 
  category, 
  currentImage,
  className = "" 
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const { toast } = useToast(); // 이 줄 제거!

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file"); // react-hot-toast 방식
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("Please select an image smaller than 5MB"); // react-hot-toast 방식
      return;
    }

    await uploadImage(file);
  };

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Create local file URL for immediate use
      const localImageUrl = URL.createObjectURL(file);
      
      // Complete progress
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        // Use the local blob URL for immediate display
        onImageUpload(localImageUrl);
        setIsUploading(false);
        setUploadProgress(0);
        
        toast.success(`${file.name} ready for use in ${category} section`); // react-hot-toast 방식
      }, 500);

    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
      setUploadProgress(0);
      
      toast.error("Failed to upload image. Please try again."); // react-hot-toast 방식
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Current Image Preview */}
      {currentImage && (
        <div className="relative">
          <img
            src={currentImage}
            alt="Current"
            className="w-full h-32 object-cover rounded-lg border"
          />
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => onImageUpload('')}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Drag and Drop Upload Area */}
      <motion.div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200
          ${dragOver ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-300 hover:border-blue-400'}
          ${isUploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={triggerFileSelect}
        whileHover={{ scale: dragOver ? 1.05 : 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          className="hidden"
        />
        
        {isUploading ? (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 relative">
              <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-full h-full"></div>
              <Upload className="absolute inset-0 m-auto h-6 w-6 text-blue-600" />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700">
                Processing image for {category} folder...
              </div>
              <Progress value={uploadProgress} className="max-w-xs mx-auto" />
              <div className="text-xs text-gray-500">{uploadProgress}% complete</div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                dragOver ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <Upload className={`h-8 w-8 transition-colors ${
                  dragOver ? 'text-blue-600' : 'text-gray-400'
                }`} />
              </div>
              <div className={`text-lg font-medium transition-colors ${
                dragOver ? 'text-blue-700' : 'text-gray-900'
              }`}>
                {dragOver ? 'Drop your image here!' : 'Upload Image'}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Drag and drop your image here, or click to browse
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Supports JPG, PNG, GIF up to 5MB • Target: {category}/ folder
              </div>
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full transition-colors hover:bg-blue-50 hover:border-blue-400"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Choose File
            </Button>
          </div>
        )}
      </motion.div>

      {/* URL Input Alternative */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">or enter URL</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Input
          placeholder="https://example.com/image.jpg"
          value={currentImage?.startsWith('blob:') ? '' : currentImage || ''}
          onChange={(e) => onImageUpload(e.target.value)}
          className="flex-1"
        />
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => onImageUpload('')}
          disabled={!currentImage}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}