import styled, { keyframes } from "styled-components";

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border-radius: 50%;
  border: 2px solid #a8e6ce;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #a8e6ce;
    color: #3d405b;

    svg {
      animation: ${rotateAnimation} 2s linear infinite;
    }
  }

  svg {
    color: #6dc5a3;
    font-size: 24px;
  }
  }
`;
