import {
  brandOptionsMap,
  categoryOptionsMap,
  toastOptions,
} from "@/config/data";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { noImagePic } from "@/lib/utils";
import useFetch from "@/hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";

import usePost from "@/hooks/usePost";
import { setCartItems } from "@/redux/cartSlice";
import { toast } from "sonner";
import { setProductDetails } from "@/redux/shopSlice";

/* eslint-disable react/prop-types */
const ShoppingProductTile = ({ product }) => {
  const { refetchData } = useFetch();
  const { loading, postData } = usePost();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // adding products to cart
  const handleAddtoCart = async (id, totalStock) => {
    console.log(cartItems);

    if (cartItems.length) {
      const indexOfCurrentItem = cartItems.findIndex(
        (item) => item.productId === id
      );

      if (indexOfCurrentItem > -1) {
        const qty = cartItems[indexOfCurrentItem].quantity;

        if (qty + 1 > totalStock) {
          toast.warning(
            `Only ${qty} quantity can be added for this item`,
            toastOptions
          );

          return;
        }
      }
    }

    await postData(`cart/add`, {
      userId: user?._id,
      productId: id,
      quantity: 1,
    });

    const response = await refetchData(`cart/get/${user?._id}`);

    dispatch(setCartItems({ data: response?.data?.items }));
    toast.success("product is added to the cart", toastOptions);
  };

  // getting and setting product details
  const handleGetProductDetails = async (id) => {
    const response = await refetchData(`shop/products/${id}`);
    dispatch(setProductDetails({ data: response?.data }));
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image || noImagePic}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />

          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full"
            disabled={loading}
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
