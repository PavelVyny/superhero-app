//	Pulls in the required objects for starting an Apollo server
// and parsing our query strings into query documents for GraphQL.
const { ApolloServer, gql } = require('apollo-server');

// adding GraphQL Schema.
const typeDefs = gql`
  type User {
	id: ID!
	name: String
	superpowers: [Superpower]!
  }

  type Superpower {
	id: ID!
	text: String
  }

  type Query {
	users: [User]
	user(id: ID!): User
  }
`;


// This will be our mock data to query
const users = [{
	id: '1',
	name: 'Peter Parker',
	superpowers: [{
		id: '1',
		text: 'Web slinging'
	}, {
		id: '2',
		text: 'Spidey sense'
	}]
}, {
	id: '2',
	name: 'Tony Stark',
	superpowers: [{
		id: '3',
		text: 'Industrial design'
	}, {
		id: '4',
		text: 'Robotic fashion'
	}]
}];


// Next up, we need to tell GraphQL how to interpret the queries
const resolvers = {
	Query: {
		users: () => {
			return users
		},
		user: (id) => {
			return users.find(user => user.id === id);
		},
	},
};


// creating a new instance
const server = new ApolloServer({
	typeDefs,
	resolvers,
});


// start listening for connections
server.listen().then(({ url }) => {
	console.log(`Apollo server started at ${url}`)
});