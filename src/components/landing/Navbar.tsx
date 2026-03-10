"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, BookOpen, LogOut, LogIn } from "lucide-react";

const navLinks = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Why StoryNest", href: "#why-different" },
  { label: "Pricing", href: "#pricing" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const goToLibrary = () => {
    setOpen(false);
    router.push("/library");
  };

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    router.push("/");
  };

  const handleSignIn = () => {
    setOpen(false);
    router.push("/auth");
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-16">
        <span className="text-xl font-bold text-foreground tracking-tight">StoryNest</span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
          {user && (
            <button
              onClick={goToLibrary}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
            >
              <BookOpen size={14} /> My Library
            </button>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {loading ? null : user ? (
            <>
              <span className="text-xs text-muted-foreground truncate max-w-[160px]">
                {user.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-1.5">
                <LogOut size={14} /> Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={handleSignIn} className="gap-1.5">
                <LogIn size={14} /> Sign In
              </Button>
              <Button onClick={() => scrollTo("#final-cta")} className="rounded-full px-6">
                Start Creating
              </Button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu size={22} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-base font-medium text-foreground text-left"
                >
                  {link.label}
                </button>
              ))}
              {user && (
                <button
                  onClick={goToLibrary}
                  className="text-base font-medium text-foreground text-left inline-flex items-center gap-2"
                >
                  <BookOpen size={16} /> My Library
                </button>
              )}

              {loading ? null : user ? (
                <>
                  <span className="text-sm text-muted-foreground truncate">
                    {user.email}
                  </span>
                  <Button variant="ghost" onClick={handleSignOut} className="justify-start gap-2">
                    <LogOut size={16} /> Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={handleSignIn} className="justify-start gap-2">
                    <LogIn size={16} /> Sign In
                  </Button>
                  <Button onClick={() => scrollTo("#final-cta")} className="rounded-full mt-4">
                    Start Creating
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
