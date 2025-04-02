import { Clock } from "lucide-react"

const OrderCard = ({ order }) => {
  return (
    <div className="order-card">
      <div className="order-header">
        <div className="order-id">Order #{order.id}</div>
        <div className={`order-status ${order.status.toLowerCase()}`}>{order.status}</div>
      </div>

      <div className="order-details">
        <div className="order-date">
          <Clock size={16} />
          <span>{order.date}</span>
        </div>

        <div className="order-items">
          {order.items.map((item, index) => (
            <span key={index} className="order-item">
              {item}
              {index < order.items.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>

        <div className="order-total">
          <span>Total:</span>
          <span className="price">₹{order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="order-actions">
        <button className="order-action-button">Reorder</button>
        <button className="order-action-button secondary">Details</button>
      </div>
    </div>
  )
}

export default OrderCard

