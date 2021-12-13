const graphql = require('graphql');
const Movies = require('../server/models/movie');
const Directors = require('../server/models/director');
const {
    GraphQLObjectType,
    GraphQLString, 
    GraphQLID, 
    GraphQLInt, 
    GraphQLList, 
    GraphQLSchema
} = graphql;

// const movies = [
//     {id: '1', name: 'Pulp', genre: 'Crime', directorId: '1'},
//     {id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2'},
//     {id: '3', name: 'V for Vendetta', genre: 'Sci-Fi-Triller', directorId: '3'},
//     {id: '4', name: 'Snatch', genre: 'Crime-Comedy', directorId: '2'},
//     {id: '5', name: 'Hanckook', genre: 'Crime', directorId: '3'},
//     {id: '6', name: 'It', genre: 'Sci-Fi', directorId: '2'},
//     {id: '7', name: 'Batman', genre: 'Sci-Fi-Triller', directorId: '2'},
//     {id: '8', name: 'Matrix', genre: 'Crime-Comedy', directorId: '3'},
// ]

// const directors = [
//     { name: 'Tarantino', age: 55},
//     { name: 'McTeigue', age: 43},
//     { name: 'Bono', age: 61},
//     { name: 'Ritchie', age: 46},
// ]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: DirectorType,
            resolve(parent, args) {
                // return directors.find(director => director.id === parent.id)
                return Directors.findById(parent.directorId)
        }}
    })
})

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                // return movies.filter(movie => movie.directorId === parent.id)
                return Movies.find({directorId: parent.id})
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDirector: {
        type: DirectorType,
        args: {
            name: {type: GraphQLString},
            age: {type: GraphQLInt}
        },
        resolve(parent, args) {
            const director = new Directors({
                name: args.name,
                age: args.age
            });
            return director.save();
        },
    },
    addMovie: {
        type: MovieType,
        args: {
            name: {type: GraphQLString},
            genre: {type: GraphQLString},
            directorId: {type: GraphQLID}
        },
        resolve(parent, args) {
            const movie = new Movies({
                name: args.name,
                genre: args.genre,
                directorId: args.id,
            });
            return movie.save();
        },
    }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return movies.find(movie => movie.id === args.id)
                return Movies.findById(args.id);
            }
        },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                // return directors.find(director => director.id === args.id)
                return Directors.findById(args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                // return movies
                return Movies.find({})
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                // return directors
                return Directors.find({})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
})