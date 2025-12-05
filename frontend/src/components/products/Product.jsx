import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosRequest } from "../../helpers/config";
import Spinner from "../layouts/Spinner";
import Alert from "../layouts/Alert";

export default function Product() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const { slug } = useParams();
  useEffect(() => {
    const fetchProductBySlug = async () => {
      setLoading(true);
      try {
        const response = await axiosRequest.get(`product/${slug}/show`);
        setProduct(response.data.data);
      } catch (error) {
        if (error?.response?.status === 404) {
          setError("The product you are looking for does not exist.");
        }
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductBySlug();
  }, [slug]);

  return (
    <div>
      {error ? (
        <Alert content={error} type="danger" />
      ) : loading ? (
        <Spinner />
      ) : (
        <div>{product?.name}</div>
      )}
    </div>
  );
}
