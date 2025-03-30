import { QRCodeType } from "@/lib/utils/qr-generator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="input-section">
      {qrType === "url" && (
        <div className="space-y-2">
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
          />
        </div>
      )}

      {qrType === "text" && (
        <div className="space-y-2">
          <Label htmlFor="text">Text</Label>
          <Textarea
            id="text"
            placeholder="Enter your text here"
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      )}

      {qrType === "whatsapp" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (with country code)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1234567890"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message (optional)</Label>
            <Textarea
              id="message"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </>
      )}
    </div>
  );
}