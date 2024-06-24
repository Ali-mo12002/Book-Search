import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';



import { setContext } from "@apollo/client/link/context";
const httpLink = createHttpLink({
  uri: "/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
        <>
          <Navbar />
          <Routes>
            <Route exact path='/' Component={SearchBooks} />
            <Route exact path='/saved' Component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Routes>
        </>
    </ApolloProvider>
  );
}

export default App;