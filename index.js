const express = require("express");
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')


dotenv.config();
app.use(express.json())

const mainRouter = require('./routes/main_routes');

app.use(
    cors({
      origin: "*",
      method: '*',
      credentials: true
    })
  )
  
  
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
const connection = mongoose.connection;


connection.once('open', () => {
  console.log('MongoDB database was able to connect successfully')
})

app.use('/main',mainRouter)
// app.use('/targets',targetsRouter)


const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));