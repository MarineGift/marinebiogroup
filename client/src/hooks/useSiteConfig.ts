import { useQuery } from "@tanstack/react-query";

export interface SiteConfig {
  siteName: string;
  domainName: string;
  companyName: string;
  supportEmail: string;
  defaultLanguage: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  enableCarousel: boolean;
  enableBlog: boolean;
  enableGallery: boolean;
  enableProducts: boolean;
}

export function useSiteConfig() {
  return useQuery<SiteConfig>({
    queryKey: ["/api/config"],
    queryFn: async () => {
      const response = await fetch("/api/config");
      if (!response.ok) throw new Error("Failed to fetch site config");
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}