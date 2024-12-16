import ShoppingProductFilter from "@/components/shopping-comps/ShoppingProductFilter";
import ShoppingProductTile from "@/components/shopping-comps/ShoppingProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config/data";
import useFetch from "@/hooks/useFetch";
import { createSearchParamsHelper } from "@/lib/utils";
import { setAllFilteredProducts } from "@/redux/shopSlice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Sh_Listing = () => {
  const { sh_productList } = useSelector((state) => state.shop);
  const { loading, data, refetchData } = useFetch(`shop/products`);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySearchParam = searchParams.get("category");

  // useeffect 1
  useEffect(() => {
    dispatch(setAllFilteredProducts({ data: data }));
  }, [data]);

  // useeffect 2
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  // useeffect 3
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  // useeffect 4
  useEffect(() => {
    if (filters === null && sort === null) return;
    const query = new URLSearchParams({
      ...filters,
      sortBy: sort,
    });
    const fetchData = async () => {
      const response = await refetchData("shop/products", query);

      dispatch(setAllFilteredProducts({ data: response?.data }));
    };

    fetchData();
  }, [filters, sort]);

  // handling the sorting
  const handleSort = (value) => {
    setSort(value);
  };

  // handling the filtering options
  const handleFilter = (getSectionId, getCurrentOption) => {
    let cpyFilters = JSON.parse(JSON.stringify(filters));
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCurrentOption);
      } else {
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  };
  //console.log(searchParams);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ShoppingProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {sh_productList?.length} Products
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {sh_productList && sh_productList.length > 0
            ? sh_productList.map((productItem, i) => (
                <ShoppingProductTile key={i} product={productItem} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Sh_Listing;
