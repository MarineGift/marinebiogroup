import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus, Eye, Image, Folder } from "lucide-react";
import { motion } from "framer-motion";
import ImageUpload from "@/components/ImageUpload";

// Site configuration hook
const useSiteConfig = () => {
  const { data: config } = useQuery({
    queryKey: ["/api/config"],
  });
  return config;
};

interface Gallery {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  language: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

export default function AdminGallery() {
  const { toast } = useToast();
  const siteConfig = useSiteConfig();
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Gallery | null>(null);
  const [selectedImage, setSelectedImage] = useState<Gallery | null>(null);
  const itemsPerPage = 10;

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "Content-Type": "application/json",
  });

  // Fetch gallery data
  const { data: galleryData, isLoading } = useQuery<PaginatedResponse<Gallery>>({
    queryKey: ["/api/gallery", currentPage],
    queryFn: () => apiRequest(`/api/gallery?page=${currentPage}&limit=${itemsPerPage}&language=eng`),
  });

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    thumbnailUrl: "",
    category: "",
    tags: "",
    language: "eng",
    status: "published"
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      thumbnailUrl: "",
      category: "",
      tags: "",
      language: "eng",
      status: "published"
    });
  };

  // Create gallery item
  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const tagsArray = data.tags.split(",").map((tag: string) => tag.trim()).filter(Boolean);
      return apiRequest("/api/admin/gallery", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          ...data,
          tags: tagsArray,
          site: "marinebiogroup"
        }),
      });
    },
    onSuccess: () => {
      toast({ title: "Gallery item created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      resetForm();
      setIsCreateDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Failed to create gallery item", variant: "destructive" });
    },
  });

  // Update gallery item
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const tagsArray = data.tags.split(",").map((tag: string) => tag.trim()).filter(Boolean);
      return apiRequest(`/api/admin/gallery/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({
          ...data,
          tags: tagsArray,
        }),
      });
    },
    onSuccess: () => {
      toast({ title: "Gallery item updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      setEditingItem(null);
      resetForm();
    },
    onError: () => {
      toast({ title: "Failed to update gallery item", variant: "destructive" });
    },
  });

  // Delete gallery item
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/admin/gallery/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
    },
    onSuccess: () => {
      toast({ title: "Gallery item deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
    },
    onError: () => {
      toast({ title: "Failed to delete gallery item", variant: "destructive" });
    },
  });

  const handleCreate = () => {
    createMutation.mutate(formData);
  };

  const handleUpdate = () => {
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: formData });
    }
  };

  const handleEdit = (item: Gallery) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      thumbnailUrl: item.thumbnailUrl,
      category: item.category,
      tags: item.tags.join(", "),
      language: item.language,
      status: item.status
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this gallery item?")) {
      deleteMutation.mutate(id);
    }
  };

  const totalPages = Math.ceil((galleryData?.total || 0) / itemsPerPage);

  const Pagination = () => (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, galleryData?.total || 0)} of {galleryData?.total || 0} items
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(current => Math.max(1, current - 1))}
          disabled={currentPage <= 1}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          {currentPage} / {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(current => current + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );

  const GalleryForm = ({ isEditing = false }: { isEditing?: boolean }) => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Title</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter gallery item title"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Enter description"
          rows={3}
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 flex items-center gap-2">
          <Folder className="w-4 h-4" />
          Gallery Image Upload
        </label>
        <ImageUpload
          category="gallery"
          currentImage={formData.imageUrl}
          onImageUpload={(imageUrl) => {
            setFormData(prev => ({ 
              ...prev, 
              imageUrl, 
              thumbnailUrl: imageUrl // Use same image for thumbnail
            }));
          }}
        />
        {formData.imageUrl && (
          <div className="mt-2">
            <Input
              value={formData.imageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="Or enter image URL manually"
              className="text-sm"
            />
          </div>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Category</label>
        <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Research">Research</SelectItem>
            <SelectItem value="Products">Products</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Environment">Environment</SelectItem>
            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
            <SelectItem value="Events">Events</SelectItem>
            <SelectItem value="Quality">Quality</SelectItem>
            <SelectItem value="Company">Company</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Awards">Awards</SelectItem>
            <SelectItem value="Conservation">Conservation</SelectItem>
            <SelectItem value="Logistics">Logistics</SelectItem>
            <SelectItem value="Customer">Customer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium">Tags (comma-separated)</label>
        <Input
          value={formData.tags}
          onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
          placeholder="marine, technology, research"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Status</label>
        <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          onClick={isEditing ? handleUpdate : handleCreate}
          disabled={createMutation.isPending || updateMutation.isPending}
          className="flex-1"
        >
          {(createMutation.isPending || updateMutation.isPending) ? "Saving..." : (isEditing ? "Update" : "Create")}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            resetForm();
            setEditingItem(null);
            setIsCreateDialogOpen(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gallery Management</h2>
          <p className="text-gray-600">Manage gallery images and information</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Gallery Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Gallery Item</DialogTitle>
            </DialogHeader>
            <GalleryForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Gallery Grid Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Gallery Items ({galleryData?.total || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading gallery items...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                {galleryData?.data.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div
                      className="aspect-video bg-gray-100 overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImage(item)}
                    >
                      <img
                        src={item.thumbnailUrl || item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    </div>
                    
                    <div className="p-3">
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">{item.title}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                        <Badge 
                          variant={item.status === 'published' ? 'default' : 'outline'}
                          className="text-xs"
                        >
                          {item.status}
                        </Badge>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedImage(item)}
                          className="flex-1 text-xs"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(item)}
                          className="flex-1 text-xs"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {galleryData && galleryData.data.length > 0 && <Pagination />}
              
              {!galleryData?.data.length && (
                <div className="text-center py-12">
                  <Image className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No gallery items found</p>
                  <p className="text-sm text-gray-400">Create your first gallery item to get started</p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Gallery Item</DialogTitle>
          </DialogHeader>
          <GalleryForm isEditing />
        </DialogContent>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full max-h-96 object-contain rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="space-y-2">
                <p className="text-gray-700">{selectedImage.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge>{selectedImage.category}</Badge>
                  {selectedImage.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}