import React, { useState } from 'react';

export const UploadFileList = (props) => {

	const [filesState, setState] = useState([]);
	const handleAddFiles = ({ target: { validity, files} }) => {
		setState({
			'files': files
		}, props.updateFiles(files));
	}

	return (
		<div>
			<input type="file" name="files" multiple required onChange= {handleAddFiles} />
		</div>

	)
};
