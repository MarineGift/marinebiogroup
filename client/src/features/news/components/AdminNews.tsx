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
import type { News } from "@shared/schema";

interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

export default function AdminNews() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const itemsPerPage = 10;

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "Content-Type": "application/json",
  });

  // Fetch news
  const { data: newsData, isLoading } = useQuery<PaginatedResponse<News>>({
    queryKey: ["/api/admin/news", currentPage],
    queryFn: async () => {
      const response = await fetch(`/api/admin/news?page=${currentPage}&limit=${itemsPerPage}`, {
        headers: authHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch news");
      return response.json();
    },
  });

  // Create news mutation
  const createMutation = useMutation({
    mutationFn: async (newsData: any) => {
      return await apiRequest("/api/admin/news", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(newsData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      setIsCreateDialogOpen(false);
      toast({
        title: "Success",
        description: "News article created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create news article",
        variant: "destructive",
      });
    },
  });

  // Update news mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return await apiRequest(`/api/admin/news/${id}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      setIsEditDialogOpen(false);
      setSelectedNews(null);
      toast({
        title: "Success",
        description: "News article updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update news article",
        variant: "destructive",
      });
    },
  });

  // Delete news mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/admin/news/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      toast({
        title: "Success",
        description: "News article deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete news article",
        variant: "destructive",
      });
    },
  });

  const handleCreate = (formData: FormData) => {
    const newsData = {
      title: formData.get("title") as string,
      summary: formData.get("summary") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      imageUrl: formData.get("imageUrl") as string,
      status: formData.get("status") as string,
      language: "en",
      publishedAt: formData.get("status") === "published" ? new Date().toISOString() : null,
    };
    createMutation.mutate(newsData);
  };

  const handleUpdate = (formData: FormData) => {
    if (!selectedNews) return;
    
    const newsData = {
      title: formData.get("title") as string,
      summary: formData.get("summary") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      imageUrl: formData.get("imageUrl") as string,
      status: formData.get("status") as string,
      publishedAt: formData.get("status") === "published" ? new Date().toISOString() : selectedNews.publishedAt,
    };
    updateMutation.mutate({ id: selectedNews.id, data: newsData });
  };

  const handleEdit = (news: News) => {
    setSelectedNews(news);
    setIsEditDialogOpen(true);
  };

  const handleView = (news: News) => {
    setSelectedNews(news);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this news article?")) {
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

  const NewsForm = ({ news, onSubmit, submitText }: { 
    news?: News | null; 
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
          defaultValue={news?.title || ""}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          name="summary"
          defaultValue={news?.summary || ""}
          rows={2}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={news?.content || ""}
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
            defaultValue={news?.category || ""}
            required
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={news?.status || "draft"}>
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
          defaultValue={news?.imageUrl || ""}
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
        <CardTitle>News Management</CardTitle>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New News Article</DialogTitle>
            </DialogHeader>
            <NewsForm onSubmit={handleCreate} submitText="Create Article" />
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
                {newsData?.data.map((news) => (
                  <TableRow key={news.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{news.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{news.summary}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{news.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={news.status === "published" ? "default" : "secondary"}>
                        {news.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {news.publishedAt ? format(new Date(news.publishedAt), "PPp") : "Not published"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(news)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(news)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(news.id)}
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
            
            {newsData && (
              <Pagination
                total={newsData.total}
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
            <DialogTitle>Edit News Article</DialogTitle>
          </DialogHeader>
          <NewsForm 
            news={selectedNews} 
            onSubmit={handleUpdate} 
            submitText="Update Article" 
          />
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>News Article Details</DialogTitle>
          </DialogHeader>
          {selectedNews && (
            <div className="space-y-4">
              <div>
                <Label className="font-semibold">Title</Label>
                <p className="text-lg">{selectedNews.title}</p>
              </div>
              
              <div>
                <Label className="font-semibold">Summary</Label>
                <p>{selectedNews.summary}</p>
              </div>
              
              <div>
                <Label className="font-semibold">Content</Label>
                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded max-h-60 overflow-y-auto">
                  <p className="whitespace-pre-wrap">{selectedNews.content}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Category</Label>
                  <p>{selectedNews.category}</p>
                </div>
                <div>
                  <Label className="font-semibold">Status</Label>
                  <Badge variant={selectedNews.status === "published" ? "default" : "secondary"}>
                    {selectedNews.status}
                  </Badge>
                </div>
              </div>
              
              {selectedNews.imageUrl && (
                <div>
                  <Label className="font-semibold">Image</Label>
                  <img 
                    src={selectedNews.imageUrl} 
                    alt={selectedNews.title}
                    className="mt-2 max-w-full h-auto rounded"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div>
                  <Label className="font-semibold">Created</Label>
                  <p>{selectedNews.createdAt ? format(new Date(selectedNews.createdAt), "PPp") : "N/A"}</p>
                </div>
                <div>
                  <Label className="font-semibold">Published</Label>
                  <p>{selectedNews.publishedAt ? format(new Date(selectedNews.publishedAt), "PPp") : "Not published"}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}