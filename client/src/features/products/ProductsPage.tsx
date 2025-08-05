import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  Snowflake,
  Sparkles,
  Sun,
  Baby,
  Star,
  ThermometerSun,
  Zap,
  ArrowRight,
  Play,
  ShoppingCart,
  Youtube,
  Loader2
} from "lucide-react";
import type { Product } from "@shared/schema";

interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

export default function Products() {
  const { data: productsData, isLoading } = useQuery<PaginatedResponse<Product>>({
    queryKey: ["/api/products"],
  });

  const products = productsData?.data || [];
  const featuredProduct = products.find(p => p.name === "MarinePack");
  const otherProducts = products.filter(p => p.name !== "MarinePack");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-600">Available Now</Badge>;
      case "development":
        return <Badge className="bg-orange-600">In Development</Badge>;
      case "coming-soon":
        return <Badge className="bg-blue-600">Coming Soon</Badge>;
      default:
        return <Badge className="bg-gray-600">{status}</Badge>;
    }
  };

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6">Our Product Portfolio</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Innovative marine nano-fiber products revolutionizing beauty, hygiene, and lifestyle industries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Product - MarinePack */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : featuredProduct ? (
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Badge className="bg-white/20 text-white mb-4">Featured Product</Badge>
                  <h3 className="text-4xl font-bold mb-6">{featuredProduct.name}</h3>
                  <p className="text-xl mb-6 opacity-90">
                    {featuredProduct.shortDescription}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold">30+</div>
                      <div className="text-sm opacity-75">Minutes Usage</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">5°C</div>
                      <div className="text-sm opacity-75">Cooling Effect</div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center space-x-3">
                      <ThermometerSun className="text-blue-200 h-5 w-5" />
                      <span>Skin temperature cooling with seaweed extract</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Zap className="text-blue-200 h-5 w-5" />
                      <span>Detox: removes oil, fine dust, and heavy metals</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Sparkles className="text-blue-200 h-5 w-5" />
                      <span>Anti-aging with niacinamide and adenosine</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-3xl font-bold">{formatPrice(featuredProduct.price)}</span>
                    {featuredProduct.status === "published" && (
                      <Badge className="bg-green-500">In Stock ({featuredProduct.stock} available)</Badge>
                    )}
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo Video
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src={featuredProduct.imageUrl} 
                    alt={featuredProduct.name}
                    className="rounded-2xl shadow-2xl"
                  />
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600">Featured product not available</p>
            </div>
          )}
        </div>
      </section>

      {/* Celebrity Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Celebrity Endorsements</h2>
            <p className="text-xl text-gray-600">Trusted by Korean celebrities and beauty experts</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-blue-50">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <img 
                      src="https://pixabay.com/get/g9485680c08f73c02e3300b55141c856b7e246bf7449a4960333d593db6b428c89852fb56e6b9ec6f545d67608000ed0d892b053d265c190130df0040e8e691b1_1280.jpg" 
                      alt="Lee Si-Young, Korean celebrity"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">Lee Si-Young</h4>
                      <p className="text-gray-600 text-sm">Famous Korean Celebrity</p>
                      <div className="flex text-orange-400 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "The cooling effect is amazing! My skin temperature dropped by 2.3°C within 5 minutes of application. 
                    I've never experienced anything like this with traditional face masks."
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-green-50">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                      alt="Hye Rin, Korean idol celebrity"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">Hye Rin</h4>
                      <p className="text-gray-600 text-sm">Famous Korean Idol Celebrity</p>
                      <div className="flex text-orange-400 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "The detox effect is incredible. My skin feels cleaner and more refreshed than ever before. 
                    The marine technology really works to remove impurities."
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Products Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Product Line</h2>
            <p className="text-xl text-gray-600">Sustainable solutions for every need</p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 left-4">
                        {getStatusBadge(product.status)}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h4>
                      <p className="text-gray-600 mb-4">
                        {product.shortDescription}
                      </p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                        {product.stock > 0 && (
                          <Badge variant="outline">Stock: {product.stock}</Badge>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`font-semibold ${
                          product.status === "published" ? "text-green-600" :
                          product.status === "development" ? "text-orange-600" : "text-blue-600"
                        }`}>
                          {product.status === "published" ? "Available Now" :
                           product.status === "development" ? "In Development" : "Coming Soon"}
                        </span>
                        <Button variant="link" className="text-blue-600 p-0">
                          Learn More <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Marine Products?</h2>
            <p className="text-xl text-gray-600">Comparison with traditional products</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Traditional Products</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-600">500+ years to decompose</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-600">Contains microplastics</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-600">Environmental pollution</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-600">Synthetic chemicals</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-green-200 bg-green-50">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Marine Products</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">100% biodegradable</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Microplastic-free</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">CO2 capture during production</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Natural marine extracts</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Experience Marine Innovation</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Try our revolutionary marine nano-fiber products and join the sustainable beauty movement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Shop All Products
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Youtube className="mr-2 h-5 w-5" />
                Watch on YouTube
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
