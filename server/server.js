const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const indexRouter = require('./routers/index_router.js');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json());
app.use(indexRouter);

app.listen(process.env.PORT, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
