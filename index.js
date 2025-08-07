const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method')); 

let items = [];

app.get("/", function (req, res) {
    const filter = req.query.priority || "all";
    let filteritems = items;
    if (filter !== "all") {
        filteritems = items.filter(item => item.priority === filter);
    }
    res.render("list", { ejes: filteritems, filter: filter });
});

app.post("/", function (req, res) {
    const itemname = req.body.ele1;
    const priority = req.body.priority;
    items.push({ name: itemname, priority: priority });
    res.redirect("/");
});

app.delete("/delete/:index", function (req, res) {
    const index = parseInt(req.params.index);
    if (index >= 0) {
        items.splice(index, 1);
    }
    res.redirect("/");
});

app.get("/edit/:itemindex", function (req, res) {
    const indexs = parseInt(req.params.itemindex);
    if (indexs >= 0 ) {
        res.render("edit", { ogitem: items[indexs], itemindex: indexs });
    } else {
        res.redirect("/");
    }
});

app.put("/edit/:index", function (req, res) {
    const itemindex = parseInt(req.params.index);
    const newitem = req.body.item;
    const newpriority = req.body.priority;
    if (itemindex >= 0 &&  newitem) {
        items[itemindex] = { name: newitem, priority: newpriority };
    }
    res.redirect("/");
});

app.listen(5000, function () {
    console.log("Server started on port 5000");
});