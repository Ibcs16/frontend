import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';
import bbbContent from '../assets/bbb-content.jpg';
import bbbHighlight from '../assets/bbb-highlight.jpg';
import esporteContent from '../assets/esporte-content.jpg';
import esporteHighlight from '../assets/esporte-highlight.jpg';

interface Item {
  id: string;
  title: string;
  link: string;
  src: any;
  type: string;
  categories: string[];
  highlight: any;
  desc: string;
}

interface Preference {
  realities: string[];
  teams: string[];
}

interface PreferenceState {
  preferences: Preference;
  items: Item[];
}

interface PreferenceContextData {
  setPreferences(preferences: any): Promise<void>;
  items: Item[];
  preferences: Preference;
}

const PreferenceContext = createContext<PreferenceContextData>(
  {} as PreferenceContextData,
);

const PreferenceProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<PreferenceState>(() => {
    const preferences = localStorage.getItem('preferences') || JSON.stringify({} as Preference) ;
    // const preferences = '[]';
    const items: Item[] = [
      {
        id: '0',
        title: 'Bbb 2020',
        categories: ['reality', 'tv'],
        src: bbbContent,
        highlight: bbbHighlight,
        type: 'content',
        link: '',
        desc: 'A casa mais vigiada do Brasil',
      },
      {
        id: '1',
        title: 'Globo Esporte',
        categories: ['esporte', 'tv'],
        highlight: esporteHighlight,
        src: esporteContent,
        type: 'content',
        link: '',
        desc: 'Tudo sobre esporte',
      },
    ];

    if (items && preferences) {
      return { items, preferences: JSON.parse(preferences) };
    }

    return { items } as PreferenceState;
  });

  const setPreferences = useCallback(async ({ preferences }) => {
    // localStorage.setItem('@Globo:token', token);
    localStorage.setItem('preferences', JSON.stringify(preferences));

    setData({ ...data, preferences });
  }, []);

  return (
    <PreferenceContext.Provider
      value={{
        items: data.items,
        setPreferences,
        preferences: data.preferences,
      }}
    >
      {children}
    </PreferenceContext.Provider>
  );
};

function usePreference(): PreferenceContextData {
  const context = useContext(PreferenceContext);

  if (!context) {
    throw new Error('useAuth must be within an PreferenceProvider component');
  }

  return context;
}

export { PreferenceProvider, usePreference };
