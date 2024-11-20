import { Button, ButtonGroup, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { decreaseQuantity, increaseQuantity } from "../../slice/product/productSlice";

const CardList = (props) => {
  const { open, toggleDrawer } = props;

  const { items } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);

  console.log(items, "items");

  useEffect(() => {
    const cardItemsArr = localStorage.getItem("CardList");
    const parseCartItemsArr = JSON.parse(cardItemsArr);

    setCartItems(parseCartItemsArr);
  }, []);

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 450 }}
          role="presentation"
          //   onClick={toggleDrawer(false)}x
        >
          <Typography variant="h5">Cart Items</Typography>
          {items?.map((item) => {
            return (
              <Box className="d-flex justify-content-between align-items-center">
                <div>
                  <img width="40px" src={item?.image} alt="" />
                  <span>
                    {item?.title?.length >= 15
                      ? `${item?.title.slice(0, 15)}...`
                      : item?.title}
                  </span>
                </div>
                <ButtonGroup
                  size="small"
                  variant="text"
                  aria-label="Basic button group"
                >
                  <Button>
                    <RemoveIcon onClick={()=> dispatch(decreaseQuantity(item))} />
                  </Button>
                  <Button>{item?.quantity}</Button>
                  <Button>
                    <AddIcon onClick={() => dispatch(increaseQuantity(item))} />
                  </Button>
                </ButtonGroup>
                <span>{item?.price}</span>
              </Box>
            );
          })}
        </Box>
      </Drawer>
    </div>
  );
};

export default CardList;
