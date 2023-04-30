import { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";

const Clients = () => {
  const [clients, setClients] = useState({});

  useEffect(() => {
    const getClients = async () => {
      try {
        const res = await axiosInstance.get("/clients");
        setClients(res.data.clients);
      } catch (error) {
        console.log(error);
      }
    };

    getClients();
  }, []);
  console.log({ clients });
  return (
    <section className="w-full px-2 mt-2 mb-2 flex flex-col">
      <h1 className="text-2xl text-green-400">Clients</h1>
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
        <div className="w-full px-4 py-4  flex-1 bg-green-50 shadow-md">
          Cards
        </div>
        <div className="w-full px-4 py-4 flex-1 bg-gray-50 shadow-md">
          {clients && clients.length > 0 && (
            <TableComponent clients={clients} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Clients;

const TableComponent = ({ clients }) => {
  return (
    <div className="container flex justify-center mx-auto">
      <div className="flex flex-col">
        <div className="w-full">
          <div className="border-b border-gray-200 shadow">
            <table className="divide-y divide-gray-300 ">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-2 text-xs text-gray-500">ID</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Full Name</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Phone NO</th>
                  <th className="px-6 py-2 text-xs text-gray-500">
                    Created_at
                  </th>
                  <th className="px-6 py-2 text-xs text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {clients.map((client, index) => (
                  <TableRow client={client} key={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ client }) => {
  return (
    <tr className="whitespace-nowrap">
      <td className="px-6 py-4 text-sm text-gray-500">1</td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">
          {client.first_name}
          {client.father_name}
        </div>
      </td>
      <td className="px-6 py-4">{client.phone_no}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{client.createdAt}</td>
      {/* <td className="px-6 py-4 text-sm text-gray-500">2021-1-12</td> */}
      <td className="px-6 py-4">
        <a
          href="#"
          className="px-4 py-1 text-sm text-indigo-600 bg-indigo-200 rounded-full"
        >
          To Member
        </a>
        <a
          href="#"
          className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full"
        >
          Delete
        </a>
      </td>
    </tr>
  );
};
