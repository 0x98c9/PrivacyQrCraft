import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { QRTypeSelector } from "@/components/qr-generator/qr-type-selector";
import { InputFields } from "@/components/qr-generator/input-fields";
import { CustomizationOptions } from "@/components/qr-generator/customization-options";
import { QRPreview } from "@/components/qr-generator/qr-preview";
import { useState, useEffect } from "react";
import { QRCodeType, QRCodeData } from "@/lib/utils/qr-generator";

const Home = () => {
  // QR code state
  const [qrType, setQrType] = useState<QRCodeType>("url");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [qrSize, setQrSize] = useState(250);
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [logoSize, setLogoSize] = useState(15);
  const [qrContent, setQrContent] = useState("");

  // Generate QR code content based on type and inputs
  useEffect(() => {
    let content = "";
    
    if (qrType === "url") {
      content = url;
    } else if (qrType === "text") {
      content = text;
    } else if (qrType === "whatsapp") {
      if (phone) {
        // Format WhatsApp URL
        const formattedPhone = phone.replace(/[^0-9+]/g, "");
        content = `https://wa.me/${formattedPhone}`;
        if (message) {
          content += `?text=${encodeURIComponent(message)}`;
        }
      }
    }
    
    setQrContent(content);
  }, [qrType, url, text, phone, message]);

  // Handle logo upload
  const handleLogoUpload = (file: File | null) => {
    setLogo(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setLogoImg(img);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      setLogoImg(null);
    }
  };

  // Create QR code data object for passing to components
  const qrCodeData: QRCodeData = {
    type: qrType,
    content: qrContent,
    url,
    text,
    phone,
    message,
    size: qrSize,
    foregroundColor,
    backgroundColor,
    logo,
    logoImg,
    logoSize
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Left Side: Controls */}
            <div className="space-y-6 mb-8 lg:mb-0">
              <QRTypeSelector 
                qrType={qrType}
                onTypeChange={setQrType}
              />
              
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
                logoSize={logoSize}
                onLogoSizeChange={setLogoSize}
                onLogoUpload={handleLogoUpload}
                logo={logo}
              />
            </div>
            
            {/* Right Side: QR Code Preview */}
            <QRPreview qrCodeData={qrCodeData} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
