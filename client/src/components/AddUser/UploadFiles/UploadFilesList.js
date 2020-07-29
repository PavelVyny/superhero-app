import React, { useState } from 'react';
import { useApolloClient, useMutation, gql } from '@apollo/client';
import { Uploads } from './Uploads';

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

export const UploadFileList = () => {

	const [state, setState] = useState([]);
	const [multipleUploadMutation] = useMutation(MULTIPLE_UPLOAD_MUTATION);
	const apolloClient = useApolloClient();

	const onChange = ({ target: { validity, files } }) =>
		validity.valid &&
		multipleUploadMutation({ variables: { files } }).then(() => {
			const list = [...state];

			console.log(Object.values(files))


			console.log(files)

			apolloClient.resetStore();
		});

	return (
		<div>
			<input type="file" multiple onChange={onChange} />
			<Uploads />
		</div>

	)
};
