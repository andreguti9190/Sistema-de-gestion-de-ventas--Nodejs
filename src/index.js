import express from "express"
import routes from "./routes/routes.js";
import config from "./config.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded())

app.use(routes)

app.listen(config.PORT,(err) => {
    if (err) console.log(err)
    else {
        console.log(`Server on port http://localhost:${config.PORT}`)
    }
})
