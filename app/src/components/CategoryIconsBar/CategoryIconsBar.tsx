import React from "react";
import { FaCat, FaDog } from "react-icons/fa";
import { GiLion, GiMonkey, GiElephant } from "react-icons/gi";
import IconComponent from "../IconComponent/IconComponent";
import * as S from "./CategoryIconsBar.styles";
import useGifsContext from "../../contexts/Gifs/GifContext";

export const CategoryIconsBar = () => {
  const { setCategory, setOffset, setLoadedGifs } = useGifsContext();

  const handleOnClick = (category: string) => {
    setLoadedGifs([]);
    setOffset(0);
    setCategory(category);
  };

  return (
    <S.Bar>
      <IconComponent icon={FaDog} onClick={() => handleOnClick("dog")} />
      <IconComponent icon={FaCat} onClick={() => handleOnClick("cat")} />
      <IconComponent icon={GiLion} onClick={() => handleOnClick("lion")} />
      <IconComponent
        icon={GiElephant}
        onClick={() => handleOnClick("elephant")}
      />
      <IconComponent icon={GiMonkey} onClick={() => handleOnClick("monkey")} />
    </S.Bar>
  );
};
