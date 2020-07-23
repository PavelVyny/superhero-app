import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, gql, ApolloProvider } from '@apollo/client';
import App from './App';
import './styles/App.scss';

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
			nickname
			real_name
			superpowers {
				id
				text
			}
			origin_description
			catch_phrase
			images {
				id
				url
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