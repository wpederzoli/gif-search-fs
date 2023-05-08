import React, { useEffect, useRef, useState } from "react";
import { useQuery, gql } from "urql";
import { debounce } from "lodash";
import InputField from "../../components/InputField";
import * as S from "./SearchAnimals.styles";
import { CategoryIconsBar } from "../../components/CategoryIconsBar/CategoryIconsBar";

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

const CHUNK_SIZE = 12;

const SearchAnimals: React.FC = () => {
  const [category, setSearchCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  //TODO: useref for offset
  const [offset, setOffset] = useState(0);
  const [loadedGifs, setLoadedGifs] = useState<Gif[]>([]);

  const lastIndex = useRef<number>(0);

  const [result, reexecuteQuery] = useQuery<GifsResult>({
    query: GET_GIFS,
    variables: { category: `%${category}%`, offset },
    pause: true,
  });

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
    //TODO: improve re-fetching by canceling outdated fetch
    const debouncedQuery = debounce((value: string) => {
      setSearchCategory(value);
      setOffset(0);
      setLoadedGifs([]);
      lastIndex.current = 0;
    }, 1000);
    debouncedQuery(value);
  };

  const handleLoadMoreClick = () => {
    setOffset((prevOffset) => prevOffset + CHUNK_SIZE);
  };

  const renderGif = (gif: Gif, index: number) => (
    <S.GifCard key={gif.id}>
      {index > lastIndex.current - CHUNK_SIZE ? (
        <S.GifImageAnimate
          src={gif.url}
          alt={gif.id}
          delay={(index - (lastIndex.current - CHUNK_SIZE)) * 100}
        />
      ) : (
        <S.GifImage src={gif.url} alt={gif.id} />
      )}
    </S.GifCard>
  );

  if (error) return <div>Error... {error.message}</div>;

  return (
    <S.SearchContainer>
      <CategoryIconsBar />
      <S.InputWrapper>
        <InputField
          placeholder="search GIFs"
          onChange={handleSearchTermChange}
          value={searchValue}
        />
      </S.InputWrapper>
      {fetching && !data ? (
        <div>Loading...</div>
      ) : (
        loadedGifs && (
          <>
            <S.GifWrapper>
              {loadedGifs.map((gif, index) => renderGif(gif, index))}
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
