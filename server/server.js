const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, '../client/insightecr/dist')));

app.get('/api', (req, res) => {
    res.send('Hello from Express!');
  });


  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });