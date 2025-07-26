import express from "express";
import cors from "cors";

const app = express();

// CORS configuration for Netlify
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Site configuration
app.get("/api/config", (req, res) => {
  res.json({
    siteName: process.env.SITE_NAME || "marinebiogroup",
    domainName: process.env.DOMAIN_NAME || "marinebiogroup.com",
    companyName: process.env.COMPANY_NAME || "MarineBioGroup",
    supportEmail: process.env.SUPPORT_EMAIL || "support@marinebiogroup.com",
    theme: {
      primary: process.env.THEME_PRIMARY || "#0066cc",
      secondary: process.env.THEME_SECONDARY || "#00aa44"
    },
    features: {
      newsletter: process.env.FEATURE_NEWSLETTER !== "false",
      contact: process.env.FEATURE_CONTACT !== "false", 
      gallery: process.env.FEATURE_GALLERY !== "false",
      blog: process.env.FEATURE_BLOG !== "false"
    }
  });
});

// In-memory storage for demo purposes
let memoryData = {
  carousels: [
    {
      id: "1",
      title: "Marine Innovation Leadership",
      subtitle: "Pioneering Sustainable Ocean Technology", 
      description: "Leading the global transformation in marine nano-fiber technology for sustainable future.",
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
      linkUrl: "/technology",
      buttonText: "Discover Technology",
      order: 1,
      isActive: true,
      language: "eng",
      site: "marinebiogroup"
    }
  ],
  contacts: [],
  newsletters: [],
  gallery: [],
  products: [],
  news: [],
  blog: []
};

// Carousel routes
app.get("/api/carousels/active", (req, res) => {
  const activeCarousels = memoryData.carousels.filter(c => c.isActive);
  res.json(activeCarousels);
});

app.get("/api/carousels", (req, res) => {
  res.json(memoryData.carousels);
});

// Contact form
app.post("/api/contacts", (req, res) => {
  const contact = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  memoryData.contacts.push(contact);
  res.status(201).json(contact);
});

// Newsletter subscription
app.post("/api/newsletters", (req, res) => {
  const subscription = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  memoryData.newsletters.push(subscription);
  res.status(201).json(subscription);
});

// Netlify Functions handler
export const handler = async (event, context) => {
  // Handle the request using Express
  const req = {
    method: event.httpMethod,
    url: event.path,
    headers: event.headers,
    body: event.body ? JSON.parse(event.body) : {}
  };

  return new Promise((resolve) => {
    const res = {
      statusCode: 200,
      headers: {},
      body: "",
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.headers["Content-Type"] = "application/json";
        this.body = JSON.stringify(data);
        resolve(this);
      },
      send: function(data) {
        this.body = data;
        resolve(this);
      }
    };

    // Route handling
    if (req.url === "/api/health" && req.method === "GET") {
      res.json({ 
        status: "healthy", 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development"
      });
    } else if (req.url === "/api/config" && req.method === "GET") {
      res.json({
        siteName: process.env.SITE_NAME || "marinebiogroup",
        domainName: process.env.DOMAIN_NAME || "marinebiogroup.com",
        companyName: process.env.COMPANY_NAME || "MarineBioGroup",
        supportEmail: process.env.SUPPORT_EMAIL || "support@marinebiogroup.com"
      });
    } else if (req.url === "/api/carousels/active" && req.method === "GET") {
      const activeCarousels = memoryData.carousels.filter(c => c.isActive);
      res.json(activeCarousels);
    } else if (req.url === "/api/contacts" && req.method === "POST") {
      const contact = {
        id: Date.now().toString(),
        ...req.body,
        createdAt: new Date().toISOString()
      };
      memoryData.contacts.push(contact);
      res.status(201).json(contact);
    } else if (req.url === "/api/newsletters" && req.method === "POST") {
      const subscription = {
        id: Date.now().toString(),
        ...req.body,
        createdAt: new Date().toISOString()
      };
      memoryData.newsletters.push(subscription);
      res.status(201).json(subscription);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });
};