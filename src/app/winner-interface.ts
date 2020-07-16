export interface WinnerLaureates {
  firstname: string;
  id: string;
  motivation: string;
  share: string;
  surname: string;
}

export interface WinnersInterface {
  category: string;
  laureates: WinnerLaureates[];
  year: string;
}
export interface WinnerResults {
  firstname: string;
  id: string;
  motivation: string;
  surname: string;
  category: string;
  year: string;
}
