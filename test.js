const express = require("express");
var bodyParser = require("body-parser");



//Database
const database = require ("./database");


//initialise express

const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());
/*
Route               /
description         books
ACCESS              PUBLIC
Parameter           none
Methods             Get
*/

booky.get("/",(req,res) => {
  return res.json({books: database.books});
});
/*
Route               /is
description         Get specific book on isbn
ACCESS              PUBLIC
Parameter           isbn
Methods             Get
*/
booky.get("/is/:isbn",(req,res) => {
  const getSpecificBook = database.books.filter(
    (book) =>book.ISBN === req.params.isbn
  );

  if (getSpecificBook.length === 0){
    return res.json({error: `no book found for the isbn provided ${req.params.isbn}`})
  }

  return res.json({book: getSpecificBook})
});

/*
Route               /c
description         Get specific book on isbn
ACCESS              PUBLIC
Parameter           category
Methods             Get
*/

booky.get("/c/:category",(req,res)=>{
  const getSpecificBook = database.books.filter(
    (book) => book.category.includes(req.params.category)
  )

  if(getSpecificBook.length === 0) {
    return res.json({error: `no book found for category of ${req.params.category}`})
  }

  return res.json({book: getSpecificBook});
});

/*
Route               /author
description         Get specific book on author
ACCESS              PUBLIC
Parameter           none
Methods             Get
*/
booky.get("/author",(req,res) => {
  return res.json ({authors:database.author});
  });


  /*
  Route               /author/book
  description         Get specific book on isbn
  ACCESS              PUBLIC
  Parameter           isbn
  Methods             Get
  */

  booky.get("/author/book/:isbn",(req,res) => {
    const getSpecificAuthor = database.author.filter(
      (author) => author.books.includes(req.params.isbn)
    );

    if(getSpecificAuthor.length === 0){
      return res.json({
        erroe:`no author found ${req.params.isbn}`
      });
    }
  });

  /*
  Route               /publications
  description         Get specific book on isbn
  ACCESS              PUBLIC
  Parameter           none
  Methods             Get
  */

  booky.get("/publications",(req,res) => {
    return res.json({publications: database.publication});
  });


//post
  /*
  Route               /book/new
  description         add new books
  ACCESS              PUBLIC
  Parameter           none
  Methods             post
  */
booky.post("/book/new",(req,res) => {
  const newBook = req.body;
  database.books.push(newBook);
  return res.json({updatedBooks: database.books});
});
/*
Route               /author/new
description         add new author
ACCESS              PUBLIC
Parameter           none
Methods             post
*/

booky.post("/author/new",(req,res) =>{
  const newAuthor = req.body;
  database.author.push(newAuthor);
  return res.json(database.author);
});


/*
Route               /publication/update/book
description         update or add new publication
ACCESS              PUBLIC
Parameter           isbn
Methods             put
*/

booky.put("/publication/update/book/:isbn",(req,res) =>{
  //update publication Database
  database.publication.forEach((pub) => {
    if (pub.id === req.body.pubId) {
      return pub.books.push(req.params.isbn);
    }
  });

  //update the book Database
database.books.forEach((book) => {
  if (book.ISBN === req.params.isbn) {
    book.publications = req.body.pubId;
  return;
}

});

return res.json(
  {
    books:database.books,
    publications: database.publication,
    message: "succes"
  }
);

});

//delete

/*
Route               /book/delete
description         delete a book
ACCESS              PUBLIC
Parameter           isbn
Methods             delete
*/

booky.delete("/book/delete/:isbn",(req,res) => {
  const updatedBookDatabase = database.books.ilter(
    (book) => book.ISBN !== req.params.isbn
  )
  database.books = updatedBookDatabase;

  return res.json({books: database.books});
});

/*
Route               /book/delete/author
description         delete a book
ACCESS              PUBLIC
Parameter           isbn ,authorId
Methods             delete
*/

booky.delete("/book/delete/author/:isbn/:authorId",(req,res) =>{
  //update book database
database.books.forEach((book)=>{
  if (book.ISBN === req.params.isbn){
    const newAuthorList = book.author.filter(
      (eachAuthor)=> eachAuthor !== parseInt(req.params.authorId)
    );
    book.author = newAuthorList;
    return;
  }
});
  //update author database
  database.author.forEach((eachAuthor) => {
    if(eachAuthor.id ===parseInt(req.params.authorId)){
      const newBookList = eachAuthor.books.filter(
        (book)=> book !==req.params.isbn
      );
      eachAuthor.books = newBookList;
      return;
    }
  });

  return res.json({
    book :database.books,
    author : database.author,
    messge : "Author was deleted!!!!"
  });
});

booky.listen(3000,() => {
  console.log("server is up n running");
});
