/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Fragment, useState } from "react";
import DeleteConfirmation from "../common-comps/DeleteConfirmation";

const AddressCard = ({ addressInfo }) => {
  const { addressList } = useSelector((state) => state.address);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteAddress = () => {
    console.log(addressInfo);
  };

  const handleEditAddress = (id) => {
    console.log(id);
  };
  return (
    <Fragment>
      <Card>
        <CardContent className="grid p-4 gap-4">
          <Label>Address: {addressInfo?.address}</Label>
          <Label>City: {addressInfo?.city}</Label>
          <Label>Pincode: {addressInfo?.pincode}</Label>
          <Label>Phone: {addressInfo?.phone}</Label>
          <Label>Notes: {addressInfo?.notes}</Label>
        </CardContent>
        <CardFooter className="p-3 flex justify-between">
          <Button onClick={() => handleEditAddress(addressInfo?._id)}>
            Edit
          </Button>
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
