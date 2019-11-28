const express = require("express");
const app = express();
const path = require("path")
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tables = [];
const waitlist = [];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "/tables.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "/reserve.html"));
});

app.get("/api/tables", function(req, res) {
    return res.json(tables)
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist)
});

app.post("/api/tables", function(req, res){
    try {
        console.log(req.body);
        var newReserve = req.body || {};

        newReserve.customerName = newReserve.customerName.replace(/\s+/g, "").toLowerCase();

        if (tables.length < 5) {
            tables.push(newReserve);
        } else {
            waitlist.push(newReserve);
        }
        res.json(tables);
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
});




app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  