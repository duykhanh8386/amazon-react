// src/component/Payment/QRCodePayment.jsx
import { Modal, Button, QRCode, Result } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../contexts/UserContext";
import { useState } from "react";
import { deleteAll } from "../action/cart";

function QRCodePayment() {
  const cart = useSelector((state) => state.cartReducer);
  const { user } = useUser();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | pending | success

  const total = cart.reduce((sum, item) => {
    const price = item.info.price * (100 - item.info.discount) / 100;
    return sum + price * item.quantity;
  }, 0);

  const orderInfo = {
    user: user?.name || "Guest",
    total: total.toFixed(2),
    time: new Date().toLocaleString(),
    items: cart.map(item => ({
      name: item.info.name,
      quantity: item.quantity
    }))
  };

  const qrContent = JSON.stringify(orderInfo, null, 2);

  const handleOpen = () => {
    setVisible(true);
    setStatus("pending");

    // ✅ Giả lập thanh toán thành công sau 5 giây
    setTimeout(() => {
      setStatus("success");
      dispatch(deleteAll()); // ✅ Xoá giỏ hàng sau thanh toán thành công
    }, 5000);
  };

  const handleClose = () => {
    setVisible(false);
    setStatus("idle");
  };

  return (
    <>
      <Button type="primary" className="pay" onClick={handleOpen}>
        Proceed to Checkout
      </Button>

      <Modal
        title="QR Payment Simulation"
        open={visible}
        onCancel={handleClose}
        footer={null}
        centered
      >
        {status === "pending" && (
          <div style={{ textAlign: "center" }}>
            <p style={{ fontWeight: "bold", marginBottom: 10 }}>
              Trạng thái: <span style={{ color: "#faad14" }}>⏳ Chờ thanh toán...</span>
            </p>
            <QRCode value={qrContent} size={256} style={{marginLeft:"20%"}}/>
            <p style={{ marginTop: 12 }}>Đang xử lý thanh toán (giả lập)...</p>
          </div>
        )}

        {status === "success" && (
          <Result
            status="success"
            title="Thanh toán thành công!"
            subTitle={`Cảm ơn ${orderInfo.user}, đơn hàng trị giá $${orderInfo.total} đã được xác nhận.`}
            extra={[
              <Button key="close" onClick={handleClose}>
                Đóng
              </Button>,
            ]}
          />
        )}
      </Modal>
    </>
  );
}
export default QRCodePayment;
