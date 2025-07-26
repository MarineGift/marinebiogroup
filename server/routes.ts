import express, { type Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { storage } from "./storage";
import { siteConfig } from "./config";
import { 
  type Contact,
  type Newsletter,
  type BlogPost,
  type News,
  type Gallery,
  type Product,
  type Carousel,
  type User,
  type InsertContact,
  type InsertNewsletter,
  type InsertBlogPost,
  type InsertNews,
  type InsertGallery,
  type InsertProduct,
  type InsertCarousel
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = req.body as InsertContact;
      // Add language from request or use site default
      const language = req.body.language || siteConfig.defaultLanguage;
      const contact = await storage.createContact({
        ...contactData,
        language
      });
      res.json({ success: true, contact });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const newsletterData = req.body as InsertNewsletter;
      // Add language from request or use site default
      const language = req.body.language || siteConfig.defaultLanguage;
      const subscription = await storage.createNewsletterSubscription({
        ...newsletterData,
        language
      });
      res.json({ success: true, subscription });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Admin middleware
  const requireAuth = async (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    const user = await storage.validateAdminSession(token);
    if (!user) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }
    
    req.user = user;
    next();
  };

  // Debug route to check admin users
  app.get("/api/admin/debug", async (req, res) => {
    try {
      const debugInfo = await storage.getDebugInfo();
      res.json(debugInfo);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      console.log('=== LOGIN REQUEST ===');
      console.log('Request body:', req.body);
      
      const { username, password } = req.body;
      console.log(`Parsed - Username: ${username}, Password: ${password}`);
      
      const user = await storage.authenticateAdmin(username, password);
      console.log('Authentication result:', user ? 'SUCCESS' : 'FAILED');
      
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      const session = await storage.createAdminSession(user.id);
      res.json({ 
        success: true, 
        token: session.token,
        user: { id: user.id, username: user.username, role: user.role }
      });
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(400).json({ error: error.message });
    }
  });

  // Admin verify token
  app.get("/api/admin/verify", requireAuth, async (req: any, res) => {
    try {
      res.json({ 
        success: true, 
        user: { 
          id: req.user.id, 
          username: req.user.username, 
          role: req.user.role 
        } 
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Admin logout
  app.post("/api/admin/logout", requireAuth, async (req: any, res) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (token) {
        await storage.deleteAdminSession(token);
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get blog posts with pagination
  app.get("/api/blog", async (req, res) => {
    try {
      const language = req.query.language as string || siteConfig.defaultLanguage;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await storage.getBlogPosts(language, page, limit);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get single blog post
  app.get("/api/blog/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Blog CRUD operations for admin
  app.post("/api/admin/blog", requireAuth, async (req, res) => {
    try {
      const postData = req.body as InsertBlogPost;
      const post = await storage.createBlogPost(postData);
      res.json(post);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/admin/blog/:id", requireAuth, async (req, res) => {
    try {
      const updateData = req.body as Partial<InsertBlogPost>;
      const post = await storage.updateBlogPost(req.params.id, updateData);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/admin/blog/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteBlogPost(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // News routes with pagination
  app.get("/api/news", async (req, res) => {
    try {
      const language = req.query.language as string || siteConfig.defaultLanguage;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await storage.getNews(language, page, limit);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const news = await storage.getNewsItem(req.params.id);
      if (!news) {
        return res.status(404).json({ error: "News item not found" });
      }
      res.json(news);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // News CRUD operations for admin
  app.post("/api/admin/news", requireAuth, async (req, res) => {
    try {
      const newsData = req.body as InsertNews;
      const news = await storage.createNews(newsData);
      res.json(news);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/admin/news/:id", requireAuth, async (req, res) => {
    try {
      const updateData = req.body as Partial<InsertNews>;
      const news = await storage.updateNews(req.params.id, updateData);
      if (!news) {
        return res.status(404).json({ error: "News item not found" });
      }
      res.json(news);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/admin/news/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteNews(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "News item not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Gallery routes with pagination
  app.get("/api/gallery", async (req, res) => {
    try {
      const language = req.query.language as string || siteConfig.defaultLanguage;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 12;
      const result = await storage.getGalleryItems(language, page, limit);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/gallery/:id", async (req, res) => {
    try {
      const item = await storage.getGalleryItem(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Gallery item not found" });
      }
      res.json(item);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Gallery CRUD operations for admin
  app.post("/api/admin/gallery", requireAuth, async (req, res) => {
    try {
      const galleryData = req.body as InsertGallery;
      const gallery = await storage.createGalleryItem(galleryData);
      res.json(gallery);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/admin/gallery/:id", requireAuth, async (req, res) => {
    try {
      const updateData = req.body as Partial<InsertGallery>;
      const gallery = await storage.updateGalleryItem(req.params.id, updateData);
      if (!gallery) {
        return res.status(404).json({ error: "Gallery item not found" });
      }
      res.json(gallery);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/admin/gallery/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteGalleryItem(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Gallery item not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Products routes
  app.get("/api/products", async (req, res) => {
    try {
      const language = req.query.language as string || siteConfig.defaultLanguage;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await storage.getProducts(language, page, limit);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Products CRUD operations for admin
  app.post("/api/admin/products", requireAuth, async (req, res) => {
    try {
      const productData = req.body as InsertProduct;
      const product = await storage.createProduct(productData);
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Admin products route for the admin component
  app.get("/api/admin/products", requireAuth, async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await storage.getProducts("en", page, limit);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/admin/products/:id", requireAuth, async (req, res) => {
    try {
      const updateData = req.body as Partial<InsertProduct>;
      const product = await storage.updateProduct(req.params.id, updateData);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/admin/products/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteProduct(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Site configuration endpoint
  app.get("/api/config", (req, res) => {
    res.json(siteConfig);
  });

  // Carousel public routes
  app.get("/api/carousels", async (req, res) => {
    try {
      const language = req.query.language as string || siteConfig.defaultLanguage;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await storage.getCarousels(language, page, limit);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/carousels/active", async (req, res) => {
    try {
      const language = req.query.language as string || siteConfig.defaultLanguage;
      const carousels = await storage.getActiveCarousels(language);
      res.json(carousels);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/carousels/:id", async (req, res) => {
    try {
      const carousel = await storage.getCarousel(req.params.id);
      if (!carousel) {
        return res.status(404).json({ error: "Carousel not found" });
      }
      res.json(carousel);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Carousel CRUD operations for admin
  app.post("/api/admin/carousels", requireAuth, async (req, res) => {
    try {
      const carouselData = req.body as InsertCarousel;
      const carousel = await storage.createCarousel(carouselData);
      res.json(carousel);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/admin/carousels/:id", requireAuth, async (req, res) => {
    try {
      const updateData = req.body as Partial<InsertCarousel>;
      const carousel = await storage.updateCarousel(req.params.id, updateData);
      if (!carousel) {
        return res.status(404).json({ error: "Carousel not found" });
      }
      res.json(carousel);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/admin/carousels/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteCarousel(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Carousel not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Admin statistics endpoint
  app.get("/api/admin/stats", requireAuth, async (req, res) => {
    try {
      const stats = await storage.getAdminStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Admin routes for content management
  app.get("/api/admin/contacts", requireAuth, async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await storage.getContacts(page, limit);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/admin/newsletters", requireAuth, async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await storage.getNewsletterSubscriptions(page, limit);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create newsletter subscription (admin)
  app.post("/api/admin/newsletters", requireAuth, async (req, res) => {
    try {
      const newsletterData = req.body as InsertNewsletter;
      const subscription = await storage.createNewsletterSubscription(newsletterData);
      res.json(subscription);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update newsletter subscription (admin)
  app.patch("/api/admin/newsletters/:id", requireAuth, async (req, res) => {
    try {
      const updateData = req.body as Partial<InsertNewsletter>;
      const subscription = await storage.updateNewsletterSubscription(req.params.id, updateData);
      if (!subscription) {
        return res.status(404).json({ error: "Newsletter subscription not found" });
      }
      res.json(subscription);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete newsletter subscription (admin)
  app.delete("/api/admin/newsletters/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteNewsletterSubscription(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Newsletter subscription not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });



  const httpServer = createServer(app);
  return httpServer;
}
