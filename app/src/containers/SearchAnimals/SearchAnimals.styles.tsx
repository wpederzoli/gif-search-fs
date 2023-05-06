import React from "react";
import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f2d8e6;
  min-height: 100vh;
  padding: 20px;
`;

export const SearchTitle = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  color: #ff6f91;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75%;
  margin-bottom: 20px;
`;

export const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

export const Gif = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;
