// Types for QR code generation
export type QRCodeType = "url" | "text" | "whatsapp";

// Data structure for QR code generation
export interface QRCodeData {
  type: QRCodeType;
  content: string;
  url: string;
  text: string;
  phone: string;
  message: string;
  size: number;
  foregroundColor: string;
  backgroundColor: string;
  logo: File | null;
  logoImg: HTMLImageElement | null;
  logoSize: number;
}
