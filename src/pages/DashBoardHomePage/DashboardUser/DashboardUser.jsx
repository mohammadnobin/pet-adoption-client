import { FaPaw, FaHeart, FaDonate } from "react-icons/fa";

const DashboardUser = () => {
  return (

    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-secondary">Welcome to Your Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Manage your pets, view adoption requests, and track your donations.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition">
          <FaPaw className="text-4xl text-secondary mb-4 dark:text-secondary" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">My Added Pets</h2>
          <p className="text-gray-600 dark:text-gray-400">
            View, update, or remove pets you’ve added for adoption.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition">
          <FaHeart className="text-4xl text-secondary mb-4 dark:text-secondary" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Adoption Requests</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Check the adoption requests made for your listed pets.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition">
          <FaDonate className="text-4xl text-secondary mb-4 dark:text-secondary" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">My Donations</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track your donation campaigns and contributions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
