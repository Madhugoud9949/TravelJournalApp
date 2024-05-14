import express from "express"; 
import dotenv from "dotenv"; 
import helmet from "helmet"; 
import morgan from "morgan"; 
import mongoose from "mongoose"; 
import userRoute from "./routes/user.js"; 
import entryRoute from "./routes/entry.js"; 
import cookieParser from "cookie-parser"; 
import cors from "cors";

const app = express(); 
dotenv.config(); 

const PORT = process.env.PORT || 5500; 

const connect = async () => { 
  try { 
    await mongoose.connect(process.env.MONGO); 
    console.log("Connected to MongoDB."); 
  } catch (error) { 
    throw error; 
  } 
}; 

mongoose.connection.on("disconnected", () => { 
  console.log("MongoDB disconnected!"); 
}); 

app.get('/', (req, res) => { 
  res.send('Hello from Express!'); 
}); 

//middlewares 
app.use(cookieParser()); 
app.use(express.json()); 
app.use(helmet()); 

app.use(cors({ 
   origin: "http://localhost:3000", 
   credentials: true
})); 

app.use(morgan("common")); 

app.use("/api/users", userRoute); 
app.use("/api/entries", entryRoute); 

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed.');
    process.exit(0);
  });
});

app.listen(PORT, () => { 
  console.log(`Listening on port ${PORT}`); 
  connect(); 
});
