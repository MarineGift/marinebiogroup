import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";
import { Plus, Edit, Trash2, Eye, Mail } from "lucide-react";
import type { Newsletter } from "@shared/schema";

interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

export default function AdminNewsletter() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const itemsPerPage = 10;

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "Content-Type": "application/json",
  });

  // Fetch newsletters
  const { data: newsletterData, isLoading } = useQuery<PaginatedResponse<Newsletter>>({
    queryKey: ["/api/admin/newsletters", currentPage],
    queryFn: async () => {
      const response = await fetch(`/api/admin/newsletters?page=${currentPage}&limit=${itemsPerPage}`, {
        headers: authHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch newsletters");
      return response.json();
    },
  });

  // Create newsletter subscription mutation
  const createMutation = useMutation({
    mutationFn: async (newsletterData: any) => {
      return await apiRequest("/api/admin/newsletters", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(newsletterData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/newsletters"] });
      setIsCreateDialogOpen(false);
      toast({
        title: "Success",
        description: "Newsletter subscription created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create newsletter subscription",
        variant: "destructive",
      });
    },
  });

  // Update newsletter subscription mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return await apiRequest(`/api/admin/newsletters/${id}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/newsletters"] });
      setIsEditDialogOpen(false);
      setSelectedNewsletter(null);
      toast({
        title: "Success",
        description: "Newsletter subscription updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update newsletter subscription",
        variant: "destructive",
      });
    },
  });

  // Delete newsletter subscription mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/admin/newsletters/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/newsletters"] });
      toast({
        title: "Success",
        description: "Newsletter subscription deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete newsletter subscription",
        variant: "destructive",
      });
    },
  });

  const handleCreate = (formData: FormData) => {
    const newsletterData = {
      email: formData.get("email") as string,
      language: formData.get("language") as string,
      site: "marinebiogroup",
      subscribedAt: new Date().toISOString(),
    };
    createMutation.mutate(newsletterData);
  };

  const handleUpdate = (formData: FormData) => {
    if (!selectedNewsletter) return;
    
    const newsletterData = {
      email: formData.get("email") as string,
      language: formData.get("language") as string,
    };
    updateMutation.mutate({ id: selectedNewsletter.id, data: newsletterData });
  };

  const handleEdit = (newsletter: Newsletter) => {
    setSelectedNewsletter(newsletter);
    setIsEditDialogOpen(true);
  };

  const handleView = (newsletter: Newsletter) => {
    setSelectedNewsletter(newsletter);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this newsletter subscription?")) {
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

  const NewsletterForm = ({ newsletter, onSubmit, submitText }: { 
    newsletter?: Newsletter | null; 
    onSubmit: (formData: FormData) => void;
    submitText: string;
  }) => (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(new FormData(e.currentTarget));
    }} className="space-y-4">
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={newsletter?.email || ""}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="language">Language</Label>
        <Select name="language" defaultValue={newsletter?.language || "en"}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ko">Korean</SelectItem>
            <SelectItem value="ja">Japanese</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
          </SelectContent>
        </Select>
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
        <CardTitle>Newsletter Management</CardTitle>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Subscriber
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Newsletter Subscriber</DialogTitle>
            </DialogHeader>
            <NewsletterForm onSubmit={handleCreate} submitText="Add Subscriber" />
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
                  <TableHead>Email</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Subscribed Date</TableHead>
                  <TableHead>Site</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newsletterData?.data.map((newsletter) => (
                  <TableRow key={newsletter.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        {newsletter.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{newsletter.language}</Badge>
                    </TableCell>
                    <TableCell>
                      {newsletter.subscribedAt ? format(new Date(newsletter.subscribedAt), "PPp") : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{newsletter.site}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(newsletter)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(newsletter)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(newsletter.id)}
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
            
            {newsletterData && (
              <Pagination
                total={newsletterData.total}
                current={currentPage}
                onChange={setCurrentPage}
              />
            )}
          </>
        )}
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Newsletter Subscription</DialogTitle>
          </DialogHeader>
          <NewsletterForm 
            newsletter={selectedNewsletter} 
            onSubmit={handleUpdate} 
            submitText="Update Subscription" 
          />
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Newsletter Subscription Details</DialogTitle>
          </DialogHeader>
          {selectedNewsletter && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" />
                <div>
                  <Label className="font-semibold">Email Address</Label>
                  <p className="text-lg">{selectedNewsletter.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Language</Label>
                  <Badge variant="secondary" className="mt-1">
                    {selectedNewsletter.language}
                  </Badge>
                </div>
                <div>
                  <Label className="font-semibold">Site</Label>
                  <Badge variant="outline" className="mt-1">
                    {selectedNewsletter.site}
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label className="font-semibold">Subscription Date</Label>
                <p>{selectedNewsletter.subscribedAt ? format(new Date(selectedNewsletter.subscribedAt), "PPpp") : "N/A"}</p>
              </div>
              
              <div className="text-sm text-gray-500">
                <Label className="font-semibold">Subscriber ID</Label>
                <p className="font-mono">{selectedNewsletter.id}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}