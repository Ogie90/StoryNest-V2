import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, BookOpen } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExportDialog = ({ open, onOpenChange }: Props) => {
  const handleDownload = () => {
    toast({
      title: "Coming soon",
      description: "PDF export will be available in the live version.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Export Your Book</DialogTitle>
          <DialogDescription>
            Download your personalised story to keep forever.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <Button className="w-full gap-2" onClick={handleDownload}>
            <Download size={16} /> Download as PDF
          </Button>

          <div className="rounded-lg border border-border bg-muted/50 p-3 space-y-1">
            <p className="text-sm font-medium text-foreground flex items-center gap-2">
              <BookOpen size={14} className="text-primary" /> Saved in your library
            </p>
            <p className="text-xs text-muted-foreground">
              You can access this book anytime from{" "}
              <Link
                to="/library"
                className="text-primary underline"
                onClick={() => onOpenChange(false)}
              >
                My Library
              </Link>
              .
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
