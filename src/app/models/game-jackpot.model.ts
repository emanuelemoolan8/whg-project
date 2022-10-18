export interface Game {
  id: string;
  name: string;
  image: string;
  categories: string[];
  amount?: number;
}

export interface Jackpot {
  game: string;
  amount: number;
}

export interface categoryGames
{
  category: string;
  games: Game[];
}

