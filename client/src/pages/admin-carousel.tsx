import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Image, Eye, EyeOff } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Carousel, InsertCarousel } from "@shared/schema";
import ImageUpload from "@/components/ImageUpload";

interface CarouselFormData {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  buttonText: string;
  order: number;
  isActive: boolean;
  language: string;
}

const initialFormData: CarouselFormData = {
  title: "",
  subtitle: "",
  description: "",
  imageUrl: "",
  linkUrl: "",
  buttonText: "",
  order: 0,
  isActive: true,
  language: "eng"
};

export default function AdminCarousel() {
  const [formData, setFormData] = useState<CarouselFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: carousels = [], isLoading } = useQuery<Carousel[]>({
    queryKey: ["/api/carousels", selectedLanguage === "all" ? undefined : selectedLanguage],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedLanguage !== "all") params.append("language", selectedLanguage);
      params.append("limit", "50");
      
      const response = await fetch(`/api/carousels?${params}`);
      if (!response.ok) throw new Error("Failed to fetch carousels");
      const result = await response.json();
      return result.data || [];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertCarousel) => {
      return await apiRequest("/api/admin/carousels", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Carousel created successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/carousels"] });
      setFormData(initialFormData);
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertCarousel> }) => {
      return await apiRequest(`/api/admin/carousels/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Carousel updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/carousels"] });
      setEditingId(null);
      setFormData(initialFormData);
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/admin/carousels/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Carousel deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/carousels"] });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.imageUrl) {
      toast({ title: "Error", description: "Title and image URL are required", variant: "destructive" });
      return;
    }

    const submitData: InsertCarousel = {
      ...formData,
      order: Number(formData.order),
      language: formData.language as "eng" | "kor" | "jpn" | "esp"
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleEdit = (carousel: Carousel) => {
    setFormData({
      title: carousel.title,
      subtitle: carousel.subtitle || "",
      description: carousel.description || "",
      imageUrl: carousel.imageUrl,
      linkUrl: carousel.linkUrl || "",
      buttonText: carousel.buttonText || "",
      order: carousel.order || 0,
      isActive: carousel.isActive ?? true,
      language: carousel.language || "eng"
    });
    setEditingId(carousel.id);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this carousel item?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleInputChange = (field: keyof CarouselFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Carousel Management</h2>
        <p className="text-gray-600">Manage main page carousel slides</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Carousel Form */}
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Carousel" : "Add New Carousel"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={formData.language} 
                    onValueChange={(value) => handleInputChange("language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eng">English</SelectItem>
                      <SelectItem value="kor">Korean</SelectItem>
                      <SelectItem value="jpn">Japanese</SelectItem>
                      <SelectItem value="esp">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="order">Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => handleInputChange("order", parseInt(e.target.value) || 0)}
                    min={0}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Carousel title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => handleInputChange("subtitle", e.target.value)}
                  placeholder="Carousel subtitle"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Carousel description"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="imageUrl">Image URL *</Label>
                <div className="space-y-2">
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                    placeholder="https://example.com/image.jpg or select from local files"
                    required
                  />
                  <ImageUpload
                    category="common"
                    currentImage={formData.imageUrl}
                    onImageUpload={(imageUrl: string) => handleInputChange("imageUrl", imageUrl)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="linkUrl">Link URL</Label>
                <Input
                  id="linkUrl"
                  value={formData.linkUrl}
                  onChange={(e) => handleInputChange("linkUrl", e.target.value)}
                  placeholder="/page or https://example.com"
                />
              </div>

              <div>
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  value={formData.buttonText}
                  onChange={(e) => handleInputChange("buttonText", e.target.value)}
                  placeholder="Learn More"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex-1"
                >
                  {editingId ? "Update" : "Create"}
                </Button>
                {editingId && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      setFormData(initialFormData);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Carousel List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Carousel List</CardTitle>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="eng">English</SelectItem>
                  <SelectItem value="kor">Korean</SelectItem>
                  <SelectItem value="jpn">Japanese</SelectItem>
                  <SelectItem value="esp">Spanish</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            ) : carousels.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Image className="mx-auto h-12 w-12 mb-4" />
                <p>캐러셀 항목이 없습니다</p>
              </div>
            ) : (
              <div className="space-y-4">
                {carousels
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((carousel) => (
                    <motion.div
                      key={carousel.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold truncate">{carousel.title}</h3>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {carousel.language}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              #{carousel.order}
                            </span>
                            {carousel.isActive ? (
                              <Eye className="h-4 w-4 text-green-600" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                          {carousel.subtitle && (
                            <p className="text-sm text-gray-600 mb-1">{carousel.subtitle}</p>
                          )}
                          {carousel.description && (
                            <p className="text-xs text-gray-500 line-clamp-2">{carousel.description}</p>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(carousel)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(carousel.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {carousel.imageUrl && (
                        <div className="w-full h-20 bg-gray-100 rounded overflow-hidden">
                          <img 
                            src={carousel.imageUrl} 
                            alt={carousel.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}