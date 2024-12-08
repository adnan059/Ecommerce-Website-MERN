import { Input } from "../ui/input";
import { Label } from "../ui/label";

// Component for Product Image Upload
const AdminImageUpload = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div>
        <Input type="file" id="image-upload" className="hidden" />
      </div>
    </div>
  );
};

export default AdminImageUpload;
