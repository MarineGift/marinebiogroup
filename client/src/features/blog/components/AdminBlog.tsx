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
import type { BlogPost } from "@shared/schema";

interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

export default function AdminBlog() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const itemsPerPage = 10;

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "Content-Type": "application/json",
  });

  // Fetch blog posts
  const { data: blogData, isLoading } = useQuery<PaginatedResponse<BlogPost>>({
    queryKey: ["/api/admin/blog", currentPage],
    queryFn: async () => {
      const response = await fetch(`/api/admin/blog?page=${currentPage}&limit=${itemsPerPage}`, {
        headers: authHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch blog posts");
      return response.json();
    },
  });

  // Create blog post mutation
  const createMutation = useMutation({
    mutationFn: async (postData: any) => {
      return await apiRequest("/api/admin/blog", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(postData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      setIsCreateDialogOpen(false);
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create blog post",
        variant: "destructive",
      });
    },
  });

  // Update blog post mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return await apiRequest(`/api/admin/blog/${id}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      setIsEditDialogOpen(false);
      setSelectedPost(null);
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update blog post",
        variant: "destructive",
      });
    },
  });

  // Delete blog post mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/admin/blog/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete blog post",
        variant: "destructive",
      });
    },
  });

  const handleCreate = (formData: FormData) => {
    const postData = {
      title: formData.get("title") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      imageUrl: formData.get("imageUrl") as string,
      status: formData.get("status") as string,
      language: "en",
      publishedAt: formData.get("status") === "published" ? new Date().toISOString() : null,
    };
    createMutation.mutate(postData);
  };

  const handleUpdate = (formData: FormData) => {
    if (!selectedPost) return;
    
    const postData = {
      title: formData.get("title") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      imageUrl: formData.get("imageUrl") as string,
      status: formData.get("status") as string,
      publishedAt: formData.get("status") === "published" ? new Date().toISOString() : selectedPost.publishedAt,
    };
    updateMutation.mutate({ id: selectedPost.id, data: postData });
  };

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setIsEditDialogOpen(true);
  };

  const handleView = (post: BlogPost) => {
    setSelectedPost(post);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
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

  const BlogForm = ({ post, onSubmit, submitText }: { 
    post?: BlogPost | null; 
    onSubmit: (formData: FormData) => void;
    submitText: string;
  }) => (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(new FormData(e.currentTarget));
    }} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={post?.title || ""}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          defaultValue={post?.excerpt || ""}
          rows={2}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={post?.content || ""}
          rows={6}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            defaultValue={post?.category || ""}
            required
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={post?.status || "draft"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
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
          defaultValue={post?.imageUrl || ""}
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
        <CardTitle>Blog Management</CardTitle>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
            </DialogHeader>
            <BlogForm onSubmit={handleCreate} submitText="Create Post" />
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
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogData?.data.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{post.excerpt}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{post.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={post.status === "published" ? "default" : "secondary"}>
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {post.publishedAt ? format(new Date(post.publishedAt), "PPp") : "Not published"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(post)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(post)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
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
            
            {blogData && (
              <Pagination
                total={blogData.total}
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
            <DialogTitle>Edit Blog Post</DialogTitle>
          </DialogHeader>
          <BlogForm 
            post={selectedPost} 
            onSubmit={handleUpdate} 
            submitText="Update Post" 
          />
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Blog Post Details</DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-4">
              <div>
                <Label className="font-semibold">Title</Label>
                <p className="text-lg">{selectedPost.title}</p>
              </div>
              
              <div>
                <Label className="font-semibold">Excerpt</Label>
                <p>{selectedPost.excerpt}</p>
              </div>
              
              <div>
                <Label className="font-semibold">Content</Label>
                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded max-h-60 overflow-y-auto">
                  <p className="whitespace-pre-wrap">{selectedPost.content}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Category</Label>
                  <p>{selectedPost.category}</p>
                </div>
                <div>
                  <Label className="font-semibold">Status</Label>
                  <Badge variant={selectedPost.status === "published" ? "default" : "secondary"}>
                    {selectedPost.status}
                  </Badge>
                </div>
              </div>
              
              {selectedPost.imageUrl && (
                <div>
                  <Label className="font-semibold">Image</Label>
                  <img 
                    src={selectedPost.imageUrl} 
                    alt={selectedPost.title}
                    className="mt-2 max-w-full h-auto rounded"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div>
                  <Label className="font-semibold">Created</Label>
                  <p>{selectedPost.createdAt ? format(new Date(selectedPost.createdAt), "PPp") : "N/A"}</p>
                </div>
                <div>
                  <Label className="font-semibold">Published</Label>
                  <p>{selectedPost.publishedAt ? format(new Date(selectedPost.publishedAt), "PPp") : "Not published"}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}