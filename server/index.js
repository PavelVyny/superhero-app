//	Pulls in the required objects for starting an Apollo server
// and parsing our query strings into query documents for GraphQL.
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
// We use the cors package because we want to
// be able to make requests from other origins.
const cors = require('cors');

// adding GraphQL Schema.
const typeDefs = gql`
  type User {
	id: ID!
	nickname: String
	real_name: String
	origin_description: String
	superpowers: [Superpower!]
	catch_phrase: String
	images: [Image]
  }

  type Superpower {
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

  input SuperpowerInput {
	text: String
  }

  type Mutation {
    addUser(
		nickname: String!,
		real_name: String,
		origin_description: String,
		catch_phrase: String,
		superpowers: [SuperpowerInput]
	):String
	


    removeUser(
		id: String!
	):User
  }
`;


// This will be our mock data to query
const users = [
	{
		id: '1',
		nickname: 'Spider Man',
		real_name: 'Peter Parker',
		origin_description: 'A bite from a spider somehow granted teenager Peter Parker its arachnid abilities and instead of using them for personal gain, he decided to help others with them. An orphan living with his aunt, May Parker, the boy chose to wear a mask while fighting crime so as not to burden her with his actions.',
		superpowers: [{
			text: 'Web slinging'
		}, {
			text: 'Spidey sense'
		}],
		catch_phrase: 'With great power comes great responsibility',
	}, {
		id: '2',
		nickname: 'Iron Man',
		real_name: 'Tony Stark',
		origin_description: 'Genius inventor Tony Stark continued his father Howard Stark’s weaponry business after his parents’ untimely deaths and flew it to even greater heights of innovation. While in Afghanistan to demonstrate a new missile for the U.S. military, Stark’s convoy came under fire by a terrorist group known as the Ten Rings and he was severely wounded. Taken prisoner by the group, Stark awoke in their headquarters to learn that shrapnel near his heart had nearly cost him his life, but swift action by scientist and fellow prisoner Ho Yinsen—who had inserted a powerful electromagnet in Stark’s chest—would prolong it temporarily.',
		superpowers: [{

			text: 'Industrial design'
		}, {

			text: 'Robotic fashion'
		}],
		catch_phrase: 'Genius, Billionaire, Playboy, Philanthropist.',
	}
];


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
		addUser: (parent, args, context, info) => {
			newUser = {
				id: users.length + 1,
				nickname: args.nickname,
				real_name: args.real_name,
				origin_description: args.origin_description,
				catch_phrase: args.catch_phrase,
				superpowers: args.superpowers,
				
			}
			

			return users.push(newUser)
		}
	}
};


// creating a new instance
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const app = express();
server.applyMiddleware({ app });

app.use(cors());


// start listening for connections
app.listen({ port: 4000 }, () =>
	console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);