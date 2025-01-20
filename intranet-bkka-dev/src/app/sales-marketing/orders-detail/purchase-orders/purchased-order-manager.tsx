const PurchasedOrderManager = (() => {
  let orders = []; // Array to store all submitted orders

  return {
    // Method to add a new order
    addOrder: (order) => {
      if (!order || typeof order !== "object") {
        throw new Error("Invalid order data");
      }
      orders.push(order);
    },

    // Method to get all orders
    getOrders: () => {
      return orders;
    },

    // Method to clear all orders (optional utility)
    clearOrders: () => {
      orders = [];
    },
  };
})();

export default PurchasedOrderManager;
