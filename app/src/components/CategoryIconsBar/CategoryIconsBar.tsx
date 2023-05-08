import React from "react";
import { FaCat, FaDog } from "react-icons/fa";
import { GiLion, GiMonkey, GiElephant } from "react-icons/gi";
import IconComponent from "../IconComponent/IconComponent";
import * as S from "./CategoryIconsBar.styles";

export const CategoryIconsBar = () => {
  return (
    <S.Bar>
      <IconComponent icon={FaDog} />
      <IconComponent icon={FaCat} />
      <IconComponent icon={GiLion} />
      <IconComponent icon={GiElephant} />
      <IconComponent icon={GiMonkey} />
    </S.Bar>
  );
};
