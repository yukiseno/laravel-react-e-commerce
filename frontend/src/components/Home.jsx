import { useState, useEffect } from "react";
import axios from "axios";
import ProductsList from "./products/ProductsList";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products");
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
  console.log("loading:", loading);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <ProductsList products={products} />;
}
