import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import type { Product } from "@shared/schema";

interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

export default function AdminProducts() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const itemsPerPage = 10;

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "Content-Type": "application/json",
  });

  // Fetch products
  const { data: productsData, isLoading } = useQuery<PaginatedResponse<Product>>({
    queryKey: ["/api/admin/products", currentPage],
    queryFn: async () => {
      const response = await fetch(`/api/admin/products?page=${currentPage}&limit=${itemsPerPage}`, {
        headers: authHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
  });

  // Create product mutation
  const createMutation = useMutation({
    mutationFn: async (productData: any) => {
      return await apiRequest("/api/admin/products", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(productData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      setIsCreateDialogOpen(false);
      toast({
        title: "Success",
        description: "Product created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create product",
        variant: "destructive",
      });
    },
  });

  // Update product mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return await apiRequest(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      setIsEditDialogOpen(false);
      setSelectedProduct(null);
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update product",
        variant: "destructive",
      });
    },
  });

  // Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/admin/products/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete product",
        variant: "destructive",
      });
    },
  });

  const handleCreate = (formData: FormData) => {
    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      shortDescription: formData.get("shortDescription") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      imageUrl: formData.get("imageUrl") as string,
      tags: (formData.get("tags") as string).split(",").map(tag => tag.trim()),
      language: "en",
      status: formData.get("status") as string,
      stock: parseInt(formData.get("stock") as string) || 0,
      sku: formData.get("sku") as string,
      weight: parseFloat(formData.get("weight") as string) || 0,
    };
    createMutation.mutate(productData);
  };

  const handleUpdate = (formData: FormData) => {
    if (!selectedProduct) return;
    
    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      shortDescription: formData.get("shortDescription") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      imageUrl: formData.get("imageUrl") as string,
      tags: (formData.get("tags") as string).split(",").map(tag => tag.trim()),
      status: formData.get("status") as string,
      stock: parseInt(formData.get("stock") as string) || 0,
      sku: formData.get("sku") as string,
      weight: parseFloat(formData.get("weight") as string) || 0,
    };
    updateMutation.mutate({ id: selectedProduct.id, data: productData });
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id);
    }
  };

  const Pagination = ({ total, current, onChange }: { total: number; current: number; onChange: (page: number) => void }) => {
    const totalPages = Math.ceil(total / itemsPerPage);
    
    return (
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Showing {Math.min((current - 1) * itemsPerPage + 1, total)}-{Math.min(current * itemsPerPage, total)} of {total} items
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onChange(current - 1)}
            disabled={current === 1}
          >
            Previous
          </Button>
          <span className="px-3 py-1 text-sm">
            {current} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onChange(current + 1)}
            disabled={current >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    );
  };

  const ProductForm = ({ product, onSubmit, submitText }: { 
    product?: Product | null; 
    onSubmit: (formData: FormData) => void;
    submitText: string;
  }) => (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(new FormData(e.currentTarget));
    }} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={product?.name || ""}
            required
          />
        </div>
        <div>
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            name="sku"
            defaultValue={product?.sku || ""}
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="shortDescription">Short Description</Label>
        <Input
          id="shortDescription"
          name="shortDescription"
          defaultValue={product?.shortDescription || ""}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description || ""}
          rows={3}
          required
        />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            defaultValue={product?.price || ""}
            required
          />
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            defaultValue={product?.stock || 0}
          />
        </div>
        <div>
          <Label htmlFor="weight">Weight (g)</Label>
          <Input
            id="weight"
            name="weight"
            type="number"
            step="0.1"
            defaultValue={product?.weight || ""}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            defaultValue={product?.category || ""}
            required
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={product?.status || "published"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="coming-soon">Coming Soon</SelectItem>
              <SelectItem value="discontinued">Discontinued</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="url"
          defaultValue={product?.imageUrl || ""}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          name="tags"
          defaultValue={product?.tags?.join(", ") || ""}
          placeholder="tag1, tag2, tag3"
        />
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
          {submitText}
        </Button>
      </div>
    </form>
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Products Management</CardTitle>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Product</DialogTitle>
            </DialogHeader>
            <ProductForm onSubmit={handleCreate} submitText="Create Product" />
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productsData?.data.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.sku}</div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${(product.price / 100).toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge variant={
                        product.status === "published" ? "default" :
                        product.status === "development" ? "secondary" :
                        product.status === "coming-soon" ? "outline" : "destructive"
                      }>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {product.createdAt ? format(new Date(product.createdAt), "PPp") : "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(product)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {productsData && (
              <Pagination
                total={productsData.total}
                current={currentPage}
                onChange={setCurrentPage}
              />
            )}
          </>
        )}
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm 
            product={selectedProduct} 
            onSubmit={handleUpdate} 
            submitText="Update Product" 
          />
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <img 
                  src={selectedProduct.imageUrl} 
                  alt={selectedProduct.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
                  <p className="text-sm text-gray-500">SKU: {selectedProduct.sku}</p>
                  <Badge variant={
                    selectedProduct.status === "published" ? "default" :
                    selectedProduct.status === "development" ? "secondary" :
                    selectedProduct.status === "coming-soon" ? "outline" : "destructive"
                  }>
                    {selectedProduct.status}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Price</Label>
                  <p>${(selectedProduct.price / 100).toFixed(2)}</p>
                </div>
                <div>
                  <Label className="font-semibold">Stock</Label>
                  <p>{selectedProduct.stock}</p>
                </div>
                <div>
                  <Label className="font-semibold">Category</Label>
                  <p>{selectedProduct.category}</p>
                </div>
                <div>
                  <Label className="font-semibold">Weight</Label>
                  <p>{selectedProduct.weight}g</p>
                </div>
              </div>
              
              <div>
                <Label className="font-semibold">Short Description</Label>
                <p>{selectedProduct.shortDescription}</p>
              </div>
              
              <div>
                <Label className="font-semibold">Description</Label>
                <p>{selectedProduct.description}</p>
              </div>
              
              {selectedProduct.tags && selectedProduct.tags.length > 0 && (
                <div>
                  <Label className="font-semibold">Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedProduct.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div>
                  <Label className="font-semibold">Created</Label>
                  <p>{selectedProduct.createdAt ? format(new Date(selectedProduct.createdAt), "PPp") : "N/A"}</p>
                </div>
                <div>
                  <Label className="font-semibold">Updated</Label>
                  <p>{selectedProduct.updatedAt ? format(new Date(selectedProduct.updatedAt), "PPp") : "N/A"}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}