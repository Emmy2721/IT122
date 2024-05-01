import mongoose from 'mongoose';
const { Schema } = mongoose;


const connectionString = "mongodb+srv://mahletbirhanu:CNk1EgZDwaATykmq@sccprojects.ahxs6v8.mongodb.net/?retryWrites=true&w=majority&appName=sccprojects"



mongoose.connect(connectionString, {
    dbName: 'sccprojects',
    
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const bookSchema = new Schema({
 title: { type: String, required: true },
 type: String,
 count: Number,
 pubdate: Date,
 inStore: Boolean
});

export const Book = mongoose.model('Book', bookSchema);