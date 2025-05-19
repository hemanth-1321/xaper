import express from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoutes";
import zapRoutes from "./routes/zapRoutes";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/zap", zapRoutes);

app.listen(8000, () => {
  console.log("server up on port 8000");
});
