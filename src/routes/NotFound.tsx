"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, BookOpen } from "lucide-react";

const NotFound = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5">
      {/* Floating book illustration */}
      <motion.div
        className="relative mb-8"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
          <BookOpen size={48} className="text-primary/60" />
        </div>
        {/* Sparkle accents */}
        <motion.div
          className="absolute -top-2 -right-1 w-3 h-3 rounded-full bg-secondary/60"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        />
        <motion.div
          className="absolute bottom-1 -left-3 w-2 h-2 rounded-full bg-accent/50"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
        />
      </motion.div>

      <motion.div
        className="text-center max-w-sm"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
        <p className="text-lg font-semibold text-foreground mb-1">
          This page wandered off
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Looks like this chapter doesn't exist yet. Let's get you back to the story.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            className="gap-2 rounded-full"
            onClick={() => router.back()}
          >
            <ArrowLeft size={14} /> Go Back
          </Button>
          <Button
            className="gap-2 rounded-full"
            onClick={() => router.push("/")}
          >
            <Home size={14} /> Back to Home
          </Button>
        </div>
      </motion.div>

      <p className="text-xs text-muted-foreground/50 mt-16">
        {pathname}
      </p>
    </div>
  );
};

export default NotFound;
