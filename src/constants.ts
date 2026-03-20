/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MandiPrice, Disease, Scheme, BusinessIdea, BlogPost, CropSuggestion } from './types';

export const MANDI_PRICES: MandiPrice[] = [
  { crop: 'Wheat (गेहूं)', price: '2,275', unit: 'Quintal', change: 'up', location: 'Lucknow', state: 'Uttar Pradesh', district: 'Lucknow' },
  { crop: 'Rice (चावल)', price: '2,183', unit: 'Quintal', change: 'stable', location: 'Patna', state: 'Bihar', district: 'Patna' },
  { crop: 'Potato (आलू)', price: '1,200', unit: 'Quintal', change: 'down', location: 'Agra', state: 'Uttar Pradesh', district: 'Agra' },
  { crop: 'Tomato (टमाटर)', price: '1,500', unit: 'Quintal', change: 'up', location: 'Nashik', state: 'Maharashtra', district: 'Nashik' },
  { crop: 'Onion (प्याज)', price: '2,400', unit: 'Quintal', change: 'up', location: 'Indore', state: 'Madhya Pradesh', district: 'Indore' },
  { crop: 'Garlic (लहसुन)', price: '12,000', unit: 'Quintal', change: 'up', location: 'Mandsaur', state: 'Madhya Pradesh', district: 'Mandsaur' },
  { crop: 'Mustard (सरसों)', price: '5,450', unit: 'Quintal', change: 'down', location: 'Bharatpur', state: 'Rajasthan', district: 'Bharatpur' },
  { crop: 'Soybean (सोयाबीन)', price: '4,600', unit: 'Quintal', change: 'stable', location: 'Ujjain', state: 'Madhya Pradesh', district: 'Ujjain' },
  { crop: 'Cotton (कपास)', price: '7,200', unit: 'Quintal', change: 'up', location: 'Sirsa', state: 'Haryana', district: 'Sirsa' },
  { crop: 'Maize (मक्का)', price: '2,100', unit: 'Quintal', change: 'stable', location: 'Gulabbagh', state: 'Bihar', district: 'Purnia' },
  { crop: 'Wheat (गेहूं)', price: '2,300', unit: 'Quintal', change: 'up', location: 'Kanpur', state: 'Uttar Pradesh', district: 'Kanpur' },
  { crop: 'Rice (चावल)', price: '2,200', unit: 'Quintal', change: 'stable', location: 'Gaya', state: 'Bihar', district: 'Gaya' },
  { crop: 'Onion (प्याज)', price: '2,500', unit: 'Quintal', change: 'up', location: 'Pune', state: 'Maharashtra', district: 'Pune' },
];

export const DISEASES: Disease[] = [
  {
    id: '1',
    crop: 'Wheat',
    symptom: 'Yellow stripes on leaves',
    name: 'Yellow Rust',
    solution: 'Apply Propiconazole 25 EC @ 0.1% concentration. Avoid excessive nitrogen.',
    image: 'https://picsum.photos/seed/wheat-rust/400/300'
  },
  {
    id: '2',
    crop: 'Rice',
    symptom: 'Brown spots on leaves',
    name: 'Brown Spot',
    solution: 'Use certified seeds and apply balanced fertilizers. Spray Carbendazim if severe.',
    image: 'https://picsum.photos/seed/rice-spot/400/300'
  },
  {
    id: '3',
    crop: 'Potato',
    symptom: 'Dark water-soaked spots on leaves',
    name: 'Late Blight',
    solution: 'Spray Mancozeb @ 2g/liter of water. Ensure proper drainage.',
    image: 'https://picsum.photos/seed/potato-blight/400/300'
  },
  {
    id: '4',
    crop: 'Tomato',
    symptom: 'Curling of leaves',
    name: 'Leaf Curl Virus',
    solution: 'Control whiteflies using Neem oil or Imidacloprid. Remove infected plants.',
    image: 'https://picsum.photos/seed/tomato-curl/400/300'
  }
];

