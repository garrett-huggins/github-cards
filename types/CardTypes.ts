export type CardUserInputs = {
  cardType: string;
  user: any;
  background: string;
  bgColor: string;
  theme: string;
  cardDescription: string;
};

export type CardDataTypes = {
  CardData: {
    user: {
      login: string;
      avatar_url: string;
      followers: string;
      public_repos: string;
    };
    PrimaryTheme: {
      text: string;
      bg: string;
    };
    SecondaryTheme: {
      text: string;
      bg: string;
    };
    bgColor: string;
    BackgroundDesign: string;
    background: string;
    cardDescription: string;
  };
};
