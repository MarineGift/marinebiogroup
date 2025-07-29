import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Folder, Image, Upload, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import ImageUpload from "./ImageUpload";

interface ImageItem {
  id: string;
  name: string;
  url: string;
  category: string;
  size: number;
  uploadedAt: string;
}

// Mock data for demonstration
const mockImages: ImageItem[] = [
  {
    id: "1",
    name: "marine-technology-1.jpg",
    url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
    category: "gallery",
    size: 245760,
    uploadedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2", 
    name: "ocean-research-lab.jpg",
    url: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3",
    category: "news",
    size: 189440,
    uploadedAt: "2024-01-14T15:20:00Z"
  },
  {
    id: "3",
    name: "marine-products-showcase.jpg", 
    url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca",
    category: "products",
    size: 312800,
    uploadedAt: "2024-01-13T09:45:00Z"
  },
  {
    id: "4",
    name: "blog-nano-fiber-research.jpg",
    url: "https://images.unsplash.com/photo-1576319155264-99536e0be1ee",
    category: "blog", 
    size: 156920,
    uploadedAt: "2024-01-12T14:10:00Z"
  },
  {
    id: "5",
    name: "company-logo.svg",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
    category: "common",
    size: 45120,
    uploadedAt: "2024-01-10T11:00:00Z"
  }
];

const categories = [
  { id: "all", name: "All Images", icon: Image },
  { id: "gallery", name: "Gallery", icon: Folder },
  { id: "news", name: "News", icon: Folder },
  { id: "blog", name: "Blog", icon: Folder },
  { id: "products", name: "Products", icon: Folder },
  { id: "common", name: "Common", icon: Folder }
];

export default function ImageManager() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const filteredImages = selectedCategory === "all" 
    ? mockImages 
    : mockImages.filter(img => img.category === selectedCategory);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleImageUpload = (imageUrl: string) => {
    console.log('New image uploaded:', imageUrl);
    setIsUploadDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Image Manager</h2>
          <p className="text-gray-600">Organize and manage images by category</p>
        </div>
        
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Upload New Image</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="gallery" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="blog">Blog</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="common">Common</TabsTrigger>
              </TabsList>
              {categories.slice(1).map(category => (
                <TabsContent key={category.id} value={category.id} className="mt-4">
                  <ImageUpload
                    category={category.id as any}
                    onImageUpload={handleImageUpload}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Folder Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const Icon = category.icon;
              const count = category.id === "all" 
                ? mockImages.length 
                : mockImages.filter(img => img.category === category.id).length;
              
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                  <Badge variant="secondary" className="text-xs">
                    {count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Images Grid */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedCategory === "all" ? "All Images" : `${categories.find(c => c.id === selectedCategory)?.name} Images`}
            <span className="text-sm text-gray-500 ml-2">({filteredImages.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div
                  className="aspect-square bg-gray-100 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={`${image.url}?auto=format&fit=crop&w=200&q=80`}
                    alt={image.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-2">
                  <h3 className="font-medium text-xs mb-1 truncate" title={image.name}>
                    {image.name}
                  </h3>
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline" className="text-xs">
                      {image.category}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatFileSize(image.size)}
                    </span>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedImage(image)}
                      className="flex-1 text-xs h-6"
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => console.log('Delete', image.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-6"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No images in this category</p>
              <Button 
                variant="outline" 
                className="mt-2"
                onClick={() => setIsUploadDialogOpen(true)}
              >
                Upload your first image
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Preview Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedImage.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                className="w-full max-h-96 object-contain rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Category:</strong> {selectedImage.category}
                </div>
                <div>
                  <strong>Size:</strong> {formatFileSize(selectedImage.size)}
                </div>
                <div>
                  <strong>Uploaded:</strong> {new Date(selectedImage.uploadedAt).toLocaleDateString()}
                </div>
                <div>
                  <strong>URL:</strong> 
                  <code className="text-xs bg-gray-100 px-1 rounded ml-1">
                    {selectedImage.url}
                  </code>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}