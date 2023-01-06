import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './BookDetail.scss'

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
        <div className="top">
          <div className="img-section">
            <img
              src={
                detail.imageLinks
                  ? detail.imageLinks.thumbnail
                  : defaultThumbImg
              }
              alt="Book Thumbnail"
            />
            <div className="pages">
              {detail.pageCount ? detail.pageCount : "-"} Pages
            </div>
          </div>

          <div className="detail">
            <div className="title">{detail.title}</div>
            <div className="subtitle">{detail.subtitle}</div>
            <div className="authors">
              {detail.authors ? "Author: " + detail.authors.join(", ") : ""}
            </div>
            <div
              className="desc"
              dangerouslySetInnerHTML={{ __html: detail.description }}
            ></div>
          </div>
        </div>
        {/* <pre>{JSON.stringify(detail)}</pre> */}

        {/* <div className="desc">{detail.description}</div> */}
        <div className="cat-section">
          <div className="cat-title">Categories</div>
          <div className="cat-list">
            {detail.categories && detail.categories.length > 0 ? (
              detail.categories.map((cat, i) => (
                <div className="category" key={cat}>
                  {cat}
                </div>
              ))
            ) : (
              <div className="category">Others</div>
            )}
          </div>
        </div>
      </div>
    );
  }
  else{
    return ""
  }
  
}

export default BookDetail