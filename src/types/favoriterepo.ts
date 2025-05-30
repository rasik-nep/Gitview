export interface FavoriteRepo {
  id: number;
  name: string;
  owner: string;
  description: string;
  url: string;
  notes?: string;
}
