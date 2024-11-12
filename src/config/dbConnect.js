const mongoose = require('mongoose');
const MONGODB_DATABASE = process.env.MONGODB_DATABASE;
const MONGODB_DOCKER_PORT = process.env.MONGODB_DOCKER_PORT;
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGO_URl = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@mongodb:${MONGODB_DOCKER_PORT}/${MONGODB_DATABASE}?authSource=admin`
exports.connect = ()=>{
    mongoose.connect(MONGO_URl)
    .then(()=>{
        console.log('Connected to MongoDB');
    })
    .catch((err)=>{
        console.log('Error connecting to MongoDB:', err);
    })
}