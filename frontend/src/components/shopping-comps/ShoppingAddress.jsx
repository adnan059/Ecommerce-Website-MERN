import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AddressCard from "./AddressCard";
import CommonForm from "../common-comps/CommonForm";
import { isFormValid } from "@/lib/utils";
import { addressFormControls } from "@/config/data";
import usePost from "@/hooks/usePost";
import { setAddressList } from "@/redux/addressSlice";
import useFetch from "@/hooks/useFetch";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const ShoppingAddress = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const { loading } = useSelector((state) => state.common);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { postData } = usePost();
  const { addressList } = useSelector((state) => state.address);
  const { data } = useFetch(`address/get/${user?._id}`);

  useEffect(() => {
    dispatch(setAddressList({ data: data }));
  }, [data]);

  const handleManageAddress = async (event) => {
    event.preventDefault();
    const response = await postData(`address/add`, {
      ...formData,
      userId: user?._id,
    });

    dispatch(
      setAddressList({ data: [...new Set([...addressList, response?.data])] })
    );
  };

  console.log(addressList);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((addressItem) => (
              <AddressCard key={addressItem?._id} addressInfo={addressItem} />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>Add new Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleManageAddress}
          isBtnDisabled={isFormValid(formData) || loading}
        />
      </CardContent>
    </Card>
  );
};

export default ShoppingAddress;
