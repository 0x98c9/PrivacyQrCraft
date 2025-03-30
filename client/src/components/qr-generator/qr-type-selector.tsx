import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeType } from "@/lib/utils/qr-generator";

interface QRTypeSelectorProps {
  qrType: QRCodeType;
  onTypeChange: (type: QRCodeType) => void;
}

export function QRTypeSelector({ qrType, onTypeChange }: QRTypeSelectorProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">QR Code Type</h2>
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant={qrType === "url" ? "default" : "outline"}
            onClick={() => onTypeChange("url")}
            className="w-full"
          >
            URL
          </Button>
          <Button
            variant={qrType === "text" ? "default" : "outline"}
            onClick={() => onTypeChange("text")}
            className="w-full"
          >
            Text
          </Button>
          <Button
            variant={qrType === "whatsapp" ? "default" : "outline"}
            onClick={() => onTypeChange("whatsapp")}
            className="w-full"
          >
            WhatsApp
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
