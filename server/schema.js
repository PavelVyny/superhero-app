const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		id: ID!
		nickname: String
		real_name: String
		origin_description: String
		superpowers: [Superpower!]
		catch_phrase: String
		files: [File]
	}

	type Superpower {
		text: String
	}

	type File {
		id: ID!
		path: String!
		filename: String!
		mimetype: String!
	}

  	type Query {
		users: [User]
		user(id: ID!): User
		uploads: [File!]!
  	}

  	input SuperpowerInput {
		text: String
	}
	
	type UserUpdateResponse {
		user: User
	}

  	type Mutation {
		addUser(
			nickname: String!,
			real_name: String,
			origin_description: String,
			catch_phrase: String,
			superpowers: [SuperpowerInput]
			files: [Upload]
		):UserUpdateResponse

		removeUser(
			id: String!
		):User

		multipleUpload(
			files: [Upload!]!
		): [File!]!

		}
		
		scalar Upload
`;

module.exports = typeDefs;