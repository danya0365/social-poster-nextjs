import { Activity, LayoutDashboard, ShieldCheck, Users } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
        <p className="text-gray-500 mt-2">Welcome to the system administration panel.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '1,248', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Sessions', value: '42', icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'System Roles', value: '4', icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Reports', value: '12', icon: LayoutDashboard, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* System Status Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">System Logs</h3>
        </div>
        <div className="p-6 text-center text-gray-400 italic">
          No logs to display currently. Full logging system implementation pending.
        </div>
      </div>
    </div>
  );
}
