const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <span className="text-lg font-bold text-foreground tracking-tight">StoryNest</span>

      <div className="flex gap-6 text-sm text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">About</a>
        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
        <a href="#" className="hover:text-foreground transition-colors">Contact</a>
      </div>

      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} StoryNest. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
