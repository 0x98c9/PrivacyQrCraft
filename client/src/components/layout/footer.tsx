import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-6 border-t">
      <div className="container flex flex-col items-center justify-center gap-2 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Privacy-First QR Generator. All rights reserved.
        </p>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          Built with <Heart className="h-3 w-3 fill-current text-red-500" aria-hidden="true" /> for your privacy
        </p>
      </div>
    </footer>
  );
}