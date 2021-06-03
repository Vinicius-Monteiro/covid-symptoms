import express from "express";
import cors from "cors";
import { spawn } from "child_process";

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

const args = process.argv;

app.post("/", (req, res) => {
    let dataToSend;

    const python = spawn("python3", [args[2]]);

    python.stdout.on("data", (data) => {
        console.log("pipe data from python script ...");
        dataToSend = data.toString();
    });

    python.on("error", (error) => {
        console.log(`Error from python script: ${error}`);
    });

    python.on("close", (code) => {
        console.log(`child process close all stdio with code ${code}`);
        res.send(dataToSend);
    });
});

app.listen(port, () =>
    console.log(`App listening on port 
${port}!`)
);
