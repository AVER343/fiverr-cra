const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL||"mongodb+srv://aver343:asdfg@cluster0-ph0nf.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})