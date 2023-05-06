import React from "react";
import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #4a4e69, #c9ada7);
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
  background-color: #fff;
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
