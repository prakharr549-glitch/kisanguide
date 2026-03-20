/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MandiPrice {
  crop: string;
  price: string;
  unit: string;
  change: 'up' | 'down' | 'stable';
  location: string;
  state: string;
  district: string;
}

export interface Disease {
  id: string;
  crop: string;
  symptom: string;
  name: string;
  solution: string;
  image: string;
}

export interface Scheme {
  id: string;
  title: string;
  eligibility: string[];
  benefits: string[];
  howToApply: string;
  documents: string[];
}

export interface BusinessIdea {
  id: string;
  title: string;
  investment: string;
  profit: string;
  risk: 'Low' | 'Medium' | 'High';
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
}

export interface CropSuggestion {
  month: string;
  crops: string[];
  tips: string[];
}
