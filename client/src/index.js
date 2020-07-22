import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, gql, ApolloProvider } from '@apollo/client';
import App from './App'

const client = new ApolloClient({
	// To create the Apollo client we just need a link to the server 
	uri: 'http://localhost:4000/graphql',
	// and a way to cache our goods
	cache: new InMemoryCache()
})

client
	.query({
		query: gql`
	query GetHeroes {
		users {
			id
			name
			superpowers {
				id
				text
			}
		}
	}
	`
	})
	.then(result => console.log(result));

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
)