/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { noImagePic } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "@/redux/shopSlice";
import usePost from "@/hooks/usePost";
import useFetch from "@/hooks/useFetch";
import { setCartItems } from "@/redux/cartSlice";
import { toast } from "sonner";
import { toastOptions } from "@/config/data";
import StarRating from "../common-comps/StarRating";
import { setReviews } from "@/redux/reviewSlice";

// ------ the component body --------
const ShoppingProductDetails = ({ open, setOpen, productDetails }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { postData } = usePost();
  const { refetchData } = useFetch();
  const { cartItems } = useSelector((state) => state.cart);
  const [rating, setRating] = useState(0);
  const [reviewMsg, setReviewMsg] = useState("");
  const { reviews } = useSelector((state) => state.reviews);
  const { data } = useFetch(`review/${productDetails?._id}`);

  useEffect(() => {
    productDetails !== null && dispatch(setReviews({ data }));
  }, [data]);

  // calculating the average review
  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  // adding product to the cart
  const handleAddToCart = async (id, totalStock) => {
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

    dispatch(
      setCartItems({ data: response?.data?.items, cartId: response?.data?._id })
    );
    toast.success("product is added to the cart", toastOptions);
  };

  // close the product details dialog
  const handleDialogClose = (event) => {
    if (event) {
      event.preventDefault();
    }

    dispatch(setProductDetails({ data: null }));

    setOpen(false);

    setReviewMsg("");

    setRating(0);
  };

  // opening the product details dialog
  useEffect(() => {
    if (productDetails !== null) {
      setOpen(true);
    }
  }, [productDetails]);

  // function to change the rating
  const handleRatingChange = (star) => {
    setRating(star);
  };

  // function that add review
  const handleAddReview = async () => {
    const response = await postData(`review/add`, {
      productId: productDetails?._id,
      userId: user?._id,
      userName: user?.userName,
      reviewMessage: reviewMsg,
      reviewValue: rating,
    });

    const { data } = response;

    const updatedReviews = [...reviews, data];

    dispatch(setReviews({ data: updatedReviews }));
    handleDialogClose();
  };
  // -------- return the jsx --------
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <DialogTitle className="sr-only">Product Details</DialogTitle>
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image || noImagePic}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">star rating compo</div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />

          {/* ---------- review section --------- */}
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>

            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div key={Math.random()} className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRating rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>

            {/* ---------- review writing input --------- */}
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <StarRating
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        {/* className="" */}
      </DialogContent>
    </Dialog>
  );
};

export default ShoppingProductDetails;
