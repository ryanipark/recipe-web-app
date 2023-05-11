const express = require('express');
const app = express();
const path = require('path');

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

/*
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/pages/index.html');
}); 
*/

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