export const SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan',
    title: 'PM-KISAN Samman Nidhi',
    eligibility: ['Small and marginal farmers', 'Land ownership required', 'Indian citizenship'],
    benefits: ['₹6,000 per year in 3 installments', 'Direct Benefit Transfer (DBT)'],
    howToApply: 'Register on PM-KISAN portal (pmkisan.gov.in) or visit nearest CSC center.',
    documents: ['Aadhar Card', 'Land Records (Khasra/Khatauni)', 'Bank Account Details', 'Mobile Number']
  },
  {
    id: 'soil-health',
    title: 'Soil Health Card Scheme',
    eligibility: ['All farmers across the country'],
    benefits: ['Detailed soil analysis (12 parameters)', 'Fertilizer recommendations', 'Improved soil health'],
    howToApply: 'Contact local agriculture department or Soil Testing Lab.',
    documents: ['Aadhar Card', 'Soil Sample from field']
  },
  {
    id: 'crop-insurance',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    eligibility: ['All farmers including sharecroppers', 'Crops must be notified'],
    benefits: ['Financial support for crop loss', 'Low premium rates (1.5% - 5%)'],
    howToApply: 'Apply through bank or PMFBY portal.',
    documents: ['Land records', 'Sowing certificate', 'Bank passbook']
  }
];

