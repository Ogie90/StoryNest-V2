import { cn } from "@/lib/utils";

interface CategoryChipProps {
  label: string;
  active?: boolean;
  color?: string;
}

const CategoryChip = ({ label, active = false, color }: CategoryChipProps) => (
  <button
    className={cn(
      "px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 shrink-0 border",
      active
        ? "bg-primary text-primary-foreground border-primary shadow-sm"
        : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground",
      color
    )}
  >
    {label}
  </button>
);

export default CategoryChip;
