import React, { useState } from "react";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import { useNavigate } from "react-router-dom";

const Products = ({ categories, filtered, product, setProduct, search }) => {
  const navigate = useNavigate();
  const [isAddModalOpen, setAddIsModalOpen] = useState(false);

  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {filtered
        .filter((products) => products.title.toLowerCase().includes(search))

        .map((data) => (
          <ProductItem data={data} key={data._id} />
        ))}

      <div
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-700 flex justify-center items-center hover:opacity-90"
        onClick={() => setAddIsModalOpen(true)}
      >
        <PlusOutlined className="text-white md:text-2xl" />
      </div>
      <div
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-green-700 flex justify-center items-center hover:opacity-90 min-h-[180px]"
        onClick={() => navigate("/products")}
      >
        <EditOutlined className="text-white md:text-2xl" />
      </div>
      <Add
        isAddModalOpen={isAddModalOpen}
        setAddIsModalOpen={setAddIsModalOpen}
        categories={categories}
        product={product}
        setProduct={setProduct}
      />
    </div>
  );
};

export default Products;
