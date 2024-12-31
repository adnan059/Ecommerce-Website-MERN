/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AddressCard from "./AddressCard";
import CommonForm from "../common-comps/CommonForm";
import { isFormValid } from "@/lib/utils";
import { addressFormControls, toastOptions } from "@/config/data";
import usePost from "@/hooks/usePost";
import { setAddressList } from "@/redux/addressSlice";
import useFetch from "@/hooks/useFetch";
import usePut from "@/hooks/usePut";
import { toast } from "sonner";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

// component body
const ShoppingAddress = ({
  setCurrentSelectedAddress,
  currentSelectedAddress,
  fromCheckout,
}) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { postData } = usePost();
  const { addressList } = useSelector((state) => state.address);
  const { data } = useFetch(`address/get/${user?._id}`);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { updateData } = usePut();

  // useeffect to set address list
  useEffect(() => {
    dispatch(setAddressList({ data: data }));
  }, [data]);

  // function that manages create or edit address
  const handleManageAddress = async (event) => {
    event.preventDefault();
    if (addressList.length >= 3 && currentEditedId === null) {
      toast.warning("you cannot add more than three addresses", toastOptions);
      return;
    }
    setLoading(true);
    const response = currentEditedId
      ? await updateData(
          `address/update/${user?._id}/${currentEditedId}`,
          formData
        )
      : await postData(`address/add`, {
          ...formData,
          userId: user?._id,
        });

    setLoading(false);
    const { data } = response;

    let updatedAddressList = addressList.filter(
      (item) => item._id.toString() !== data._id.toString()
    );

    dispatch(
      setAddressList({
        data: [...new Set([...updatedAddressList, response?.data])],
      })
    );
    toast.success(
      `${
        currentEditedId
          ? "address edited successfully"
          : "address created successfully"
      }`,
      toastOptions
    );
    setCurrentEditedId(null);
    setFormData(initialAddressFormData);
  };

  // return the jsx
  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((addressItem) => (
              <AddressCard
                key={addressItem?._id}
                addressInfo={addressItem}
                setFormData={setFormData}
                setCurrentEditedId={setCurrentEditedId}
                formData={formData}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
                currentSelectedAddress={currentSelectedAddress}
                fromCheckout={fromCheckout}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {`${currentEditedId ? "Edit The " : "Add New "}`}Address
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div id="addressform">
          <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleManageAddress}
            isBtnDisabled={isFormValid(formData) || loading}
            buttonTxt={currentEditedId ? "Edit" : "Create"}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShoppingAddress;
//f
