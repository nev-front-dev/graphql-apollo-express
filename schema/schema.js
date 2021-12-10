const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

const movies = [
    {id: '1', name: 'Pulp', genre: 'Crime'},
    {id: '2', name: '1984', genre: 'Sci-Fi'},
    {id: '3', name: 'V for Vendetta', genre: 'Sci-Fi-Triller'},
    {id: '4', name: 'Snatch', genre: 'Crime-Comedy'},
]

const MoveType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MoveType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                return movies.find(movie => movie.id === args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query
})