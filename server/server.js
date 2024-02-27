import express from "express";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import dotenv from "dotenv";
import path from 'path';
import bodyParser from "body-parser";
import { spawn } from 'child_process';

const app = express();

const PORT = 9002

const MODE = "development"

// Set the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views')); // Use process.cwd() to resolve the path relative to the project's root


app.use(cors());
// Parses JSON data in incoming requests.
app.use(express.json());
// Logs HTTP requests in a developer-friendly format.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/skill2040/courses/java',(req,res)=>{
    const pythonProcess = spawn('python', ['./scraped-content/courses.py']);

    let scrapedData = '';

    pythonProcess.stdout.on('data', (data) => {
        scrapedData += data.toString(); // Concatenate the data received from stdout
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        // Parse the scraped data as JSON
        const parsedData = JSON.parse(scrapedData);
        console.log(parsedData);
        // Send the JSON data as the response
    });
})

app.listen(9002, () => {
    console.log("BE started at port 9002");
})