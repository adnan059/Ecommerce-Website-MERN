import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import usePost from "@/hooks/usePost";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const Sh_PaypalReturn = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const { postData } = usePost();
  const payerId = params.get("PayerID");

  useEffect(() => {
    const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

    const handleCapturePayment = async () => {
      const response = await postData(`order/capture`, {
        orderId,
        paymentId,
        payerId,
      });

      if (response?.data?.success) {
        sessionStorage.removeItem("currentOrderId");
        window.location.href = "/shop/payment-success";
      }

      return;
    };

    if (payerId && paymentId) {
      handleCapturePayment();
    }
  }, [paymentId, payerId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment ... Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default Sh_PaypalReturn;
