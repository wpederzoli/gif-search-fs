import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const GifImage = styled.img`
  width: 100%;
  height: 200px;
  opacity: 1;
  object-fit: cover;
  border-radius: 10px;
`;

export const GifImageAnimate = styled(GifImage) <{ delay: number }>`
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: ${({ delay }) => delay}ms;
  opacity: 0;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #c8ebc5, #f8fff7);
  min-height: 100vh;
  padding: 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75%;
  margin-bottom: 20px;
`;

export const GifWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

export const GifCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  &:hover {
    transform: scale(1.05);
  }
`;
