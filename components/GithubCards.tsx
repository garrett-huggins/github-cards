import Image from "next/image";
import { CardUserInputs, CardDataTypes } from "../types/CardTypes";

export default function GithubCards({
  cardType,
  user,
  background,
  bgColor,
  theme,
  cardDescription,
}: CardUserInputs) {
  // Set Theme and Background
  const PrimaryTheme = {
    text: theme == "dark" ? "text-white" : "text-black",
    bg: theme == "dark" ? "bg-black" : "bg-white",
  };
  const SecondaryTheme = {
    text: theme == "dark" ? "text-black" : "text-white",
    bg: theme == "dark" ? "bg-white" : "bg-black",
  };

  const BackgroundDesign = `url('/backgrounds/${background}_${theme}.png')`;

  // contain finalized data used to render card
  const CardData = {
    user,
    PrimaryTheme,
    SecondaryTheme,
    bgColor,
    BackgroundDesign,
    background,
    cardDescription,
  };

  // CARD HANDLER
  if (Object.keys(user).length === 0) {
    return <div>missing</div>;
  } else {
    if (cardType == "TradingCard") {
      return <TradingCard CardData={CardData} />;
    } else return null;
  }
}

// CARD TYPES //

const TradingCard = ({ CardData }: CardDataTypes) => {
  return (
    <div
      style={{
        backgroundColor: CardData.bgColor,
        backgroundImage: CardData.BackgroundDesign,
      }}
      className={`max-w-[480px] ${CardData.PrimaryTheme.text} rounded-2xl overflow-hidden`}
    >
      <div className={`w-full h-full ${CardData.background}`}>
        <div className="flex justify-center avatar-clip">
          <Image src={CardData.user.avatar_url} width={450} height={450} />
        </div>
        <div className={`relative bottom-12 ${CardData.PrimaryTheme.bg}`}>
          <p className="text-center text-3xl">{CardData.user.login}</p>
        </div>
        <div className={`${CardData.PrimaryTheme.bg} mx-8 mb-4 rounded-lg p-2`}>
          <p className="text-center">{CardData.cardDescription}</p>
          <div className="flex flex-wrap justify-between">
            <div
              className={`items-center justify-center flex flex-col rounded-full ${CardData.SecondaryTheme.bg} p-2 ${CardData.SecondaryTheme.text}`}
            >
              <p>Followers</p>
              <p>{CardData.user.followers}</p>
            </div>
            <div
              className={`items-center justify-center flex flex-col rounded-full ${CardData.SecondaryTheme.bg} p-2 ${CardData.SecondaryTheme.text}`}
            >
              <p>Repos</p>
              <p>{CardData.user.public_repos}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
