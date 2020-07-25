import React from 'react'
import { gql, useQuery } from '@apollo/client';
import AddUser from './components/AddUser';


const READ_HEROES = gql`
	query GetHeroes {
		users {
			id
			nickname
			real_name
			superpowers {
				text
			}
		}
	}
`;


function Heroes() {
	const { loading, error, data } = useQuery(READ_HEROES);

	

	if (loading) return <h1 className="loading">Loading...</h1>;
	if (error) return <h1 className="error">Something went wrong!</h1>;
	if (!data) return <h1 className="empty">Not Found</h1>;


	return (
		<div className="sups">
		<AddUser/>
			<ul>
				{data.users.map((user) =>
					<li key={user.id} className="sups__item">
						<span className="sups__nickname">{user.nickname}</span>
					</li>
				)}
			</ul>
		</div>
	);
}


const App = () => (
	<div>
		<Heroes />
	</div>
);

export default App