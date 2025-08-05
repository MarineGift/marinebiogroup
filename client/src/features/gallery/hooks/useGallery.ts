import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { GalleryItem, GalleryFilter, PaginatedGalleryResponse } from '../types';

export function useGallery(filter: GalleryFilter & { page?: number; limit?: number } = {}) {
  const { page = 1, limit = 12, ...filterParams } = filter;
  
  return useQuery<PaginatedGalleryResponse>({
    queryKey: ["/api/gallery", page, limit, filterParams],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      return apiRequest(`/api/gallery?${params.toString()}`);
    },
  });
}

export function useAdminGallery(page = 1, limit = 10) {
  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "Content-Type": "application/json",
  });

  return useQuery<PaginatedGalleryResponse>({
    queryKey: ["/api/admin/gallery", page, limit],
    queryFn: () => apiRequest(`/api/admin/gallery?page=${page}&limit=${limit}`, {
      headers: authHeaders(),
    }),
  });
}

export function useCreateGalleryItem() {
  const { toast } = useToast();
  
  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "Content-Type": "application/json",
  });

  return useMutation({
    mutationFn: async (data: Partial<GalleryItem>) => {
      return apiRequest("/api/admin/gallery", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ ...data, site: "marinebiogroup" }),
      });
    },
    onSuccess: () => {
      toast({ title: "Gallery item created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/gallery"] });
    },
    onError: () => {
      toast({ title: "Failed to create gallery item", variant: "destructive" });
    },
  });
}

export function useUpdateGalleryItem() {
  const { toast } = useToast();
  
  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "Content-Type": "application/json",
  });

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<GalleryItem> }) => {
      return apiRequest(`/api/admin/gallery/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({ title: "Gallery item updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/gallery"] });
    },
    onError: () => {
      toast({ title: "Failed to update gallery item", variant: "destructive" });
    },
  });
}

export function useDeleteGalleryItem() {
  const { toast } = useToast();
  
  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "Content-Type": "application/json",
  });

  return useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/admin/gallery/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
    },
    onSuccess: () => {
      toast({ title: "Gallery item deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/gallery"] });
    },
    onError: () => {
      toast({ title: "Failed to delete gallery item", variant: "destructive" });
    },
  });
}