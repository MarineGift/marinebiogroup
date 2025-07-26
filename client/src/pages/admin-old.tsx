import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  Users, 
  Mail, 
  FileText, 
  Image, 
  Package, 
  MessageSquare,
  TrendingUp,
  Globe,
  Plus,
  Edit,
  Trash2
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  language: string;
  createdAt: string;
}

interface Newsletter {
  id: string;
  email: string;
  language: string;
  subscribedAt: string;
}

export default function Admin() {
  const { data: contacts, isLoading: contactsLoading } = useQuery<Contact[]>({
    queryKey: ["/api/admin/contacts"],
  });

  const { data: newsletters, isLoading: newslettersLoading } = useQuery<Newsletter[]>({
    queryKey: ["/api/admin/newsletters"],
  });

  const { data: blog } = useQuery({
    queryKey: ["/api/blog"],
  });

  const { data: news } = useQuery({
    queryKey: ["/api/news"],
  });

  const { data: gallery } = useQuery({
    queryKey: ["/api/gallery"],
  });

  const { data: products } = useQuery({
    queryKey: ["/api/products"],
  });

  const stats = [
    {
      title: "Total Contacts",
      value: contacts?.length || 0,
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Newsletter Subscribers",
      value: newsletters?.length || 0,
      icon: Mail,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Blog Posts",
      value: blog?.length || 0,
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      title: "News Articles",
      value: news?.length || 0,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      title: "Gallery Items",
      value: gallery?.length || 0,
      icon: Image,
      color: "text-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20"
    },
    {
      title: "Products",
      value: products?.length || 0,
      icon: Package,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      {/* Header */}
      <div className="border-b bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your MarineBioGroup website content and monitor user interactions
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.bgColor}`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Tabs defaultValue="contacts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="newsletters">Newsletters</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
            </TabsList>

            {/* Contacts Tab */}
            <TabsContent value="contacts">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Contact Submissions
                  </CardTitle>
                  <Badge variant="secondary">{contacts?.length || 0} total</Badge>
                </CardHeader>
                <CardContent>
                  {contactsLoading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-20 w-full" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {contacts?.map((contact) => (
                        <div
                          key={contact.id}
                          className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {contact.name}
                            </h3>
                            <div className="flex gap-2">
                              <Badge variant="outline">{contact.language}</Badge>
                              <Badge>{contact.inquiryType}</Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {contact.email}
                          </p>
                          <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">
                            {contact.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(contact.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Newsletters Tab */}
            <TabsContent value="newsletters">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Newsletter Subscribers
                  </CardTitle>
                  <Badge variant="secondary">{newsletters?.length || 0} subscribers</Badge>
                </CardHeader>
                <CardContent>
                  {newslettersLoading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {newsletters?.map((newsletter) => (
                        <div
                          key={newsletter.id}
                          className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {newsletter.email}
                            </p>
                            <Badge variant="outline">{newsletter.language}</Badge>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Subscribed: {new Date(newsletter.subscribedAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Blog Tab */}
            <TabsContent value="blog">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Blog Posts Management
                  </CardTitle>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Post
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Blog management interface coming soon...
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* News Tab */}
            <TabsContent value="news">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    News Management
                  </CardTitle>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add News Article
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    News management interface coming soon...
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Image className="w-5 h-5" />
                    Gallery Management
                  </CardTitle>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Gallery management interface coming soon...
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Products Management
                  </CardTitle>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Product management interface coming soon...
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}