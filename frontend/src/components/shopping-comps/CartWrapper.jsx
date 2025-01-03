/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./CartItemsContent";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { toastOptions } from "@/config/data";

const UserCartWrapper = ({ setOpenCartSheet }) => {
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  // calculating the total amount
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((total, currentItem) => {
          return (
            total +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity
          );
        }, 0)
      : 0;

  // return the jsx
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems?.map((item) => (
              <UserCartItemsContent cartItem={item} key={Math.random()} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          if (cartItems.length > 0) {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          } else {
            toast.warning("the cart is empty", toastOptions);
            setOpenCartSheet(false);
          }
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
