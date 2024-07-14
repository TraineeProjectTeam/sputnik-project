import { Card } from "antd";
import { IOrderCardProps } from "../model/order-card.types";

export const OrderCard = (props: IOrderCardProps) => {
  const { order } = props;
  return (
    <Card title={`Order #${order.customer_id}`} >
      <p>Status: {order.status}</p>
      {/* <p>Order Date: {order.order_date.toDateString()}</p> */}
      {/* <p>Estimated Delivery Date: {order.estimated_delivery_date.toDateString()}</p> */}
      {/* <p>Delivery Date: {order.delivery_date.toDateString()}</p> */}
      <p>Price: ${order.price}</p>
      {/* <p>Pickup Points: {order.pickup_point.join(', ')}</p> */}
      {/* <p>Products: {order.products.join(', ')}</p> */}
    </Card>
  );
};