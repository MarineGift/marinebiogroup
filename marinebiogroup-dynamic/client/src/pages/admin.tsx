import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Users, Mail, FileText, Image, Package, Settings, BarChart3, LogOut, Edit } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";
import type { Contact, Newsletter, BlogPost, News, Gallery } from "@shared/schema";
import AdminCarousel from "@/pages/admin-carousel";
import AdminGallery from "@/features/gallery/components/AdminGallery";
import AdminProducts from "@/features/products/components/AdminProducts";
import AdminBlog from "@/features/blog/components/AdminBlog";
import AdminNews from "@/features/news/components/AdminNews";
import AdminNewsletter from "@/features/admin/components/AdminNewsletter";
import ImageManager from "@/components/ImageManager";

interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

export default function Admin() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin-login");
    }
  }, [setLocation]);

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "Content-Type": "application/json",
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("/api/admin/logout", {
        method: "POST",
        headers: authHeaders(),
      });
    },
    onSuccess: () => {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      setLocation("/admin-login");
    },
  });

  // Data fetching queries
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
    queryFn: () => apiRequest("/api/admin/stats", {
      headers: authHeaders(),
    }),
  });

  const { data: contactsData, isLoading: contactsLoading } = useQuery<PaginatedResponse<Contact>>({
    queryKey: ["/api/admin/contacts", currentPage],
    queryFn: () => apiRequest(`/api/admin/contacts?page=${currentPage}&limit=${itemsPerPage}`, {
      headers: authHeaders(),
    }),
  });

  const { data: newslettersData, isLoading: newslettersLoading } = useQuery<Newsletter[]>({
    queryKey: ["/api/admin/newsletters"],
    queryFn: () => apiRequest("/api/admin/newsletters", {
      headers: authHeaders(),
    }),
  });

  const { data: blogData, isLoading: blogLoading } = useQuery<PaginatedResponse<BlogPost>>({
    queryKey: ["/api/blog", currentPage],
    queryFn: () => apiRequest(`/api/blog?page=${currentPage}&limit=${itemsPerPage}`),
  });

  const { data: newsData, isLoading: newsLoading } = useQuery<PaginatedResponse<News>>({
    queryKey: ["/api/news", currentPage],
    queryFn: () => apiRequest(`/api/news?page=${currentPage}&limit=${itemsPerPage}`),
  });

  const { data: galleryData, isLoading: galleryLoading } = useQuery<PaginatedResponse<Gallery>>({
    queryKey: ["/api/gallery", currentPage],
    queryFn: () => apiRequest(`/api/gallery?page=${currentPage}&limit=12`),
  });

  // Delete mutations
  const deleteBlogMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest(`/api/admin/blog/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
    },
    onSuccess: () => {
      toast({ title: "Blog post deleted successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
    },
  });

  const deleteNewsMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest(`/api/admin/news/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
    },
    onSuccess: () => {
      toast({ title: "News deleted successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
    },
  });

  const deleteGalleryMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest(`/api/admin/gallery/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
    },
    onSuccess: () => {
      toast({ title: "Gallery item deleted successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const stats = statsData || {
    totalContacts: 0,
    todayContacts: 0,
    totalNewsletters: 0,
    todayNewsletters: 0,
    totalBlogPosts: 0,
    todayBlogPosts: 0,
    totalNews: 0,
    todayNews: 0,
    totalGalleryItems: 0,
    todayGalleryItems: 0,
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Settings className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                MarineBioGroup Admin
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="carousel" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Carousel
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Images
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="newsletters" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Newsletter
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              News
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab("contacts")}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Contacts</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">({stats.todayContacts}/{stats.totalContacts})</div>
                    <p className="text-xs text-muted-foreground">
                      Today / Total
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab("newsletters")}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Newsletter</CardTitle>
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">({stats.todayNewsletters}/{stats.totalNewsletters})</div>
                    <p className="text-xs text-muted-foreground">
                      Today / Total
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab("blog")}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Blog</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">({stats.todayBlogPosts}/{stats.totalBlogPosts})</div>
                    <p className="text-xs text-muted-foreground">
                      Today / Total
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab("news")}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">News</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">({stats.todayNews}/{stats.totalNews})</div>
                    <p className="text-xs text-muted-foreground">
                      Today / Total
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab("gallery")}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Gallery</CardTitle>
                    <Image className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">({stats.todayGalleryItems}/{stats.totalGalleryItems})</div>
                    <p className="text-xs text-muted-foreground">
                      Today / Total
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab("products")}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Products</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">(0/4)</div>
                    <p className="text-xs text-muted-foreground">
                      Today / Total
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Carousel Tab */}
          <TabsContent value="carousel" className="space-y-6">
            <AdminCarousel />
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-6">
            <ImageManager />
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Management</CardTitle>
              </CardHeader>
              <CardContent>
                {contactsLoading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Inquiry Type</TableHead>
                          <TableHead>Language</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contactsData?.data.map((contact) => (
                          <TableRow key={contact.id}>
                            <TableCell>{contact.name}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{contact.inquiryType}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{contact.language}</Badge>
                            </TableCell>
                            <TableCell>
                              {contact.createdAt ? format(new Date(contact.createdAt), "PPp") : "N/A"}
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4" />
                                    View
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Contact Details</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="font-semibold">Name:</label>
                                        <p>{contact.name}</p>
                                      </div>
                                      <div>
                                        <label className="font-semibold">Email:</label>
                                        <p>{contact.email}</p>
                                      </div>
                                      <div>
                                        <label className="font-semibold">Site:</label>
                                        <p>{contact.site || "N/A"}</p>
                                      </div>
                                      <div>
                                        <label className="font-semibold">Inquiry Type:</label>
                                        <p>{contact.inquiryType}</p>
                                      </div>
                                      <div>
                                        <label className="font-semibold">Language:</label>
                                        <p>{contact.language}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="font-semibold">Message:</label>
                                      <p className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded">{contact.message}</p>
                                    </div>
                                    <div>
                                      <label className="font-semibold">Submitted:</label>
                                      <p>{contact.createdAt ? format(new Date(contact.createdAt), "PPpp") : "N/A"}</p>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {contactsData && (
                      <Pagination
                        total={contactsData.total}
                        current={currentPage}
                        onChange={setCurrentPage}
                      />
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Newsletters Tab */}
          <TabsContent value="newsletters" className="space-y-6">
            <AdminNewsletter />
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-6">
            <AdminBlog />
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-6">
            <AdminNews />
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <AdminGallery />
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <AdminProducts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}