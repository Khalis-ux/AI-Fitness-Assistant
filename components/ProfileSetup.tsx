
import React, { useState } from 'react';
import type { UserProfile } from '../types';
import { FitnessGoal, FitnessLevel, DietaryPreference } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Card } from './ui/Card';

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: 25,
    gender: 'Male',
    weight: 70,
    height: 175,
    fitnessLevel: FitnessLevel.Beginner,
    goals: [],
    healthConditions: '',
    dietaryPreferences: [],
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: name === 'age' || name === 'weight' || name === 'height' ? parseInt(value) : value }));
  };

  const handleMultiSelectChange = (field: 'goals' | 'dietaryPreferences', value: string) => {
    setProfile(prev => {
      const currentValues = prev[field] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  const handleSubmit = () => {
    if(profile.name && profile.goals.length > 0) {
      onComplete(profile);
    } else {
      alert("Please fill in your name and select at least one goal.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold mb-2 text-center text-brand-secondary">Welcome to Your AI Fitness Coach</h2>
            <p className="text-center text-text-secondary mb-6">Let's get to know you to create your personalized plan.</p>
            <Input label="What should we call you?" name="name" value={profile.name} onChange={handleChange} placeholder="e.g., Alex" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Age" name="age" type="number" value={profile.age.toString()} onChange={handleChange} />
              <Select label="Gender" name="gender" value={profile.gender} onChange={handleChange}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Weight (kg)" name="weight" type="number" value={profile.weight.toString()} onChange={handleChange} />
              <Input label="Height (cm)" name="height" type="number" value={profile.height.toString()} onChange={handleChange} />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-brand-secondary">Your Fitness Background</h2>
            <Select label="What is your current fitness level?" name="fitnessLevel" value={profile.fitnessLevel} onChange={handleChange}>
              {Object.values(FitnessLevel).map(level => <option key={level} value={level}>{level}</option>)}
            </Select>
            <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium text-text-secondary">What are your main fitness goals? (Select all that apply)</label>
                <div className="grid grid-cols-2 gap-2">
                    {Object.values(FitnessGoal).map(goal => (
                        <button key={goal} onClick={() => handleMultiSelectChange('goals', goal)} className={`p-3 rounded-lg text-sm transition-colors ${profile.goals.includes(goal) ? 'bg-brand-primary text-white' : 'bg-bg-tertiary hover:bg-opacity-80'}`}>{goal}</button>
                    ))}
                </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-brand-secondary">Health & Nutrition</h2>
             <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium text-text-secondary">Any dietary preferences? (Optional)</label>
                <div className="grid grid-cols-2 gap-2">
                    {Object.values(DietaryPreference).map(pref => (
                        <button key={pref} onClick={() => handleMultiSelectChange('dietaryPreferences', pref)} className={`p-3 rounded-lg text-sm transition-colors ${profile.dietaryPreferences.includes(pref) ? 'bg-brand-primary text-white' : 'bg-bg-tertiary hover:bg-opacity-80'}`}>{pref}</button>
                    ))}
                </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-text-secondary mb-1">Any health conditions or injuries? (Optional)</label>
              <textarea name="healthConditions" value={profile.healthConditions} onChange={handleChange} placeholder="e.g., Previous knee injury" className="w-full bg-bg-tertiary p-2 rounded-lg border border-bg-tertiary focus:border-brand-primary focus:ring-brand-primary transition" />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
            <div className="p-8">
                <div className="w-full bg-bg-tertiary rounded-full h-2.5 mb-8">
                    <div className="bg-brand-primary h-2.5 rounded-full" style={{ width: `${(step / 3) * 100}%` }}></div>
                </div>
                {renderStep()}
                <div className="mt-8 flex justify-between">
                    {step > 1 ? <Button onClick={handleBack} variant="secondary">Back</Button> : <div />}
                    {step < 3 ? <Button onClick={handleNext}>Next</Button> : <Button onClick={handleSubmit}>Create My Plan</Button>}
                </div>
            </div>
        </Card>
    </div>
  );
};

export default ProfileSetup;
