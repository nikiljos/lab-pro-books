import React, { useEffect, useState } from 'react'
import './Home.scss'
import BookCard from './BookCard'
import searchIcon from '../assets/icons/search.png'
import axios from 'axios'

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
  let [errorStatus, updateErrorStatus] = useState(false);

  let searchInput=React.createRef()

  useEffect(()=>{
    updateErrorStatus(false)
    updateLoadStatus(true)
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${startIndex}`)
    .then(res=>res.data)
    .then(data=>{
      if(data.items&&data.items.length>0){
        let newItems = data.items.map((elt) => {
          let { id } = elt;
          let {title,imageLinks,authors}=elt.volumeInfo
          return {
            id,
            title,
            imageLinks,
            authors,
          };
        });
        updateBookList((prev) => [...prev, ...newItems]);
      }
      else{
        updateResultEnd(true);
      }
      updateLoadStatus(false)
    })
    .catch(err=>{
      updateErrorStatus(true)
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
          <input type="text" ref={searchInput} placeholder="Search books..." />
          <button type="submit">
            <img src={searchIcon} alt="Search" />
          </button>
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
        {!resultEnd ? (
          loadStatus ? (
            <div className="load-prompt">
              {errorStatus ? "Sorry, Some Error Occured 🥲" : "Loading..."}
            </div>
          ) : (
            <>
              <div>Showing {bookList.length} Books</div>
              <div onClick={loadMore} className="load-prompt btn">
                View More
              </div>
            </>
          )
        ) : (
          <div className="load-prompt">
            {bookList.length > 0
              ? "All results loaded..."
              : "No books found 🥲"}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home