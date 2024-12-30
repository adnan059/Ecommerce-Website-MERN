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
import useFetch from "@/hooks/useFetch";
import usePost from "@/hooks/usePost";
import usePut from "@/hooks/usePut";
import { isFormValid } from "@/lib/utils";
import { setProductList } from "@/redux/adminSlice";
import { Fragment, useEffect, useState } from "react";
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

// ------- Products component body -------
const Ad_Products = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const { postData } = usePost();
  const { updateData } = usePut();
  const { productList } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const { data } = useFetch(`products/all`);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  // setting the product list
  useEffect(() => {
    dispatch(setProductList({ data }));
  }, [data]);

  // ---- handle create or update product ----
  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = currentEditedId
      ? await updateData(`products/edit/${currentEditedId}`, formData)
      : await postData("products/add", {
          ...formData,
          image: uploadedImageUrl,
        });

    setLoading(false);

    const { data } = response;

    let updatedProductList = productList.filter(
      (product) => product._id.toString() !== data._id.toString()
    );

    updatedProductList = [...new Set([...updatedProductList, data])];

    dispatch(setProductList({ data: updatedProductList }));

    setImageFile(null);
    setFormData(initialFormData);
    toast.success(
      `product ${currentEditedId ? "updated" : "added"} successfully`,
      toastOptions
    );
    if (currentEditedId) {
      setCurrentEditedId(null);
      setOpenCreateProductsDialog(false);
    }
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
            <AdminProductTile
              key={product?._id}
              product={product}
              setCurrentEditedId={setCurrentEditedId}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setFormData={setFormData}
            />
          ))}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          if (currentEditedId) {
            setFormData(initialFormData);
          }
          setCurrentEditedId(null);
          setOpenCreateProductsDialog(false);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? "Edit the Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          {/* --- image upload section --- */}
          <AdminImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            {/* -- product upload form -- */}
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonTxt={currentEditedId ? "Edit" : "Add"}
              onSubmit={onSubmit}
              isBtnDisabled={isFormValid(formData) || loading}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default Ad_Products;
