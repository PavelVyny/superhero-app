import React, { useState } from 'react';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import PowersInput from './PowersInput';
import { UploadFileList } from './UploadFiles/UploadFilesList';

const UserForm = () => {

	const CREATE_HERO = gql`

	mutation addUser(
		$nickname: String!,
		$real_name: String,
		$origin_description: String,
		$superpowers: [SuperpowerInput],
		$files: [Upload!]!
	) {
		addUser(
			nickname: $nickname,
			real_name:$real_name,
			origin_description: $origin_description,
			superpowers: $superpowers,
			files: $files,
		) {
			user {
				id
				nickname
				real_name
			}
		  }
  	}
`
	const [addUser] = useMutation(CREATE_HERO);


	const [state, setState] = useState({
		nickname: '',
		real_name: '',
		origin_description: '',
		superpowers: [],
		files: []

	})

	function handleChange(e) {
		const value = e.target.value;
		setState({
			...state,
			[e.target.name]: value
		});
	}
	// taking state from child component
	const updatePowers = (value) => {
		setState({
			...state,
			superpowers: value
		})
	}

	const updateFiles = (value) => {
		setState({
			...state,
			'files': value
		})
	}


	const MULTIPLE_UPLOAD_MUTATION = gql`
	mutation multipleUpload($files: [Upload!]!
	  ) {
	  multipleUpload(
		  files: $files
	  ) {
		id
	  }
	}
  `;
	const [multipleUploadMutation] = useMutation(MULTIPLE_UPLOAD_MUTATION);
	const apolloClient = useApolloClient();



	return (
		<div className="new-sup">
			<h3>Create New superhero</h3>
			<form
				className="new-sup__form"
				onSubmit={e => {
					// const files = state.files
					e.preventDefault();
					addUser({
						variables: {
							nickname: state.nickname,
							real_name: state.real_name,
							origin_description: state.origin_description,
							superpowers: state.superpowers,
							files: state.files
						}
					});

					// multipleUploadMutation({ variables: { files } }).then(() => {
					// 	apolloClient.resetStore();
					// });


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
				<UploadFileList updateFiles={updateFiles} />

				<button className="new-sup__submit-btn" type="submit">Submit</button>
			</form>
		</div>
	);
}
export default UserForm;