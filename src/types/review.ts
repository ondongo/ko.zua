export type Rating = {
  id: string;
  vehicleId?: string;
  immobilierId?: string;
  stars: number;
  authorName: string;
  content: string;
  createdAt: Date;
};
