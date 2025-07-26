import { motion } from "framer-motion";
import Carousel from "@/components/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { 
  Leaf, 
  Microscope, 
  Factory, 
  Award, 
  Users, 
  Globe,
  Snowflake,
  Sparkles,
  Sun,
  Baby,
  FileText,
  ArrowRight
} from "lucide-react";

export default function Home() {
  const { language } = useLanguage();
  const { data: siteConfig } = useSiteConfig();
  
  const companyName = siteConfig?.companyName || "MarineBioGroup";
  const siteName = siteConfig?.siteName || "marinebiogroup";
  const supportEmail = siteConfig?.supportEmail || "support@marinebiogroup.com";
  
  return (
    <div className="pt-16">
      {/* Main Carousel */}
      <section className="mb-16">
        <Carousel language={language} autoplay={true} autoplayInterval={6000} />
      </section>
      
      {/* About Preview Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About {companyName}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading the revolution in sustainable marine nano-fiber technology for a healthier planet
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Sustainable technology laboratory with marine research equipment"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To create sustainable beauty and lifestyle products using marine nano-fiber technology, 
                  contributing to a healthier planet through innovative, 100% biodegradable solutions.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To lead the global market in eco-friendly, biodegradable products inspired by the ocean, 
                  revolutionizing industries from cosmetics to hygiene products.
                </p>
              </div>
              <Link href="/about">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Preview */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Innovation Portfolio</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionary marine nano-fiber technologies creating sustainable solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Snowflake,
                title: "MarinePack",
                description: "World's first seaweed nano-fiber face mask with cooling and anti-aging properties",
                badge: "Patented",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Sparkles,
                title: "Marine Cream Bar",
                description: "All-in-one seaweed soap for cleansing and skin nourishment",
                badge: "Eco-Friendly",
                color: "from-green-500 to-green-600"
              },
              {
                icon: Sun,
                title: "Marine Sun Protect",
                description: "Inorganic sunscreen with seaweed extract for enhanced protection",
                badge: "In Development",
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: Baby,
                title: "Bio-SA Polymer",
                description: "100% biodegradable super absorbent polymer for hygiene products",
                badge: "Health Safe",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: FileText,
                title: "FCC Technology",
                description: "Reduces wood pulp use in paper manufacturing",
                badge: "Cost Effective",
                color: "from-emerald-500 to-emerald-600"
              }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${tech.color} rounded-full flex items-center justify-center mb-6`}>
                      <tech.icon className="text-white h-8 w-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{tech.title}</h4>
                    <p className="text-gray-600 mb-4">{tech.description}</p>
                    <Badge variant="secondary">{tech.badge}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/technology">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Microscope className="mr-2 h-5 w-5" />
                Explore Our Technology
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Leadership Highlight */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
                  alt="Dr. Yung-bum Seo, CTO"
                  className="w-64 h-64 rounded-full mx-auto object-cover border-4 border-white shadow-xl"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Dr. Yung-bum Seo, CTO</h3>
                <p className="text-gray-700 text-lg mb-6">Ph.D. in Paper Engineering</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">200+</div>
                    <div className="text-sm text-gray-600">Research Papers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">50+</div>
                    <div className="text-sm text-gray-600">SCI Papers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">50+</div>
                    <div className="text-sm text-gray-600">Total Patents</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-800">30+</div>
                    <div className="text-sm text-gray-600">Marine Patents</div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Leading researcher in marine nano-fiber technology with extensive experience 
                  in sustainable materials and innovative product development.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Milestones</h2>
            <p className="text-xl text-gray-600">Recognition and achievements in marine technology</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: "World First",
                description: "Marine pulp used in paper manufacturing",
                color: "bg-blue-600"
              },
              {
                icon: Factory,
                title: "Innovation",
                description: "All-natural HEPA filters development",
                color: "bg-green-600"
              },
              {
                icon: Award,
                title: "Recognition",
                description: "Daimler AG Mercedes vendor acceptance (2020)",
                color: "bg-orange-600"
              },
              {
                icon: Globe,
                title: "UN SDGs",
                description: "Contributing to global sustainability goals",
                color: "bg-blue-800"
              }
            ].map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 ${milestone.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <milestone.icon className="text-white h-8 w-8" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{milestone.title}</h4>
                    <p className="text-gray-600 text-sm">{milestone.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Join the Marine Revolution?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Discover how {companyName} marine nano-fiber technology can transform your industry 
              with sustainable, biodegradable solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  <Leaf className="mr-2 h-5 w-5" />
                  Explore Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Users className="mr-2 h-5 w-5" />
                  Partner With Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
