import React from 'react'
import { gql, useQuery } from '@apollo/client';



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

export const HeroesList = () => {
	const { loading, error, data } = useQuery(READ_HEROES);



	if (loading) return <h1 className="loading">Loading...</h1>;
	if (error) return <h1 className="error">Something went wrong!</h1>;
	if (!data) return <h1 className="empty">Not Found</h1>;


	return (
		<div className="sups">
			<ul>
				{data.users.map((user) =>
					<li key={user.id} className="sups__item">
						<span className="sups__nickname">{user.nickname}</span>

						<ul>
							<h4>Superpowers:</h4>
							{user.superpowers.length ?
								user.superpowers.map((power, index) =>
									<li key={index} className="sups__power">{power.text}</li>
								)
								: 'has no powers'
							}
						</ul>
					</li>
				)}
			</ul>
		</div>
	);
}