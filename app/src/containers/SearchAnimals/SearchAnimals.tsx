import React, { useState } from "react";
import InputField from "../../components/InputField";
import * as S from "./SearchAnimals.styles";
import { CategoryIconsBar } from "../../components/CategoryIconsBar/CategoryIconsBar";
import useGifsContext, {
  CHUNK_SIZE,
  Gif,
} from "../../contexts/Gifs/GifContext";

const SearchAnimals: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const {
    changeCategory,
    setOffset,
    lastIndex,
    error,
    fetching,
    data,
    loadedGifs,
  } = useGifsContext();

  const handleSearchTermChange = (value: string) => {
    setSearchValue(value);
    changeCategory(value);
  };

  const handleLoadMoreClick = () => {
    setOffset((prevOffset) => prevOffset + CHUNK_SIZE);
  };

  const renderGif = (gif: Gif, index: number) => (
    <S.GifCard key={gif.id}>
      {index > lastIndex - CHUNK_SIZE ? (
        <S.GifImageAnimate
          src={gif.url}
          alt={gif.id}
          delay={(index - (lastIndex - CHUNK_SIZE)) * 100}
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
      ) : loadedGifs.length > 0 ? (
        <>
          <S.GifWrapper>
            {loadedGifs.map((gif, index) => renderGif(gif, index))}
          </S.GifWrapper>
          {loadedGifs.length && (
            <button onClick={handleLoadMoreClick}>Load more</button>
          )}
        </>
      ) : (
        <div>No gifs...</div>
      )}
    </S.SearchContainer>
  );
};

export default SearchAnimals;
