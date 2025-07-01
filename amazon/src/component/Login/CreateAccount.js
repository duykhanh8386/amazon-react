import { Button, Checkbox, Form, message, Input, Typography } from "antd";
import "./Signin.scss";
import { useEffect, useState } from "react";
import { createAccount, getAccount } from "../../services/login";
import { useNavigate } from "react-router-dom";
function CreateAccount() {
  const [account, setAccount] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      const responee = await getAccount();
      setAccount(responee);
      
    }
    fetchApi();
  }, [])
  
  const onFinish = async (e) => {
    const userExists = account.some(acc => acc.username === e.username); // ✅ check tồn tại
   
    if (e.password === e.confirmPassword && !userExists) {
      const respone = await createAccount(e);
      
      messageApi.open({
        type: 'success',
        content: 'Create new account success!'
      });
      navigate("/signin");
    } else {
      if (e.password !== e.confirmPassword) {
        messageApi.open({
          type: 'error',
          content: 'Password do not match!'
        });
      } else {
        messageApi.open({
          type: 'error',
          content: 'Username already exists!',
        });
      }

    }

  };
  return (
    <>{contextHolder}
      <Form
        className="form__signin"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <h2>Create account</h2>
        <Form.Item layout="vertical"
          label="Enter mobile number or email"
          name="username"
          className="form__item"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item layout="vertical"
          label="Your name "
          name="fullname"
          className="form__item"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item layout="vertical"
          label="Password (at least 6 characters)"
          name="password"
          className="form__item"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, min: 6, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item layout="vertical"
          label="Re-enter password"
          name="confirmPassword"
          className="form__item"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: 'Please input your password again !' }]}
        >
          <Input.Password />
        </Form.Item>


        <Form.Item label={null} className="form__item" wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" className="form__item--button">
            Verify
          </Button>
        </Form.Item>



      </Form>
    </>
  )
}
export default CreateAccount;