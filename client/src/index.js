import React from 'react'
import ReactDOM from 'react-dom'
import { gql, ApolloProvider } from '@apollo/client';
import App from './App';
import client from "./apollo";
import './styles/App.scss';



client
	.query({
		query: gql`
	query GetHeroes {
		users {
			id
			nickname
			real_name
			superpowers {
				text
			}
			origin_description
			catch_phrase
			files {
				userID
				id
				filename
			}
		}
		uploads {
			path
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