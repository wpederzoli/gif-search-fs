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
  query ($category: String!, $limit: Int!) {
    gifs(limit: $limit, where: { category: { _like: $category } }) {
      id
      url
    }
  }
`;

const SearchAnimals: React.FC = () => {
  const [category, setSearchCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [limit, setLimit] = useState(12);
  const [result, reexecuteQuery] = useQuery<GifsResult>({
    query: GET_GIFS,
    variables: { category: `%${category}%`, limit },
  });

  const { data, fetching, error } = result;

  useEffect(() => {
    reexecuteQuery({ variables: { category: `%${category}%`, limit } });
  }, [category, reexecuteQuery]);

  const handleSearchTermChange = (value: string) => {
    setSearchValue(value);
    const debouncedQuery = debounce((value: string) => {
      setSearchCategory(value);
      setLimit(12);
    }, 1000);
    debouncedQuery(value);
  };

  const handleLoadMoreClick = () => {
    setLimit((prevLimit) => prevLimit + 12);
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
          <>
            <S.GifWrapper>
              {data.gifs.map((gif, index) => (
                <S.GifCard key={gif.id}>
                  <S.GifImage src={gif.url} alt={gif.id} delay={index * 100} />
                </S.GifCard>
              ))}
            </S.GifWrapper>
            {data.gifs.length >= limit && (
              <button onClick={handleLoadMoreClick}>Load more</button>
            )}
          </>
        )
      )}
    </S.SearchContainer>
  );
};

export default SearchAnimals;
