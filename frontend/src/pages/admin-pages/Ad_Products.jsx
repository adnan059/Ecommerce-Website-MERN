import AdminImageUpload from "@/components/admin-comps/AdminImageUpload";
import CommonForm from "@/components/common-comps/CommonForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config/data";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";

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

  // ---- handle create product ----
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
  };

  // ------- return the jsx -----------
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
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
