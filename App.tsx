import React, { useState } from 'react';
import Landing from './components/Landing';
import Story from './components/Story';
import { Person } from './types';
import { PROFILES } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'story'>('landing');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const handleSelectProfile = (person: Person) => {
    setSelectedPerson(person);
    setCurrentView('story');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCurrentView('landing');
    // Allow animation time if we were adding exit animations, 
    // but for now immediate switch is fine for standard React
    setTimeout(() => setSelectedPerson(null), 500); 
  };

  return (
    <main className="w-full min-h-screen bg-black text-white antialiased">
      {currentView === 'landing' ? (
        <Landing onSelectProfile={handleSelectProfile} />
      ) : (
        selectedPerson && (
          <div className="animate-in fade-in duration-700">
             <Story person={selectedPerson} onBack={handleBack} />
          </div>
        )
      )}
    </main>
  );
};

export default App;