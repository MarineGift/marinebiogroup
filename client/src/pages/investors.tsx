import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  DollarSign,
  TrendingUp,
  Award,
  Download,
  Mail,
  FileText,
  Shield,
  Building,
  Calendar,
  ArrowRight
} from "lucide-react";

export default function Investors() {
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
            <h1 className="text-5xl font-bold mb-6">Investor Relations</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Proven technology with strong ROI and massive market potential
            </p>
          </motion.div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Investment Opportunity</h2>
            <p className="text-xl text-gray-600">Strong financial returns with proven technology adoption</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white h-full">
                <CardContent className="p-8">
                  <DollarSign className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Investment Required</h3>
                  <div className="text-4xl font-bold mb-2">$30M</div>
                  <div className="opacity-90 mb-4">FCC Process Investment</div>
                  <div className="space-y-2 text-sm">
                    <div>• Pulp pretreatment: $6M</div>
                    <div>• FCC manufacturing: $24M</div>
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
              <Card className="bg-gradient-to-br from-green-600 to-green-800 text-white h-full">
                <CardContent className="p-8">
                  <TrendingUp className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Annual Savings</h3>
                  <div className="text-4xl font-bold mb-2">$7.5M</div>
                  <div className="opacity-90 mb-4">For 300,000 tons production</div>
                  <div className="space-y-2 text-sm">
                    <div>• Pulp cost savings: $600K</div>
                    <div>• Filler cost savings: $50K</div>
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
              <Card className="bg-gradient-to-br from-orange-600 to-orange-800 text-white h-full">
                <CardContent className="p-8">
                  <Calendar className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Return on Investment</h3>
                  <div className="text-4xl font-bold mb-2">4 Years</div>
                  <div className="opacity-90 mb-4">Full ROI Timeline</div>
                  <div className="text-sm">
                    Strong financial returns with proven technology adoption by Korean paper companies
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Financial Analysis */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Financial Analysis</h2>
            <p className="text-xl text-gray-600">Detailed cost analysis and revenue projections</p>
          </motion.div>

          <div className="bg-white rounded-3xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Cost Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-700">Pulp Pretreatment</span>
                    <span className="font-bold text-blue-600">$6M</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-700">FCC Manufacturing</span>
                    <span className="font-bold text-green-600">$24M</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg border-2 border-gray-300">
                    <span className="font-bold text-gray-900">Total Investment</span>
                    <span className="font-bold text-gray-900 text-lg">$30M</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Annual Benefits</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-700">Material Cost Savings</span>
                    <span className="font-bold text-green-600">$650K</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-700">Production Efficiency</span>
                    <span className="font-bold text-blue-600">$6.85M</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg border-2 border-gray-300">
                    <span className="font-bold text-gray-900">Total Annual Savings</span>
                    <span className="font-bold text-gray-900 text-lg">$7.5M</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Intellectual Property */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Intellectual Property Portfolio</h2>
            <p className="text-xl text-gray-600">Comprehensive patent protection for our innovative technologies</p>
          </motion.div>

          <div className="bg-blue-50 rounded-3xl p-12">
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
                  <Shield className="text-white h-8 w-8" />
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
                  <Award className="text-white h-8 w-8" />
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
                  <Shield className="text-white h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900">Bio-SA</div>
                <div className="text-gray-600 text-sm">Patented Technology</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Government Recognition */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recognition & Validation</h2>
            <p className="text-xl text-gray-600">Official recognition from government and industry leaders</p>
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
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center">
                      <Award className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Korean Government Recognition</h4>
                      <p className="text-gray-600 text-sm">Ministry of Trade, Industry, and Energy</p>
                      <Badge className="mt-2">Reg. No: 2023-0010</Badge>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Certified as new technology application product by Korean government authorities, 
                    recognizing our innovative marine nano-fiber technology and commercial viability.
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
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <Building className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Industry Validation</h4>
                      <p className="text-gray-600 text-sm">Major Corporate Partnerships</p>
                      <Badge className="mt-2">Daimler AG Mercedes</Badge>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Recognized by Korean paper companies with investments in production facilities and 
                    Daimler AG Mercedes vendor acceptance, validating our technology's commercial success.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Executive Summary</h2>
            <p className="text-xl text-gray-600">Key investment highlights and value proposition</p>
          </motion.div>

          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">Investment Highlights</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>FCC technology reduces wood pulp use by 30% while maintaining quality</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>Proven technology with Korean paper company investments</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>Government recognition and certification</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>Targeting massive global markets ($79.8B+ opportunity)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6">Competitive Advantages</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>World's first marine nano-fiber technology</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>50+ patents including 30 marine-related patents</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>100% biodegradable and microplastic-free products</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span>Strong ROI with 4-year payback period</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Invest?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join us in revolutionizing industries with sustainable marine nano-fiber technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Download className="mr-2 h-5 w-5" />
                Download Investor Deck
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact for Investor Inquiries
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
