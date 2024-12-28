import ShoppingProductDetails from "@/components/shopping-comps/ShoppingProductDetails";
import ShoppingProductTile from "@/components/shopping-comps/ShoppingProductTile";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { setSearchResults } from "@/redux/commonSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Sh_Search = () => {
  const { searchResults } = useSelector((state) => state.common);
  const [searchParams, setSearchParams] = useSearchParams();
  const { refetchData } = useFetch();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { sh_productDetails } = useSelector((state) => state.shop);

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 2) {
      setTimeout(async () => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));

        const { data } = await refetchData(`products/search/${keyword}`);
        console.log(data);
        dispatch(setSearchResults({ data }));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(setSearchResults({ data: [] }));
    }
  }, [keyword]);

  useEffect(() => {
    sh_productDetails !== null && setOpenDetailsDialog(true);
  }, [sh_productDetails]);

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

      <ShoppingProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={sh_productDetails}
      />
    </div>
  );
};

export default Sh_Search;
