import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { QRTypeSelector } from "@/components/qr-generator/qr-type-selector";
import { InputFields } from "@/components/qr-generator/input-fields";
import { CustomizationOptions } from "@/components/qr-generator/customization-options";
import { QRPreview } from "@/components/qr-generator/qr-preview";
import { QRCodeType, QRCodeData } from "@/lib/utils/qr-generator";

export default function Home() {
  // QR code type state
  const [qrType, setQrType] = useState<QRCodeType>("url");
  
  // Input fields state
  const [url, setUrl] = useState("https://");
  const [text, setText] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  // Customization options state
  const [qrSize, setQrSize] = useState(200);
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [logoSize, setLogoSize] = useState(50);

  // Handle logo upload
  useEffect(() => {
    if (logo) {
      const img = new Image();
      img.onload = () => {
        setLogoImg(img);
      };
      img.src = URL.createObjectURL(logo);

      // Clean up on unmount
      return () => {
        URL.revokeObjectURL(img.src);
      };
    } else {
      setLogoImg(null);
    }
  }, [logo]);

  // Update QR code content based on type
  const getQrContent = () => {
    switch (qrType) {
      case "url":
        return url;
      case "text":
        return text;
      case "whatsapp":
        const phoneNumber = phone.replace(/[^0-9+]/g, "");
        return `https://wa.me/${phoneNumber}${
          message ? `?text=${encodeURIComponent(message)}` : ""
        }`;
      default:
        return "";
    }
  };

  // QR code data
  const qrCodeData: QRCodeData = {
    type: qrType,
    content: getQrContent(),
    url,
    text,
    phone,
    message,
    size: qrSize,
    foregroundColor,
    backgroundColor,
    logo,
    logoImg,
    logoSize,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
            <div className="qr-container">
              <h2 className="text-2xl font-bold text-foreground mb-6">Create QR Code</h2>
              
              <QRTypeSelector qrType={qrType} onTypeChange={setQrType} />
              
              <InputFields
                qrType={qrType}
                url={url}
                onUrlChange={setUrl}
                text={text}
                onTextChange={setText}
                phone={phone}
                onPhoneChange={setPhone}
                message={message}
                onMessageChange={setMessage}
              />
              
              <CustomizationOptions
                qrSize={qrSize}
                onQrSizeChange={setQrSize}
                foregroundColor={foregroundColor}
                onForegroundColorChange={setForegroundColor}
                backgroundColor={backgroundColor}
                onBackgroundColorChange={setBackgroundColor}
                logo={logo}
                onLogoUpload={setLogo}
                logoSize={logoSize}
                onLogoSizeChange={setLogoSize}
              />
            </div>
            
            <div className="qr-container flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold text-foreground mb-6">Preview</h2>
              <QRPreview qrCodeData={qrCodeData} />
            </div>
          </div>
          
          <div className="mt-12 bg-muted/50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground mb-3">Privacy First</h2>
            <p className="text-muted-foreground">
              This QR code generator works entirely in your browser. No data is sent to or stored on any server. 
              Your QR codes and their contents are never tracked, stored, or shared with third parties.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}