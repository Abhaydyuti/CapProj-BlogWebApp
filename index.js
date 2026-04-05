const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // for form submissions

app.set("view engine", "ejs"); // tell express to use EJS

let responses = [];
let nextId = 1;

//Home page
app.get("/", (req, res) => {
  res.render("index", { responses }); // send responses to EJS
});

//Create
app.post("/responses", (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) return res.redirect("/");

  responses.push({ id: nextId++, name, message, createdAt: new Date().toISOString() });
  res.redirect("/"); // go back to home after submit
});

//Edit
app.post("/responses/:id/edit", (req, res) => {
  const index = responses.findIndex((r) => r.id === parseInt(req.params.id));
  if (index === -1) return res.redirect("/");

  const { name, message } = req.body;
  if (name) responses[index].name = name;
  if (message) responses[index].message = message;
  responses[index].updatedAt = new Date().toISOString();

  res.redirect("/");
});

//DELETE
app.post("/responses/:id/delete", (req, res) => {
  responses = responses.filter((r) => r.id !== parseInt(req.params.id));
  res.redirect("/");
});

app.listen(3000, () => console.log("Server at https://localhost:3000")); 