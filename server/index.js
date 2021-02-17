const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

// create a student_post
app.post("/student_post", async (req, res) => {
  try {
    const { user_id } = req.body;
    const { name } = req.body;
    const { content } = req.body;
    const newPost = await pool.query(
      "INSERT INTO student_post (user_id, name, content) VALUES($1, $2, $3) RETURNING *",
      [user_id, name, content]
    );

    res.json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//retrieve student posts
app.get("/student_post", async (req, res) => {
  try {
    const allPosts = await pool.query("SELECT * FROM student_post");
    res.json(allPosts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});

//get a certain post
app.get("/student_post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await pool.query("SELECT * FROM student_post WHERE id = $1", [
      id,
    ]);

    res.json(post.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
