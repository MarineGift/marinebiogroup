import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import StatsSection from "@/components/sections/stats-section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  TrendingUp,
  Globe,
  Recycle,
  Leaf,
  Users,
  BarChart3,
  ArrowRight,
  Calculator,
  Baby,
  ChartLine
} from "lucide-react";

export default function Market() {
  const marketStats = [
    { value: "$79.8", label: "Global Diaper Market", suffix: "B" },
    { value: "$23.6", label: "Sanitary Pad Market", suffix: "B" },
    { value: "$6.5", label: "USA Diaper Market", suffix: "B" },
    { value: "1", label: "Target Market Share", suffix: "%" }
  ];

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
            <h1 className="text-5xl font-bold mb-6">Market Potential & Environmental Impact</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Transforming massive global markets while contributing to environmental sustainability
            </p>
          </motion.div>
        </div>
      </section>

      {/* Market Size Statistics */}
      <StatsSection 
        title="Global Market Opportunity"
        subtitle="Targeting massive markets with sustainable alternatives"
        stats={marketStats}
        className="bg-white"
      />

      {/* Market Validation */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">USA Market Validation</h2>
            <p className="text-xl text-gray-600">Detailed market analysis and daily usage patterns</p>
          </motion.div>

          <div className="bg-white rounded-3xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="text-white h-10 w-10" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">80M</div>
                <div className="text-gray-600 font-medium">Daily USA Diaper Usage</div>
                <div className="text-sm text-gray-500 mt-2">Adults + Babies + Others</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Baby className="text-white h-10 w-10" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">44M</div>
                <div className="text-gray-600 font-medium">Target Daily Market</div>
                <div className="text-sm text-gray-500 mt-2">60% of baby diapers (10M x 5 pieces/day)</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChartLine className="text-white h-10 w-10" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">16.2B</div>
                <div className="text-gray-600 font-medium">Annual Market Potential</div>
                <div className="text-sm text-gray-500 mt-2">Diapers per year</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Sources */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Market Research Sources</h2>
            <p className="text-xl text-gray-600">Data validated by leading market research organizations</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="text-white h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Euromonitor</h4>
                  <p className="text-gray-600 text-sm mb-4">Global market intelligence</p>
                  <div className="text-2xl font-bold text-blue-600">$79.8B</div>
                  <div className="text-sm text-gray-500">Global diaper market size</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="text-white h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">IMARC Group</h4>
                  <p className="text-gray-600 text-sm mb-4">Industry market research</p>
                  <div className="text-2xl font-bold text-green-600">$23.6B</div>
                  <div className="text-sm text-gray-500">Sanitary pad market</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="text-white h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Grand View Research</h4>
                  <p className="text-gray-600 text-sm mb-4">Strategic market insights</p>
                  <div className="text-2xl font-bold text-orange-600">$6.5B</div>
                  <div className="text-sm text-gray-500">USA diaper market</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-gray-900">Environmental Impact</h3>
              <div className="space-y-6">
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
                    <Leaf className="text-white h-6 w-6" />
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
                    <Users className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">UN SDG Alignment</h4>
                    <p className="text-gray-600">
                      Creating jobs in developing countries while preventing global warming 
                      through sustainable innovation and responsible manufacturing.
                    </p>
                  </div>
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

      {/* Target Market Analysis */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Premium Market Positioning</h2>
            <p className="text-xl text-gray-600">Targeting 1% of the global premium market with sustainable alternatives</p>
          </motion.div>

          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Market Strategy</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Focus on premium USA market segment</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Target environmentally conscious consumers</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Premium pricing for superior quality</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>B2B partnerships with major retailers</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold mb-4">1%</div>
                <div className="text-xl mb-2">Target Market Share</div>
                <div className="text-lg opacity-90">Premium USA Market</div>
                <div className="mt-6 text-sm bg-white/20 rounded-lg p-4">
                  <div className="font-bold text-lg">Potential Revenue</div>
                  <div className="text-2xl font-bold">$650M+</div>
                  <div className="text-sm opacity-75">Annual opportunity</div>
                </div>
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
            <h2 className="text-4xl font-bold mb-6">Invest in Our Vision</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join us in capturing this massive market opportunity while making a positive environmental impact
            </p>
            <Link href="/investors">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                View Investment Opportunities
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
