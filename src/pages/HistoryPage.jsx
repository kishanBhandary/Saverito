import PageHeader from "../components/PageHeader"
import OrderCard from "../components/OrderCard"

const HistoryPage = ({ orderHistory }) => {
  return (
    <>
      <PageHeader title="History" subtitle="your orders" />

      <div className="history-container">
        {orderHistory.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </>
  )
}

export default HistoryPage

