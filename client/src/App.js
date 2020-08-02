import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { HeroesList } from './components/HeroesList'
import { HeroDetailPage } from './components/UserDetailPage'
import UserForm from './components/AddUser/UserForm';


const App = () => (
	<div>
		<HeroesList />
		<UserForm />
		<HeroDetailPage/>
	</div>
);

export default App