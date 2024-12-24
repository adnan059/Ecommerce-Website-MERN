import ShoppingAddress from "@/components/shopping-comps/ShoppingAddress";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-comps/CartItemsContent";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { toastOptions } from "@/config/data";
import usePost from "@/hooks/usePost";
import { handleNewOrder } from "@/redux/shoppingOrderSlice";

const Sh_Checkout = () => {
  const { cartItems, cartId } = useSelector((state) => state.cart);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const { postData } = usePost();
  const dispatch = useDispatch();
  const { approvalURL } = useSelector((state) => state.shoppingOrder);

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

  // initial payment procedure
  const handleInitiatePaypalPayment = async () => {
    if (cartItems.length === 0) {
      toast.error(
        "your cart is empty. please add items to proceed",
        toastOptions
      );
      return;
    }
    if (currentSelectedAddress === null) {
      toast.error("Please select one address to proceed", toastOptions);

      return;
    }

    const orderData = {
      userId: user?._id,
      cartId,
      cartItems: cartItems.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    // console.log(orderData);
    const response = await postData(`order/create`, orderData);

    dispatch(
      handleNewOrder({
        approvalURL: response?.data?.approvalURL,
        orderId: response?.data?.orderId,
      })
    );

    if (response?.data?.success) {
      setIsPaymentStart(true);
    } else {
      setIsPaymentStart(false);
    }
  };

  useEffect(() => {
    if (approvalURL) {
      window.location.href = approvalURL;
    }
  }, [approvalURL]);

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <ShoppingAddress
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.length > 0
            ? cartItems.map((item) => (
                <UserCartItemsContent key={Math.random()} cartItem={item} />
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
