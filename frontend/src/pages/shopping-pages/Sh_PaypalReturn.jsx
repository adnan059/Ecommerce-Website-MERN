import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const Sh_PaypalReturn = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment ... Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default Sh_PaypalReturn;
