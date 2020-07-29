import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import PowersInput from './PowersInput';
import { UploadFileList } from './UploadFiles/UploadFilesList';

const UserForm = () => {

	const CREATE_HERO = gql`

	mutation addUser(
		$nickname: String!,
		$real_name: String,
		$origin_description: String,
		$superpowers: [SuperpowerInput],
	) {
		addUser(
			nickname: $nickname,
			real_name:$real_name,
			origin_description: $origin_description,
			superpowers: $superpowers,
		)
  	}
`
	const [addUser] = useMutation(CREATE_HERO);


	const [state, setState] = useState({
		nickname: '',
		real_name: '',
		origin_description: '',
		superpowers: [],

	})

	function handleChange(e) {
		const value = e.target.value;
		setState({
			...state,
			[e.target.name]: value
		});
	}
	// take state with powers from child component
	const updatePowers = (value) => {
		setState({
			...state,
			superpowers: value
		})
	}

	return (
		<div className="new-sup">
			<h3>Create New superhero</h3>
			<form
				className="new-sup__form"
				onSubmit={e => {
					e.preventDefault();
					addUser({
						variables: {
							nickname: state.nickname,
							real_name: state.real_name,
							origin_description: state.origin_description,
							superpowers: state.superpowers,

						}
					});
				}}>
				<input
					className="form-control"
					type="text"
					name="nickname"
					value={state.nickname}
					onChange={handleChange}
					placeholder="Enter nickname"
				>

				</input>
				<input
					className="form-control"
					type="text"
					name="real_name"
					value={state.real_name}
					onChange={handleChange}
					placeholder="Enter real name"
				>

				</input>
				<input
					className="form-control"
					type="text"
					name="origin_description"
					value={state.origin_description}
					onChange={handleChange}
					placeholder="Enter discription"
				>

				</input>

				<PowersInput updatePowers={updatePowers} />
				<UploadFileList />

				<button className="new-sup__submit-btn" type="submit">Submit</button>
			</form>
		</div>
	);
}
export default UserForm;