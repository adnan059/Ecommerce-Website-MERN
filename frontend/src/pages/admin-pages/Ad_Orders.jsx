import AdminOrderDetails from "@/components/admin-comps/AdminOrderDetails";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetch from "@/hooks/useFetch";
import { setOrderDetails, setOrderList } from "@/redux/adminSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// component
const Ad_Orders = () => {
  const { orderDetails } = useSelector((state) => state.admin);

  const { data: orderListResponse } = useFetch("order/all");

  const { orderList } = useSelector((state) => state.admin);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();

  // setting the order list
  useEffect(() => {
    dispatch(setOrderList({ data: orderListResponse }));
  }, [orderListResponse]);

  // setting the order details
  const manageOrderDetails = (orderDetails) => {
    dispatch(setOrderDetails({ data: orderDetails }));
  };

  const onDialogOpenChange = () => {
    setOpenDetailsDialog(false);
    dispatch(setOrderDetails({ data: null }));
  };

  //useeffect to open the order details dialog
  useEffect(() => {
    orderDetails !== null && setOpenDetailsDialog(true);
  }, [orderDetails]);

  // return the jsx
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow key={orderItem?._id}>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={onDialogOpenChange}
                      >
                        <Button onClick={() => manageOrderDetails(orderItem)}>
                          View Details
                        </Button>
                        <AdminOrderDetails
                          onDialogOpenChange={onDialogOpenChange}
                        />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Ad_Orders;
