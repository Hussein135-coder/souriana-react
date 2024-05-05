/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import axios from "axios";
import { removeToken } from "../helpers";

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const initialUser = { username: "", email: "", token: "" };
  const [user, setUser] = useState(initialUser);
  const [money, setMoney] = useState([]);
  const [analytics, setAnalytics] = useState({ syredu: [], bac: [], syr: [] });
  const [monthlyAnalytics, setMonthlyAnalytics] = useState({
    syredu: [],
    bac: [],
    syr: [],
  });
  const [moneyErrors, setMoneyErrors] = useState({
    name: [],
    number: [],
    company: [],
    date: [],
  });
  const [wait, setWait] = useState(false);
  const [loading, setLoading] = useState(true);

  // Login
  const userLogin = async (userData) => {
    setWait(true);
    try {
      const res = await Axios.post("auth/local", userData);
      const data = res.data;
      console.log(data, "login");

      if (data.jwt) {
        setUser({
          ...data.user,
          token: data.jwt,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data.user, token: data.jwt })
        );
        return { status: "success" };
      } else {
        return { status: "failed" };
      }
    } catch (error) {
      console.log(error, "login error");
      if (error.message == "Network Error") {
        return { status: "Network Error" };
      }
      if (error.response.data.error.name == "ValidationError") {
        return { status: "notValid" };
      }
      return { status: "failed" };
    } finally {
      setWait(false);
    }
  };

  //Check Logged In
  const fetchLoggedInUser = async (token) => {
    try {
      const response = await Axios.get(`/users/me`, {
        headers: { Authorization: `bearer ${token}` },
      });
      const data = await response.data;
      console.log(user, "fetch");
      if (data.email) {
        setUser({
          ...data,
          token: token,
        });
        return { status: "success" };
      } else {
        return { status: "failed" };
      }
    } catch (error) {
      console.error(error);
      return { status: "failed" };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const userLogout = (navigate) => {
    removeToken();
    setUser(initialUser);
    navigate("/login");
  };

  // Get Money

  const getMoney = async (token) => {
    try {
      const res = await Axios.get("monies?sort[0]=date:desc", {
        headers: { Authorization: `bearer ${token}` },
      });
      const data = res.data;
      console.log(data, "all data");
      setMoney(data.data);
      return { status: "success" };
    } catch (error) {
      console.log(error, "money error");
      if (error.response.data.error.name == "ValidationError") {
        return { status: "notValid" };
      }
      return { status: "failed" };
    }
  };

  // Get One Money

  const getOneMoney = async (token, id) => {
    try {
      const res = await Axios.get(`monies/${id}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      const data = res.data.data.attributes;
      return { status: "success", data };
    } catch (error) {
      console.log(error, "money error");
      if (error.response.data.error.name == "ValidationError") {
        return { status: "notValid" };
      }
      return { status: "failed" };
    }
  };

  // Add Money
  const addMoney = async (money, token) => {
    setWait(true);
    try {
      const res = await Axios.post(
        "monies",
        { data: money },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      const data = res.data;
      console.log(data, "add money");

      if (data != null) {
        getMoney(user.token);
        return { status: "success" };
      } else {
        return { status: "failed" };
      }
    } catch (error) {
      console.log(error);
      return { status: "failed" };
    } finally {
      setWait(false);
    }
  };

  // Edit Money
  const editMoney = async (money, token, id, check) => {
    setWait(true);
    try {
      const res = await Axios.put(
        `monies/${id}`,
        { data: money },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      const data = res.data;
      console.log(data, "edit money");

      if (data != null) {
        check ? await getMoney(user.token) : getMoney(user.token);

        return { status: "success" };
      } else {
        return { status: "failed" };
      }
    } catch (error) {
      console.log(error);
      return { status: "failed" };
    } finally {
      setWait(false);
    }
  };

  // Delete Money
  const deleteMoney = async (token, id) => {
    setWait(true);
    try {
      const res = await Axios.delete(`monies/${id}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      const data = res.data;
      console.log(data, "delete money");

      if (data != null) {
        getMoney(user.token);

        return { status: "success" };
      } else {
        return { status: "failed" };
      }
    } catch (error) {
      console.log(error);
      return { status: "failed" };
    } finally {
      setWait(false);
    }
  };

  // Get Analytics
  const getAnalytics = async (token, page) => {
    try {
      const res = await Axios.get(
        `${page}s?sort[0]=date:desc&pagination[start]=0&pagination[limit]=2`,
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      const data = res.data;
      console.log(data, page, "analyutics data");
      setAnalytics((prev) => {
        return { ...prev, [page]: data.data };
      });
      console.log(analytics, page);
      return { status: "success" };
    } catch (error) {
      console.log(error, "analytics error");
      if (error.response.data.error.name == "ValidationError") {
        return { status: "notValid" };
      }
      return { status: "failed" };
    }
  };

  // Get Analytics By Month
  const getMonthAnalytics = async (token, page, year, month) => {
    const nextMonth =
      month == "12"
        ? "01"
        : Number(month) < 9
        ? "0" + (Number(month) + 1)
        : Number(month) + 1;
    const nextYear = month == "12" ? Number(year) + 1 : year;
    try {
      const res = await Axios.get(
        `${page}s?sort[0]=date:desc&filters[date][$eq]=${nextYear}-${nextMonth}-01&filters[date][$eq]=${year}-${month}-01`,
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      const data = res.data;
      console.log(data, page, "analyutics Monthhhhhh", nextYear, nextMonth);
      setMonthlyAnalytics((prev) => {
        return { ...prev, [page]: data.data };
      });
      console.log(monthlyAnalytics, page);
      return { status: "success" };
    } catch (error) {
      console.log(error, "analytics error");
      if (error.response.data.error.name == "ValidationError") {
        return { status: "notValid" };
      }
      return { status: "failed" };
    }
  };

  // Add analytics
  const addAnalytics = async (analytic, token, page) => {
    setWait(true);
    try {
      const res = await Axios.post(
        `${page}s`,
        { data: analytic },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      const data = res.data;
      console.log(data, "add analytic");

      if (data != null) {
        getAnalytics(user.token, page);
        return { status: "success" };
      } else {
        return { status: "failed" };
      }
    } catch (error) {
      console.log(error);
      return { status: "failed" };
    } finally {
      setWait(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        userLogin,
        wait,
        fetchLoggedInUser,
        loading,
        userLogout,
        getMoney,
        money,
        addMoney,
        getOneMoney,
        editMoney,
        deleteMoney,
        moneyErrors,
        setMoneyErrors,
        getAnalytics,
        analytics,
        addAnalytics,
        getMonthAnalytics,
        monthlyAnalytics,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
