import ShoppingProductFilter from "@/components/shopping-comps/ShoppingProductFilter";
import { useSelector } from "react-redux";

const Sh_Listing = () => {
  const { productList } = useSelector((state) => state.admin);
  console.log(productList);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ShoppingProductFilter />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sh_Listing;
