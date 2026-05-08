// require("dotenv").config();
// const app = require("./src/app");
// const {connectDB} = require("./src/config/db");

// connectDB();

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



require("dotenv").config({ path: "./src/.env" });
const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;
connectDB();



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Startup Error:", error);
//     process.exit(1);
//   }
// };

// startServer();