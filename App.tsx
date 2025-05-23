
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import UserInputForm from './components/UserInputForm';
import TreatmentDisplay from './components/TreatmentDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';
import { getHealingTreatment, getDivineLawTreatment } from './services/geminiService';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [initialTreatmentText, setInitialTreatmentText] = useState<string>('');
  const [divineLawTreatmentText, setDivineLawTreatmentText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingDivineLawTreatment, setIsFetchingDivineLawTreatment] = useState<boolean>(false);
  const [showDivineLawTreatmentButton, setShowDivineLawTreatmentButton] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestTreatment = useCallback(async (problemDescription: string) => {
    if (!problemDescription.trim()) {
      setError('Please describe the concern you wish to explore.');
      setInitialTreatmentText('');
      setDivineLawTreatmentText('');
      setShowDivineLawTreatmentButton(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    setInitialTreatmentText('');
    setDivineLawTreatmentText('');
    setShowDivineLawTreatmentButton(false);
    setUserInput(problemDescription); 

    try {
      const aiResponse = await getHealingTreatment(problemDescription);
      setInitialTreatmentText(aiResponse);
      setShowDivineLawTreatmentButton(true); // Show button for next stage
    } catch (err) {
      console.error('Error getting initial treatment:', err);
      const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred.';
      setError(`A point for reflection: ${errorMessage} If the issue persists, remember the clarity you seek is always accessible.`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleContinueToDivineLaw = useCallback(async () => {
    if (!userInput || !initialTreatmentText) return;

    setIsFetchingDivineLawTreatment(true);
    setError(null); // Clear previous errors
    setShowDivineLawTreatmentButton(false); // Hide button while fetching

    try {
      const aiResponse = await getDivineLawTreatment(userInput, initialTreatmentText);
      setDivineLawTreatmentText(aiResponse);
    } catch (err) {
      console.error('Error getting Divine Law treatment:', err);
      const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred.';
      setError(`A point for reflection: ${errorMessage} The path to understanding is ever-present.`);
      // Optionally re-show button or offer retry
    } finally {
      setIsFetchingDivineLawTreatment(false);
    }
  }, [userInput, initialTreatmentText]);


  return (
    <div className="flex flex-col min-h-screen items-center text-slate-800 p-4 md:p-8 selection:bg-sky-200 selection:text-sky-900">
      <Header />
      <main className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-xl p-6 md:p-10 my-8 flex-grow flex flex-col">
        <UserInputForm onSubmit={handleRequestTreatment} isLoading={isLoading || isFetchingDivineLawTreatment} />
        
        {isLoading && <LoadingSpinner />}
        
        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg app-sans-serif">
            <p>{error}</p>
          </div>
        )}
        
        {initialTreatmentText && !isLoading && (
          <TreatmentDisplay 
            initialTreatmentText={initialTreatmentText} 
            originalQuery={userInput}
            onContinueToDivineLaw={handleContinueToDivineLaw}
            isFetchingDivineLawTreatment={isFetchingDivineLawTreatment}
            divineLawTreatmentText={divineLawTreatmentText}
            showDivineLawTreatmentButton={showDivineLawTreatmentButton}
          />
        )}

        {!isLoading && !initialTreatmentText && !error && (
           <div className="mt-10 text-center text-slate-600 flex-grow flex flex-col justify-center items-center">
            <img 
              src="https://i.imgur.com/TCgkT30.jpg" 
              alt="Malcolm Kingley" 
              className="w-32 h-32 md:w-40 md:h-40 mb-6 rounded-full object-cover shadow-lg border-2 border-white"
            />
            <p className="text-lg italic">"The key to well-being lies in understanding the echoes of our past and aligning with the harmony of Divine Law."</p>
            <p className="mt-1 text-sm">- Malcolm Kingley (Conceptual)</p>
            <p className="mt-4 app-sans-serif text-base">Please share your concern above to receive a personalized reflection.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
