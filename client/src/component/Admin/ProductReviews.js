import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import StarIcon from "@material-ui/icons/Star";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  clearErrors,
  getAllReviews,
  deleteReview,
} from "../../actions/productAction";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import "./productReviews.css";
// import "./productList.css";

const ProductReviews = ({ history }) => {
  const { reviews, loading, error } = useSelector(
    (state) => state.productReviews
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const dispatch = useDispatch();
  const alert = useAlert();
  const [productId, setProductId] = useState("");

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview(reviewId, productId));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      dispatch({ type: DELETE_REVIEW_RESET });
      dispatch(getAllReviews(productId));
    }
  }, [dispatch, error, alert, history, productId, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    { field: "user", headerName: "User", minWidth: 150, flex: 0.4 },
    { field: "comment", headerName: "Comment", minWidth: 200, flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "text-green"
          : "text-red";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              deleteReviewHandler(params.getValue(params.id, "id"));
            }}
          >
            <DeleteIcon />
          </Button>
        );
      },
    },
  ];

  const rows = [];
  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.name,
        comment: item.comment,
        rating: item.rating,
      });
    });

  return (
    <>
      <MetaData title="All Reviews - Admin" />

      <div className="dashboard">
        <Sidebar />
        <div className="product-list-container product-reviews-container">
          <form
            className="new-product-form product-reviews-form"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1>ALL REVIEWS</h1>
            <div>
              <StarIcon />
              <input
                type="text"
                placeholder="Product ID"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="new-product-btn"
              type="submit"
              disabled={loading || productId === "" ? true : false}
            >
              Get Reviews
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              className="product-list-table"
              disableSelectionOnClick
              autoHeight
            />
          ) : (
            <h1 className="no-reviews-found">No Reviews Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
