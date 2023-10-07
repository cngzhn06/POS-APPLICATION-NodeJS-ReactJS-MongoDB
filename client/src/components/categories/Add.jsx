import { Button, Form, Input, Modal, message } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React from 'react'

const Add  = ( { isAddModalOpen , setAddIsModalOpen , categories , setCategories } ) => {

    const [form] = useForm()


    const onFinish = (values) => {
        try {
          fetch("http://localhost:5000/api/categories/add-category", {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          });
          message.success("Kategori Başarıyla Eklendi.");
          form.resetFields()
          setCategories([...categories, {
            _id: Math.random(),
            title : values.title
          }])
        } catch (error) {
            console.log(error);
        }
      };

  return (
    <div>
        <Modal
        title="Yeni Kategori Ekle"
        open={isAddModalOpen}
        onCancel={() => setAddIsModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name="title"
            label="Kategori Ekle:"
            rules={[
              { required: true, message: "Kategori eklemek zorundasınız" },
            ]}
          >
            <Input placeholder='Kategori giriniz'/>
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Add