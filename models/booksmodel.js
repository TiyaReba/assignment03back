const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://tiya:post24@cluster0.qh8z9se.mongodb.net/libraryDB?retryWrites=true&w=majority');

const BookSchema = mongoose.Schema({
    bookname:String,
    authorname:String,
    genre:String,
    availability:String
  
});

var BookData = mongoose.model('bookset',BookSchema);
module.exports = BookData;