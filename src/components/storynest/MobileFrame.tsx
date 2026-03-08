import { cn } from "@/lib/utils";

interface MobileFrameProps {
  children: React.ReactNode;
  className?: string;
}

const MobileFrame = ({ children, className }: MobileFrameProps) => {
  return (
    <div
      className={cn(
        "relative w-[320px] h-[680px] rounded-[40px] bg-card shadow-soft border border-border overflow-hidden flex flex-col",
        "transition-transform duration-300 hover:scale-[1.01]",
        className
      )}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold text-foreground shrink-0">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-[2px]">
            <div className="w-[3px] h-[6px] bg-foreground rounded-sm" />
            <div className="w-[3px] h-[8px] bg-foreground rounded-sm" />
            <div className="w-[3px] h-[10px] bg-foreground rounded-sm" />
            <div className="w-[3px] h-[12px] bg-foreground rounded-sm" />
          </div>
          <svg width="15" height="10" viewBox="0 0 15 10" className="ml-1">
            <path d="M7.5 3C9.5 3 11.3 3.8 12.6 5.1L14 3.7C12.3 2 10 1 7.5 1S2.7 2 1 3.7L2.4 5.1C3.7 3.8 5.5 3 7.5 3Z" fill="currentColor" />
            <path d="M7.5 6C8.8 6 10 6.5 10.9 7.4L12.3 6C11 4.7 9.3 4 7.5 4S4 4.7 2.7 6L4.1 7.4C5 6.5 6.2 6 7.5 6Z" fill="currentColor" />
            <circle cx="7.5" cy="9.5" r="1.5" fill="currentColor" />
          </svg>
          <svg width="22" height="10" viewBox="0 0 22 10" className="ml-1">
            <rect x="0" y="1" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1" fill="none" />
            <rect x="1.5" y="2.5" width="13" height="5" rx="1" fill="currentColor" />
            <rect x="19" y="3" width="2" height="4" rx="0.5" fill="currentColor" />
          </svg>
        </div>
      </div>
      {/* Screen content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default MobileFrame;
