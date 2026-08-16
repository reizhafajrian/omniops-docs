import React, { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { DocsPage } from './pages/DocsPage';

export const App: React.FC = () => {
  const [currentHash, setCurrentHash] = useState<string>(() => window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToLanding = () => {
    window.location.hash = '#/';
  };

  const navigateToDocs = () => {
    window.location.hash = '#/docs';
  };

  if (currentHash === '#/docs') {
    return <DocsPage onGoToLanding={navigateToLanding} />;
  }

  return <LandingPage onGoToDocs={navigateToDocs} />;
};

export default App;
