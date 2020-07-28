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
		<table>
			<thead>
				<tr>
					<th>Filename</th>
					<th>MIME type</th>
					<th>Path</th>
				</tr>
			</thead>
			<tbody>
				{uploads.map(({ id, filename, mimetype, path }) => (
					<tr key={id}>
						<td>{filename}</td>
						<td>{mimetype}</td>
						<td>{path}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
