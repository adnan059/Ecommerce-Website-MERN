import { Button } from "@/components/ui/button";
import { setCartItems } from "@/redux/cartSlice";
import { resetShoppingOrder } from "@/redux/shoppingOrderSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetShoppingOrder());
    dispatch(setCartItems({ data: [], cartId: null }));
  }, []);
  return (
    <div className="flex justify-center items-center flex-col h-96">
      <h1 className="text-center font-bold text-3xl capitalize mb-10">
        the page you are looking for does not exist.
      </h1>
      <Button
        onClick={() => {
          navigate("/shop/home");
        }}
        className="mt-3"
      >
        Go back home
      </Button>
    </div>
  );
};

export default NotFound;
