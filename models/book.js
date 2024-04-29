import mongoose from 'mongoose';
const { Schema } = mongoose;


const connectionString = "mongodb+srv://mahletbirhanu:<password>@sccprojects.ahxs6v8.mongodb.net/?retryWrites=true&w=majority&appName=sccprojects"



mongoose.connect(connectionString, {
    dbName: 'sccprojects',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});
