require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(require('body-parser').json());

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.use('/api', require('./routes'));
app.use('/vendors', express.static(path.join(__dirname, '../node_modules')))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
})

app.listen(PORT, () => console.log(`** Listening on Port ${PORT} **`));
