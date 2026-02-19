import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/supabaseCustom";
import ButterflyLoader from "@/components/ButterflyLoader";

// Routes accessible to everyone (no auth required)
const PUBLIC_ROUTES = ["/coming-soon", "/login", "/admin"];

export default function GatekeeperRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [status, setStatus] = useState<"loading" | "allowed" | "blocked">("loading");

  const isPublic = PUBLIC_ROUTES.some(
    (r) => location.pathname === r || location.pathname.startsWith(r + "/")
  );

  useEffect(() => {
    // Public routes bypass the check entirely
    if (isPublic) {
      setStatus("allowed");
      return;
    }

    let cancelled = false;

    async function check() {
      // 1. Get session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        if (!cancelled) setStatus("blocked");
        return;
      }

      // 2. Check admin role in user_roles table
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!cancelled) {
        setStatus(data ? "allowed" : "blocked");
      }
    }

    check();
    return () => { cancelled = true; };
  }, [location.pathname, isPublic]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#e4ffec] flex items-center justify-center">
        <ButterflyLoader />
      </div>
    );
  }

  if (status === "blocked") {
    return <Navigate to="/coming-soon" replace />;
  }

  return <>{children}</>;
}
