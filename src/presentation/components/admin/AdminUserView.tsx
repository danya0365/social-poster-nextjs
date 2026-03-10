'use client';

import { AdminUserViewModel } from '@/src/presentation/presenters/admin/AdminUserPresenter';
import { useAdminUserPresenter } from '@/src/presentation/presenters/admin/useAdminUserPresenter';
import { Calendar, Shield, Trash2 } from 'lucide-react';

interface AdminUserViewProps {
  initialViewModel: AdminUserViewModel;
}

export function AdminUserView({ initialViewModel }: AdminUserViewProps) {
  const { state, actions } = useAdminUserPresenter(initialViewModel);
  const { viewModel, error } = state;

  if (!viewModel) return <div>Loading...</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">User Management</h1>
          <p className="text-gray-500 mt-1">Manage all authentication users and their associated profiles/roles.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-gray-900">{viewModel.users.length}</span>
          <span className="text-gray-500 text-sm font-medium">Total Users</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3">
          <ShieldAlert className="w-5 h-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">User Details</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Associated Profiles</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {viewModel.users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      {user.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 font-semibold text-gray-900">
                        {user.email}
                      </div>
                      <div className="text-xs text-gray-400 font-mono mt-0.5">{user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-2">
                    {user.profiles.map(profile => (
                      <div 
                        key={profile.id}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 border border-gray-200 text-xs font-medium text-gray-700"
                      >
                        <Shield className="w-3 h-3 text-gray-400" />
                        {profile.name}
                        <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded-md font-bold uppercase ml-1">
                          {profile.roleId}
                        </span>
                      </div>
                    ))}
                    {user.profiles.length === 0 && (
                      <span className="text-sm text-gray-400 italic">No profiles</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <button 
                    onClick={() => {
                      if(confirm('Are you SURE you want to delete this user? This action is irreversible.')) {
                        actions.deleteUser(user.id);
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete User"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Sub-components as needed (icons used locally for now)
import { ShieldAlert, Users } from 'lucide-react';

