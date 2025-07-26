import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  language: string;
  createdAt: string;
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [language] = useState<string>("en");
  const itemsPerPage = 12;
  
  const { data: galleryData, isLoading } = useQuery<{ data: GalleryItem[], total: number }>({
    queryKey: ["/api/gallery", language, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (language !== "en") params.append("lang", language);
      params.append("page", currentPage.toString());
      params.append("limit", itemsPerPage.toString());
      
      const response = await fetch(`/api/gallery?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch gallery");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-blue-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const gallery = galleryData?.data || [];
  const totalItems = galleryData?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const categories = Array.from(new Set(gallery.map(item => item.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-blue-900">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Marine Technology
              <span className="text-blue-600 dark:text-blue-400"> Gallery</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our cutting-edge marine nano-fiber research, laboratory processes, 
              and innovative product development through our comprehensive visual gallery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="text-sm py-2 px-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900">
              All Categories
            </Badge>
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant="outline" 
                className="text-sm py-2 px-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gallery?.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative">
                        <img
                          src={item.thumbnailUrl || item.imageUrl}
                          alt={item.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                        <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
                          {item.category}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {item.tags?.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                      <div>
                        <Badge className="mb-3">{item.category}</Badge>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          {item.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags?.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} images
            </p>
            
            {totalPages > 1 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-10 h-10"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}