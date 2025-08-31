require('dotenv').config();
require('colors');
const app = require('./app.cjs');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.clear();
  console.log(`✅ Server running on port ${PORT}`.green);
});