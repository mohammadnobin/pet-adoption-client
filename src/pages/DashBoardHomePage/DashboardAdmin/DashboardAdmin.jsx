import { FaUsers, FaDog, FaChartBar } from "react-icons/fa";

const DashboardAdmin = () => {
  return (
    // <div className="p-6 space-y-6">
    //   <h1 className="text-3xl font-bold text-secondary">Admin Dashboard</h1>
    //   <p className="text-gray-600">Monitor the entire platform’s performance and manage users, pets, and donations.</p>

    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //     <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-xl transition">
    //       <FaUsers className="text-4xl text-secondary mb-4" />
    //       <h2 className="text-xl font-semibold">Manage Users</h2>
    //       <p className="text-gray-500">View all users and assign roles or take actions.</p>
    //     </div>
    //     <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-xl transition">
    //       <FaDog className="text-4xl text-secondary mb-4" />
    //       <h2 className="text-xl font-semibold">All Pets</h2>
    //       <p className="text-gray-500">Review and manage all pet listings.</p>
    //     </div>
    //     <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-xl transition">
    //       <FaChartBar className="text-4xl text-secondary mb-4" />
    //       <h2 className="text-xl font-semibold">Donations Overview</h2>
    //       <p className="text-gray-500">Track all donation campaigns and their statistics.</p>
    //     </div>
    //   </div>
    // </div>
    <div className="p-6 space-y-6">
  <h1 className="text-3xl font-bold text-secondary dark:text-white">Admin Dashboard</h1>
  <p className="text-gray-600 dark:text-gray-300">
    Monitor the entire platform’s performance and manage users, pets, and donations.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Manage Users */}
    <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md border dark:border-white hover:shadow-xl transition">
      <FaUsers className="text-4xl text-secondary mb-4" />
      <h2 className="text-xl font-semibold dark:text-white">Manage Users</h2>
      <p className="text-gray-500 dark:text-gray-300">
        View all users and assign roles or take actions.
      </p>
    </div>

    {/* All Pets */}
    <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md border dark:border-white hover:shadow-xl transition">
      <FaDog className="text-4xl text-secondary mb-4" />
      <h2 className="text-xl font-semibold dark:text-white">All Pets</h2>
      <p className="text-gray-500 dark:text-gray-300">
        Review and manage all pet listings.
      </p>
    </div>

    {/* Donations Overview */}
    <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md border dark:border-white hover:shadow-xl transition">
      <FaChartBar className="text-4xl text-secondary mb-4" />
      <h2 className="text-xl font-semibold dark:text-white">Donations Overview</h2>
      <p className="text-gray-500 dark:text-gray-300">
        Track all donation campaigns and their statistics.
      </p>
    </div>
  </div>
</div>

  );
};

export default DashboardAdmin;
