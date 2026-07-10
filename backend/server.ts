import app from "./src/app.js";
import ConnectToDb from "./src/configs/db.js";

ConnectToDb()

app.listen(3000, () => console.log("Server running on port 3000"));
