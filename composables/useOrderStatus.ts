

export const useOrderStatus = () => {

  const OrderStatus = {
    1: { id: 1, color: "text-secondary", icon: "tabler-transfer-in", title: "Ingresado" },
    2: { id: 2, color: "text-info", icon: "tabler-circle-check", title: "Pagado" },
    3: { id: 3, color: "text-info", icon: "tabler-send", title: "Enviado" },
    4: { id: 4, color: "text-error", icon: "tabler-circle-x", title: "Anulado" },
    10: { id: 10, color: "text-success", icon: "tabler-circle-check", title: "Entregado" },
    11: { id: 11, color: "text-error", icon: "tabler-circle-x", title: "Error Pago" },
    12: { id: 12, color: "text-info", icon: "tabler-circle-check", title: "Listo para enviar" },
    13: { id: 13, color: "text-info", icon: "tabler-comment", title: "Comentario" },
    15: { id: 15, color: "text-info", icon: "tabler-circle-x", title: "En proceso" },
  }

  const getOrderStatusDescription = status => {
    return OrderStatus[status]?.title || "Desconocido " + status
  }

  return {
    OrderStatus,
    getOrderStatusDescription,
    getColor(state) {
      return OrderStatus[state]?.color?.replace("text-","") || "secondary";
    },
  }

}
