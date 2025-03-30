import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Download, Copy, Share, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { QRCodeData } from "@/lib/utils/qr-generator";
import { toPng } from "html-to-image";

interface QRPreviewProps {
  qrCodeData: QRCodeData;
}

export function QRPreview({ qrCodeData }: QRPreviewProps) {
  const { toast } = useToast();
  const qrRef = useRef<HTMLDivElement>(null);
  const [canShare, setCanShare] = useState(false);
  const [isQRVisible, setIsQRVisible] = useState(false);
  
  // Check if Web Share API is available
  useEffect(() => {
    setCanShare(!!navigator.share);
  }, []);
  
  // Check if QR code is visible based on content
  useEffect(() => {
    setIsQRVisible(!!qrCodeData.content);
  }, [qrCodeData.content]);

  // Add logo to QR code if provided
  const renderQRCode = () => {
    const logoImage = qrCodeData.logoImg ? {
      src: qrCodeData.logoImg.src,
      height: qrCodeData.size * (qrCodeData.logoSize / 100),
      width: qrCodeData.size * (qrCodeData.logoSize / 100),
      excavate: true,
    } : undefined;

    return (
      <QRCodeSVG
        value={qrCodeData.content || " "}
        size={qrCodeData.size}
        bgColor={qrCodeData.backgroundColor}
        fgColor={qrCodeData.foregroundColor}
        level="H"
        imageSettings={logoImage}
      />
    );
  };

  const downloadQRCode = async () => {
    if (!qrRef.current || !qrCodeData.content) return;
    
    try {
      const dataUrl = await toPng(qrRef.current, { quality: 1.0 });
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = dataUrl;
      link.click();
      
      toast({
        title: "QR Code Downloaded",
        description: "Your QR code has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the QR code.",
        variant: "destructive",
      });
    }
  };

  const copyQRCode = async () => {
    if (!qrRef.current || !qrCodeData.content) return;
    
    try {
      const dataUrl = await toPng(qrRef.current, { quality: 1.0 });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      
      toast({
        title: "QR Code Copied",
        description: "Your QR code has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy the QR code. Your browser may not support this feature.",
        variant: "destructive",
      });
    }
  };

  const shareQRCode = async () => {
    if (!qrRef.current || !qrCodeData.content || !navigator.share) return;
    
    try {
      const dataUrl = await toPng(qrRef.current, { quality: 1.0 });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], "qrcode.png", { type: "image/png" });
      
      await navigator.share({
        title: "QR Code",
        text: "Check out this QR code!",
        files: [file]
      });
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Failed to share the QR code.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">QR Code Preview</h2>
        <div className="flex flex-col items-center justify-center">
          {!isQRVisible ? (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center" 
              style={{ width: `${qrCodeData.size}px`, height: `${qrCodeData.size}px` }}
            >
              <p className="text-gray-400 text-center px-4">Enter content to generate QR code</p>
            </div>
          ) : (
            <div ref={qrRef} className="flex justify-center items-center bg-white p-4 rounded-lg">
              {renderQRCode()}
            </div>
          )}
          
          {/* Actions */}
          <div className="mt-6 w-full space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                onClick={downloadQRCode}
                disabled={!isQRVisible}
                className="w-full"
              >
                <Download className="h-5 w-5 mr-2" />
                Download PNG
              </Button>
              <Button
                onClick={copyQRCode}
                disabled={!isQRVisible}
                variant="outline"
                className="w-full"
              >
                <Copy className="h-5 w-5 mr-2" />
                Copy QR Code
              </Button>
            </div>
            
            {canShare && (
              <Button
                onClick={shareQRCode}
                disabled={!isQRVisible}
                variant="outline"
                className="w-full"
              >
                <Share className="h-5 w-5 mr-2" />
                Share QR Code
              </Button>
            )}
          </div>
          
          {/* Privacy Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <Shield className="h-4 w-4 mr-1" />
              100% Private - No Data Storage
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
