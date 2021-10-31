import React from "react";
import ReactStars from "react-rating-stars-component";
import profileImg from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "gray",
    activeColor: "tomato",
    value: review.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 15 : 20,
  };
  return (
    <div className="review-card">
      <img src={profileImg} alt="user" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
