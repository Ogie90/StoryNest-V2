import { Minus, Plus, AlignLeft, List } from "lucide-react";
import { Button } from "@/components/ui/button";

const ReaderToolbar = () => (
  <div className="flex items-center justify-between px-6 py-3">
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 text-muted-foreground hover:text-foreground">
        <Minus size={16} />
      </Button>
      <span className="text-[13px] font-medium text-muted-foreground">Aa</span>
      <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 text-muted-foreground hover:text-foreground">
        <Plus size={16} />
      </Button>
    </div>
    <div className="w-2 h-2 rounded-full bg-primary" />
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 text-muted-foreground hover:text-foreground">
        <AlignLeft size={16} />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 text-muted-foreground hover:text-foreground">
        <List size={16} />
      </Button>
    </div>
  </div>
);

export default ReaderToolbar;
