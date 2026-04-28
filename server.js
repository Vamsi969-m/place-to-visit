require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/model");
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(methodOverride("_method"));

// ✅ MongoDB Atlas connection (ONLY env use cheyyi)
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
})
.then(() => {
    console.log("MongoDB Connected");

    // ✅ Start server only after DB connect
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});

// Routes
app.get("/", (req, res) => {
    res.redirect("/All-places");
});

app.get("/All-places", async (req, res) => {
    try {
        const places = await Listing.find({});
        res.render("index", { places });
    } catch (err) {
        res.status(500).send("Error fetching data");
    }
});

app.get("/new", (req, res) => {
    res.render("new");
});

app.post("/new", async (req, res) => {
    try {
        const newListing = new Listing(req.body);
        await newListing.save();
        console.log("Data successfully saved");
        res.redirect("/All-places");
    } catch (err) {
        console.error(err);
        res.status(400).send("Error saving data");
    }
});

app.get("/places/:id", async (req, res) => {
    try {
        const place = await Listing.findById(req.params.id);
        if (place) res.render("show", { place });
        else res.status(404).render("404");
    } catch (err) {
        res.status(500).send("Error fetching place");
    }
});

app.get("/places/edit/:id", async (req, res) => {
    try {
        const place = await Listing.findById(req.params.id);
        if (place) res.render("edit", { place });
        else res.status(404).render("404");
    } catch (err) {
        res.status(500).send("Error fetching place");
    }
});

app.put("/places/edit/:id", async (req, res) => {
    try {
        await Listing.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/places/${req.params.id}`);
    } catch (err) {
        res.status(400).send("Error updating place");
    }
});

app.delete("/places/:id", async (req, res) => {
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.redirect("/All-places");
    } catch (err) {
        res.status(400).send("Error deleting place");
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).render("404");
});