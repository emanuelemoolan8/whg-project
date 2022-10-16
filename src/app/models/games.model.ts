export interface Games {
  id: string;
  name: string;
  image: string;
  categories: string[];
}

export interface Jackpots {
  game: string;
  amount: number;
}

export interface APIResponse<T>
{
  results: Array<T>;
}

