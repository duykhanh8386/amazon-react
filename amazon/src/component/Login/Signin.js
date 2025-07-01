import { Button, Checkbox, Form, Input, Typography } from "antd";
import "./Signin.scss";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import { getAccount } from "../../services/login";
import { useDispatch } from "react-redux";

function Signin() {
  const navigate = useNavigate();
  const { setUser } = useUser(); // 👈 Gọi hàm cập nhật user
  const dispatch = useDispatch();
  const [account, setAccount] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAccount();
      setAccount(result);
    }
    fetchApi();
  }, [])

  const onFinish = (values) => {
    const user = account.find(item =>

      item.username === values.username &&
      item.password === values.password
    )
    if (user) {
      setUser({ name: user.fullname, username: user.username }); // 👈 Lưu thông tin người dùng
      const savedCart = JSON.parse(
        localStorage.getItem(`cart_${user.username}`)
      ) || [];
      dispatch({ type: "LOAD_CART", items: savedCart });

      navigate("/");
      console.log("OK");
    }

    else {
      alert("Your username or password is not correct!");
    }
  }

    ;
  return (
    <>
      <Form
        className="form__signin"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <h2>Signin or create account</h2>
        <Form.Item layout="vertical"
          label="Mobile number or email"
          name="username"
          className="form__item"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item layout="vertical"
          label="Password"
          name="password"
          className="form__item"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>


        <Form.Item label={null} className="form__item" wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" className="form__item--button">
            Submit
          </Button>
        </Form.Item>

        <div>If you don't own account!  <a href="/signin/create-account">Signin here!</a></div>

      </Form>
    </>
  )
}
export default Signin;