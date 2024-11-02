import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Plus, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';

const programSchema = z.object({
  name: z.string().min(1, 'Program name is required'),
  description: z.string().min(1, 'Description is required'),
  requirements: z.array(z.string()).min(1, 'At least one requirement is needed'),
  screens: z.array(z.string()).min(1, 'At least one screen is required'),
});

type ProgramForm = z.infer<typeof programSchema>;

interface AddProgramModalProps {
  onClose: () => void;
}

export default function AddProgramModal({ onClose }: AddProgramModalProps) {
  const [requirements, setRequirements] = useState(['']);
  const [screens, setScreens] = useState(['']);
  const [step, setStep] = useState<'details' | 'screens'>('details');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProgramForm>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      requirements: [''],
      screens: [''],
    },
  });

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const addScreen = () => {
    setScreens([...screens, '']);
  };

  const removeScreen = (index: number) => {
    setScreens(screens.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProgramForm) => {
    try {
      console.log('Program data:', data);
      onClose();
    } catch (error) {
      console.error('Failed to add program:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Add New Program</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {step === 'details' ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Program Name
                </label>
                <input
                  {...register('name')}
                  className={cn(
                    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                    errors.name && 'border-red-300'
                  )}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className={cn(
                    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
                    errors.description && 'border-red-300'
                  )}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Requirements
                </label>
                <div className="space-y-2">
                  {requirements.map((_, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        {...register(`requirements.${index}`)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter requirement"
                      />
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="p-2 text-red-600 hover:text-red-700"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addRequirement}
                  className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Requirement
                </button>
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
                  type="button"
                  onClick={() => setStep('screens')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Next: Configure Screens
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Required Screens
                </label>
                <p className="text-sm text-gray-500 mb-4">
                  Define the screens and features this program will require
                </p>
                <div className="space-y-2">
                  {screens.map((_, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        {...register(`screens.${index}`)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter screen name"
                      />
                      <button
                        type="button"
                        onClick={() => removeScreen(index)}
                        className="p-2 text-red-600 hover:text-red-700"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addScreen}
                  className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Screen
                </button>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    'px-4 py-2 rounded-md text-sm font-medium text-white',
                    isSubmitting
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  )}
                >
                  {isSubmitting ? 'Creating...' : 'Create Program'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}