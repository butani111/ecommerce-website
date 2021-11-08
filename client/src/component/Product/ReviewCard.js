import React from "react";
import { Rating } from "@material-ui/lab";
import profileImg from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="review-card">
      <img src={profileImg} alt="user" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="review-card-comment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
