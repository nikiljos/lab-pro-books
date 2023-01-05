import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './BookDetail.css'

const BookDetail = () => {

  let [detail,setDetail]=useState(null)

  let {id}=useParams()

  let defaultThumbImg="https://img.freepik.com/free-vector/empty-book-realistic-mockup_1017-9207.jpg"

  useEffect(()=>{
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
    .then(res=>res.json())
    .then(data=>{
      setDetail(data.volumeInfo)
    })
  },[id])
  console.log(detail)
  if(detail){
    return (
      <div className="BookDetail">
        {/* <pre>{JSON.stringify(detail)}</pre> */}
        <div className="title">{detail.title}</div>
        <div className="subtitle">{detail.subtitle}</div>
        <div className="authors">
          Author: {detail.authors ? detail.authors.join(", ") : ""}
        </div>
        <img
          src={
            detail.imageLinks ? detail.imageLinks.thumbnail : defaultThumbImg
          }
          alt="Book Thumbnail"
        />
        <div className="pages">
          Pages: {detail.pageCount ? detail.pageCount : "-"}
        </div>
        {/* <div className="desc">{detail.description}</div> */}
        <div className="categories">
          {detail.categories
            ? detail.categories.map((cat) => (
                <div className="category">{cat}</div>
              ))
            : ""}
        </div>
      </div>
    );
  }
  else{
    return ""
  }
  
}

export default BookDetail