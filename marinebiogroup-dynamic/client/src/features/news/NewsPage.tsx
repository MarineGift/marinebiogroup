import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { useLanguage } from "@/hooks/useLanguage";
import { Calendar, Search, Eye, TrendingUp } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  category: string;
  imageUrl?: string;
  views: number;
  featured: boolean;
  language: string;
}

export default function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { language } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ['/api/news', language, currentPage, searchTerm, selectedCategory],
    queryFn: () => 
      fetch(`/api/news?language=${language}&page=${currentPage}&limit=9&search=${searchTerm}&category=${selectedCategory}`)
        .then(res => res.json()),
  });

  const news = data?.data || [];
  const totalNews = data?.total || 0;
  const totalPages = Math.ceil(totalNews / 9);

  const categories = [
    "All",
    "Technology",
    "Research",
    "Product Launch",
    "Partnership",
    "Awards",
    "Sustainability"
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category === "All" ? "" : category);
    setCurrentPage(1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">Latest News</h1>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Stay updated with the latest developments in marine nano-fiber technology and company announcements
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 py-6 text-lg bg-white/10 border-white/20 text-white placeholder-white/60"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category || (category === "All" && !selectedCategory) ? "default" : "outline"}
                onClick={() => handleCategoryFilter(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No news found
              </h3>
              <p className="text-gray-600">
                {searchTerm 
                  ? `No news found for "${searchTerm}". Try a different search term.`
                  : "Check back soon for the latest news and updates."
                }
              </p>
            </div>
          ) : (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
              >
                {news.map((item: NewsItem) => (
                  <motion.div key={item.id} variants={itemVariants}>
                    <Card className="h-full group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      {item.imageUrl && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4 flex gap-2">
                            <Badge variant="secondary" className="bg-white/90">
                              {item.category}
                            </Badge>
                            {item.featured && (
                              <Badge className="bg-yellow-500">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(item.publishedAt), 'MMM dd, yyyy')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {item.views} views
                          </div>
                        </div>
                        
                        <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <p className="text-gray-600 line-clamp-3 mb-4">
                          {item.summary}
                        </p>
                        
                        <Button variant="ghost" size="sm" className="w-full group-hover:bg-blue-50">
                          Read Full Article
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        className="w-10"
                      >
                        {page}
                      </Button>
                    );
                  })}
                  
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}

              {/* Results Info */}
              <div className="text-center mt-8 text-gray-500">
                Showing {((currentPage - 1) * 9) + 1}-{Math.min(currentPage * 9, totalNews)} of {totalNews} news articles
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}