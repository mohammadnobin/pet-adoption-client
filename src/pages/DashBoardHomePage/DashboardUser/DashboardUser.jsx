// DashboardUser.jsx
import { FaPaw, FaHeart, FaDonate } from "react-icons/fa";
import {
  ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
  BarChart, Bar,
  RadialBarChart, RadialBar
} from "recharts";

const DashboardUser = () => {
  // ===== Dummy data (API থেকে আনলে এখানেই রিসপন্স সেট করুন) =====
  const stats = {
    myPets: 8,
    adoptionRequests: 12,
    myDonationsAmount: 1450, // USD বা আপনার কারেন্সি
  };

  // মাসভিত্তিক আমার ডোনেশন ট্রেন্ড
  const donationTrend = [
    { month: "Jan", amount: 120 },
    { month: "Feb", amount: 80 },
    { month: "Mar", amount: 210 },
    { month: "Apr", amount: 160 },
    { month: "May", amount: 240 },
    { month: "Jun", amount: 140 },
    { month: "Jul", amount: 300 },
  ];

  // আমার লিস্টেড পেটগুলোর স্ট্যাটাস
  const petsStatus = [
    { name: "Listed", value: 5 },
    { name: "Adopted", value: 2 },
    { name: "Paused", value: 1 },
  ];

  // ক্যাটাগরি অনুযায়ী পেট কাউন্ট (Bar)
  const petsByCategory = [
    { category: "Dogs", count: 4 },
    { category: "Cats", count: 3 },
    { category: "Birds", count: 1 },
  ];

  // এডপশন সাকসেস রেট (Radial)
  const adoptionRate = [{ name: "Success", value: 68, fill: "#82ca9d" }];

  const PIE_COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-secondary dark:text-white">
          Your Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your pets, track adoption requests, and monitor your donations at a glance.
        </p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="custom_gradientd custom_gradientl p-6 rounded-xl shadow-md border-2 border-secondary/15 dark:border-white hover:shadow-xl transition">
          <div className="flex items-center gap-3">
            <FaPaw className="text-4xl text-secondary dark:text-secondary" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">My Added Pets</p>
              <p className="text-2xl font-bold text-secondary dark:text-white">{stats.myPets}</p>
            </div>
          </div>
        </div>

        <div className="custom_gradientd custom_gradientl p-6 rounded-xl shadow-md border-2 border-secondary/15 dark:border-white hover:shadow-xl transition">
          <div className="flex items-center gap-3">
            <FaHeart className="text-4xl text-secondary dark:text-secondary" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Adoption Requests</p>
              <p className="text-2xl font-bold text-secondary dark:text-white">{stats.adoptionRequests}</p>
            </div>
          </div>
        </div>

        <div className="custom_gradientd custom_gradientl p-6 rounded-xl shadow-md border-2 border-secondary/15 dark:border-white hover:shadow-xl transition">
          <div className="flex items-center gap-3">
            <FaDonate className="text-4xl text-secondary dark:text-secondary" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">My Donations</p>
              <p className="text-2xl font-bold text-secondary dark:text-white">${stats.myDonationsAmount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart: Monthly Donation Trend */}
        <div className="custom_gradientd custom_gradientl p-6 rounded-xl shadow-md border-2 border-secondary/15 dark:border-white">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Monthly Donations Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={donationTrend} margin={{ left: 4, right: 4 }}>
              <defs>
                <linearGradient id="donationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} fill="url(#donationGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Pets Status */}
        <div className="custom_gradientd custom_gradientl p-6 rounded-xl shadow-md border-2 border-secondary/15 dark:border-white">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">My Pets — Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={petsStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {petsStatus.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: Pets by Category */}
        <div className="custom_gradientd custom_gradientl p-6 rounded-xl shadow-md border-2 border-secondary/15 dark:border-white">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Pets by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={petsByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radial Chart: Adoption Success Rate */}
        <div className="custom_gradientd custom_gradientl p-6 rounded-xl shadow-md border-2 border-secondary/15 dark:border-white">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Adoption Success Rate</h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%" cy="50%" innerRadius="60%" outerRadius="90%"
                barSize={18} data={adoptionRate}
                startAngle={90} endAngle={adoptionRate[0].value/100 * 360 + 90}
              >
                <RadialBar minAngle={15} background clockWise dataKey="value" />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-center text-2xl font-bold dark:text-white">{adoptionRate[0].value}%</p>
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">of listed pets successfully adopted</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
