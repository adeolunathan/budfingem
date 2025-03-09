// src/index.ts
import app from './app'; // Import the Express app
import config from './config/config'; // Import configuration

const port = config.port;

app.listen(port, () => {
  console.log(`Budfin User Service listening on port ${port}`);
});