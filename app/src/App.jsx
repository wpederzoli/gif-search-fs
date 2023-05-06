import { createClient, Provider } from "urql";
import SearchAnimals from "./containers/SearchAnimals/SearchAnimals";

let client = createClient({
  url: "http://localhost:8080/v1/graphql",
});

function App() {
  return (
    <Provider value={client}>
      <div>
        <SearchAnimals />
      </div>
    </Provider>
  );
}

export default App;
