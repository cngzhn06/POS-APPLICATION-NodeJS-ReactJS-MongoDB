import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import StatisticCard from "../statistics/StatisticCard";

const StatitisticPage = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("posUser"));


  useEffect(() => {
    asyncFetch();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_api + "/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const asyncFetch = () => {
    fetch(import.meta.env.VITE_api + "/api/invoices/get-all")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return setData(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return amount.toFixed(2);
  };

  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center">İstatistikler</h1>
        <div className="statistic-section">
          <h2 className="text-xl">
            Hoş geldin{" "}
            <span className="text-green-700 font-bold text-xl">{user.username}</span>.
          </h2>
          <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
            <StatisticCard
              title={"Toplam Müşteri"}
              amount={data?.length}
              img={"images/user.png"}
            />
            <StatisticCard
              title={"Toplam Kazanç"}
              amount={totalAmount()}
              img={"images/money.png"}
            />
            <StatisticCard
              title={"Toplam Satış"}
              amount={data?.length}
              img={"images/sale.png"}
            />
            <StatisticCard
              title={"Toplam Ürün"}
              amount={products?.length}
              img={"images/product.png"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatitisticPage;
