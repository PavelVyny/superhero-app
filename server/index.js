//	Pulls in the required objects for starting an Apollo server
// and parsing our query strings into query documents for GraphQL.
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const path = require('path')
// We use the cors package because we want to
// be able to make requests from other origins.
const cors = require('cors');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const mkdirp = require('mkdirp');
const shortid = require('shortid');
const { createWriteStream, unlink } = require('fs');
const typeDefs = require('./schema');
const {
	GraphQLUpload, // The GraphQL "Upload" Scalar
	graphqlUploadExpress, // The Express middleware.
} = require('graphql-upload');


const UPLOAD_DIR = './uploads';
const db = lowdb(new FileSync('db.json'));

// Seed an empty DB.
db.defaults({ uploads: [] }).write();
// Ensure upload directory exists.
mkdirp.sync(UPLOAD_DIR);

/**
* Stores a GraphQL file upload. The file is stored in the filesystem and its
* metadata is recorded in the DB.
* @param {GraphQLUpload} upload GraphQL file upload.
* @returns {object} File metadata.
*/
const storeUpload = async (upload) => {
	// console.log(upload)
	const { createReadStream, filename, mimetype } = await upload;
	const stream = createReadStream();
	const id = shortid.generate();
	const path = `${UPLOAD_DIR}/${id}-${filename}`;
	const file = { id, filename, mimetype, path };

	// Store the file in the filesystem.
	await new Promise((resolve, reject) => {
		// Create a stream to which the upload will be written.
		const writeStream = createWriteStream(path);

		// When the upload is fully written, resolve the promise.
		writeStream.on('finish', resolve);

		// If there's an error writing the file, remove the partially written file
		// and reject the promise.
		writeStream.on('error', (error) => {
			unlink(path, () => {
				reject(error);
			});
		});

		// In Node.js <= v13, errors are not automatically propagated between piped
		// streams. If there is an error receiving the upload, destroy the write
		// stream with the corresponding error.
		stream.on('error', (error) => writeStream.destroy(error));

		// Pipe the upload into the write stream.
		stream.pipe(writeStream);
	});

	// Record the file metadata in the DB.
	db.get('uploads').push(file).write();

	return file;
};



// adding GraphQL Schema.


// Next up, we need to tell GraphQL how to interpret the queries
const resolvers = {
	Query: {
		users: () => {
			return users
		},
		user(parent, args, context, info) {
			return users.find(user => user.id === args.id);
		},
		uploads: (source, args, { db }) =>
			db.get('uploads').value()
	},
	Mutation: {
		addUser: (parent, args, context, info) => {
			const storedFiles = args.files.map(storeUpload);
			newUser = {
				id: `${shortid.generate()}_${args.nickname}`,
				nickname: args.nickname,
				real_name: args.real_name,
				origin_description: args.origin_description,
				catch_phrase: args.catch_phrase,
				superpowers: args.superpowers,
				files: storedFiles
			}
			users.push(newUser)
			return {
				user: newUser
			}
		},
		multipleUpload: (parent, { files }, { storeUpload }) => {
			// Ensure an error storing one upload doesn’t prevent storing the rest.
			const results = files.map(storeUpload);
			return results
		},
	},
	Upload: GraphQLUpload,
};


// creating a new instance
const server = new ApolloServer({
	// Disable the built in file upload implementation that uses an outdated
	// `graphql-upload` version, see:
	// https://github.com/apollographql/apollo-server/issues/3508#issuecomment-662371289	
	uploads: false,
	typeDefs,
	resolvers,
	context: { db, storeUpload }
});

const app = express();
app.use(graphqlUploadExpress());
server.applyMiddleware({ app });

app.use(cors());
app.use(
	'/graphql',
	graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })
);
//allow to get /uploads folder 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


// start listening for connections
app.listen({ port: 4000 }, () =>
	console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);


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