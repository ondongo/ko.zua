import { Subcategory } from "./subcategory";

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  imageCarousel: string[];
  filters: string[];
  subcategories: Subcategory[];
}
