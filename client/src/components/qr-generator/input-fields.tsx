import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { QRCodeType } from "@/lib/utils/qr-generator";

interface InputFieldsProps {
  qrType: QRCodeType;
  url: string;
  onUrlChange: (url: string) => void;
  text: string;
  onTextChange: (text: string) => void;
  phone: string;
  onPhoneChange: (phone: string) => void;
  message: string;
  onMessageChange: (message: string) => void;
}

export function InputFields({
  qrType,
  url,
  onUrlChange,
  text,
  onTextChange,
  phone,
  onPhoneChange,
  message,
  onMessageChange,
}: InputFieldsProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Content</h2>
        
        {/* URL Input */}
        {qrType === "url" && (
          <div>
            <Label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </Label>
            <div className="mt-1 mb-3">
              <Input
                type="url"
                id="url"
                value={url}
                onChange={(e) => onUrlChange(e.target.value)}
                placeholder="https://example.com"
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Text Input */}
        {qrType === "text" && (
          <div>
            <Label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
              Text
            </Label>
            <div className="mt-1 mb-3">
              <Textarea
                id="text"
                value={text}
                onChange={(e) => onTextChange(e.target.value)}
                placeholder="Enter your text here"
                rows={3}
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* WhatsApp Input */}
        {qrType === "whatsapp" && (
          <>
            <div className="mb-3">
              <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number (with country code)
              </Label>
              <Input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => onPhoneChange(e.target.value)}
                placeholder="+1234567890"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Pre-filled Message (optional)
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => onMessageChange(e.target.value)}
                placeholder="Hello, I'd like to chat!"
                rows={2}
                className="w-full"
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
