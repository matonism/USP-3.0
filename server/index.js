const express = require('express');
var path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../')));

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));