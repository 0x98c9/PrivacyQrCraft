import { QrCode } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <QrCode className="h-8 w-8 text-primary" />
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Privacy-Friendly QR Generator</h1>
        </div>
        <div>
          <span className="hidden sm:inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">No Data Storage</span>
        </div>
      </div>
    </header>
  );
}
