/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Fragment, useState } from "react";
import DeleteConfirmation from "../common-comps/DeleteConfirmation";
import useDelete from "@/hooks/useDelete";
import { setAddressList } from "@/redux/addressSlice";
import { toast } from "sonner";
import { toastOptions } from "@/config/data";

// Address card component body
const AddressCard = ({
  addressInfo,
  setFormData,
  setCurrentEditedId,
  formData,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  const { addressList } = useSelector((state) => state.address);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const deleteData = useDelete();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { _id: chosenAddressId } = selectedId;

  // function that handles the deletion of an address
  const handleDeleteAddress = async () => {
    const response = await deleteData(
      `address/delete/${user?._id}/${addressInfo?._id}`
    );

    if (response.data.success) {
      const newAddressList = addressList.filter(
        (addressItem) =>
          addressItem._id.toString() !== addressInfo._id.toString()
      );

      dispatch(setAddressList({ data: newAddressList }));

      toast.success(response.data.message, toastOptions);
    }
    return;
  };

  // function that handles the updating of an address
  const handleEditAddress = async (addressInfo) => {
    setCurrentEditedId(addressInfo?._id);
    setFormData({
      ...formData,
      address: addressInfo?.address,
      city: addressInfo?.city,
      phone: addressInfo?.phone,
      pincode: addressInfo?.pincode,
      notes: addressInfo?.notes,
    });
  };

  console.log(selectedId?._id);

  // ------ return the jsx -------
  return (
    <Fragment>
      <Card
        className={`${
          chosenAddressId === addressInfo?._id ? "bg-green-200" : ""
        } grid p-4 gap-4 cursor-pointer`}
        onClick={
          setCurrentSelectedAddress
            ? () => {
                setCurrentSelectedAddress(addressInfo);
              }
            : null
        }
      >
        <CardContent>
          <Button
            className={`block mb-6 mx-auto ${
              chosenAddressId === addressInfo?._id ? "bg-green-800" : ""
            }`}
          >{`${
            chosenAddressId === addressInfo?._id ? "Selected" : "Select"
          }`}</Button>
          <Label>Address: {addressInfo?.address}</Label>
          <Label>City: {addressInfo?.city}</Label>
          <Label>Pincode: {addressInfo?.pincode}</Label>
          <Label>Phone: {addressInfo?.phone}</Label>
          <Label>Notes: {addressInfo?.notes}</Label>
        </CardContent>
        <CardFooter className="p-3 flex justify-between">
          <a href="#addressform">
            <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
          </a>

          <Button onClick={() => setIsDeleteDialogOpen(true)}>Delete</Button>
        </CardFooter>
      </Card>
      <DeleteConfirmation
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        deleteItem={handleDeleteAddress}
        itemCategory={"address"}
      />
    </Fragment>
  );
};

export default AddressCard;
