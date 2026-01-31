import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./Routes/productRoutes.js";
import { aj } from "./Lib/arcjet.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../client/dist")));
//apply arcjet rules to all the routes

app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });//specifies that each request consumes 1 token

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.writeHead(429, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Too Many Requests" }));
      }
      if(decision.reason.isBot()){
        res.writeHead(403, {"Content-type":"application/json"})
        res.end(JSON.stringify({error:"Bots are not allowed"}))
      }else{
        res.status(403).json({message:"Permission denied"})
      }
      return
    }

    if(decision.results.some((result)=>result.reason.isBot() && result.reason.isSpoofed())){
      res.status(403).json({message:"Spoofed bots not allowed"})
      return
    }
    
    next()
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal server error"})
  }
});
app.use("/api/products", productRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
