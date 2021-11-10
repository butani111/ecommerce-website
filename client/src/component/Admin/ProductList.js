import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { clearErrors, getAdminProduct } from "../../actions/productAction";

const ProductList = () => {
  const { products, error } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getAdminProduct());
  }, [dispatch, error, alert]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 0.5,
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
          <>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        price: item.price,
        stock: item.stock,
      });
    });

  return (
    <>
      <MetaData title="All Products - Admin" />

      <div className="dashboard">
        <Sidebar />
        <div className="product-list-container">
          <h1 id="product-list-heading">ALL PRODUCTS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            className="product-list-table"
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
