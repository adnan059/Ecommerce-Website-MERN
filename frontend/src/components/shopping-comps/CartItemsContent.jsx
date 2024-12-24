/* eslint-disable react/prop-types */
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import useDelete from "@/hooks/useDelete";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "@/redux/cartSlice";
import { toast } from "sonner";
import { toastOptions } from "@/config/data";
import usePut from "@/hooks/usePut";

const UserCartItemsContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const { updateData } = usePut();
  const deleteData = useDelete();
  const dispatch = useDispatch();

  // function to handle the quantity update
  const handleUpdateQuantity = async (cartItem, typeOfchange) => {
    const { data } = await updateData(`cart/update`, {
      userId: user?._id,
      productId: cartItem?.productId,
      quantity:
        typeOfchange === "plus"
          ? cartItem?.quantity + 1
          : cartItem?.quantity - 1,
    });
    if (data.success) {
      dispatch(setCartItems({ data: data?.items, cartId: data?._id }));
    }
    return;
  };

  // function to handle the cart item delete
  const handleCartItemDelete = async (cartItem) => {
    const response = await deleteData(
      `cart/${user?._id}/${cartItem?.productId}`
    );
    const { data } = response;
    if (data.success) {
      dispatch(setCartItems({ data: data.items, cartId: data?._id }));
      toast.success("product removed from the cart", toastOptions);
    }
    return;
  };
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>

        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
};

export default UserCartItemsContent;
