import app from "./app.js";

const port = 3001;

app.listen(port, () => {
  console.log(`Movie Blog backend running on http://localhost:${port}`);
});