import React from "react";
import { addProduct } from "../../redux/CartSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";

const ProductItem = ({ data }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({ ...data, quantity: 1 }));
    message.success("Ürün sepete eklendi.")
  };
  return (
    <div
      className="product-item border hover:shadow-lg cursor-pointer transition-all select-none"
      onClick={handleClick}
    >
      <div className="product-img">
        <img
          src={data.img}
          alt=""
          className="h-28 object-cover w-full border-b"
        />
      </div>
      <div className="product-info flex flex-col p-3">
        <span className="font-bold">{data.title}</span>
        <span>{data.price}₺</span>
      </div>
    </div>
  );
};

export default ProductItem;
