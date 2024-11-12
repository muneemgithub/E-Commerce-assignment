import { Box, Button, CircularProgress, Grid, Rating, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Productdetails = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const param = useParams();
  console.log(productDetail, "productDetail");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const productsData = await axios.get(
          `https://fakestoreapi.com/products/${param?.product_id}`
        );
        console.log(productsData, "products");

        if (productsData.status === 200) {
          setIsLoading(false);
          setProductDetail(productsData?.data);
        } else {
          setIsLoading(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Box className="text-center mt-5">
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Grid container spacing={3} className="container mt-5">
          <Grid item md={6} className="text-center">
            <img width={"300px"} src={productDetail?.image} alt="" />
          </Grid>
          <Grid item md={6}>
            <Typography variant="body1">{productDetail?.category}</Typography>
            <Typography variant="h5" className="mt-2">{productDetail?.title}</Typography>
            <Typography variant="body1" className="mt-3">
              {productDetail?.description}
            </Typography>
            <Typography variant="h5" className="mt-3">${productDetail?.price}</Typography>
            <Rating className="mt-3" name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
            <Button variant="outlined" color="error" className="ms-4 mb-3">Add To Cart</Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Productdetails;
