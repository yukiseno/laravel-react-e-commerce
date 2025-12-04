import { useState, useEffect } from "react";
import ProductsList from "./products/ProductsList";
import { axiosRequest } from "../helpers/config";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
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
  }, []);
  console.log("Products:", products);
  console.log("Colors:", colors);
  console.log("Sizes:", sizes);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <ProductsList products={products} />;
}
