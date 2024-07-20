const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/', routes);
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
