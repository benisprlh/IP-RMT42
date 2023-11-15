if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const router = require('./router');
const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
