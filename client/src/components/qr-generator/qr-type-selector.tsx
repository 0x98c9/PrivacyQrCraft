import { Link2, MessageSquare, Type } from "lucide-react";
import { QRCodeType } from "@/lib/utils/qr-generator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface QRTypeSelectorProps {
  qrType: QRCodeType;
  onTypeChange: (type: QRCodeType) => void;
}

export function QRTypeSelector({ qrType, onTypeChange }: QRTypeSelectorProps) {
  const handleTypeChange = (value: string) => {
    onTypeChange(value as QRCodeType);
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-2 text-foreground">QR Code Type</h2>
      <Tabs
        defaultValue={qrType}
        value={qrType}
        onValueChange={handleTypeChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="url" className="flex items-center gap-2">
            <Link2 className="h-4 w-4" />
            <span className="hidden sm:inline">URL</span>
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            <span className="hidden sm:inline">Text</span>
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}