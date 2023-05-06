import React, { useState } from "react";
import { useQuery, gql } from "urql";
import InputField from "../../components/InputField";
import * as S from "./SearchAnimals.styles";

type Gif = {
  id: string;
  url: string;
};

type GifsResult = {
  gifs: Gif[];
};

const GET_GIFS = gql`
  query ($category: String!) {
    gifs(limit: 12, where: { category: { _like: $category } }) {
      id
      url
    }
  }
`;

const SearchAnimals: React.FC = () => {
  const [category, setSearchTerm] = useState("");
  const [result, reexecuteQuery] = useQuery<GifsResult>({
    query: GET_GIFS,
    variables: { category: `%${category}%` },
  });

  const { data, fetching, error } = result;

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
    reexecuteQuery({ variables: { filter: value } });
  };

  if (error) return <div>Error... {error.message}</div>;

  return (
    <S.SearchContainer>
      <S.SearchTitle>Search animals GIFs</S.SearchTitle>
      <S.InputWrapper>
        <InputField
          placeholder="search GIFs"
          onChange={handleSearchTermChange}
          value={category}
        />
      </S.InputWrapper>
      {fetching ? (
        <div>Loading...</div>
      ) : (
        data && (
          <S.ResultsContainer>
            {data.gifs.map((gif) => (
              <S.Gif src={gif.url} alt={gif.id} />
            ))}
          </S.ResultsContainer>
        )
      )}
    </S.SearchContainer>
  );
};

export default SearchAnimals;
