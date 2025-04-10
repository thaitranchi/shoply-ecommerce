export interface Product {
    id: string;
    name: string;
    slug?: string;
    description?: string;
    price: number;
    imageUrl?: string;
    category?: string;
    tags?: string[];
    isBestSeller?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
  