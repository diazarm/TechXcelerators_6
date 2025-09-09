import React from "react";
import { useResponsive, useHeader } from "../../hooks";
import { SearchBar } from "../../components";
import type { HeaderProps } from "./types";


export const Header: React.FC<HeaderProps> = ({ title }) => {
  const responsive = useResponsive();
  const { header } = useHeader();

  return (
    <header className="bg-white">
      {/* SearchBar primero */}
      <div className="bg-white py-2">
        <div className={`${responsive.container}`}>
          <div className="flex justify-center items-center">
            <SearchBar />
          </div>
        </div>
      </div>
      
      {/* Título después */}
      <div className={`${responsive.container} py-4`}>
        <div className="flex justify-center">
          <h1 className="text-[#585D8A] font-bold mb-4 w-[763px] h-[46px] text-2xl leading-[46px] text-center">
            {header.title || title || ''}
          </h1>
        </div>
      </div>
    </header>
  );
};