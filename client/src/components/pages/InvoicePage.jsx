import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import { Button, Card, Table } from "antd";
import PrintInvoice from "../invoices/PrintInvoice";

const InvoicePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItem, setBillItem] = useState([]);
  const [customer, setCustomer] = useState();

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/invoices/get-all");
        const data = await res.json();
        const billItemsWithKeys = data.map((item, index) => ({ ...item, key: index }));
        setBillItem(billItemsWithKeys);
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
      title: "Müşteri Telefon Numarası",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Oluşturma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
    {
      title: "Ödeme Yöntemi",
      dataIndex: "paymentMode",
      key: "paymentMode",
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => {
        return <span>{text}₺</span>;
      },
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Button
            type="link"
            className="pl-0"
            onClick={() => {
              setIsModalOpen(true);
              setCustomer(record);
            }}
          >
            Yazdır
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Faturalar</h1>
        <Table
          dataSource={billItem}
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x:1000,
            y:300
          }}
        />
      </div>
      <PrintInvoice
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        customer={customer}
      />
    </>
  );
};

export default InvoicePage;
