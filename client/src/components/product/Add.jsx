import React from "react";
import { Button, Form, Input, Modal, message, Select } from "antd";
import { useForm } from "antd/es/form/Form";

const Add = ({ isAddModalOpen, setAddIsModalOpen, categories, product ,setProduct }) => {
  const [form] = useForm();

  const onFinish = (values) => {
    try {
      fetch("http://localhost:5000/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün Başarıyla Eklendi.");
      form.resetFields();
      setProduct([
        ...product,
        {
            ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
       setAddIsModalOpen(false)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal
        title="Yeni Ürün Ekle"
        open={isAddModalOpen}
        onCancel={() => setAddIsModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name="title"
            label="Ürün Adı:"
            rules={[
              { required: true, message: "Ürün adı eklemek zorundasınız." },
            ]}
          >
            <Input placeholder="Ürün adını giriniz." />
          </Form.Item>
          <Form.Item
            name="img"
            label="Ürün Görseli:"
            rules={[
              { required: true, message: "Ürün görseli eklemek zorundasınız." },
            ]}
          >
            <Input placeholder="Ürün görselini giriniz." />
          </Form.Item>
          <Form.Item
            name="price"
            label="Ürün Fiyatı:"
            rules={[
              { required: true, message: "Ürün fiyatı eklemek zorundasınız." },
            ]}
          >
            <Input placeholder="Ürün fiyatını giriniz." />
          </Form.Item>
          <Form.Item
            name="category"
            label="Kategori Seç:"
            rules={[
              { required: true, message: "Kategori eklemek zorundasınız." },
            ]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
              options={categories}
            />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Add;
