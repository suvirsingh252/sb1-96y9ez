import { useState } from 'react';
import { Users, FileSpreadsheet, Settings, Upload, Plus } from 'lucide-react';
import BookingAgentTable from '../components/settings/BookingAgentTable';
import AddProgramModal from '../components/settings/AddProgramModal';
import ImportProgramsModal from '../components/settings/ImportProgramsModal';
import { cn } from '../lib/utils';

type Tab = 'users' | 'programs' | 'general';

const MOCK_BOOKING_AGENTS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Senior Booking Agent',
    phone: '(902) 555-0123',
    email: 'sarah.j@example.com',
    programsBooked: ['Residential Energy Savings', 'Low Income Support']
  },
  {
    id: '2',
    name: 'Michael Brown',
    title: 'Booking Coordinator',
    phone: '(902) 555-0124',
    email: 'michael.b@example.com',
    programsBooked: ['Commercial Retrofit', 'Green Business Initiative']
  }
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<Tab>('users');
  const [showAddProgramModal, setShowAddProgramModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [bookingAgents, setBookingAgents] = useState(MOCK_BOOKING_AGENTS);

  const handleDeleteAgent = (id: string) => {
    setBookingAgents(agents => agents.filter(agent => agent.id !== id));
  };

  const handleEditAgent = (agent: any) => {
    console.log('Edit agent:', agent);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('users')}
              className={cn(
                'py-4 px-6 text-sm font-medium border-b-2',
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Team Management
              </div>
            </button>

            <button
              onClick={() => setActiveTab('programs')}
              className={cn(
                'py-4 px-6 text-sm font-medium border-b-2',
                activeTab === 'programs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              <div className="flex items-center">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Programs
              </div>
            </button>

            <button
              onClick={() => setActiveTab('general')}
              className={cn(
                'py-4 px-6 text-sm font-medium border-b-2',
                activeTab === 'general'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              <div className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                General Settings
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'users' && (
            <div className="space-y-8">
              <BookingAgentTable
                agents={bookingAgents}
                onDelete={handleDeleteAgent}
                onEdit={handleEditAgent}
              />
              {/* Add other role tables here */}
            </div>
          )}

          {activeTab === 'programs' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Programs</h2>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowImportModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Import Programs
                  </button>
                  <button
                    onClick={() => setShowAddProgramModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Program
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Active Programs
                  </h3>
                  <div className="mt-4 divide-y divide-gray-200">
                    {/* Program list will go here */}
                    <div className="text-center py-8 text-gray-500">
                      No programs configured yet
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">General Settings</h2>
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  {/* General settings will go here */}
                  <div className="text-center py-8 text-gray-500">
                    General settings coming soon
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showAddProgramModal && (
        <AddProgramModal onClose={() => setShowAddProgramModal(false)} />
      )}

      {showImportModal && (
        <ImportProgramsModal onClose={() => setShowImportModal(false)} />
      )}
    </div>
  );
}