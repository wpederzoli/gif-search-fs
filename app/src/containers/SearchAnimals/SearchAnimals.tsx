import React, { useEffect, useRef, useState } from "react";
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
  query ($category: String!, $offset: Int!) {
    gifs(
      where: { category: { _like: $category } }
      order_by: { id: asc }
      offset: $offset
      limit: 12
    ) {
      id
      url
    }
  }
`;

const SearchAnimals: React.FC = () => {
  const [category, setSearchCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [loadedGifs, setLoadedGifs] = useState<Gif[]>([]);

  const [result, reexecuteQuery] = useQuery<GifsResult>({
    query: GET_GIFS,
    variables: { category: `%${category}%`, offset },
    pause: true,
  });

  const lastIndex = useRef<number>(0);

  const { data, fetching, error } = result;

  useEffect(() => {
    reexecuteQuery({ variables: { category: `%${category}%`, offset } });
  }, [category, reexecuteQuery]);

  useEffect(() => {
    setLoadedGifs((prev) => {
      const newLoadedGifs = [...prev, ...(data?.gifs ?? [])];
      lastIndex.current = newLoadedGifs.length - 1;
      return newLoadedGifs;
    });
  }, [data]);

  const handleSearchTermChange = (value: string) => {
    setSearchValue(value);
    //TODO: cancel operation if new input within execution time
    const debouncedQuery = debounce((value: string) => {
      setSearchCategory(value);
      setOffset(0);
      setLoadedGifs([]);
      lastIndex.current = 0;
    }, 1000);
    debouncedQuery(value);
  };

  const handleLoadMoreClick = () => {
    setOffset((prevOffset) => prevOffset + 12);
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
        loadedGifs && (
          <>
            <S.GifWrapper>
              {loadedGifs.map((gif, index) => (
                <S.GifCard key={gif.id} delay={index * 10}>
                  {index > lastIndex.current - 12 ? (
                    <S.GifImageAnimate
                      src={gif.url}
                      alt={gif.id}
                      delay={(index - (lastIndex.current - 12)) * 100}
                    />
                  ) : (
                    <S.GifImage src={gif.url} alt={gif.id} />
                  )}
                </S.GifCard>
              ))}
            </S.GifWrapper>
            {loadedGifs.length && (
              <button onClick={handleLoadMoreClick}>Load more</button>
            )}
          </>
        )
      )}
    </S.SearchContainer>
  );
};

export default SearchAnimals;
