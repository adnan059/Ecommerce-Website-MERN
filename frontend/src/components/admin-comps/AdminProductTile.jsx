import useDelete from "@/hooks/useDelete";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { toast } from "sonner";
import { toastOptions } from "@/config/data";
import { useDispatch, useSelector } from "react-redux";
import { setProductList } from "@/redux/adminSlice";
import { Fragment, useState } from "react";

import DeleteConfirmation from "../common-comps/DeleteConfirmation";
import { noImagePic } from "@/lib/utils";

/* eslint-disable react/prop-types */
const AdminProductTile = ({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
}) => {
  const { productList } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const deleteData = useDelete();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // --- handle product delete ---
  const deleteProduct = async () => {
    const response = await deleteData("products/delete", product?._id);

    const { data } = response;

    dispatch(
      setProductList({
        data: productList.filter(
          (item) => item?._id.toString() !== product?._id.toString()
        ),
      })
    );

    toast.success(data?.message, toastOptions);
  };

  // ------ return the jsx ---------
  return (
    <Fragment>
      <Card className="w-full max-w-sm mx-auto">
        <div>
          <div className="relative">
            <img
              src={product?.image || noImagePic}
              alt={product?.title}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
          </div>
          <CardContent>
            <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
            <div className="flex justify-between items-center mb-2">
              <span
                className={`${
                  product?.salePrice > 0 ? "line-through" : ""
                } text-lg font-semibold text-primary`}
              >
                ${product?.price}
              </span>
              {product?.salePrice > 0 ? (
                <span className="text-lg font-bold">${product?.salePrice}</span>
              ) : null}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between items-center">
            <Button
              onClick={() => {
                setOpenCreateProductsDialog(true);
                setCurrentEditedId(product?._id);
                setFormData(product);
              }}
            >
              Edit
            </Button>
            <Button onClick={() => setIsDialogOpen(true)}>Delete</Button>
          </CardFooter>
        </div>
      </Card>
      <DeleteConfirmation
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        deleteProduct={deleteProduct}
      />
    </Fragment>
  );
};

export default AdminProductTile;
