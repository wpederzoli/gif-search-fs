import React from "react";
import { IconType } from "react-icons";
import * as S from "./IconComponent.styles";

type IconProps = {
  icon: IconType;
};

const IconComponent: React.FC<IconProps> = ({ icon }) => {
  return (
    <S.IconContainer>{React.createElement(icon, { size: 50 })}</S.IconContainer>
  );
};

export default IconComponent;
