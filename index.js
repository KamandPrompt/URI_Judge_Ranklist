var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var XLSX = require("xlsx");
const axios = require('axios');
const cheerio = require('cheerio');

var wb = XLSX.readFile("./responses.xlsx");
var sheetlist = wb.SheetNames;

var URIdata = []

var app = express();
const port = 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json({ limit: "30MB", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30MB", extended: true }));
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log("Server started at port " + port);
});

app.use("/", async (req, res) => {
    res.render("index", {
        data: URIdata
    });
});

const fetchDetails = () => {
    URIdata = XLSX.utils.sheet_to_json(wb.Sheets[sheetlist[0]]);
    const promiseArr = [];
    for(let i=0; i<URIdata.length; i++) {
        promiseArr[i] = axios.get(URIdata[i]["profile"])
    }
    Promise.all(promiseArr)
    .then((response) => {
        for(let i=0; i<URIdata.length; i++) {
            const $ = cheerio.load(response[i].data);
            var points = $(".pb-information > li:nth-child(5)").html();
            if (points) {
                points = points.split("\n")[2].trim();
            } else {
                points = "0.00";
            }
            URIdata[i]["points"] = parseFloat(points);
            //console.log(URIdata[i]);
        }
    })
    .catch( (err)=> {
        console.log(err);
    });
    setTimeout(fetchDetails, 1000 * 60 * 60);
}

fetchDetails();

exports = module.exports = app;