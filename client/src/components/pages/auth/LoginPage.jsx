import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_api + "/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const user = await res.json();

      if (res.status === 200) {
        localStorage.setItem(
          "posUser",
          JSON.stringify({
            username: user.username,
            email: user.email,
          })
        );
        message.success("Giriş işlemi başarılı.");
        navigate("/");
      } else if (res.status === 404) {
        message.error("Kullanıcı bulunamadı!");
      } else if (res.status === 400) {
        message.error("Şifre yanlış!");
      }
      setLoading(false);
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <div className="text-center mb-2 flex justify-center ">
          <img src="images/logo.png" alt="" />
        </div>
        <Form layout="vertical" onFinish={onFinish}>
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
          <Form.Item>
            <Link>Şifremi Unuttum</Link>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
              loading={loading}
            >
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          Henüz bir hesabınız yok mu?&nbsp;
          <Link to="/register" className="text-blue-600">
            Şimdi kaydol
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
