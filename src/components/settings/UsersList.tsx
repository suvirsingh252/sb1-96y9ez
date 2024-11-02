import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useUserStore } from '../../store/users';
import { UserRole } from '../../types/auth';
import AddUserModal from '../users/AddUserModal';

const ROLE_SECTIONS: { role: UserRole; title: string }[] = [
  { role: 'ENERGY_ADVISOR', title: 'Energy Advisors' },
  { role: 'BOOKING_AGENT', title: 'Booking Agents' },
  { role: 'TECH_TEAM', title: 'Tech Team' },
  { role: 'TRAINEE', title: 'Trainees' },
];

export default function UsersList() {
  const { users } = useUserStore();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Team Members</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Team Member
        </button>
      </div>

      <div className="space-y-8">
        {ROLE_SECTIONS.map(({ role, title }) => {
          const roleUsers = users.filter(user => user.role === role);
          
          return (
            <div key={role} className="bg-white rounded-lg border border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {title}
                </h3>
                <div className="mt-4 divide-y divide-gray-200">
                  {roleUsers.length > 0 ? (
                    roleUsers.map(user => (
                      <div key={user.id} className="py-4 flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-4 text-center text-gray-500">
                      No {title.toLowerCase()} added yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onAdd={async (data) => {
            // Handle user addition
            console.log('Adding user:', data);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}