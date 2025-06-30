
import React from 'react';
import type { Mood } from '../types';
import { Card } from './ui/Card';

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
  selectedMood?: Mood;
}

const moods: { mood: Mood; icon: string; color: string }[] = [
  { mood: 'Energized', icon: 'fa-bolt', color: 'text-yellow-400' },
  { mood: 'Neutral', icon: 'fa-face-meh', color: 'text-blue-400' },
  { mood: 'Tired', icon: 'fa-battery-quarter', color: 'text-gray-400' },
  { mood: 'Stressed', icon: 'fa-brain', color: 'text-purple-400' },
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect, selectedMood }) => {
  return (
    <Card>
      <div className="p-4">
        <h4 className="text-lg font-semibold text-center text-text-primary mb-3">How are you feeling today?</h4>
        <div className="flex justify-around items-center">
          {moods.map(({ mood, icon, color }) => (
            <button
              key={mood}
              onClick={() => onMoodSelect(mood)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 w-20 h-20 justify-center ${
                selectedMood === mood ? 'bg-brand-primary scale-110' : 'bg-bg-tertiary hover:bg-opacity-70'
              }`}
              aria-label={`Select ${mood} mood`}
            >
              <i className={`fas ${icon} text-3xl ${color}`}></i>
              <span className="text-xs mt-2">{mood}</span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MoodSelector;
