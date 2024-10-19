import React, { useState } from "react"

function App() {
  // Estado inicial dos pedidos
  const [pedidos, setPedidos] = useState([])

  // Estado para armazenar os dados do novo pedido
  const [novoPedido, setNovoPedido] = useState({
    cliente: "",
    servico: "",
    status: "pendente",
  })

  // Função para adicionar um novo pedido
  const adicionarPedido = () => {
    setPedidos([
      ...pedidos,
      {
        id: pedidos.length + 1,
        ...novoPedido,
      },
    ])
    // Limpar o formulário após adicionar
    setNovoPedido({
      cliente: "",
      servico: "",
      status: "pendente",
    })
  }

  // Função para editar o status de um pedido
  const editarPedido = (id, novoStatus) => {
    setPedidos(
      pedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, status: novoStatus } : pedido
      )
    )
  }

  // Função para excluir um pedido
  const excluirPedido = (id) => {
    setPedidos(pedidos.filter((pedido) => pedido.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Gerenciamento de Pedidos de Lavanderia
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Adicionar Novo Pedido</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Nome do Cliente"
              value={novoPedido.cliente}
              onChange={(e) =>
                setNovoPedido({ ...novoPedido, cliente: e.target.value })
              }
            />
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Tipo de Serviço"
              value={novoPedido.servico}
              onChange={(e) =>
                setNovoPedido({ ...novoPedido, servico: e.target.value })
              }
            />
            <button
              onClick={adicionarPedido}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Adicionar Pedido
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Lista de Pedidos</h2>
        <ul className="space-y-4">
          {pedidos.map((pedido) => (
            <li
              key={pedido.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <strong>{pedido.cliente}</strong> - {pedido.servico} <br />
                <span
                  className={`text-sm ${
                    pedido.status === "pendente"
                      ? "text-yellow-500"
                      : pedido.status === "em andamento"
                      ? "text-blue-500"
                      : "text-green-500"
                  }`}
                >
                  Status: {pedido.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editarPedido(pedido.id, "em andamento")}
                  className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition duration-200"
                >
                  Em Andamento
                </button>
                <button
                  onClick={() => editarPedido(pedido.id, "concluído")}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                >
                  Concluído
                </button>
                <button
                  onClick={() => excluirPedido(pedido.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App