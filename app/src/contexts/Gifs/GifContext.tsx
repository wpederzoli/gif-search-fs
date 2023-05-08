import { debounce } from "lodash";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQuery, gql, CombinedError } from "urql";

export type Gif = {
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

export const CHUNK_SIZE = 12;

type GifContextType = {
  loadedGifs: Gif[];
  setLoadedGifs: React.Dispatch<React.SetStateAction<Gif[]>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  lastIndex: number;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  changeCategory: (category: string) => void;
  fetching: boolean;
  error: CombinedError;
  data: any;
};

const GifContext = createContext({} as GifContextType);

export const GifProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState<string>("");
  const [loadedGifs, setLoadedGifs] = useState<Gif[]>([]);
  const [offset, setOffset] = useState<number>(0);

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

  const changeCategory = (category: string) => {
    //TODO: improve re-fetching by canceling outdated fetch
    const debouncedQuery = debounce((value: string) => {
      setCategory(value);
      setLoadedGifs([]);
      setOffset(0);
      lastIndex.current = 0;
    }, 1000);
    debouncedQuery(category);
  };

  return (
    <GifContext.Provider
      value={{
        category,
        setCategory,
        loadedGifs,
        setLoadedGifs,
        offset,
        setOffset,
        lastIndex: lastIndex.current,
        changeCategory,
        error: error as CombinedError,
        fetching,
        data,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

const useGifsContext = () => useContext(GifContext);

export default useGifsContext;
