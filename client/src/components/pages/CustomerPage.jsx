import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import { Card, Table } from "antd";

const CustomerPage = () => {
  const [billItems, setBillItems] = useState([]);

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_api + "/api/invoices/get-all");
        const data = await res.json();
        const billItemsWithKeys = data.map((item, index) => ({
          ...item,
          key: index,
        }));
        setBillItems(billItemsWithKeys);
      } catch (error) {
        console.log(error);
      }
    };

    getBills();
  }, []);

  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Telefon Numarası",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "İşlem Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Müşteriler</h1>
        <Table
          dataSource={billItems}
          columns={columns}
          bordered
          pagination={false}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72"></Card>
        </div>
      </div>
    </>
  );
};

export default CustomerPage;
