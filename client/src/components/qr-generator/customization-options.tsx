import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useRef } from "react";

interface CustomizationOptionsProps {
  qrSize: number;
  onQrSizeChange: (size: number) => void;
  foregroundColor: string;
  onForegroundColorChange: (color: string) => void;
  backgroundColor: string;
  onBackgroundColorChange: (color: string) => void;
  logoSize: number;
  onLogoSizeChange: (size: number) => void;
  onLogoUpload: (file: File | null) => void;
  logo: File | null;
}

export function CustomizationOptions({
  qrSize,
  onQrSizeChange,
  foregroundColor,
  onForegroundColorChange,
  backgroundColor,
  onBackgroundColorChange,
  logoSize,
  onLogoSizeChange,
  onLogoUpload,
  logo,
}: CustomizationOptionsProps) {
  const foregroundColorRef = useRef<HTMLInputElement>(null);
  const backgroundColorRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onLogoUpload(files[0]);
    }
  };

  const handleRemoveLogo = () => {
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
    onLogoUpload(null);
  };

  return (
    <div className="customization-section">
      <div className="space-y-4">
        <div>
          <Label htmlFor="qr-size">QR Code Size</Label>
          <div className="flex items-center gap-4 mt-2">
            <Slider
              id="qr-size"
              min={128}
              max={512}
              step={1}
              value={[qrSize]}
              onValueChange={(value) => onQrSizeChange(value[0])}
            />
            <span className="text-sm">{qrSize}px</span>
          </div>
        </div>

        <div>
          <Label htmlFor="foreground-color">Foreground Color</Label>
          <div className="flex items-center gap-4 mt-2">
            <div
              className="color-preview"
              style={{ backgroundColor: foregroundColor }}
              onClick={() => foregroundColorRef.current?.click()}
            />
            <Input
              ref={foregroundColorRef}
              id="foreground-color"
              type="color"
              value={foregroundColor}
              onChange={(e) => onForegroundColorChange(e.target.value)}
              className="w-0 h-0 opacity-0 absolute"
            />
            <Input
              value={foregroundColor}
              onChange={(e) => onForegroundColorChange(e.target.value)}
              className="w-32 uppercase"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="background-color">Background Color</Label>
          <div className="flex items-center gap-4 mt-2">
            <div
              className="color-preview"
              style={{ backgroundColor: backgroundColor }}
              onClick={() => backgroundColorRef.current?.click()}
            />
            <Input
              ref={backgroundColorRef}
              id="background-color"
              type="color"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="w-0 h-0 opacity-0 absolute"
            />
            <Input
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="w-32 uppercase"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Logo</Label>
          <div className="mt-2">
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => logoInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" /> Upload Logo
              </Button>
              {logo && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveLogo}
                >
                  Remove
                </Button>
              )}
            </div>
            {logo && (
              <p className="text-xs text-muted-foreground mt-1">
                {logo.name} ({Math.round(logo.size / 1024)} KB)
              </p>
            )}
          </div>
        </div>

        {logo && (
          <div>
            <Label htmlFor="logo-size">Logo Size</Label>
            <div className="flex items-center gap-4 mt-2">
              <Slider
                id="logo-size"
                min={20}
                max={150}
                step={1}
                value={[logoSize]}
                disabled={!logo}
                onValueChange={(value) => onLogoSizeChange(value[0])}
              />
              <span className="text-sm">{logoSize}px</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}