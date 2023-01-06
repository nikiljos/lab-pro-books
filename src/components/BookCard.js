import React from 'react'
import { useNavigate } from 'react-router-dom'
import './BookCard.scss'

const BookCard = (props) => {
  console.log(props)
  let imageDetail=props.img
  if(!imageDetail){
    imageDetail = {
      thumbnail: "https://img.freepik.com/free-vector/empty-book-realistic-mockup_1017-9207.jpg",
    };
  }
  let navigate=useNavigate()
  let showDetail=(id)=>{
    console.log(id)
    return navigate(`/detail/${id}`)
  }
  return (
    <div className="BookCard" onClick={() => showDetail(props.id)}>
      {/* <pre>{JSON.stringify(props.data)}</pre> */}
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