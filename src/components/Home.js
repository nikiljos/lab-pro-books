import React, { useEffect, useState } from 'react'
import './Home.scss'
import BookCard from './BookCard'

const Home = () => {

  const defaultCategories = [
    "javascript",
    "bestselling novels",
    "data structures",
    "nodejs",
    "database",
    "react"
  ];

  let randomCategory = defaultCategories[Math.floor(Math.random() * defaultCategories.length)];

  let [bookList,updateBookList]=useState([])
  let [startIndex,updateStartIndex]=useState(0)
  let [searchQuery,updateSearchQuery]=useState(randomCategory)
  let [resultEnd,updateResultEnd]=useState(false)
  let [loadStatus,updateLoadStatus]=useState(true)

  let searchInput=React.createRef()

  useEffect(()=>{
    updateLoadStatus(true)
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${startIndex}`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data.items)
      if(data.items&&data.items.length>0){
        let newItems = data.items.map((elt) => {
          let { id } = elt;
          // console.log(elt)
          let {title,imageLinks,authors}=elt.volumeInfo
          console.log({ title, imageLinks, authors });
          return {
            id,
            title,
            imageLinks,
            authors,
          };
        });
        console.log({newItems})
        updateBookList((prev) => [...prev, ...newItems]);
      }
      else{
        updateResultEnd(true);
      }
      updateLoadStatus(false)
      
    })
  },[startIndex,searchQuery])

  let loadMore=()=>{
    updateStartIndex(prev=>prev+10)
  }

  let resetResult=()=>{
    updateBookList([]);
    updateStartIndex(0);
  }

  let search=(e)=>{
    e.preventDefault();
    let query=searchInput.current.value
    if(query&&query!==""){
      resetResult()
      updateSearchQuery(query)
    }
  }

  return (
    <div className="Home">
      <div className="search">
        <form onSubmit={search}>
          <input type="text" ref={searchInput} />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="books">
        {bookList.map((elt, i) => (
          <BookCard
            id={elt.id}
            title={elt.title}
            img={elt.imageLinks}
            authors={elt.authors}
            key={`${elt.id}-${i}`}
          />
        ))}
      </div>
      <div className="status">
        <div>Showing {bookList.length} Books</div>
        {!resultEnd ? (
          loadStatus?"Loading...":<button onClick={loadMore}>View More</button>
        ) : (
          "All results loaded..."
        )}
      </div>
    </div>
  );
}

export default Home