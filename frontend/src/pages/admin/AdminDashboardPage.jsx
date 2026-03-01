import { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatCurrency } from '../../utils/formatUtils';

const AdminDashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminService.dashboardSummary();
        setSummary(data);
      } catch {
        // ignore for now
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!summary) return <div>No data.</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold mb-2">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-xs text-gray-500 mb-1">Total revenue</p>
          <p className="text-xl font-semibold">{formatCurrency(summary.totalRevenue)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-xs text-gray-500 mb-1">Total bookings</p>
          <p className="text-xl font-semibold">{summary.totalBookings}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-xs text-gray-500 mb-1">Total users</p>
          <p className="text-xl font-semibold">{summary.totalUsers}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

