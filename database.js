const books = [
  {
    ISBN : "12345book",
    title: "Tesla",
    pubDate: "2022-08-04",
    laanguage:"eng",
    numPage: 300,
    author:[1,2],
    publications: [1],
    category: ["tech,space,love"]
  }
]

const author = [
  {
    id:1,
    name: "vi",
    books: ["12345book","secretbook"]
  },
  {
    id:2,
    name: "sah",
    books: ["12345book"]
  }
]

const publications = [
  {
    id :1,
    name : "sai",
    books : " 12345book"
  },
  {
    id :2,
    name : "sa",
    books : " 1234book"
  }

]

module.exports ={books , author , publications};
