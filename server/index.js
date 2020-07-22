//	Pulls in the required objects for starting an Apollo server
// and parsing our query strings into query documents for GraphQL.
const { ApolloServer, gql } = require('apollo-server');

// adding GraphQL Schema.
const typeDefs = gql`
  type User {
	id: ID!
	nickname: String
	real_name: String
	origin_description: String
	superpowers: [Superpower]!
	catch_phrase: String
	images: [Image]
  }

  type Superpower {
	id: ID!
	text: String
  }

  type Image {
	id: ID!
	url: String
  }

  type Query {
	users: [User]
	user(id: ID!): User
  }
  type Mutation {
    createUser(text: String!):String
    removeUSer(id: String!):String
  }
`;


// This will be our mock data to query
const users = [{
	id: '1',
	nickname: 'Spider Man',
	real_name: 'Peter Parker',
	origin_description: 'A bite from a spider somehow granted teenager Peter Parker its arachnid abilities and instead of using them for personal gain, he decided to help others with them. An orphan living with his aunt, May Parker, the boy chose to wear a mask while fighting crime so as not to burden her with his actions.',
	superpowers: [{
		id: '1',
		text: 'Web slinging'
	}, {
		id: '2',
		text: 'Spidey sense'
	}],
	catch_phrase: 'With great power comes great responsibility',
}, {
	id: '2',
	nickname: "Iron Man",
	real_name: 'Tony Stark',
	origin_description: 'Genius inventor Tony Stark continued his father Howard Stark’s weaponry business after his parents’ untimely deaths and flew it to even greater heights of innovation. While in Afghanistan to demonstrate a new missile for the U.S. military, Stark’s convoy came under fire by a terrorist group known as the Ten Rings and he was severely wounded. Taken prisoner by the group, Stark awoke in their headquarters to learn that shrapnel near his heart had nearly cost him his life, but swift action by scientist and fellow prisoner Ho Yinsen—who had inserted a powerful electromagnet in Stark’s chest—would prolong it temporarily.',
	superpowers: [{
		id: '3',
		text: 'Industrial design'
	}, {
		id: '4',
		text: 'Robotic fashion'
	}],
	catch_phrase: 'Genius, Billionaire, Playboy, Philanthropist.',
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
	Mutation: {
		createUser: (parent, args, context, info) => {

			return users.push({
				id: users.length,
				nickname: 'test nickname'
			})
		}
	}
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