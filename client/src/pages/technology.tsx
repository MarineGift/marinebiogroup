import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  CheckCircle,
  Snowflake,
  Sparkles,
  Sun,
  Baby,
  FileText,
  ArrowRight,
  Beaker,
  Recycle
} from "lucide-react";

export default function Technology() {
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
            <h1 className="text-5xl font-bold mb-6">Marine Nano Fiber Technology</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Revolutionary nano-processing of natural marine materials creating high-performance, 100% biodegradable products
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technology Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Marine seaweed underwater showing natural fiber structure"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-gray-900">Marine Nano Fiber Overview</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our proprietary nano-processing technology transforms natural marine materials like seaweed 
                into high-performance, biodegradable fibers that outperform traditional synthetic materials 
                while being completely environmentally friendly.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-600 h-6 w-6" />
                  <span className="text-gray-700">100% biodegradable and eco-friendly</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-600 h-6 w-6" />
                  <span className="text-gray-700">Superior performance vs synthetic materials</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-600 h-6 w-6" />
                  <span className="text-gray-700">CO2 capture through seaweed cultivation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-600 h-6 w-6" />
                  <span className="text-gray-700">Patented nano-processing techniques</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Innovations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Innovations</h2>
            <p className="text-xl text-gray-600">Breakthrough products powered by marine nano-fiber technology</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-6">
                    <Snowflake className="text-white h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">MarinePack</h4>
                  <p className="text-gray-600 mb-4">
                    World's first seaweed nano-fiber face mask with cooling, detox, and anti-aging properties. 
                    Features patented hydrogel technology that retains essence and delivers targeted skincare benefits.
                  </p>
                  <div className="space-y-2">
                    <Badge className="bg-orange-100 text-orange-600 mr-2">Patented</Badge>
                    <Badge className="bg-green-100 text-green-600">Hydrogel Technology</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-700 rounded-full flex items-center justify-center mb-6">
                    <Sparkles className="text-white h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Marine Cream Bar</h4>
                  <p className="text-gray-600 mb-4">
                    All-in-one seaweed soap combining cleansing and skin nourishment in one product. 
                    Completely biodegradable and skin-friendly formulation.
                  </p>
                  <div className="space-y-2">
                    <Badge className="bg-green-100 text-green-600 mr-2">Eco-Friendly</Badge>
                    <Badge className="bg-blue-100 text-blue-600">Biodegradable</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full flex items-center justify-center mb-6">
                    <Sun className="text-white h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Marine Sun Protect</h4>
                  <p className="text-gray-600 mb-4">
                    Inorganic sunscreen with seaweed extract for enhanced skin protection, cooling effect, 
                    and reduced white cast. Currently under testing for improved adhesion.
                  </p>
                  <div className="space-y-2">
                    <Badge className="bg-orange-100 text-orange-600 mr-2">In Development</Badge>
                    <Badge className="bg-blue-100 text-blue-600">Cooling Effect</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="md:col-span-2 lg:col-span-1"
            >
              <Card className="h-full hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center mb-6">
                    <Baby className="text-white h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Bio-SA Polymer</h4>
                  <p className="text-gray-600 mb-4">
                    100% biodegradable super absorbent polymer for diapers and sanitary pads. 
                    Microplastic-free and safe for health, can even be used as fertilizer after use.
                  </p>
                  <div className="space-y-2">
                    <Badge className="bg-green-100 text-green-600 mr-2">Microplastic-Free</Badge>
                    <Badge className="bg-orange-100 text-orange-600">Health Safe</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <Card className="h-full hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center mb-6">
                    <FileText className="text-white h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">FCC Technology</h4>
                  <p className="text-gray-600 mb-4">
                    Flexible Calcium Carbonate technology reduces wood pulp use in paper manufacturing by up to 30%, 
                    significantly cutting costs while maintaining quality and reducing environmental impact.
                  </p>
                  <div className="space-y-2">
                    <Badge className="bg-green-100 text-green-600 mr-2">Cost Effective</Badge>
                    <Badge className="bg-blue-100 text-blue-600">Sustainable</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sustainability Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sustainability Impact</h2>
            <p className="text-xl text-gray-600">Environmental benefits of marine nano-fiber technology</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Recycle className="text-white h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">100% Biodegradable</h4>
                  <p className="text-gray-600">
                    Our products completely decompose, eliminating microplastic pollution that 
                    takes 500+ years to break down in traditional synthetic materials.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Beaker className="text-white h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">CO2 Capture</h4>
                  <p className="text-gray-600">
                    Seaweed cultivation captures CO2 at 1.63x production quantity, contributing 
                    to climate change mitigation while producing our raw materials.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-white h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">UN SDG Alignment</h4>
                  <p className="text-gray-600">
                    Creating jobs in developing countries while preventing global warming 
                    through sustainable innovation and responsible manufacturing.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500" 
                alt="Ocean conservation environment showing marine life and clean waters"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Patents Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-xl text-gray-600">Comprehensive patent protection for our innovations</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-white h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-gray-600 text-sm">Total Patents</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Beaker className="text-white h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900">30+</div>
              <div className="text-gray-600 text-sm">Marine Materials</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Snowflake className="text-white h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900">PCT</div>
              <div className="text-gray-600 text-sm">MarinePack Patent</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Baby className="text-white h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900">Bio-SA</div>
              <div className="text-gray-600 text-sm">Patented Technology</div>
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
            <h2 className="text-4xl font-bold mb-6">Explore Our Patent Portfolio</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Learn more about our innovative technologies and how they can benefit your industry
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  View Our Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Learn About Patents
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
