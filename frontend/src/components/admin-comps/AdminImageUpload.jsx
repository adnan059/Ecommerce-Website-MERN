/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "@/config/data";
import { endLoading, startLoading } from "@/redux/commonSlice";
import { Skeleton } from "../ui/skeleton";
import useHandleApiError from "@/hooks/useHandleApiError";

// ** Component for Product Image Upload **
const AdminImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  isEditMode,
}) => {
  const inputRef = useRef(null);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const handleApiError = useHandleApiError();

  // the function that handles the file change
  const handleImageFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    console.log(selectedFile);
    setImageFile(selectedFile);
  };

  // the function that handles the file drop
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  };

  // the function that handles the file drag
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // the function that handles the removing of selected image
  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // function that handles the final upload
  const uploadImageToCloudinary = async () => {
    const data = new FormData();
    data.append(
      "my-file",
      imageFile,
      `${imageFile.name.slice(0, 5)}_${Date.now()}`
    );

    dispatch(startLoading());
    try {
      const response = await axios.post(
        `${baseUrl}/products/upload-image`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response);

      setUploadedImageUrl(response.data.result.url);

      dispatch(endLoading());
    } catch (error) {
      handleApiError(error);
      dispatch(endLoading());
    }
  };

  // useEffect that controls the upload
  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  // --------- return the jsx ----------
  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className=" border-2 border-dashed rounded-lg p-4"
      >
        <Input
          disabled={isEditMode}
          type="file"
          id="image-upload"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center h-32 cursor-pointer ${
              isEditMode ? "cursor-not-allowed" : ""
            }`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : loading ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">
              {imageFile?.name.slice(0, 15)}...
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminImageUpload;
