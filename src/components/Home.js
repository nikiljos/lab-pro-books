import React, { useEffect, useState } from 'react'
import './Home.css'
import BookCard from './BookCard'

const Home = () => {


  let [bookList,updateBookList]=useState([])
  let [startIndex,updateStartIndex]=useState(0)
  let [searchQuery,updateSearchQuery]=useState("javascript")

  let searchInput=React.createRef()

  useEffect(()=>{
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${startIndex}`)
    .then(res=>res.json())
    .then(data=>{
      // console.log(data.items)
      let newItems=data.items.map(elt=>{
        let {id,volumeInfo}=elt
        return {
          id,
          ...volumeInfo
        }
      })
      if(newItems.length>0){
        updateBookList(prev=>[...prev,...newItems])
      }
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
    <div className='Home'>
      <div>Home - {bookList.length}</div> 
      <div className="search">
        <form onSubmit={search}>
          <input type="text" ref={searchInput}/>
          <button type='submit'>Search</button>
        </form>
        
      </div>
      <div className="books">
        {bookList.map((elt,i)=>(<BookCard id={elt.id} title={elt.title} img={elt.imageLinks} key={`${elt.id}-${i}`}/>))}
      </div>
      <button onClick={loadMore}>Load More</button>
    </div>

    
  )
}

export default Home