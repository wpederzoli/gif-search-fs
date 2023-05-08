import React from "react";
import { IconType } from "react-icons";
import * as S from "./IconComponent.styles";

type IconProps = {
  icon: IconType;
  onClick: () => void;
};

const IconComponent: React.FC<IconProps> = ({ icon, onClick }) => {
  return (
    <S.IconContainer onClick={onClick}>
      {React.createElement(icon, { size: 50 })}
    </S.IconContainer>
  );
};

export default IconComponent;
