import { 
  type User, type InsertUser, 
  type Contact, type InsertContact, 
  type Newsletter, type InsertNewsletter, 
  type BlogPost, type InsertBlogPost,
  type News, type InsertNews,
  type Gallery, type InsertGallery,
  type Product, type InsertProduct,
  type Carousel, type InsertCarousel,
  type AdminSession, type InsertAdminSession,
  type Language
} from "@shared/schema";
import { randomUUID } from "crypto";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { 
  users, contacts, newsletters, blog_posts, 
  news, gallery, products, carousel, admin_sessions 
} from "@shared/schema";
import { eq, and, desc, count, like } from "drizzle-orm";
import { siteConfig } from "./config";

// Supabase PostgreSQL connection (temporarily disabled due to compatibility issues)
let db: any = null;
// Database connection with proper error handling
if (process.env.DATABASE_URL) {
  try {
    console.log("Initializing Supabase database connection...");
    import('./db.js').then(({ db: database }) => {
      db = database;
      console.log("✅ Supabase database connected successfully");
    }).catch(error => {
      console.error("❌ Database import error:", error.message);
      console.log("Using memory storage as fallback");
    });
  } catch (error) {
    console.error("❌ Database connection error:", error);
    console.log("Using memory storage as fallback");
  }
} else {
  console.log("DATABASE_URL not found, using memory storage");
}

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  
  // Admin operations
  authenticateAdmin(username: string, password: string): Promise<User | null>;
  createAdminSession(adminId: string): Promise<AdminSession>;
  validateAdminSession(token: string): Promise<User | null>;
  deleteAdminSession(token: string): Promise<boolean>;
  
  // Contact operations
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(page?: number, limit?: number): Promise<{ data: Contact[], total: number }>;
  
  // Newsletter operations
  createNewsletterSubscription(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscriptions(page?: number, limit?: number): Promise<{ data: Newsletter[], total: number }>;
  updateNewsletterSubscription(id: string, newsletter: Partial<InsertNewsletter>): Promise<Newsletter | undefined>;
  deleteNewsletterSubscription(id: string): Promise<boolean>;
  
  // Blog operations
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(language?: string, page?: number, limit?: number): Promise<{ data: BlogPost[], total: number }>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  
  // News operations
  createNews(news: InsertNews): Promise<News>;
  getNews(language?: string, page?: number, limit?: number): Promise<{ data: News[], total: number }>;
  getNewsItem(id: string): Promise<News | undefined>;
  updateNews(id: string, news: Partial<InsertNews>): Promise<News | undefined>;
  deleteNews(id: string): Promise<boolean>;
  
  // Gallery operations
  createGalleryItem(gallery: InsertGallery): Promise<Gallery>;
  getGalleryItems(language?: string, page?: number, limit?: number): Promise<{ data: Gallery[], total: number }>;
  getGalleryItem(id: string): Promise<Gallery | undefined>;
  updateGalleryItem(id: string, gallery: Partial<InsertGallery>): Promise<Gallery | undefined>;
  deleteGalleryItem(id: string): Promise<boolean>;
  
  // Product operations
  createProduct(product: InsertProduct): Promise<Product>;
  getProducts(language?: string, page?: number, limit?: number): Promise<{ data: Product[], total: number }>;
  getProduct(id: string): Promise<Product | undefined>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;

  // Carousel operations
  getCarousels(language?: string, page?: number, limit?: number): Promise<{ data: Carousel[], total: number }>;
  getCarousel(id: string): Promise<Carousel | undefined>;
  createCarousel(carousel: InsertCarousel): Promise<Carousel>;
  updateCarousel(id: string, carousel: Partial<InsertCarousel>): Promise<Carousel | undefined>;
  deleteCarousel(id: string): Promise<boolean>;
  getActiveCarousels(language?: string): Promise<Carousel[]>;

  // Statistics operations
  getAdminStats(): Promise<{
    totalContacts: number;
    todayContacts: number;
    totalNewsletters: number;
    todayNewsletters: number;
    totalBlogPosts: number;
    todayBlogPosts: number;
    totalNews: number;
    todayNews: number;
    totalGalleryItems: number;
    todayGalleryItems: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  private memoryUsers: Map<string, User>;
  private memoryContacts: Map<string, Contact>;
  private memoryNewsletters: Map<string, Newsletter>;
  private memoryBlogPosts: Map<string, BlogPost>;
  private memoryNews: Map<string, News>;
  private memoryGallery: Map<string, Gallery>;
  private memoryProducts: Map<string, Product>;
  private memoryCarousels: Map<string, Carousel>;
  private memoryAdminSessions: Map<string, AdminSession>;

  constructor() {
    this.memoryUsers = new Map();
    this.memoryContacts = new Map();
    this.memoryNewsletters = new Map();
    this.memoryBlogPosts = new Map();
    this.memoryNews = new Map();
    this.memoryGallery = new Map();
    this.memoryProducts = new Map();
    this.memoryCarousels = new Map();
    this.memoryAdminSessions = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    try {
      await this.initializeBlogPosts();
      await this.initializeNews();
      await this.initializeGallery();
      await this.initializeProducts();
      await this.initializeCarousels();
      console.log(`Products initialized: ${this.memoryProducts.size}`);
      await this.initializeCarousels();
      await this.initializeAdminUser();
    } catch (error) {
      console.error("Error initializing sample data:", error);
    }
  }

  private async initializeBlogPosts() {
    const siteName = siteConfig.siteName;
    const samplePosts: BlogPost[] = [
      {
        id: randomUUID(),
        title: "Revolutionary Marine Nano-Fiber Breakthrough",
        excerpt: "Latest advancements in our proprietary nano-processing technology showing improved biodegradability and performance metrics.",
        content: "Our research team has achieved a significant breakthrough in marine nano-fiber technology that promises to revolutionize the sustainable materials industry...",
        category: "Technology Update",
        imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        language: "en",
        status: "published",
        authorId: null,
        site: siteName,
        publishedAt: new Date("2024-12-15"),
        createdAt: new Date("2024-12-15"),
        updatedAt: new Date("2024-12-15")
      },
      {
        id: randomUUID(),
        title: "Korean Government Endorsement Received",
        excerpt: "MarineBioGroup receives official recognition from Ministry of Trade, Industry, and Energy for innovative marine technology.",
        content: "We are proud to announce that MarineBioGroup has received official government recognition from the Ministry of Trade, Industry, and Energy...",
        category: "Company News",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        language: "en",
        status: "published",
        authorId: null,
        site: siteName,
        publishedAt: new Date("2024-12-10"),
        createdAt: new Date("2024-12-10"),
        updatedAt: new Date("2024-12-10")
      },
      {
        id: randomUUID(),
        title: "UN SDG Alignment Initiative",
        excerpt: "Our contribution to United Nations Sustainable Development Goals through marine conservation and job creation.",
        content: "MarineBioGroup is committed to supporting the UN Sustainable Development Goals, particularly SDG 14 (Life Below Water) and SDG 8 (Decent Work and Economic Growth)...",
        category: "Sustainability",
        imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        language: "en",
        status: "published",
        authorId: null,
        site: siteName,
        publishedAt: new Date("2024-12-05"),
        createdAt: new Date("2024-12-05"),
        updatedAt: new Date("2024-12-05")
      }
    ];

    for (const post of samplePosts) {
      this.memoryBlogPosts.set(post.id, post);
    }
  }

  private async initializeNews() {
    const siteName = siteConfig.siteName;
    const newsItems: News[] = Array.from({ length: 20 }, (_, i) => ({
      id: randomUUID(),
      title: `Marine Technology News ${i + 1}`,
      excerpt: `Breaking news about marine nano-fiber technology development and industry updates ${i + 1}.`,
      content: `Detailed content about marine technology advancement ${i + 1}. Our latest research shows promising results in sustainable material development...`,
      category: i % 2 === 0 ? "Research" : "Industry",
      imageUrl: `https://images.unsplash.com/photo-${1570000000000 + i * 100000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250`,
      language: "en" as Language,
      status: "published" as const,
      authorId: null,
      site: siteName,
      publishedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    }));

    for (const news of newsItems) {
      this.memoryNews.set(news.id, news);
    }
  }

  private async initializeGallery() {
    const siteName = siteConfig.siteName;
    const galleryItems: Gallery[] = [
      {
        id: randomUUID(),
        title: "Marine Nano-Fiber Laboratory",
        description: "State-of-the-art research facility for marine nano-fiber technology development and innovation.",
        imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80",
        category: "Research",
        tags: ["laboratory", "research", "technology"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Ocean Sustainability Project",
        description: "Our commitment to sustainable marine technology and environmental protection initiatives.",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=400&q=80",
        category: "Environment",
        tags: ["ocean", "sustainability", "environment"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Marine Beauty Products",
        description: "Revolutionary marine-based skincare products with nano-fiber technology for premium beauty care.",
        imageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=400&q=80",
        category: "Products",
        tags: ["skincare", "beauty", "products"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Underwater Research Team",
        description: "Expert marine biologists conducting underwater research for sustainable materials and ecosystem protection.",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80",
        category: "Research",
        tags: ["research", "team", "underwater"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Nano-Fiber Processing Plant",
        description: "Advanced manufacturing facility for processing marine nano-fibers with cutting-edge technology.",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
        category: "Manufacturing",
        tags: ["manufacturing", "processing", "facility"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Marine Ecosystem Study",
        description: "Comprehensive study of marine ecosystems to ensure sustainable harvesting practices and biodiversity.",
        imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=400&q=80",
        category: "Research",
        tags: ["ecosystem", "marine", "study"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "International Conference Presentation",
        description: "CEO presenting latest breakthroughs in marine nano-fiber technology at global sustainability summit.",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80",
        category: "Events",
        tags: ["conference", "presentation", "CEO"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Quality Control Laboratory",
        description: "Rigorous quality testing ensuring the highest standards for all marine products and materials.",
        imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=400&q=80",
        category: "Quality",
        tags: ["quality", "testing", "laboratory"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Sustainable Packaging Solutions",
        description: "Eco-friendly packaging made from marine nano-fibers for zero waste impact and biodegradability.",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80",
        category: "Products",
        tags: ["packaging", "sustainable", "eco-friendly"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Deep Sea Research Vessel",
        description: "Specialized research vessel for deep-sea marine resource exploration and sustainable collection methods.",
        imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80",
        category: "Research",
        tags: ["vessel", "deep-sea", "exploration"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Marine Cream Bar Production",
        description: "Artisanal production process for premium Marine Cream Bar with natural marine ingredients.",
        imageUrl: "https://images.unsplash.com/photo-1556909411-f309d7c6b9f0?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1556909411-f309d7c6b9f0?auto=format&fit=crop&w=400&q=80",
        category: "Products",
        tags: ["cream", "production", "skincare"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Corporate Headquarters",
        description: "Modern headquarters building featuring sustainable architecture and marine-inspired design elements.",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
        category: "Company",
        tags: ["headquarters", "building", "corporate"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Marine Biotechnology Workshop",
        description: "Educational workshop teaching sustainable marine biotechnology to next generation scientists and researchers.",
        imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80",
        category: "Education",
        tags: ["workshop", "education", "biotechnology"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Award Ceremony Recognition",
        description: "Recognition for excellence in sustainable marine technology innovation at international industry awards.",
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80",
        category: "Awards",
        tags: ["award", "recognition", "ceremony"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Marine Pack Product Line",
        description: "Complete Marine Pack collection featuring biodegradable containers and innovative packaging solutions.",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        category: "Products",
        tags: ["marine-pack", "packaging", "biodegradable"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Coral Reef Conservation Project",
        description: "Partnership with marine conservation groups to protect coral reefs while sustainably sourcing materials.",
        imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=400&q=80",
        category: "Conservation",
        tags: ["coral", "conservation", "partnership"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Clean Energy Marine Processing",
        description: "Solar and wind-powered processing facility ensuring zero carbon footprint manufacturing processes.",
        imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=400&q=80",
        category: "Technology",
        tags: ["clean-energy", "solar", "manufacturing"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Global Distribution Network",
        description: "Worldwide distribution centers ensuring fresh marine products reach customers globally with quality assurance.",
        imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80",
        category: "Logistics",
        tags: ["distribution", "global", "logistics"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Customer Experience Center",
        description: "Interactive customer center where visitors experience marine nano-fiber products firsthand with guided tours.",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
        category: "Customer",
        tags: ["customer", "experience", "interactive"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Marine Innovation Summit 2024",
        description: "Annual summit bringing together marine technology leaders and sustainability experts from around the world.",
        imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
        thumbnailUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=400&q=80",
        category: "Events",
        tags: ["summit", "innovation", "2024"],
        language: "en" as Language,
        status: "published" as const,
        authorId: null,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    for (const item of galleryItems) {
      this.memoryGallery.set(item.id, item);
    }
  }

  private async initializeProducts() {
    const siteName = siteConfig.siteName;
    const products: Product[] = [
      {
        id: randomUUID(),
        name: "MarinePack",
        description: "World's first seaweed nano-fiber face mask featuring patented hydrogel technology that retains essence and delivers cooling, detox, and anti-aging benefits. The mask provides 30+ minutes of usage with 5°C cooling effect, removes oil, fine dust, and heavy metals while providing anti-aging benefits with niacinamide and adenosine.",
        shortDescription: "Seaweed nano-fiber face mask with cooling hydrogel technology",
        price: 3500, // $35.00
        imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        images: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"],
        category: "Face Mask",
        tags: ["cooling", "detox", "anti-aging", "seaweed", "hydrogel"],
        language: "en" as Language,
        status: "published" as const,
        stock: 100,
        sku: "MP-001",
        weight: 25,
        dimensions: { length: 15, width: 12, height: 2 },
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Marine Cream Bar",
        description: "All-in-one seaweed soap for cleansing and skin nourishment. Eco-friendly and completely biodegradable formulation enriched with marine nano-fiber extracts for superior skin care.",
        shortDescription: "All-in-one seaweed soap for cleansing and nourishment",
        price: 2500, // $25.00
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"],
        category: "Beauty",
        tags: ["cleansing", "nourishment", "biodegradable", "seaweed"],
        language: "en" as Language,
        status: "published" as const,
        stock: 150,
        sku: "MCB-001",
        weight: 100,
        dimensions: { length: 10, width: 6, height: 3 },
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Marine Sun Protect",
        description: "Inorganic sunscreen with seaweed extract for enhanced skin protection, cooling, and reduced white cast. Advanced marine technology provides superior UV protection while being gentle on skin.",
        shortDescription: "Inorganic sunscreen with seaweed extract and cooling effect",
        price: 2800, // $28.00
        imageUrl: "https://pixabay.com/get/gb5414a06e00618c352f04c7cd7f323e2aa354b88fd51ae22198f81948fc4d74a0db48b5ce945bc74c2e92abd5f400d8276aff5b56d105ad047a67f15bac0bbc3_1280.jpg",
        images: ["https://pixabay.com/get/gb5414a06e00618c352f04c7cd7f323e2aa354b88fd51ae22198f81948fc4d74a0db48b5ce945bc74c2e92abd5f400d8276aff5b56d105ad047a67f15bac0bbc3_1280.jpg"],
        category: "Sun Protection",
        tags: ["sunscreen", "UV protection", "cooling", "seaweed"],
        language: "en" as Language,
        status: "published" as const,
        stock: 0,
        sku: "MSP-001",
        weight: 75,
        dimensions: { length: 12, width: 4, height: 4 },
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Marine Pad",
        description: "Biodegradable diapers and sanitary pads using Bio-SA polymer. Microplastic-free and safe for health. Revolutionary sustainable solution for baby care and feminine hygiene.",
        shortDescription: "Biodegradable diapers and sanitary pads with Bio-SA polymer",
        price: 1500, // $15.00
        imageUrl: "https://pixabay.com/get/gd103216bfefe99d3a3b7e5305f468d0a840f86ed8d0d3bd3444a4398cb1d86af7b9c372dc27ae076e8c40fbb5ee30b457fe5473bd89b665d189f39b9047c6173_1280.jpg",
        images: ["https://pixabay.com/get/gd103216bfefe99d3a3b7e5305f468d0a840f86ed8d0d3bd3444a4398cb1d86af7b9c372dc27ae076e8c40fbb5ee30b457fe5473bd89b665d189f39b9047c6173_1280.jpg"],
        category: "Hygiene",
        tags: ["biodegradable", "microplastic-free", "bio-polymer", "sustainable"],
        language: "en" as Language,
        status: "published" as const,
        stock: 0,
        sku: "MPD-001",
        weight: 200,
        dimensions: { length: 25, width: 15, height: 5 },
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    for (const product of products) {
      this.memoryProducts.set(product.id, product);
    }
  }

  private async initializeCarousels() {
    const siteName = siteConfig.siteName;
    const carousels: Carousel[] = [
      {
        id: randomUUID(),
        title: "혁신적인 해양 나노섬유 기술",
        subtitle: "지속 가능한 미래를 위한 선도적 기술",
        description: "MarineBioGroup의 첨단 해양 나노섬유 기술로 환경 친화적인 소재 혁신을 경험해보세요.",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
        linkUrl: "/technology",
        buttonText: "기술 자세히 보기",
        order: 1,
        isActive: true,
        language: "ko" as Language,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Sustainable Marine Innovation",
        subtitle: "Leading the Future of Eco-Friendly Materials",
        description: "Discover MarineBioGroup's cutting-edge marine nano-fiber technology for sustainable material solutions.",
        imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
        linkUrl: "/products",
        buttonText: "Explore Products",
        order: 2,
        isActive: true,
        language: "en" as Language,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "해양 바이오 제품 라인",
        subtitle: "자연에서 영감을 받은 뷰티 & 라이프스타일",
        description: "해양 나노섬유를 활용한 프리미엄 뷰티 제품과 친환경 패키징 솔루션을 만나보세요.",
        imageUrl: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
        linkUrl: "/products",
        buttonText: "제품 보기",
        order: 3,
        isActive: true,
        language: "ko" as Language,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Research & Development",
        subtitle: "Advancing Marine Science",
        description: "Join us in pioneering research that transforms marine resources into innovative, sustainable solutions.",
        imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
        linkUrl: "/about",
        buttonText: "Learn More",
        order: 4,
        isActive: true,
        language: "en" as Language,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        title: "글로벌 파트너십",
        subtitle: "전 세계와 함께하는 지속가능한 혁신",
        description: "MarineBioGroup과 함께 지속 가능한 미래를 만들어가는 글로벌 파트너들을 만나보세요.",
        imageUrl: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
        linkUrl: "/investors",
        buttonText: "파트너십 문의",
        order: 5,
        isActive: true,
        language: "ko" as Language,
        site: siteName,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    for (const carousel of carousels) {
      this.memoryCarousels.set(carousel.id, carousel);
    }
  }

  private async initializeAdminUser() {
    const siteName = siteConfig.siteName;
    const adminUser: User = {
      id: "admin-1",
      username: "admin",
      password: "1111", // In production, this should be hashed
      email: "admin@marinebiogroup.com",
      role: "admin",
      firstName: "Admin",
      lastName: "User",
      isActive: true,
      site: siteName,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.memoryUsers.set(adminUser.id, adminUser);
    console.log('=== ADMIN USER INITIALIZED ===');
    console.log(`Username: ${adminUser.username}`);
    console.log(`Password: ${adminUser.password}`);
    console.log(`Role: ${adminUser.role}`);
    console.log(`Total users in memory: ${this.memoryUsers.size}`);
    console.log('================================');
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    if (db) {
      try {
        const result = await db.select().from(users).where(eq(users.id, id));
        return result[0];
      } catch (error) {
        console.error("Error getting user:", error);
      }
    }
    return this.memoryUsers.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (db) {
      try {
        const result = await db.select().from(users).where(eq(users.username, username));
        return result[0];
      } catch (error) {
        console.error("Error getting user by username:", error);
      }
    }
    return Array.from(this.memoryUsers.values()).find(user => user.username === username);
  }

  async createUser(userData: InsertUser): Promise<User> {
    const siteName = siteConfig.siteName;
    const user: User = {
      id: randomUUID(),
      ...userData,
      role: userData.role || "user",
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      isActive: userData.isActive !== undefined ? userData.isActive : true,
      site: userData.site || siteName,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (db) {
      try {
        const result = await db.insert(users).values(user).returning();
        return result[0];
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
    
    this.memoryUsers.set(user.id, user);
    return user;
  }

  async updateUser(id: string, userData: Partial<InsertUser>): Promise<User | undefined> {
    if (db) {
      try {
        const result = await db.update(users)
          .set({ ...userData, updatedAt: new Date() })
          .where(eq(users.id, id))
          .returning();
        return result[0];
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }

    const user = this.memoryUsers.get(id);
    if (user) {
      const updatedUser = { ...user, ...userData, updatedAt: new Date() };
      this.memoryUsers.set(id, updatedUser);
      return updatedUser;
    }
    return undefined;
  }

  // Debug method
  async getDebugInfo(): Promise<any> {
    const memoryUsers = Array.from(this.memoryUsers.values());
    const memorySessions = Array.from(this.memoryAdminSessions.values());
    
    return {
      memoryUsers: memoryUsers.map(u => ({ 
        id: u.id, 
        username: u.username, 
        role: u.role, 
        password: u.password // Only for debugging 
      })),
      memorySessions: memorySessions.length,
      hasDatabase: !!db
    };
  }

  // Admin operations
  async authenticateAdmin(username: string, password: string): Promise<User | null> {
    console.log(`Login attempt - Username: ${username}, Password: ${password}`);
    
    // Always check memory storage first for reliability
    const user = Array.from(this.memoryUsers.values())
      .find(u => u.username === username && u.password === password && u.role === 'admin');
    
    if (user) {
      console.log(`Authentication successful for user: ${user.username}`);
      return user;
    }

    // Try database if memory fails
    if (db) {
      try {
        const result = await db.select().from(users)
          .where(eq(users.username, username));
        const dbUser = result[0];
        
        if (dbUser && dbUser.password === password && dbUser.role === 'admin') {
          console.log(`Authentication successful from database for user: ${dbUser.username}`);
          return dbUser;
        }
      } catch (error) {
        console.error("Database authentication error:", error);
      }
    }
    
    console.log(`Authentication failed for username: ${username}`);
    return null;
  }

  async createAdminSession(adminId: string): Promise<AdminSession> {
    const siteName = siteConfig.siteName;
    const session: AdminSession = {
      id: randomUUID(),
      adminId,
      token: randomUUID() + randomUUID().replace(/-/g, ''),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      site: siteName,
      createdAt: new Date()
    };

    // Always store in memory for reliability
    this.memoryAdminSessions.set(session.token, session);
    console.log(`Admin session created: ${session.token.substring(0, 10)}...`);

    // Try database as backup
    if (db) {
      try {
        await db.insert(admin_sessions).values(session).returning();
      } catch (error) {
        console.error("Error storing session in database:", error);
      }
    }

    return session;
  }

  async validateAdminSession(token: string): Promise<User | null> {
    // Use memory storage first for reliability
    const session = this.memoryAdminSessions.get(token);
    if (session && session.expiresAt > new Date()) {
      const user = this.memoryUsers.get(session.adminId);
      return user || null;
    } else if (session) {
      // Clean up expired session
      this.memoryAdminSessions.delete(token);
    }

    // Try database as fallback
    if (db) {
      try {
        const result = await db.select()
          .from(admin_sessions)
          .innerJoin(users, eq(admin_sessions.adminId, users.id))
          .where(eq(admin_sessions.token, token));
        
        if (result.length > 0) {
          const session = result[0].admin_sessions;
          const user = result[0].users;
          
          if (session.expiresAt > new Date()) {
            return user;
          } else {
            // Clean up expired session
            await db.delete(admin_sessions).where(eq(admin_sessions.token, token));
          }
        }
        return null;
      } catch (error) {
        console.error("Database admin session validation error:", error);
        return null;
      }
    }

    return null;
  }

  async deleteAdminSession(token: string): Promise<boolean> {
    if (db) {
      try {
        await db.delete(admin_sessions).where(eq(admin_sessions.token, token));
        return true;
      } catch (error) {
        console.error("Error deleting admin session:", error);
        return false;
      }
    }

    return this.memoryAdminSessions.delete(token);
  }

  // Contact operations
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const siteName = siteConfig.siteName;
    const contact: Contact = {
      id: randomUUID(),
      ...insertContact,
      language: insertContact.language || "en",
      site: insertContact.site || siteName,
      createdAt: new Date()
    };

    if (db) {
      try {
        const result = await db.insert(contacts).values(contact).returning();
        return result[0];
      } catch (error) {
        console.error("Error creating contact:", error);
      }
    }
    
    this.memoryContacts.set(contact.id, contact);
    return contact;
  }

  async getContacts(page: number = 1, limit: number = 10): Promise<{ data: Contact[], total: number }> {
    if (db) {
      try {
        const result = await db.select().from(contacts);
        const total = result.length;
        const offset = (page - 1) * limit;
        const data = result.slice(offset, offset + limit);
        return { data, total };
      } catch (error) {
        console.error("Error getting contacts:", error);
      }
    }
    
    const allContacts = Array.from(this.memoryContacts.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
    const total = allContacts.length;
    const offset = (page - 1) * limit;
    const data = allContacts.slice(offset, offset + limit);
    return { data, total };
  }

  // Newsletter operations
  async createNewsletterSubscription(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const siteName = siteConfig.siteName;
    const newsletter: Newsletter = {
      id: randomUUID(),
      ...insertNewsletter,
      language: insertNewsletter.language || "en",
      site: insertNewsletter.site || siteName,
      subscribedAt: new Date()
    };

    if (db) {
      try {
        const result = await db.insert(newsletters).values(newsletter).returning();
        return result[0];
      } catch (error) {
        console.error("Error creating newsletter subscription:", error);
      }
    }
    
    this.memoryNewsletters.set(newsletter.id, newsletter);
    return newsletter;
  }

  async getNewsletterSubscriptions(page: number = 1, limit: number = 10): Promise<{ data: Newsletter[], total: number }> {
    if (db) {
      try {
        const result = await db.select().from(newsletters);
        const total = result.length;
        const offset = (page - 1) * limit;
        const data = result.slice(offset, offset + limit);
        return { data, total };
      } catch (error) {
        console.error("Error getting newsletter subscriptions:", error);
      }
    }
    
    const allNewsletters = Array.from(this.memoryNewsletters.values());
    const total = allNewsletters.length;
    const offset = (page - 1) * limit;
    const data = allNewsletters.slice(offset, offset + limit);
    return { data, total };
  }

  async updateNewsletterSubscription(id: string, updateData: Partial<InsertNewsletter>): Promise<Newsletter | undefined> {
    if (db) {
      try {
        const result = await db.update(newsletters)
          .set({ ...updateData, updatedAt: new Date() })
          .where(eq(newsletters.id, id))
          .returning();
        return result[0];
      } catch (error) {
        console.error("Error updating newsletter subscription:", error);
      }
    }

    const existing = this.memoryNewsletters.get(id);
    if (existing) {
      const updated = { 
        ...existing, 
        ...updateData,
        updatedAt: new Date()
      };
      this.memoryNewsletters.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async deleteNewsletterSubscription(id: string): Promise<boolean> {
    if (db) {
      try {
        const result = await db.delete(newsletters).where(eq(newsletters.id, id)).returning();
        return result.length > 0;
      } catch (error) {
        console.error("Error deleting newsletter subscription:", error);
      }
    }

    return this.memoryNewsletters.delete(id);
  }

  // Blog operations
  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const siteName = siteConfig.siteName;
    const blogPost: BlogPost = {
      id: randomUUID(),
      ...insertBlogPost,
      language: insertBlogPost.language || "en",
      status: insertBlogPost.status || "published",
      site: insertBlogPost.site || siteName,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (db) {
      try {
        const result = await db.insert(blog_posts).values(blogPost).returning();
        return result[0];
      } catch (error) {
        console.error("Error creating blog post:", error);
      }
    }
    
    this.memoryBlogPosts.set(blogPost.id, blogPost);
    return blogPost;
  }

  async getBlogPosts(language?: string, page: number = 1, limit: number = 10): Promise<{ data: BlogPost[], total: number }> {
    if (db) {
      try {
        let query = db.select().from(blog_posts);
        if (language) {
          query = query.where(eq(blog_posts.language, language));
        }
        const result = await query;
        const total = result.length;
        const offset = (page - 1) * limit;
        const data = result.slice(offset, offset + limit);
        return { data, total };
      } catch (error) {
        console.error("Error getting blog posts:", error);
      }
    }
    
    const allPosts = Array.from(this.memoryBlogPosts.values());
    const filteredPosts = language ? allPosts.filter(post => post.language === language) : allPosts;
    const total = filteredPosts.length;
    const offset = (page - 1) * limit;
    const data = filteredPosts.slice(offset, offset + limit);
    return { data, total };
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    if (db) {
      try {
        const result = await db.select().from(blog_posts).where(eq(blog_posts.id, id));
        return result[0];
      } catch (error) {
        console.error("Error getting blog post:", error);
      }
    }
    
    return this.memoryBlogPosts.get(id);
  }

  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    if (db) {
      try {
        const result = await db.update(blog_posts)
          .set({ ...post, updatedAt: new Date() })
          .where(eq(blog_posts.id, id))
          .returning();
        return result[0];
      } catch (error) {
        console.error("Error updating blog post:", error);
      }
    }

    const existingPost = this.memoryBlogPosts.get(id);
    if (existingPost) {
      const updatedPost = { ...existingPost, ...post, updatedAt: new Date() };
      this.memoryBlogPosts.set(id, updatedPost);
      return updatedPost;
    }
    return undefined;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    if (db) {
      try {
        await db.delete(blog_posts).where(eq(blog_posts.id, id));
        return true;
      } catch (error) {
        console.error("Error deleting blog post:", error);
        return false;
      }
    }

    return this.memoryBlogPosts.delete(id);
  }

  // News operations
  async createNews(insertNews: InsertNews): Promise<News> {
    const siteName = siteConfig.siteName;
    const news: News = {
      id: randomUUID(),
      ...insertNews,
      language: insertNews.language || "en",
      status: insertNews.status || "published",
      site: insertNews.site || siteName,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (db) {
      try {
        const result = await db.insert(news).values(news).returning();
        return result[0];
      } catch (error) {
        console.error("Error creating news:", error);
      }
    }
    
    this.memoryNews.set(news.id, news);
    return news;
  }

  async getNews(language?: string, page: number = 1, limit: number = 10): Promise<{ data: News[], total: number }> {
    if (db) {
      try {
        let query = db.select().from(news);
        if (language) {
          query = query.where(eq(news.language, language));
        }
        const result = await query;
        const total = result.length;
        const offset = (page - 1) * limit;
        const data = result.slice(offset, offset + limit);
        return { data, total };
      } catch (error) {
        console.error("Error getting news:", error);
      }
    }
    
    const allNews = Array.from(this.memoryNews.values());
    const filteredNews = language ? allNews.filter(item => item.language === language) : allNews;
    const total = filteredNews.length;
    const offset = (page - 1) * limit;
    const data = filteredNews.slice(offset, offset + limit);
    return { data, total };
  }

  async getNewsItem(id: string): Promise<News | undefined> {
    if (db) {
      try {
        const result = await db.select().from(news).where(eq(news.id, id));
        return result[0];
      } catch (error) {
        console.error("Error getting news item:", error);
      }
    }
    
    return this.memoryNews.get(id);
  }

  async updateNews(id: string, news: Partial<InsertNews>): Promise<News | undefined> {
    if (db) {
      try {
        const result = await db.update(news)
          .set({ ...news, updatedAt: new Date() })
          .where(eq(news.id, id))
          .returning();
        return result[0];
      } catch (error) {
        console.error("Error updating news:", error);
      }
    }

    const existingNews = this.memoryNews.get(id);
    if (existingNews) {
      const updatedNews = { ...existingNews, ...news, updatedAt: new Date() };
      this.memoryNews.set(id, updatedNews);
      return updatedNews;
    }
    return undefined;
  }

  async deleteNews(id: string): Promise<boolean> {
    if (db) {
      try {
        await db.delete(news).where(eq(news.id, id));
        return true;
      } catch (error) {
        console.error("Error deleting news:", error);
        return false;
      }
    }

    return this.memoryNews.delete(id);
  }

  // Gallery operations
  async createGalleryItem(insertGallery: InsertGallery): Promise<Gallery> {
    const siteName = siteConfig.siteName;
    const galleryItem: Gallery = {
      id: randomUUID(),
      ...insertGallery,
      language: insertGallery.language || "en",
      status: insertGallery.status || "published",
      site: insertGallery.site || siteName,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Use memory storage only (database disabled due to compatibility issues)
    this.memoryGallery.set(galleryItem.id, galleryItem);
    return galleryItem;
  }

  async getGalleryItems(language?: string, page: number = 1, limit: number = 12): Promise<{ data: Gallery[], total: number }> {
    // Use memory storage only (database disabled due to compatibility issues)
    const allItems = Array.from(this.memoryGallery.values());
    const filteredItems = language ? allItems.filter(item => item.language === language) : allItems;
    const total = filteredItems.length;
    const offset = (page - 1) * limit;
    const data = filteredItems
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(offset, offset + limit);
    
    console.log(`Memory gallery query: ${data.length} items, total: ${total}`);
    return { data, total };
  }

  async getGalleryItem(id: string): Promise<Gallery | undefined> {
    // Use memory storage only (database disabled due to compatibility issues)
    return this.memoryGallery.get(id);
  }

  async updateGalleryItem(id: string, gallery: Partial<InsertGallery>): Promise<Gallery | undefined> {
    if (db) {
      try {
        const result = await db.update(gallery)
          .set({ ...gallery, updatedAt: new Date() })
          .where(eq(gallery.id, id))
          .returning();
        return result[0];
      } catch (error) {
        console.error("Error updating gallery item:", error);
      }
    }

    const existingItem = this.memoryGallery.get(id);
    if (existingItem) {
      const updatedItem = { ...existingItem, ...gallery, updatedAt: new Date() };
      this.memoryGallery.set(id, updatedItem);
      return updatedItem;
    }
    return undefined;
  }

  async deleteGalleryItem(id: string): Promise<boolean> {
    if (db) {
      try {
        await db.delete(gallery).where(eq(gallery.id, id));
        return true;
      } catch (error) {
        console.error("Error deleting gallery item:", error);
        return false;
      }
    }

    return this.memoryGallery.delete(id);
  }

  // Product operations
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const siteName = siteConfig.siteName;
    const product: Product = {
      id: randomUUID(),
      ...insertProduct,
      language: insertProduct.language || "en",
      status: insertProduct.status || "published",
      stock: insertProduct.stock || 0,
      site: insertProduct.site || siteName,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (db) {
      try {
        const result = await db.insert(products).values(product).returning();
        return result[0];
      } catch (error) {
        console.error("Error creating product:", error);
      }
    }
    
    this.memoryProducts.set(product.id, product);
    return product;
  }

  async getProducts(language?: string, page: number = 1, limit: number = 10): Promise<{ data: Product[], total: number }> {
    if (db) {
      try {
        let query = db.select().from(products);
        if (language) {
          query = query.where(eq(products.language, language));
        }
        const result = await query;
        const total = result.length;
        const offset = (page - 1) * limit;
        const data = result.slice(offset, offset + limit);
        return { data, total };
      } catch (error) {
        console.error("Error getting products:", error);
      }
    }
    
    const allProducts = Array.from(this.memoryProducts.values());
    const filteredProducts = language ? allProducts.filter(product => product.language === language) : allProducts;
    const total = filteredProducts.length;
    const offset = (page - 1) * limit;
    const data = filteredProducts.slice(offset, offset + limit);
    return { data, total };
  }

  async getProduct(id: string): Promise<Product | undefined> {
    if (db) {
      try {
        const result = await db.select().from(products).where(eq(products.id, id));
        return result[0];
      } catch (error) {
        console.error("Error getting product:", error);
      }
    }
    
    return this.memoryProducts.get(id);
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined> {
    if (db) {
      try {
        const result = await db.update(products)
          .set({ ...product, updatedAt: new Date() })
          .where(eq(products.id, id))
          .returning();
        return result[0];
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }

    const existingProduct = this.memoryProducts.get(id);
    if (existingProduct) {
      const updatedProduct = { ...existingProduct, ...product, updatedAt: new Date() };
      this.memoryProducts.set(id, updatedProduct);
      return updatedProduct;
    }
    return undefined;
  }

  async deleteProduct(id: string): Promise<boolean> {
    if (db) {
      try {
        await db.delete(products).where(eq(products.id, id));
        return true;
      } catch (error) {
        console.error("Error deleting product:", error);
        return false;
      }
    }

    return this.memoryProducts.delete(id);
  }

  // Carousel operations
  async getCarousels(language?: string, page: number = 1, limit: number = 10): Promise<{ data: Carousel[], total: number }> {
    const siteName = siteConfig.siteName;
    if (db) {
      try {
        const whereCondition = language 
          ? and(eq(carousel.site, siteName), eq(carousel.language, language as Language))
          : eq(carousel.site, siteName);

        const [countResult, data] = await Promise.all([
          db.select({ count: count() }).from(carousel).where(whereCondition),
          db.select().from(carousel)
            .where(whereCondition)
            .orderBy(carousel.order, carousel.createdAt)
            .limit(limit)
            .offset((page - 1) * limit)
        ]);

        const total = countResult[0]?.count || 0;
        return { data, total };
      } catch (error) {
        console.error("Error getting carousels:", error);
      }
    }
    
    const allCarousels = Array.from(this.memoryCarousels.values());
    const filteredCarousels = language ? allCarousels.filter(c => c.language === language) : allCarousels;
    const total = filteredCarousels.length;
    const offset = (page - 1) * limit;
    const data = filteredCarousels.sort((a, b) => a.order - b.order).slice(offset, offset + limit);
    return { data, total };
  }

  async getCarousel(id: string): Promise<Carousel | undefined> {
    if (db) {
      try {
        const result = await db.select().from(carousel).where(eq(carousel.id, id));
        return result[0];
      } catch (error) {
        console.error("Error getting carousel:", error);
      }
    }
    
    return this.memoryCarousels.get(id);
  }

  async createCarousel(carouselData: InsertCarousel): Promise<Carousel> {
    const siteName = siteConfig.siteName;
    const newCarousel: Carousel = {
      id: randomUUID(),
      ...carouselData,
      order: carouselData.order || 0,
      isActive: carouselData.isActive !== undefined ? carouselData.isActive : true,
      language: carouselData.language || "en",
      site: carouselData.site || siteName,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (db) {
      try {
        const result = await db.insert(carousel).values(newCarousel).returning();
        return result[0];
      } catch (error) {
        console.error("Error creating carousel:", error);
      }
    }
    
    this.memoryCarousels.set(newCarousel.id, newCarousel);
    return newCarousel;
  }

  async updateCarousel(id: string, carouselData: Partial<InsertCarousel>): Promise<Carousel | undefined> {
    if (db) {
      try {
        const result = await db.update(carousel)
          .set({ ...carouselData, updatedAt: new Date() })
          .where(eq(carousel.id, id))
          .returning();
        return result[0];
      } catch (error) {
        console.error("Error updating carousel:", error);
      }
    }

    const existingCarousel = this.memoryCarousels.get(id);
    if (existingCarousel) {
      const updatedCarousel = { ...existingCarousel, ...carouselData, updatedAt: new Date() };
      this.memoryCarousels.set(id, updatedCarousel);
      return updatedCarousel;
    }
    return undefined;
  }

  async deleteCarousel(id: string): Promise<boolean> {
    if (db) {
      try {
        await db.delete(carousel).where(eq(carousel.id, id));
        return true;
      } catch (error) {
        console.error("Error deleting carousel:", error);
        return false;
      }
    }

    return this.memoryCarousels.delete(id);
  }

  async getActiveCarousels(language?: string): Promise<Carousel[]> {
    const siteName = siteConfig.siteName;
    if (db) {
      try {
        const whereCondition = language 
          ? and(eq(carousel.site, siteName), eq(carousel.isActive, true), eq(carousel.language, language as Language))
          : and(eq(carousel.site, siteName), eq(carousel.isActive, true));

        const result = await db.select().from(carousel)
          .where(whereCondition)
          .orderBy(carousel.order, carousel.createdAt);
        return result;
      } catch (error) {
        console.error("Error getting active carousels:", error);
      }
    }
    
    const allCarousels = Array.from(this.memoryCarousels.values());
    return allCarousels
      .filter(c => c.isActive && (!language || c.language === language))
      .sort((a, b) => a.order - b.order);
  }

  async getAdminStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (db) {
      try {
        // Get today's and total counts from database
        const [contactsTotal] = await db.select({ count: count() }).from(contacts);
        const [contactsToday] = await db.select({ count: count() })
          .from(contacts)
          .where(
            and(
              eq(contacts.site, siteConfig.siteName),
              db.sql`${contacts.createdAt} >= ${today.toISOString()}`,
              db.sql`${contacts.createdAt} < ${tomorrow.toISOString()}`
            )
          );

        const [newslettersTotal] = await db.select({ count: count() }).from(newsletters);
        const [newslettersToday] = await db.select({ count: count() })
          .from(newsletters)
          .where(
            and(
              eq(newsletters.site, siteConfig.siteName),
              db.sql`${newsletters.subscribedAt} >= ${today.toISOString()}`,
              db.sql`${newsletters.subscribedAt} < ${tomorrow.toISOString()}`
            )
          );

        const [blogTotal] = await db.select({ count: count() }).from(blog_posts);
        const [blogToday] = await db.select({ count: count() })
          .from(blog_posts)
          .where(
            and(
              eq(blog_posts.site, siteConfig.siteName),
              db.sql`${blog_posts.createdAt} >= ${today.toISOString()}`,
              db.sql`${blog_posts.createdAt} < ${tomorrow.toISOString()}`
            )
          );

        const [newsTotal] = await db.select({ count: count() }).from(news);
        const [newsToday] = await db.select({ count: count() })
          .from(news)
          .where(
            and(
              eq(news.site, siteConfig.siteName),
              db.sql`${news.createdAt} >= ${today.toISOString()}`,
              db.sql`${news.createdAt} < ${tomorrow.toISOString()}`
            )
          );

        const [galleryTotal] = await db.select({ count: count() }).from(gallery);
        const [galleryToday] = await db.select({ count: count() })
          .from(gallery)
          .where(
            and(
              eq(gallery.site, siteConfig.siteName),
              db.sql`${gallery.createdAt} >= ${today.toISOString()}`,
              db.sql`${gallery.createdAt} < ${tomorrow.toISOString()}`
            )
          );

        return {
          totalContacts: contactsTotal?.count || 0,
          todayContacts: contactsToday?.count || 0,
          totalNewsletters: newslettersTotal?.count || 0,
          todayNewsletters: newslettersToday?.count || 0,
          totalBlogPosts: blogTotal?.count || 0,
          todayBlogPosts: blogToday?.count || 0,
          totalNews: newsTotal?.count || 0,
          todayNews: newsToday?.count || 0,
          totalGalleryItems: galleryTotal?.count || 0,
          todayGalleryItems: galleryToday?.count || 0,
        };
      } catch (error) {
        console.error("Database stats error:", error);
        // Fall back to memory storage
      }
    }

    // Memory storage fallback
    const todayContactsCount = Array.from(this.memoryContacts.values())
      .filter(contact => contact.createdAt && contact.createdAt >= today).length;
    const todayNewslettersCount = Array.from(this.memoryNewsletters.values())
      .filter(newsletter => newsletter.subscribedAt && newsletter.subscribedAt >= today).length;
    const todayBlogCount = Array.from(this.memoryBlogPosts.values())
      .filter(post => post.createdAt && post.createdAt >= today).length;
    const todayNewsCount = Array.from(this.memoryNews.values())
      .filter(item => item.createdAt && item.createdAt >= today).length;
    const todayGalleryCount = Array.from(this.memoryGallery.values())
      .filter(item => item.createdAt && item.createdAt >= today).length;

    return {
      totalContacts: this.memoryContacts.size,
      todayContacts: todayContactsCount,
      totalNewsletters: this.memoryNewsletters.size,
      todayNewsletters: todayNewslettersCount,
      totalBlogPosts: this.memoryBlogPosts.size,
      todayBlogPosts: todayBlogCount,
      totalNews: this.memoryNews.size,
      todayNews: todayNewsCount,
      totalGalleryItems: this.memoryGallery.size,
      todayGalleryItems: todayGalleryCount,
    };
  }
}

export const storage = new DatabaseStorage();

// Initialize sample carousel data
async function initializeSampleCarousels() {
  const sampleCarousels = [
    {
      title: "Marine Nano-Fiber Technology",
      subtitle: "World's First Pioneer",
      description: "Revolutionizing sustainable beauty and lifestyle products with cutting-edge marine nano-fiber technology for a healthier planet.",
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80",
      linkUrl: "/technology",
      buttonText: "Learn More",
      order: 1,
      isActive: true,
      language: "en" as Language
    },
    {
      title: "해양 나노 섬유 기술",
      subtitle: "세계 최초 선도 기업",
      description: "지속 가능한 뷰티 및 라이프스타일 제품을 위한 첨단 해양 나노 섬유 기술로 더 건강한 지구를 만들어갑니다.",
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80",
      linkUrl: "/technology",
      buttonText: "자세히 보기",
      order: 1,
      isActive: true,
      language: "ko" as Language
    },
    {
      title: "Innovative Marine Products",
      subtitle: "Premium Quality",
      description: "Experience the power of marine-based skincare and lifestyle products designed for modern consumers who care about sustainability.",
      imageUrl: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&w=1200&q=80",
      linkUrl: "/products",
      buttonText: "View Products",
      order: 2,
      isActive: true,
      language: "en" as Language
    },
    {
      title: "혁신적인 해양 제품",
      subtitle: "프리미엄 품질",
      description: "지속 가능성을 중시하는 현대 소비자를 위해 설계된 해양 기반 스킨케어 및 라이프스타일 제품의 힘을 경험해보세요.",
      imageUrl: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&w=1200&q=80",
      linkUrl: "/products",
      buttonText: "제품 보기",
      order: 2,
      isActive: true,
      language: "ko" as Language
    },
    {
      title: "Global Partnership Network",
      subtitle: "Worldwide Expansion",
      description: "Join our growing network of partners and distributors worldwide as we expand marine nano-fiber technology globally.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
      linkUrl: "/investors",
      buttonText: "Partner With Us",
      order: 3,
      isActive: true,
      language: "en" as Language
    }
  ];

  for (const carouselData of sampleCarousels) {
    try {
      await storage.createCarousel(carouselData);
    } catch (error) {
      console.log("Carousel already exists or error creating:", error);
    }
  }
}

// Initialize sample data after a delay to ensure storage is ready
setTimeout(() => {
  initializeSampleCarousels().catch(console.error);
}, 2000);