import AdminImageUpload from "@/components/admin-comps/AdminImageUpload";
import { Button } from "@/components/ui/button";
import { toastOptions } from "@/config/data";
import useFetch from "@/hooks/useFetch";
import usePost from "@/hooks/usePost";
import { setFeatureImageList } from "@/redux/commonSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Ad_Dashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const dispatch = useDispatch();
  const { postData } = usePost();
  const { data } = useFetch("feature/get");

  const { featureImageList } = useSelector((state) => state.common);

  useEffect(() => {
    dispatch(setFeatureImageList({ data: data }));
  }, [data]);

  console.log("from ad dashboard ==>", uploadedImageUrl);

  const handleUploadFeatureImage = async () => {
    if (uploadedImageUrl) {
      const response = await postData("feature/add", {
        image: uploadedImageUrl,
      });
      console.log(response);

      const { data } = response;

      const updatedFeatureImagelist = [...featureImageList, data];

      dispatch(setFeatureImageList({ data: updatedFeatureImagelist }));

      setImageFile(null);
      setUploadedImageUrl("");
      toast.success("image uploaded successfully", toastOptions);
    } else {
      return toast.error("No image selected", toastOptions);
    }
  };

  // ----------- return the jsx ---------
  return (
    <div>
      {/* --- image upload section --- */}

      <AdminImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        //  isEditMode={currentEditedId !== null}
      />
      <Button
        onClick={handleUploadFeatureImage}
        disabled={uploadedImageUrl === ""}
        className="mx-auto block mt-4"
      >
        Upload
      </Button>
      <div>
        {featureImageList?.map((item, i) => (
          <div key={i}>
            <img src={item.image} width={200} height={200} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ad_Dashboard;
