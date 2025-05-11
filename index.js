import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var posts = [];
var index = 0;  //id of the post


app.use(express.static("public")); // the folder for the static elements
app.use(express.json()); //to take the infos from the body sent via "fetch" execution

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // Make the get route work and render the file.
  res.render("posts.ejs", {posts : posts, page: "posts"});
  
});

app.get("/posts", (req, res) => {
  //Make the get route work and render the file.
  res.render("posts.ejs", {posts : posts, page : "posts"});
  
  
});

app.get("/create", (req, res) => {
  //Make the get route work and render the file.
  res.render("create.ejs", {page : "create"});
  

});


//send the informations from the form to the ejs pages
app.post("/post", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  posts.push({title : title , content : content, id: index});

  res.render("create.ejs", {title: title , content: content,id: index, page : "create"});
  res.render("posts.ejs", {posts : posts, page: "posts"});

  index++;


});

// the operations made through fetch

app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id); // extrage id ul din url( /posts/id )
  const index = posts.findIndex(post => post.id === id); // parcurge tot array ul posts si la fiecare post verifica id ul

  if (index !== -1) {  // daca nu gaseste nimic returneaza -1; daca gaseste returneaza id ul
    posts.splice(index, 1); // sterge 1 element de la id ul indicat
    res.sendStatus(200); // Succes
  } else {
    res.sendStatus(404); // Not found
  }
  
});

app.patch('/api/posts/:id', (req, res) => {
  console.log(posts);
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);

  if (index !== -1) {
    posts[index].title = req.body.title;  // pune in array ul posts modificarile ca sa nu se stearga la refresh de pagina
    posts[index].content = req.body.content;
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

