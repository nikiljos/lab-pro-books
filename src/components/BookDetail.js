import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './BookDetail.scss'
import defaultThumbImg from "../assets/default-cover.webp";
import NotFound from './NotFound';

const BookDetail = () => {

  let [detail,setDetail]=useState(null)
  let [loadStatus,updateLoadStatus]=useState(true)
  let {id}=useParams()

  useEffect(()=>{
    updateLoadStatus(true)
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
    .then(res=>res.json())
    .then(data=>{
      updateLoadStatus(false)
      setDetail(data.volumeInfo)
    })
  },[id])

  if(!loadStatus){
    if (detail) {
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
    } else {
      return <NotFound/>;
    }
  }
  else{
    return <div className="loading">Loading...</div>;
  }
}

export default BookDetail