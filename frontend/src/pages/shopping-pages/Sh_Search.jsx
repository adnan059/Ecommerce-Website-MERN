import ShoppingProductTile from "@/components/shopping-comps/ShoppingProductTile";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSelector } from "react-redux";

const Sh_Search = () => {
  const { searchResults } = useSelector((state) => state.common);
  const [keyword, setKeyword] = useState("");

  // -------- return the jsx ----------
  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults?.map((item, i) => (
          <ShoppingProductTile key={i} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Sh_Search;
