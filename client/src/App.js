import React from 'react'
import { gql, useQuery } from '@apollo/client';


const SUPER_HEROES = gql`
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
`;

function Heroes() {
	const { loading, error, data } = useQuery(SUPER_HEROES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return data.users.map(({ id, name }) => (
		<div key={name}>
			<p>
				{id}: {name}
			</p>
		</div>
	));
}


const App = () => (
	<div>
		<p>Hello!</p>
		<Heroes />
	</div>
);

export default App