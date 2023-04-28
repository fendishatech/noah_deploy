import React from "react";
import Cookies from "js-cookie";
import Clients from "./clients";
import Members from "./members";
import Loan from "./loan";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const Home = () => {
  console.log(Cookies.get(ACCESS_TOKEN_COOKIE_NAME));
  console.log(Cookies);
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h2>
      <hr />
      <Clients />
      <Members />
      <Loan />
    </div>
  );
};

export default Home;