export const BUSINESS_IDEAS: BusinessIdea[] = [
  {
    id: 'mushroom',
    title: 'Mushroom Farming',
    investment: '₹50,000 - ₹1,00,000',
    profit: '₹20,000 - ₹40,000 per month',
    risk: 'Medium',
    description: 'Growing mushrooms in a controlled environment. High demand in urban areas and hotels. Requires minimal land.'
  },
  {
    id: 'dairy',
    title: 'Dairy Farming',
    investment: '₹5,00,000+',
    profit: '₹50,000 - ₹1,50,000 per month',
    risk: 'Medium',
    description: 'Raising cattle for milk production. Requires space, initial capital, and knowledge of animal husbandry.'
  },
  {
    id: 'fish',
    title: 'Fish Farming (Pisciculture)',
    investment: '₹2,00,000 - ₹5,00,000',
    profit: '₹1,00,000 - ₹3,00,000 per year',
    risk: 'Medium',
    description: 'Raising fish in ponds or tanks. Biofloc technology is gaining popularity for high-density farming.'
  },
  {
    id: 'organic',
    title: 'Organic Vegetable Farming',
    investment: '₹1,00,000 - ₹2,00,000',
    profit: '₹30,000 - ₹60,000 per month',
    risk: 'Low',
    description: 'Growing vegetables without chemical fertilizers. High demand for organic produce in cities.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'गेहूं की खेती कैसे करें? (How to farm Wheat?)',
    excerpt: 'गेहूं की उन्नत खेती के लिए सही समय और खाद का चुनाव बहुत जरूरी है। जानिए बुवाई से कटाई तक की पूरी जानकारी...',
    content: `गेहूं भारत की एक प्रमुख रबी फसल है। इसकी खेती के लिए दोमट मिट्टी सबसे उपयुक्त होती है। 
    
    1. बुवाई का समय: नवंबर का महीना सबसे अच्छा माना जाता है।
    2. बीज की मात्रा: 40-50 किलो प्रति एकड़।
    3. सिंचाई: पहली सिंचाई बुवाई के 21 दिन बाद (CRI स्टेज) पर करनी चाहिए।
    4. खाद: 50 किलो DAP और 100 किलो यूरिया प्रति एकड़।
    
    उन्नत किस्मों का चुनाव करें जैसे HD 2967, DBW 187 आदि।`,
    date: '2024-03-20',
    category: 'Farming Tips',
    image: 'https://picsum.photos/seed/wheat-field/800/400'
  },
  {
    id: '2',
    title: 'Best Fertilizer Timing for Paddy (धान के लिए खाद का सही समय)',
    excerpt: 'Timing is everything when it comes to paddy fertilization. Learn when to apply Urea, DAP, and Potash...',
    content: `Paddy requires nitrogen at different stages for maximum yield.
    
    - Basal Dose: Apply DAP and Potash at the time of puddling.
    - First Top Dressing: Apply Urea 20-25 days after transplanting.
    - Second Top Dressing: Apply Urea 45-50 days after transplanting (Panicle Initiation stage).
    
    Always ensure there is standing water in the field during fertilizer application for better absorption.`,
    date: '2024-03-18',
    category: 'Fertilizers',
    image: 'https://picsum.photos/seed/paddy/800/400'
  },
  {
    id: '3',
    title: 'PM-KISAN 16th Installment Update',
    excerpt: 'Check your status for the upcoming PM-KISAN installment. Important dates and KYC requirements...',
    content: 'The government is set to release the 16th installment of PM-KISAN. Farmers must ensure their e-KYC is complete to receive the benefits directly in their bank accounts.',
    date: '2024-03-15',
    category: 'News',
    image: 'https://picsum.photos/seed/money/800/400'
  },
  {
    id: '4',
    title: 'Mushroom Farming: A Profitable Side Business',
    excerpt: 'How to start mushroom farming with low investment. Step-by-step guide for beginners...',
    content: 'Mushroom farming can be started in a small room. It requires compost, spawn, and a controlled temperature. Within 30-40 days, you can start harvesting.',
    date: '2024-03-12',
    category: 'Business',
    image: 'https://picsum.photos/seed/mushroom/800/400'
  },
  {
    id: '5',
    title: 'Organic Farming Tips for Summer',
    excerpt: 'Protect your crops from heatwaves using organic mulching and drip irrigation...',
    content: 'Summer heat can damage young plants. Use straw mulching to retain moisture and apply liquid organic fertilizers like Jeevamrut.',
    date: '2024-03-10',
    category: 'Organic',
    image: 'https://picsum.photos/seed/organic/800/400'
  },
  {
    id: '6',
    title: 'Tomato Price Hike: Reasons and Forecast',
    excerpt: 'Why tomato prices are rising in mandis across India. Expert analysis on supply chain issues...',
    content: 'Unseasonal rains have affected tomato production in major growing regions like Nashik and Kolar, leading to a supply shortage.',
    date: '2024-03-08',
    category: 'Market',
    image: 'https://picsum.photos/seed/tomato/800/400'
  },
  {
    id: '7',
    title: 'Soil Testing: Why it is Mandatory',
    excerpt: 'Save money on fertilizers by testing your soil. How to get a Soil Health Card...',
    content: 'Soil testing reveals nutrient deficiencies. Applying only what is needed saves costs and prevents soil degradation.',
    date: '2024-03-05',
    category: 'Soil',
    image: 'https://picsum.photos/seed/soil/800/400'
  },
  {
    id: '8',
    title: 'Modern Irrigation Techniques',
    excerpt: 'Drip vs Sprinkler irrigation. Which one is best for your farm and how to get subsidy...',
    content: 'Drip irrigation saves up to 70% water. The government provides up to 80% subsidy under PMKSY.',
    date: '2024-03-02',
    category: 'Technology',
    image: 'https://picsum.photos/seed/irrigation/800/400'
  }
];

export const CROP_SUGGESTIONS: CropSuggestion[] = [
  {
    month: 'March',
    crops: ['Moong Dal', 'Sunflower', 'Watermelon', 'Cucumber'],
    tips: ['Focus on irrigation as temperature rises.', 'Prepare soil for Zaid crops.']
  },
  {
    month: 'April',
    crops: ['Maize', 'Cotton', 'Okra'],
    tips: ['Deep plowing to kill pests.', 'Soil testing before sowing.']
  }
];
