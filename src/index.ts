import express from "express";
import cors from "cors";

import eventRoutes from "./routes/eventRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import movieRoutes from "./routes/movieRoute.js";
import pembicaraRoutes from "./routes/pembicaraRoutes.js";

const app = express();
const port = 3000;

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Ini Adalah Api Untuk Netflix");
});

app.use("/events", eventRoutes);
app.use("/categories", categoryRoutes);
app.use("/movies", movieRoutes);
app.use("/pembicara", pembicaraRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});