import { QrCode } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Header() {
  return (
    <header className="bg-background border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <QrCode className="h-8 w-8 text-primary" />
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Privacy-Friendly QR Generator</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded-full">No Data Storage</span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}