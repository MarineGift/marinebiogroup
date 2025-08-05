export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  language: string;
  createdAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}

export type InquiryType = 
  | 'General Inquiry'
  | 'Product Information'
  | 'Partnership'
  | 'Investment'
  | 'Technical Support'
  | 'Media Inquiry';