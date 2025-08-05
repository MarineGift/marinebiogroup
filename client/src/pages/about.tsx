import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Leaf, 
  Factory, 
  Award, 
  Globe,
  Users,
  ArrowRight
} from "lucide-react";

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6">About MarineBioGroup</h1>
            <p className="text-xl max-w-3xl mx-auto">
              World's first pioneer of marine nano-fiber technology, revolutionizing sustainable beauty and lifestyle products
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership</h2>
            <p className="text-xl text-gray-600">Expert leadership driving marine technology innovation</p>
          </motion.div>

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
                  in sustainable materials and innovative product development. Dr. Seo's groundbreaking 
                  work has established MarineBioGroup as the world's first pioneer in marine nano-fiber applications.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Milestones</h2>
            <p className="text-xl text-gray-600">Our journey of innovation and recognition</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: "World First",
                description: "Marine pulp used in paper manufacturing",
                year: "2018",
                color: "bg-blue-600"
              },
              {
                icon: Factory,
                title: "Innovation",
                description: "All-natural HEPA filters development",
                year: "2019",
                color: "bg-green-600"
              },
              {
                icon: Award,
                title: "Recognition",
                description: "Daimler AG Mercedes vendor acceptance",
                year: "2020",
                color: "bg-orange-600"
              },
              {
                icon: Globe,
                title: "UN SDGs",
                description: "Contributing to global sustainability goals",
                year: "2023",
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
                    <div className="text-sm text-gray-500 mb-2">{milestone.year}</div>
                    <h4 className="font-bold text-gray-900 mb-2">{milestone.title}</h4>
                    <p className="text-gray-600 text-sm">{milestone.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications & Recognition</h2>
            <p className="text-xl text-gray-600">Official recognition from government and industry leaders</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center">
                      <Award className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Korean Government Recognition</h4>
                      <p className="text-gray-600 text-sm">Ministry of Trade, Industry, and Energy</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Certified as new technology application product (Reg. No: 2023-0010) by Korean government authorities, 
                    recognizing our innovative marine nano-fiber technology.
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
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <Users className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Industry Validation</h4>
                      <p className="text-gray-600 text-sm">Major Corporate Partnerships</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Recognized by Korean paper companies with investments in production facilities and 
                    Daimler AG Mercedes vendor acceptance, validating our commercial viability.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
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
            <h2 className="text-4xl font-bold mb-6">Partner with Innovation</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join us in revolutionizing industries with sustainable marine nano-fiber technology
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Contact for Partnership Opportunities
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
