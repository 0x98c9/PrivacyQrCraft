import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("No file chosen");
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      onLogoUpload(file);
    }
  };
  
  const handleRemoveLogo = () => {
    setFileName("No file chosen");
    onLogoUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Customization</h2>
        
        {/* Size */}
        <div className="mb-6">
          <Label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
            Size
          </Label>
          <div className="flex items-center space-x-3">
            <span className="text-xs text-gray-500">Small</span>
            <Slider
              id="size"
              min={100}
              max={500}
              step={10}
              defaultValue={[qrSize]}
              onValueChange={(value) => onQrSizeChange(value[0])}
              className="flex-grow"
            />
            <span className="text-xs text-gray-500">Large</span>
          </div>
          <p className="mt-1 text-xs text-gray-500 text-right">{qrSize}×{qrSize} px</p>
        </div>
        
        {/* Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <Label htmlFor="foregroundColor" className="block text-sm font-medium text-gray-700 mb-1">
              Foreground Color
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                type="color"
                id="foregroundColor"
                value={foregroundColor}
                onChange={(e) => onForegroundColorChange(e.target.value)}
                className="h-8 w-8 p-0 border-0"
              />
              <Input
                type="text"
                value={foregroundColor}
                onChange={(e) => onForegroundColorChange(e.target.value)}
                className="block w-full"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 mb-1">
              Background Color
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                type="color"
                id="backgroundColor"
                value={backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                className="h-8 w-8 p-0 border-0"
              />
              <Input
                type="text"
                value={backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                className="block w-full"
              />
            </div>
          </div>
        </div>
        
        {/* Logo Upload */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Add Logo (optional)
          </Label>
          <div className="mt-1 flex items-center space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer"
            >
              Choose File
              <Input
                ref={fileInputRef}
                id="logoUpload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            <span className="text-sm text-gray-500">{fileName}</span>
            {logo && (
              <Button
                type="button"
                variant="ghost"
                className="text-sm text-red-600 hover:text-red-800 p-0 h-auto"
                onClick={handleRemoveLogo}
              >
                Remove
              </Button>
            )}
          </div>
          
          {logo && (
            <div className="mt-3">
              <Label htmlFor="logoSize" className="block text-xs font-medium text-gray-700 mb-1">
                Logo Size
              </Label>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-gray-500">Small</span>
                <Slider
                  id="logoSize"
                  min={5}
                  max={30}
                  step={1}
                  defaultValue={[logoSize]}
                  onValueChange={(value) => onLogoSizeChange(value[0])}
                  className="flex-grow"
                />
                <span className="text-xs text-gray-500">Large</span>
              </div>
              <p className="mt-1 text-xs text-gray-500 text-right">{logoSize}%</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
