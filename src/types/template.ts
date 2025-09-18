export interface TemplateData {
  layout: '1-column' | '2-column' | 'custom';
  colors: {
    navBackground: string;
    navText: string;
    contentBackground: string;
    contentText: string;
    accentColor: string;
  };
  content: {
    title: string;
    description: string;
    features: string[];
    images: TemplateImage[];
  };
}

export interface TemplateImage {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
}