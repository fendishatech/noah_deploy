import React from "react";

const Clients = () => {
  return (
    <section className="w-full px-2 mt-2 mb-2 flex flex-col">
      <h1 className="text-2xl text-green-400">Clients</h1>
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
        <div className="w-full px-4 py-4  flex-1 bg-green-50 shadow-md">
          Cards
        </div>
        <div className="w-full px-4 py-4 flex-1 bg-green-50 shadow-md">
          Table
        </div>
      </div>
    </section>
  );
};

export default Clients;
