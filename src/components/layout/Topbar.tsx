import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";

export const Topbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Plane className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl font-bold">CrewDog</span>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/run">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};