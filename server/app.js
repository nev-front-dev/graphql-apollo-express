const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

mongoose.connect(`mongodb+srv://Evgheni:77884386Je@cluster0.5mrjq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log("Connected to DB!"))

app.listen(PORT, error => {
    error ? console.log(error) : console.log(`Server started on port: ${PORT}`); 
})