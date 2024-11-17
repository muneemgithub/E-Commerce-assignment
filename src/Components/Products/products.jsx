import {
  Autocomplete,
  Box,
  Card,
  CircularProgress,
  Divider,
  Grid,
  Snackbar,
  SnackbarContent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./product.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slice/add-cart/addCartSlice";

export const Products = () => {
  const [CardList, setCardList] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [products, setproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch()


  console.log(isLoading, "isLoading");

  const cartHandler = (product) => {
    const isExist = CardList.find((cart) => cart.id === product.id);
    if (!isExist) {
      setCardList((prev) => [...prev, product]);
    } else {
      setOpenAlert(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const searchHandler = (event) => {
    if (event?.target?.value === "") {
    }
    const filteredArr = products?.filter((product) =>
      product?.name.toLowerCase().includes(event?.target?.value.toLowerCase())
    );
    setproducts(filteredArr);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const productsData = await axios.get(
          "https://fakestoreapi.com/products"
        );
        console.log(productsData, "products");

        if (productsData.status === 200) {
          setIsLoading(false);
          setproducts(productsData?.data);
          setAllProducts(productsData?.data);

          const filterCategories = productsData?.data?.map((product) => {
            return {
              label: product?.category,
              value: product?.category,
            };
          });

          const uniqueCategories = filterCategories.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.value === item.value)
          );
          setCategoryOptions(uniqueCategories);
        } else {
          setIsLoading(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    let filteredProducts = allProducts.filter(
      (product) => product?.category === categoryFilter?.value
    );
    setproducts(filteredProducts);
    console.log(filteredProducts, 'filteredProducts');
  }, [categoryFilter]);

  return (
    <>
      <Box className="container mt-3 d-flex justify-content-between">
        <TextField
          onChange={searchHandler}
          size="small"
          placeholder="Search Items..."
        />
        <Autocomplete
          disablePortal
          options={categoryOptions}
          sx={{ width: 240 }}
          size="small"
          onChange={(e, newValue) => {
            setCategoryFilter(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Categorios" />}
        />
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        message=""
      >
        <SnackbarContent
          style={{
            backgroundColor: "#bb2124",
          }}
          message={
            <Box className="d-flex justify-content-between">
              <span id="client-snackbar">Product already in cart list</span>
              <CloseIcon sx={{ float: "right" }} onClick={handleClose} />
            </Box>
          }
        />
      </Snackbar>

      {isLoading ? (
        <Box className="text-center mt-5">
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Grid container className="container mt-3">
          {products?.map((product, index) => {
            return (
              <Grid item xs={12} md={3} mb={2}>
                <Card
                  key={index}
                  sx={{
                    padding: "20px",
                    cursor: "pointer",
                    width: "250px",
                  }}
                >
                  <Box>
                    <Box className="text-center">
                      <img
                        style={{ maxHeight: "140px", minHeight: "140px" }}
                        className="product-image"
                        width={100}
                        src={product.image}
                        alt={`${product.title}`}
                      />
                    </Box>
                    <Tooltip title={product?.title} placement="top">
                      <Typography variant="h6" className="mt-3">
                        {product?.title?.length >= 22
                          ? `${product?.title.slice(0, 18)}...`
                          : product?.title}
                      </Typography>
                    </Tooltip>
                    <Divider sx={{ borderColor: "#333" }} variant="fullWidth" />
                    <Box className="d-flex justify-content-between mt-2">
                      <Tooltip title="Product Details">
                        <VisibilityIcon
                          onClick={() => {
                            navigate(`/product-details/${product?.id}`);
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Add to Favorite">
                        <FavoriteIcon />
                      </Tooltip>
                      <Tooltip title="Add to Cart">
                        <ShoppingCartIcon
                           onClick={()=>dispatch(addToCart())}
                        />
                      </Tooltip>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};
