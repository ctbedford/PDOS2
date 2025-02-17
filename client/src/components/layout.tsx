import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  Eye,
  Globe,
  Lightbulb,
  LogOut,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { logoutMutation, user } = useAuth();

  const navItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/vision", icon: Eye, label: "Vision" },
    { path: "/context", icon: Globe, label: "Context" },
    { path: "/strategies", icon: Lightbulb, label: "Strategies" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-sidebar p-4 border-r border-border">
          <div className="flex items-center gap-2 mb-8">
            <h1 className="text-xl font-bold">PDOS</h1>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <a className={`flex items-center gap-2 p-2 rounded-md hover:bg-sidebar-accent ${
                  location === item.path ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
                }`}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5" />
              <span>{user?.username}</span>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => logoutMutation.mutate()}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
