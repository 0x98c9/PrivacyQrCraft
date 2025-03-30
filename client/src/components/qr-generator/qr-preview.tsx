import { QRCodeData } from "@/lib/utils/qr-generator";
import { useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, Copy, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as htmlToImage from "html-to-image";

interface QRPreviewProps {
  qrCodeData: QRCodeData;
}

export function QRPreview({ qrCodeData }: QRPreviewProps) {
  const { toast } = useToast();
  const qrRef = useRef<HTMLDivElement>(null);

  // Determine QR code content based on type
  const getQrValue = () => {
    switch (qrCodeData.type) {
      case "url":
        return qrCodeData.url;
      case "text":
        return qrCodeData.text;
      case "whatsapp":
        const phone = qrCodeData.phone.replace(/[^0-9+]/g, "");
        return `https://wa.me/${phone}${
          qrCodeData.message ? `?text=${encodeURIComponent(qrCodeData.message)}` : ""
        }`;
      default:
        return "";
    }
  };

  const qrValue = getQrValue();
  const isEmpty = qrValue.trim() === "";

  // Handle download QR code
  const handleDownload = async () => {
    if (!qrRef.current || isEmpty) return;

    try {
      // Use better settings for image conversion
      const dataUrl = await htmlToImage.toPng(qrRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        skipAutoScale: true,
        canvasWidth: containerSize * 2, // Higher resolution
        canvasHeight: containerSize * 2, // Higher resolution
        style: {
          margin: '0',
          padding: `${containerPadding}px`,
          background: qrCodeData.backgroundColor
        }
      });
      
      const link = document.createElement("a");
      link.download = `qr-code-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      
      toast({
        title: "Success",
        description: "QR code downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download QR code",
        variant: "destructive",
      });
      console.error("Error downloading QR code:", error);
    }
  };

  // Handle copy QR code
  const handleCopy = async () => {
    if (!qrRef.current || isEmpty) return;

    try {
      // Use better settings for image conversion
      const dataUrl = await htmlToImage.toPng(qrRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        skipAutoScale: true,
        canvasWidth: containerSize * 2,
        canvasHeight: containerSize * 2,
        style: {
          margin: '0',
          padding: `${containerPadding}px`,
          background: qrCodeData.backgroundColor
        }
      });
      
      // Create a blob from the data URL
      const blobBin = atob(dataUrl.split(",")[1]);
      const array = [];
      for (let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      const blob = new Blob([new Uint8Array(array)], { type: "image/png" });
      
      // Copy the blob to clipboard
      const clipboardItemData = { [blob.type]: blob };
      await navigator.clipboard.write([new ClipboardItem(clipboardItemData)]);
      
      toast({
        title: "Success",
        description: "QR code copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy QR code",
        variant: "destructive",
      });
      console.error("Error copying QR code:", error);
    }
  };

  // Handle sharing QR code
  const handleShare = async () => {
    if (!qrRef.current || isEmpty) return;
    
    if ('share' in navigator) {
      try {
        // Use better settings for image conversion
        const dataUrl = await htmlToImage.toPng(qrRef.current, {
          quality: 1.0,
          pixelRatio: 2,
          skipAutoScale: true,
          canvasWidth: containerSize * 2,
          canvasHeight: containerSize * 2,
          style: {
            margin: '0',
            padding: `${containerPadding}px`,
            background: qrCodeData.backgroundColor
          }
        });
        
        // Convert data URL to Blob
        const blobBin = atob(dataUrl.split(",")[1]);
        const array = [];
        for (let i = 0; i < blobBin.length; i++) {
          array.push(blobBin.charCodeAt(i));
        }
        const blob = new Blob([new Uint8Array(array)], { type: "image/png" });
        const file = new File([blob], "qr-code.png", { type: "image/png" });
        
        await navigator.share({
          title: "My QR Code",
          files: [file],
        });
        
        toast({
          title: "Success",
          description: "QR code shared successfully",
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          toast({
            title: "Error",
            description: "Failed to share QR code",
            variant: "destructive",
          });
          console.error("Error sharing QR code:", error);
        }
      }
    } else {
      toast({
        title: "Error",
        description: "Sharing is not supported on this device",
        variant: "destructive",
      });
    }
  };

  // Calculate QR code sizes to prevent cutting off
  const actualQrSize = qrCodeData.size;
  const containerPadding = 16; // 16px padding
  const containerSize = actualQrSize + (containerPadding * 2);

  return (
    <div className="flex flex-col items-center">
      <div
        ref={qrRef}
        className="qr-code-container bg-background border border-border rounded-md overflow-hidden"
        style={{ 
          width: `${containerSize}px`, 
          height: `${containerSize}px`,
          padding: `${containerPadding}px`,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {!isEmpty ? (
          <QRCodeCanvas
            value={qrValue}
            size={actualQrSize}
            level="H"
            fgColor={qrCodeData.foregroundColor}
            bgColor={qrCodeData.backgroundColor}
            imageSettings={
              qrCodeData.logo && qrCodeData.logoImg
                ? {
                    src: URL.createObjectURL(qrCodeData.logo),
                    x: undefined,
                    y: undefined,
                    height: qrCodeData.logoSize,
                    width: qrCodeData.logoSize,
                    excavate: true,
                  }
                : undefined
            }
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full text-center p-4 text-gray-400">
            {qrCodeData.type === "url"
              ? "Enter a URL to generate QR code"
              : qrCodeData.type === "text"
              ? "Enter text to generate QR code"
              : "Enter a phone number to generate QR code"}
          </div>
        )}
      </div>

      <div className="actions-container flex flex-wrap gap-2 mt-4 justify-center">
        <Button
          onClick={handleDownload}
          disabled={isEmpty}
          variant="secondary"
          size="sm"
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
        <Button
          onClick={handleCopy}
          disabled={isEmpty}
          variant="secondary"
          size="sm"
          className="flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy
        </Button>
        {'share' in navigator && (
          <Button
            onClick={handleShare}
            disabled={isEmpty}
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        )}
      </div>
    </div>
  );
}