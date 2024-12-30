import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.jpg";
import bannerTwo from "../../assets/banner-2.jpg";
import bannerThree from "../../assets/banner-3.jpg";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ShoppingProductTile from "@/components/shopping-comps/ShoppingProductTile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { setAllFilteredProducts } from "@/redux/shopSlice";
import ShoppingProductDetails from "@/components/shopping-comps/ShoppingProductDetails";
import { useNavigate } from "react-router-dom";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

const slides = [bannerOne, bannerTwo, bannerThree];

// shopiing home component
const Sh_Home = () => {
  const { sh_productList, sh_productDetails } = useSelector(
    (state) => state.shop
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const { refetchData } = useFetch();
  const dispatch = useDispatch();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const navigate = useNavigate();

  // useeffect for fetching pordict list
  useEffect(() => {
    const fetchData = async () => {
      const response = await refetchData("shop/products");

      dispatch(setAllFilteredProducts({ data: response?.data }));
    };

    fetchData();
  }, []);

  // useeffect for slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 25000000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (sh_productDetails !== null) setOpenDetailsDialog(true);
  }, [sh_productDetails]);

  const handleNavigateToListingPage = (currentItem, section) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [currentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden bg-[#05617a]">
        {slides.map((slide, i) => (
          <img
            src={slide}
            key={i}
            className={`${
              i === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                key={categoryItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sh_productList && sh_productList.length > 0
              ? sh_productList.map((productItem, i) => (
                  <ShoppingProductTile key={i} product={productItem} />
                ))
              : null}
          </div>
        </div>
      </section>
      <ShoppingProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={sh_productDetails}
      />
    </div>
  );
};

export default Sh_Home;
