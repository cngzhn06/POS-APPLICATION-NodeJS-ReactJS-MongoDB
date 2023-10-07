import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      if(res.status === 200){
        message.success("Kayıt işlemi başarılı");
        navigate("/login")
        setLoading(false)
      }
    } catch (error) {
      message.error("Kayıt işlemi başarısız");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <div className="text-center mb-2 flex justify-center">
          <img src="images/logo.png" alt="" />
        </div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Kullanıcı Adı"
            name={"username"}
            rules={[
              {
                required: true,
                message: "Kullanıcı Adı Alanı Boş Bırakılamaz!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="E-mail"
            name={"email"}
            rules={[
              {
                required: true,
                message: "E-mail Alanı Boş Bırakılamaz!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Şifre"
            name={"password"}
            rules={[
              {
                required: true,
                message: "Şifre Alanı Boş Bırakılamaz!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Şifre Tekrar"
            name={"passwordAgain"}
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Şifre Tekrar Alanı Boş Bırakılamaz!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Şifreler Aynı Değil"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
              loading={loading}
            >
              Kaydol
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          Bir hesabınız var mı?&nbsp;
          <Link to="/login" className="text-blue-600">
            Şimdi giriş yap
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
