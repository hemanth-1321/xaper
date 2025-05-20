import express from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoutes";
import zapRoutes from "./routes/zapRoutes";
import ActionRoutes from "./routes/ActionRoutes";
import TriggerRoutes from "./routes/TriggerRoutes";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/zap", zapRoutes);
app.use("/api/actions", ActionRoutes);
app.use("/api/triggers", TriggerRoutes);

app.listen(8000, () => {
  console.log("server up on port 8000");
});
