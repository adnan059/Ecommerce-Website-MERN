import AdminImageUpload from "@/components/admin-comps/AdminImageUpload";
import AdminProductTile from "@/components/admin-comps/AdminProductTile";
import CommonForm from "@/components/common-comps/CommonForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements, toastOptions } from "@/config/data";
import usePost from "@/hooks/usePost";
import { setProductList } from "@/redux/adminSlice";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

// ------- initial state ----------
const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

// ------- Products component -------
const Ad_Products = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const { loading } = useSelector((state) => state.common);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const { postData } = usePost();
  const { productList } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  // ---- handle create product ----
  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await postData("products/add", {
      ...formData,
      image: uploadedImageUrl,
    });

    const { data } = response;

    const updatedProductList = [...new Set([...productList, data])];

    dispatch(setProductList({ data: updatedProductList }));
    setImageFile(null);
    setFormData(initialFormData);
    toast.success("product added successfully", toastOptions);
  };

  // ------- return the jsx -----------
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList?.length > 0 &&
          productList.map((product) => (
            <AdminProductTile key={product?._id} product={product} />
          ))}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => setOpenCreateProductsDialog(false)}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          {/* --- image upload section --- */}
          <AdminImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
          />
          <div className="py-6">
            {/* -- product upload form -- */}
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonTxt={"Add"}
              onSubmit={onSubmit}
              isBtnDisabled={loading}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default Ad_Products;
