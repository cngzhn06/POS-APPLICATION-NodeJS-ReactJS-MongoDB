import React, { useEffect, useState } from "react";

import Categories from "../categories/Categories";
import Products from "../product/Products";
import Header from "../header/Header";
import CartTotals from "../cart/CartTotals";

const HomePage = () => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  console.log();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_api + "/api/products/get-all"
        );
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_api + "/api/categories/get-all-category"
        );
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  return (
    <>
      <Header setSearch={setSearch} />
      <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24 h-screen">
        <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10 ">
          <div>
            <Categories
              categories={categories}
              setCategories={setCategories}
              setFiltered={setFiltered}
              product={product}
            />
          </div>
        </div>
        <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10">
          <div>
            <Products
              categories={categories}
              filtered={filtered}
              product={product}
              setProduct={setProduct}
              search={search}
            />
          </div>
        </div>
        <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
          <div>
            <CartTotals />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
