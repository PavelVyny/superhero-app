import { ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({

	// To create the Apollo client we just need a link to the server 
	uri: 'http://localhost:4000/graphql',
	
	// and a way to cache our goods
	cache: new InMemoryCache()
});

export default client