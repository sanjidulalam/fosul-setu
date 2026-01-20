
export type AppLanguage = 'en' | 'bn';
export type AppRole = 'farmer' | 'buyer' | 'seller';

export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: string;
  expectedPrice: number;
  status: 'Growing' | 'Harvested' | 'Sold';
  image: string;
}

export interface Loan {
  id: string;
  amount: number;
  interest: number;
  disbursedDate: string;
  status: 'Active' | 'Paid';
}

export interface WeatherData {
  temp: number;
  condition: string;
  location: string;
}

export interface Milestone {
  year: string;
  title: string;
  details: string;
}

export interface TeamMember {
  name: string;
  role: string;
  specialization: string;
  focus: string;
  image: string;
}

export interface RevenueProjection {
  month: string;
  subscribers: number;
  arpu: number;
  revenue: number;
}
