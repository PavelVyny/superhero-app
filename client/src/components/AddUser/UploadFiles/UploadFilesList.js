import React, { useState } from 'react';
import { useApolloClient, useMutation, gql } from '@apollo/client';
import { Uploads } from './Uploads';



export const UploadFileList = (props) => {

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

	const [filesState, setState] = useState([]);
	// const [multipleUploadMutation] = useMutation(MULTIPLE_UPLOAD_MUTATION);
	const apolloClient = useApolloClient();

	const handleAddFiles = ({ target: { validity, files} }) => {
		setState({
			'files': files
		}, props.updateFiles(files));
	}


	

	return (
		<div>
			<input type="file" name="files" multiple required onChange= {handleAddFiles} />
			<Uploads />
		</div>

	)
};
