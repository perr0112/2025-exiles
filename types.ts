export interface StorySection {
  title?: string;
  content: string;
  image?: string; // Made optional since carousel uses gallery
  type: 'standard' | 'quote' | 'full' | 'video_placeholder' | 'audio' | 'carousel';
  alignment?: 'left' | 'right';
  audioSrc?: string; // URL for the audio file
  gallery?: string[]; // Array of images for the carousel
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time?: string;
}

export interface Person {
  id: string;
  name: string;
  age: number;
  origin: string;
  yearsInFrance: number;
  thumbnail: string;
  heroImage: string;
  quote: string;
  story: StorySection[];
  chatMessages: ChatMessage[];
}