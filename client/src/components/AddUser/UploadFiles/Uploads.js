import React from 'react';
import { useQuery, gql } from '@apollo/client';

const UPLOADS_QUERY = gql`
  query uploads {
    uploads {
	  id
      filename
      mimetype
      path
    }
  }
`;

export const Uploads = () => {
	const { data: { uploads = [] } = {} } = useQuery(UPLOADS_QUERY);

	return (
		<>
		<table>
			<thead>
				<tr>
					<th>file ID</th>
					<th>Filename</th>
					<th>MIME type</th>
					<th>Path</th>
				</tr>
			</thead>
			<tbody>
				{uploads.map(({ id, filename, mimetype, path }) => (
					<tr key={id}>
						<td>{id}</td>
						<td>{filename}</td>
						<td>{mimetype}</td>
						<td>{path}</td>
					</tr>
				))}
			</tbody>
		</table>
		{/*use regexp to replace dot from the start of path to get valid src */}
		{uploads.map(({ id, filename, mimetype, path }) => (
					<img 
					key={`${id}_${filename}`} 
					src={path.replace(/^\./g, '')}
					alt=""
					>
					</img>
				))}
		
		</>
	);
};
