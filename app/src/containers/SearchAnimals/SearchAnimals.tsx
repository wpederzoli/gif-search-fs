import React, { useEffect, useState } from "react";
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
  query ($category: String!) {
    gifs(limit: 5, where: { category: { _like: $category } }) {
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
    <>
      <InputField
        placeholder="search GIFs"
        onChange={handleSearchTermChange}
        value={category}
      />
      {fetching ? (
        <div>Loading...</div>
      ) : (
        data && (
          <ul>
            {data.gifs.map((gif) => (
              <li key={gif.id}>
                <img src={gif.url} alt={gif.id} />
              </li>
            ))}
          </ul>
        )
      )}
    </>
  );
};

export default SearchAnimals;
