import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';


const READ_HERO = gql`
	query GetHeroes {
		users {
			id
			nickname
			real_name
			superpowers {
				id
				text
			}
		}
	}
`;
const CREATE_HERO = gql`
	mutation CreateUser($nickname: String!) {
    	createUser(nickname: $text)
  }
`;

function Heroes() {
	const { loading, error, data } = useQuery(READ_HERO);

	if (loading) return <h1 className="loading">Loading...</h1>;
	if (error) return <h1 className="error">Something went wrong!</h1>;
	if (!data) return <h1 className="empty">Not Found</h1>;

	return data.users.map(({ nickname }) => (
		<div className="sups__item" key={nickname}>
			<p>
				{nickname}
			</p>
		</div>
	));
}


const App = () => (
	<div>
		<Heroes />
	</div>
);

export default App