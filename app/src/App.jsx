import { createClient, Provider } from "urql";
import { GifProvider } from "./contexts/Gifs/GifContext";
import SearchAnimals from "./containers/SearchAnimals/SearchAnimals";

let client = createClient({
  url: "http://localhost:8080/v1/graphql",
});

function App() {
  return (
    <Provider value={client}>
      <GifProvider>
        <SearchAnimals />
      </GifProvider>
    </Provider>
  );
}

export default App;
