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
import { setOrderDetails } from "@/redux/adminSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Ad_Orders = () => {
  const orderList = [
    {
      _id: "sdfs",
      orderStatus: "rejected",
      orderDate: "22-05-2024T25642",
      totalAmount: 253,
    },
    {
      _id: "xcvert",
      orderStatus: "confirmed",
      orderDate: "17-09-2024T25642",
      totalAmount: 367,
    },
  ];
  const { orderDetails } = useSelector((state) => state.admin);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();

  const manageOrderDetails = (orderDetails) => {
    console.log(orderDetails);
    dispatch(setOrderDetails({ data: orderDetails }));
  };
  useEffect(() => {
    orderDetails !== null && setOpenDetailsDialog(true);
  }, [orderDetails]);
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
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(setOrderDetails({ data: null }));
                        }}
                      >
                        <Button onClick={() => manageOrderDetails(orderItem)}>
                          View Details
                        </Button>
                        <AdminOrderDetails orderDetails={orderDetails} />
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
