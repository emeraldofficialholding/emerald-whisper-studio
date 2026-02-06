import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Product = Tables<"products">;

export const useProducts = (category?: string) =>
  useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      let query = supabase.from("products").select("*");
      if (category) query = query.eq("category", category);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

export const useProduct = (id: string) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
