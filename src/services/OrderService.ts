import type { Order } from "../types/order";

export class OrderService {
  /**
   * Sends a new order to the backend API
   *
   * @param {Object} order - The order data to be submitted
   * @returns {boolean} True if the order was successfully created, false otherwise
   */
  static async createOrder(order: Order): Promise<boolean> {
    try {
      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("Kunde inte spara ordern");
      }

      return true;
    } catch (error) {
      console.error("Error creating order:", error);
      return false;
    }
  }
}
