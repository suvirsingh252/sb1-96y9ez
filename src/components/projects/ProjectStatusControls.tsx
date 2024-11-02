import { ParticipantStatus } from '../../types/participant';
import { useParticipantStore } from '../../store/participants';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ProjectStatusControlsProps {
  projectId: string;
  currentStatus: ParticipantStatus;
}

const STATUS_FLOW = [
  ParticipantStatus.READY_FOR_BOOKING,
  ParticipantStatus.BOOKED,
  ParticipantStatus.AUDIT_COMPLETED,
  ParticipantStatus.READY_FOR_TECH_TEAM,
  ParticipantStatus.READY_FOR_CONTRACTOR_QUOTE,
  ParticipantStatus.WORKORDERS_SENT,
  ParticipantStatus.READY_FOR_FINAL_AUDIT,
  ParticipantStatus.FINAL_AUDIT_BOOKED,
  ParticipantStatus.COMPLETED,
];

export default function ProjectStatusControls({ projectId, currentStatus }: ProjectStatusControlsProps) {
  const { updateParticipantStatus } = useParticipantStore();

  const currentIndex = STATUS_FLOW.indexOf(currentStatus);
  const nextStatus = STATUS_FLOW[currentIndex + 1];
  const prevStatus = STATUS_FLOW[currentIndex - 1];

  const handleStatusChange = async (status: ParticipantStatus) => {
    try {
      await updateParticipantStatus(projectId, status);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (currentStatus === ParticipantStatus.COMPLETED) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-yellow-800">Testing Controls:</span>
          <div className="flex items-center space-x-2">
            {prevStatus && (
              <button
                onClick={() => handleStatusChange(prevStatus)}
                className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
              >
                Previous Status
              </button>
            )}
            {nextStatus && (
              <button
                onClick={() => handleStatusChange(nextStatus)}
                className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
              >
                <span>Advance to {nextStatus.replace(/_/g, ' ')}</span>
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={currentStatus}
            onChange={(e) => handleStatusChange(e.target.value as ParticipantStatus)}
            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          >
            {STATUS_FLOW.map((status) => (
              <option key={status} value={status}>
                {status.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}