const app = require("express")();
const fs = require("fs");
const path = require("path");
const Pool = require("pg").Pool;

const port = process.env.PORT || 3000;
const appName = process.env.APP_NAME || "app-posts";
const dbUser = process.env.DB_USER || "kelvin_mai";
const dbDatabase = process.env.DB_DATABASE || "remove_me";
const dbPassword = process.env.DB_PASSWORD || "123456";
const dbPort = process.env.DB_PORT || 5432;
const dbHost = process.env.DB_HOST || "localhost"; 

const pool = new Pool({
  user: dbUser,
  host: dbHost,
  database: dbDatabase,
  password: dbPassword,
  port: dbPort,
});

app.get("/", (req, res, next) => {
  res.json({ appName: appName });
  res.end();
});
// get users
app.get("/users", (req, res, next) => {
  pool.query("SELECT * FROM posts", (error, results) => {
    console.log(pool, "new created DB pool");
    if (error) {
      throw error;
    }
    console.log("getting posts from database...");
    res.status(200).json(results.rows);
    res.end();
  });
});

app.get("/health", (req, res, next) => {
  res.json({ status: true });
  res.end();
});

app.get("/add-file", (req, res, next) => {
  const now = Date.now();
  fs.writeFileSync(
    path.join(__dirname, "stats", `${now}.txt`),
    new Date().toISOString()
  );
  res.json({ status: "added" });
  res.end();
});
app.listen(port, () => {
  console.log(`${appName} started on localhost:${port}`);
});
