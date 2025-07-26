import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "@shared/schema";
import { 
  Mail,
  MapPin,
  Youtube,
  Linkedin,
  Instagram,
  Send,
  Phone,
  Clock
} from "lucide-react";

const contactFormSchema = insertContactSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      inquiryType: "",
      message: ""
    }
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormData) => 
      apiRequest("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
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
            <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Ready to partner with us or learn more about our marine nano-fiber technology?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Mail className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Email</div>
                      <div className="text-gray-600">ceo@{window.location.hostname}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <MapPin className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Headquarters</div>
                      <div className="text-gray-600">
                        1952 Gallows Rd #303<br />
                        Vienna, VA 22182<br />
                        United States
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                      <Youtube className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">YouTube Channel</div>
                      <div className="text-gray-600">Watch our product demonstrations</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center">
                      <Clock className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Response Time</div>
                      <div className="text-gray-600">We respond within 24 hours</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Follow Our Journey</h4>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Youtube className="text-white h-6 w-6" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="text-white h-6 w-6" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Instagram className="text-white h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Office Hours</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="text-gray-900">9:00 AM - 6:00 PM KST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="text-gray-900">10:00 AM - 4:00 PM KST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="text-gray-900">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Google Maps */}
              <Card className="mt-8">
                <CardContent className="p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Find Us</h4>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.840567891234!2d-77.26874!3d38.9016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b637e8d5b1234567%3A0x1234567890abcdef!2s1952%20Gallows%20Rd%20%23303%2C%20Vienna%2C%20VA%2022182!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="MarineBioGroup Office Location"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Our offices are conveniently located in Vienna, Virginia, easily accessible from Washington DC metro area.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <Input
                          {...form.register("name")}
                          placeholder="Your name"
                          className={form.formState.errors.name ? "border-red-500" : ""}
                        />
                        {form.formState.errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          {...form.register("email")}
                          placeholder="your@email.com"
                          className={form.formState.errors.email ? "border-red-500" : ""}
                        />
                        {form.formState.errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inquiry Type *
                      </label>
                      <Select onValueChange={(value) => form.setValue("inquiryType", value)}>
                        <SelectTrigger className={form.formState.errors.inquiryType ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="partner">Partner</SelectItem>
                          <SelectItem value="investor">Investor</SelectItem>
                          <SelectItem value="media">Media</SelectItem>
                          <SelectItem value="supplier">Supplier</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.inquiryType && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.inquiryType.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        {...form.register("message")}
                        rows={6}
                        placeholder="Tell us about your interest in our marine nano-fiber technology..."
                        className={form.formState.errors.message ? "border-red-500" : ""}
                      />
                      {form.formState.errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.message.message}
                        </p>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Partnership Opportunities</h2>
            <p className="text-xl text-gray-600">Various ways to collaborate with MarineBioGroup</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-white h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3">Customers</h4>
                  <p className="text-gray-600 text-sm">
                    Interested in our sustainable marine nano-fiber products for your business or personal use.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="text-white h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3">Partners</h4>
                  <p className="text-gray-600 text-sm">
                    Distributors, retailers, and companies looking to integrate our eco-friendly technologies.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="text-white h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3">Investors</h4>
                  <p className="text-gray-600 text-sm">
                    Investment opportunities in innovative marine technology with strong ROI potential.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Youtube className="text-white h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3">Media</h4>
                  <p className="text-gray-600 text-sm">
                    Journalists and media professionals interested in covering our sustainable innovations.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common inquiries</p>
          </motion.div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-bold text-gray-900 mb-2">How can I become a distributor of your products?</h4>
                <p className="text-gray-600">
                  Please contact us through the form above selecting "Partner" as your inquiry type. 
                  We'll provide you with detailed information about our distribution program and requirements.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-bold text-gray-900 mb-2">Are your products available for individual purchase?</h4>
                <p className="text-gray-600">
                  Currently, our products are available through select partners and retailers. 
                  Contact us for information about purchasing our marine nano-fiber products.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-bold text-gray-900 mb-2">What makes your technology different from competitors?</h4>
                <p className="text-gray-600">
                  We are the world's first pioneer of marine nano-fiber technology with 50+ patents, 
                  including 30 specifically related to marine materials. Our products are 100% biodegradable and microplastic-free.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
