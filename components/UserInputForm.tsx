
import React, { useState } from 'react';

interface UserInputFormProps {
  onSubmit: (problemDescription: string) => void;
  isLoading: boolean;
}

const UserInputForm: React.FC<UserInputFormProps> = ({ onSubmit, isLoading }) => {
  const [problem, setProblem] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(problem);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 app-sans-serif">
      <div>
        <label htmlFor="problemDescription" className="block text-lg font-medium text-slate-700 mb-2">
          Share your concern for reflection under Divine Law:
        </label>
        <textarea
          id="problemDescription"
          name="problemDescription"
          rows={5}
          className="block w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150 ease-in-out text-base placeholder-slate-400 bg-white/70 disabled:bg-slate-100 disabled:text-slate-500"
          placeholder="e.g., 'I am experiencing persistent anxiety and wish to understand its underlying emotional conflict.'"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading || !problem.trim()}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition duration-150 ease-in-out active:bg-sky-800"
        >
          {isLoading ? 'Seeking Insight...' : 'Request Guidance'}
        </button>
      </div>
    </form>
  );
};

export default UserInputForm;
