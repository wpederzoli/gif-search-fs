import React, { useEffect, useState } from "react";
import { useQuery, gql } from "urql";
import { debounce } from "lodash";
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
  const [category, setSearchCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [result, reexecuteQuery] = useQuery<GifsResult>({
    query: GET_GIFS,
    variables: { category: `%${category}%` },
  });

  const { data, fetching, error } = result;

  useEffect(() => {
    reexecuteQuery({ variables: { category: `%${category}%` } });
  }, [category, reexecuteQuery]);

  const handleSearchTermChange = (value: string) => {
    setSearchValue(value);
    const debouncedQuery = debounce(
      (value: string) => setSearchCategory(value),
      1000
    );
    debouncedQuery(value);
  };

  if (error) return <div>Error... {error.message}</div>;

  return (
    <S.SearchContainer>
      <S.InputWrapper>
        <InputField
          placeholder="search GIFs"
          onChange={handleSearchTermChange}
          value={searchValue}
        />
      </S.InputWrapper>
      {fetching ? (
        <div>Loading...</div>
      ) : (
        data && (
          <S.GifWrapper>
            {data.gifs.map((gif, index) => (
              <S.GifCard key={gif.id}>
                <S.GifImage src={gif.url} alt={gif.id} delay={index * 100} />
              </S.GifCard>
            ))}
          </S.GifWrapper>
        )
      )}
    </S.SearchContainer>
  );
};

export default SearchAnimals;
