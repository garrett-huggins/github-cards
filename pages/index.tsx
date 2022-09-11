import { useState } from "react";
import GithubCards from "../components/GithubCards";

export default function Home() {
  const [missingUser, setMissingUser] = useState(false);
  const [githubUserData, setGithubUserData] = useState({});

  // SELECTIONS
  const [userInput, setUserInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [cardTheme, setCardTheme] = useState("dark");
  const [cardPattern, setCardPattern] = useState("brick");
  const [cardDescription, setCardDescription] = useState("");

  const handleSearch = (e: any) => {
    setUserInput(e.target.value);
  };

  const handleColorSelect = (e: any) => {
    setSelectedColor(e.target.value);
  };

  const handlePatternSelect = (e: any) => {
    setCardPattern(e.target.value);
  };

  const handleThemeSelect = (e: any) => {
    setCardTheme(e.target.value);
  };

  const handleCardDescription = (e: any) => {
    setCardDescription(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setMissingUser(true);
        } else {
          setMissingUser(false);
          setGithubUserData(data);
        }
      });
  };

  return (
    <div className="flex justify-center bg-slate-600 min-h-screen text-white">
      <div>
        <div className="flex flex-col justify-center text-center mb-10">
          <h1 className="text-5xl mb-5">Github User Cards</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="text-2xl">
              Github Username
            </label>
            <input
              id="username"
              className="border border-black rounded-md w-full text-center text-black"
              type="text"
              onChange={handleSearch}
            />
          </form>
          <CardSelection label="Background Color" selection="colorpicker">
            <input
              type="color"
              id="colorpicker"
              className="w-28"
              value={selectedColor}
              onChange={handleColorSelect}
            />
          </CardSelection>
          <CardSelection
            label="Background Pattern"
            selection="cardBackgroundPattern"
          >
            <select
              id="cardBackgroundPattern"
              className="text-black border border-black w-28"
              onChange={handlePatternSelect}
            >
              <option value="brick">Brick</option>
              <option value="circles">Circles</option>
            </select>
          </CardSelection>
          <CardSelection label="Theme" selection="cardTheme">
            <select
              id="cardTheme"
              className="text-black border border-black w-28"
              onChange={handleThemeSelect}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </CardSelection>
          <CardSelection label="Card Description" selection="cardDescription">
            <input
              type="textarea"
              id="cardDescription"
              className="w-full text-black min-h-[40px] border border-black"
              onChange={handleCardDescription}
            />
          </CardSelection>
        </div>
        <div className="flex justify-center">
          <GithubCards
            cardType="TradingCard"
            user={githubUserData}
            cardDescription={cardDescription}
            theme={cardTheme}
            background={cardPattern}
            bgColor={selectedColor}
          />
        </div>
      </div>
    </div>
  );
}

const CardSelection = ({ label, selection, children }: any) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={selection} className="text-left mb-1 mt-2">
        {label}
      </label>
      {children}
    </div>
  );
};
