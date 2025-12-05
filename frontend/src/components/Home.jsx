import { useState, useEffect } from "react";
import ProductsList from "./products/ProductsList";
import { axiosRequest } from "../helpers/config";
import { useDebounce } from "use-debounce";
import Alert from "./layouts/Alert";
import Spinner from "./layouts/Spinner";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  const handleColorSelectBox = (e) => {
    setSelectedSize("");
    setSearchTerm("");
    setSelectedColor(e.target.value);
  };

  const handleSizeSelectBox = (e) => {
    setSelectedColor("");
    setSearchTerm("");
    setSelectedSize(e.target.value);
  };

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);

      try {
        if (selectedColor) {
          const response = await axiosRequest.get(
            `products/${selectedColor}/color`
          );
          setProducts(response.data.data);
          setColors(response.data.colors);
          setSizes(response.data.sizes);
          return;
        }

        if (selectedSize) {
          const response = await axiosRequest.get(
            `products/${selectedSize}/size`
          );
          setProducts(response.data.data);
          setColors(response.data.colors);
          setSizes(response.data.sizes);
          return;
        }

        if (debouncedSearchTerm !== "") {
          const response = await axiosRequest.get(
            `products/${debouncedSearchTerm}/find`
          );

          if (response.data.data.length > 0) {
            setProducts(response.data.data);
            setColors(response.data.colors);
            setSizes(response.data.sizes);
          } else {
            setMessage("No products found");
          }
          return;
        }

        const response = await axiosRequest.get("products");
        setProducts(response.data.data);
        setColors(response.data.colors);
        setSizes(response.data.sizes);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, [selectedColor, selectedSize, debouncedSearchTerm]);

  return (
    <div>
      <div className="flex justify-center my-5">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filter by Color */}
            <div>
              <div className="mb-2">
                <span className="font-bold">Filter by color:</span>
              </div>

              <select
                name="color_id"
                id="color_id"
                defaultValue=""
                onChange={(e) => handleColorSelectBox(e)}
                disabled={selectedSize || searchTerm}
                className="border rounded-lg p-2 w-full bg-white disabled:bg-gray-100"
              >
                <option value="" disabled={!selectedColor}>
                  All Colors
                </option>
                {colors.map((color) => (
                  <option value={color.id} key={color.id}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Size */}
            <div>
              <div className="mb-2">
                <span className="font-bold">Filter by size:</span>
              </div>

              <select
                name="size_id"
                id="size_id"
                defaultValue=""
                onChange={(e) => handleSizeSelectBox(e)}
                disabled={selectedColor || searchTerm}
                className="border rounded-lg p-2 w-full bg-white disabled:bg-gray-100"
              >
                <option value="" disabled={!selectedSize}>
                  All Sizes
                </option>
                {sizes.map((size) => (
                  <option value={size.id} key={size.id}>
                    {size.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <div className="mb-2">
                <span className="font-bold">Search:</span>
              </div>

              <form className="flex">
                <input
                  type="search"
                  className="border rounded-lg p-2 w-full disabled:bg-gray-100"
                  value={searchTerm}
                  disabled={selectedColor || selectedSize}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      {message ? (
        <Alert type="primary" content={message} />
      ) : loading ? (
        <Spinner />
      ) : (
        <ProductsList products={products} />
      )}
    </div>
  );
}
