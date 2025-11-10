import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/cards/InfoCard";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";

import { addThousandsSeperator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview"
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      console.log("API Response:", response.data); // Log the API response

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  // Add this log to check last30DaysExpenses
  console.log("Last 30 Days Expenses:", dashboardData?.last30DaysExpenses);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard/>}
            label="Total Balance"
            value={addThousandsSeperator(dashboardData?.totalbalance || 0)}
            color="bg-primary"
          />
          
            <InfoCard
              icon={<LuWalletMinimal/>} // New icon for Total Income
              label="Total Income"
              value={addThousandsSeperator(dashboardData?.totalIncome || 0)} // New Total Income card
              color="bg-green-500" // New color for Total Income
            />

          <InfoCard
            icon={<LuHandCoins/>}
            label="Total Expense"
            value={addThousandsSeperator(dashboardData?.totalExpenses || 0)}
            color="bg-red-500"
          />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions = {dashboardData?.recentTransactions}
            onSeeMore = {() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalbalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpenses || 0}
          />


          <ExpenseTransactions
            transactions = {dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore = {() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []} // Ensure this is correct
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
            totalIncome = {dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions = {dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore = {() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;

export function CustomBarChart(props) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={props.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
