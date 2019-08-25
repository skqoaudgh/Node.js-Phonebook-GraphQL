const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const graphqlHTTP = require('express-graphql');
const compression = require('compression');

const Auth = require('./middleware/auth');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolver/index');
const { errorType } = require('./graphql/schema/error');
const getErrorCode = errorName => {
    return errorType[errorName];
}

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));

app.use('/favicon.ico', (req, res, next) => {
    next();
});

app.use(Auth);
app.use('/graphql', (req, res) => {
    graphqlHTTP({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true,
        customFormatErrorFn: (err) => {
            let errorMessage = err.message.replace('Unexpected error value: ', '');
            errorMessage = errorMessage.replace(/"/gi, '');
            return getErrorCode(errorMessage);
        }
    })(req, res)
});
app.get('/', (req, res ,next) => {
    res.send('Hello World!');
});

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@node-rest-shop-zqnku.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true
})
.then(() => {
    app.listen(3000, () => {
        console.log('express server is opened on port 3000.');
    });
})
.catch((err) => {
    console.error(err);
})