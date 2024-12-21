import ShoppingAddress from "@/components/shopping-comps/ShoppingAddress";
import img from "../../assets/account.jpg";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-comps/CartItemsContent";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Sh_Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);

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

  const handleInitiatePaypalPayment = () => {};

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <ShoppingAddress />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.length > 0
            ? cartItems.map((item) => (
                <UserCartItemsContent key={item?._id} cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sh_Checkout;
