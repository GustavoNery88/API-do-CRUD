const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/usuarios.js');

app.use(express.json());
app.use(cors());

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
