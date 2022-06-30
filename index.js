const { app } = require("./server");

const port = process.env.PORT || 3500;

app.listen(port, () => {
  console.log(`WePost Listening On Port ${port}`);
});
