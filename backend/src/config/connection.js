const mongoose = require('mongoose');


module.exports.database=() => {

    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology : true,
        useCreateIndex : true
    };

    try {
        mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.gtk0l6y.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`),
        connectionParams,
        console.log("Database connected");
    }catch(e) {
        console.error(e)
        console.log("Databases connection failed");
    }

};
