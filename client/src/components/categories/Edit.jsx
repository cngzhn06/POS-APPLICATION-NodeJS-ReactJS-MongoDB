import { Button, Form, Input, Modal, Table, message } from "antd";
import React, { useState } from "react";

const Edit = ({ isEditModalOpen, setEditIsModalOpen, categories , setCategories }) => {
  const [editRow, setEditRow] = useState({});

  const onFinish = (values) => {
    try {
      fetch("http://localhost:5000/api/categories/update-category", {
        method: "PUT",
        body: JSON.stringify({ ...values, categoryId: editRow._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategor başarıyla güncellendi");
      setCategories(
        categories.map((item) => {
          if (item._id === editingRow._id) {
            return { ...item, title: values.title };
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Bir şeyler yanlış gitti");
      console.log("🚀 ~ file: Edit.jsx:12 ~ onFinish ~ error:", error);
    }
  };

  const deleteCategory = (id) => {
    if(window.confirm("Emin misiniz? ")) {
        try{
            fetch("http://localhost:5000/api/categories/delete-category" , {
                method:"DELETE",
                body: JSON.stringify({...id,categoryId:editRow.id}),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            })
            message.success("Kategori Başarıyla Silidi")
            setCategories(categories.filter((item) => item._id !== id ))
        }
        catch(error) { 
            message.error("Bir şeyler yanlış gitti");
            console.log("🚀 ~ file: Edit.jsx:34 ~ deleteCategory ~ error:", error)
        }
    }
  }

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return record.title;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div>
            <Button type="link" onClick={() => setEditRow(record)} className="pl-0">
              Düzenle
            </Button>
            <Button type="link" htmlType="submit" className="text-gray-600">
              Kaydet
            </Button>
            <Button type="link" danger onClick={() => deleteCategory(record._id)}>
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      open={isEditModalOpen}
      title="Kategori İşlemleri;"
      footer={false}
      onCancel={() => setEditIsModalOpen(false)}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
        />
      </Form>
    </Modal>
  );
};

export default Edit;
