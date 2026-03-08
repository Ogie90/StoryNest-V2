import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  action?: string;
  className?: string;
}

const SectionHeader = ({ title, action, className }: SectionHeaderProps) => (
  <div className={cn("flex items-center justify-between", className)}>
    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    {action && (
      <button className="text-sm font-medium text-primary hover:underline">
        {action}
      </button>
    )}
  </div>
);

export default SectionHeader;
