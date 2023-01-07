import React from 'react'
import { useNavigate } from 'react-router-dom'
import './BookCard.scss'
import defaultThumbImg from "../assets/default-cover.webp";

const BookCard = (props) => {
  let imageDetail=props.img
  if(!imageDetail){
    imageDetail = {
      thumbnail: defaultThumbImg,
    };
  }
  let navigate=useNavigate()
  let showDetail=(id)=>{
    return navigate(`/detail/${id}`)
  }
  return (
    <div className="BookCard" onClick={() => showDetail(props.id)}>
      <img src={imageDetail.thumbnail} alt={props.title} />
      <div className="detail">
        <div className="title">{props.title}</div>
        <div className="authors">
          {props.authors ? "By " + props.authors.join(", ") : ""}
        </div>
      </div>
    </div>
  );
}

export default BookCard