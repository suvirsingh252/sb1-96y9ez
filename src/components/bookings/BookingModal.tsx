import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Calendar } from 'lucide-react';
import { useParticipantStore } from '../../store/participants';
import { useAdvisorStore } from '../../store/advisors';
import { ParticipantStatus } from '../../types/participant';
import { cn } from '../../lib/utils';

const bookingSchema = z.object({
  advisorId: z.string().min(1, 'Energy Advisor is required'),
  date: z.string().min(1, 'Date is required'),
  timeSlot: z.string().min(1, 'Time slot is required'),
  visitType: z.enum(['INITIAL_AUDIT', 'FINAL_AUDIT']),
  notes: z.string().optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  participantId: string;
  onClose: () => void;
}

const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
];

export default function BookingModal({ participantId, onClose }: BookingModalProps) {
  const { participants, updateParticipantStatus } = useParticipantStore();
  const { advisors } = useAdvisorStore();
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  const participant = participants.find(p => p.id === participantId);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      visitType: 'INITIAL_AUDIT',
    },
  });

  const onSubmit = async (data: BookingForm) => {
    try {
      await updateParticipantStatus(participantId, ParticipantStatus.BOOKED);
      
      // In a real app, we would:
      // 1. Create the booking in the database
      // 2. Send confirmation emails to participant and advisor
      // 3. Update the advisor's availability
      // 4. Create calendar invites
      
      onClose();
    } catch (error) {
      console.error('Failed to create booking:', error);
    }
  };

  if (!participant) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Schedule Audit</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Energy Advisor
            </label>
            <select
              {...register('advisorId')}
              className={cn(
                'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                errors.advisorId && 'border-red-300'
              )}
            >
              <option value="">Select an advisor</option>
              {advisors.map((advisor) => (
                <option key={advisor.id} value={advisor.id}>
                  {advisor.name} - {advisor.serviceAreas.join(', ')}
                </option>
              ))}
            </select>
            {errors.advisorId && (
              <p className="mt-1 text-sm text-red-600">{errors.advisorId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Visit Type
            </label>
            <select
              {...register('visitType')}
              className={cn(
                'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                errors.visitType && 'border-red-300'
              )}
            >
              <option value="INITIAL_AUDIT">Initial Audit</option>
              <option value="FINAL_AUDIT">Final Audit</option>
            </select>
            {errors.visitType && (
              <p className="mt-1 text-sm text-red-600">{errors.visitType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              {...register('date')}
              min={new Date().toISOString().split('T')[0]}
              className={cn(
                'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                errors.date && 'border-red-300'
              )}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <select
              {...register('timeSlot')}
              className={cn(
                'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                errors.timeSlot && 'border-red-300'
              )}
            >
              <option value="">Select a time</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.timeSlot && (
              <p className="mt-1 text-sm text-red-600">{errors.timeSlot.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Any special instructions or notes..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white',
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              )}
            >
              <Calendar className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Scheduling...' : 'Schedule Audit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}