// import { FaUsers, FaDog, FaChartBar } from "react-icons/fa";

// const DashboardAdmin = () => {
//   return (
//     <div className="p-6 space-y-6">
//   <h1 className="text-3xl font-bold text-secondary dark:text-white">Admin Dashboard</h1>
//   <p className="text-gray-600 dark:text-gray-300">
//     Monitor the entire platform’s performance and manage users, pets, and donations.
//   </p>

//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//     {/* Manage Users */}
//     <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md border dark:border-white hover:shadow-xl transition">
//       <FaUsers className="text-4xl text-secondary mb-4" />
//       <h2 className="text-xl font-semibold dark:text-white">Manage Users</h2>
//       <p className="text-gray-500 dark:text-gray-300">
//         View all users and assign roles or take actions.
//       </p>
//     </div>

//     {/* All Pets */}
//     <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md border dark:border-white hover:shadow-xl transition">
//       <FaDog className="text-4xl text-secondary mb-4" />
//       <h2 className="text-xl font-semibold dark:text-white">All Pets</h2>
//       <p className="text-gray-500 dark:text-gray-300">
//         Review and manage all pet listings.
//       </p>
//     </div>

//     {/* Donations Overview */}
//     <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md border dark:border-white hover:shadow-xl transition">
//       <FaChartBar className="text-4xl text-secondary mb-4" />
//       <h2 className="text-xl font-semibold dark:text-white">Donations Overview</h2>
//       <p className="text-gray-500 dark:text-gray-300">
//         Track all donation campaigns and their statistics.
//       </p>
//     </div>
//   </div>
// </div>

//   );
// };

// export default DashboardAdmin;


import { FaUsers, FaDog, FaChartBar } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const DashboardAdmin = () => {
  // Dummy Data (তুমি API থেকে আনতে পারো)
  const totalStats = {
    users: 245,
    pets: 120,
    donations: 5600,
  };

  const donationsData = [
    { month: "Jan", amount: 400 },
    { month: "Feb", amount: 300 },
    { month: "Mar", amount: 500 },
    { month: "Apr", amount: 700 },
    { month: "May", amount: 600 },
    { month: "Jun", amount: 800 },
  ];

  const donationCategory = [
    { name: "Food", value: 300 },
    { name: "Medical", value: 500 },
    { name: "Shelter", value: 200 },
  ];

  const petsCategory = [
    { category: "Dogs", count: 50 },
    { category: "Cats", count: 40 },
    { category: "Birds", count: 20 },
    { category: "Others", count: 10 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <div className="p-6 space-y-6 -mt-11">
      <h1 className="text-3xl font-bold text-secondary dark:text-white">
        Admin Dashboard Overview
      </h1>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="custom_gradientd custom_gradientl p-6 rounded-xl shadow-md dark:border-white border-2 border-secondary/15 hover:shadow-xl transition flex flex-col items-center">
          <FaUsers className="text-4xl text-secondary mb-2" />
          <h2 className="text-xl font-semibold dark:text-white">Users</h2>
          <p className="text-2xl font-bold text-secondary">{totalStats.users}</p>
        </div>

        <div className="custom_gradientd custom_gradientl p-6 rounded-xl shadow-md dark:border-white border-2 border-secondary/15 hover:shadow-xl transition flex flex-col items-center">
          <FaDog className="text-4xl text-secondary mb-2" />
          <h2 className="text-xl font-semibold dark:text-white">Pets</h2>
          <p className="text-2xl font-bold text-secondary">{totalStats.pets}</p>
        </div>

        <div className="custom_gradientd custom_gradientl  dark:border-white border-2 border-secondary/15 hover:shadow-xl transition flex flex-col items-center p-6 rounded-xl shadow-md">
          <FaChartBar className="text-4xl text-secondary mb-2" />
          <h2 className="text-xl font-semibold dark:text-white">Donations</h2>
          <p className="text-2xl font-bold text-secondary">${totalStats.donations}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="custom_gradientd custom_gradientl  dark:border-white border-2 border-secondary/15 p-6 rounded-xl shadow-md ">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            Donation Categories
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={donationCategory}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {donationCategory.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className=" custom_gradientd custom_gradientl  dark:border-white border-2 border-secondary/15 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            Monthly Donations
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={donationsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className=" p-6 rounded-xl shadow-md custom_gradientd custom_gradientl  dark:border-white border-2 border-secondary/15">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">
          Pets by Category
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={petsCategory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardAdmin;
