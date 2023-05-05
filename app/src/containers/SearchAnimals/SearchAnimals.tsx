import React, { useState } from "react";
import { useQuery, gql } from "urql";
import InputField from "../../components/InputField";

type Gif = {
  id: string;
  url: string;
};

type GifsResult = {
  gifs: Gif[];
};

const GET_GIFS = gql`
  query ($filter: String!) {
    gifs(filter: $filter) {
      id
      url
    }
  }
`;

const SearchAnimals: React.FC = () => {
  const [filter, setFilter] = useState("1");
  const [result] = useQuery<GifsResult>({
    query: GET_GIFS,
    variables: { filter },
  });

  const { data, fetching, error } = result;

  const handleSearchTermChange = (value: string) => {
    setFilter(value);
  };

  if (fetching) return <div>Loading...</div>;
  if (error) return <div>Error... {error.message}</div>;

  return (
    <>
      <InputField placeholder="search GIFs" onChange={handleSearchTermChange} />
      {data && (
        <ul>
          {data.gifs.map((gif) => (
            <li key={gif.id}>
              <img src={gif.url} alt={gif.id} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchAnimals;
