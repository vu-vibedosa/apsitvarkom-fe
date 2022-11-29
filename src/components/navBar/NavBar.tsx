import i18next from "i18next";
import React, { useState } from "react";
import { MdOutlineCleaningServices } from "react-icons/md";
import supportedLanguages, { languageData } from "../../languages";

const NavBar: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<
    typeof supportedLanguages[number]
  >(
    supportedLanguages.find((x) => x === i18next.language) ||
      supportedLanguages[0]
  );

  return (
    <nav className="bg-white border-b-2 border-gray-300">
      <div className="flex flex-row justify-between items-center mx-2 md:mx-6 my-3">
        <div className="flex flex-row items-center space-x-1 md:space-x-4">
          <MdOutlineCleaningServices className="h-8 md:h-12 w-auto text-gray-800" />
          <h1 className="font-semibold text-lg md:text-2xl text-gray-800">
            Apsitvarkom
          </h1>
        </div>
        <div>
          <select
            defaultValue={currentLanguage}
            className="rounded-md border-gray-300 w-full"
            onChange={(e) => {
              const newLanguage =
                supportedLanguages.find((x) => x === e.target.value) ||
                supportedLanguages[0];
              i18next.changeLanguage(newLanguage);
              setCurrentLanguage(newLanguage);
            }}
          >
            {supportedLanguages.map((language) => {
              const data = languageData[language];
              return (
                <option value={language} key={language}>
                  {data.title[currentLanguage]}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
