export type QRCodeType = "url" | "text" | "whatsapp";

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