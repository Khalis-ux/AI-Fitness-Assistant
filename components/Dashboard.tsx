
import React, { useState, useEffect, useCallback } from 'react';
import type { UserProfile, WorkoutPlan, MealPlan, Mood } from '../types';
import { generateWorkoutPlan, generateMealPlan } from '../services/geminiService';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Spinner } from './ui/Spinner';
import ProgressChart from './ProgressChart';
import PostureAnalyzer from './PostureAnalyzer';
import MoodSelector from './MoodSelector';

interface DashboardProps {
  userProfile: UserProfile;
  onResetProfile: () => void;
}

const WorkoutCard: React.FC<{ workout: WorkoutPlan }> = ({ workout }) => (
  <Card>
    <div className="p-6">
      <h3 className="text-xl font-bold text-brand-secondary">{workout.focus}</h3>
      <p className="text-sm text-text-secondary mb-4">{workout.day}</p>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Warm-up</h4>
        <p className="text-sm text-text-secondary">{workout.warmUp}</p>
      </div>
      <ul className="space-y-4">
        {workout.exercises.map((ex, i) => (
          <li key={i} className="p-3 bg-bg-tertiary rounded-lg">
            <div className="flex justify-between items-center">
                <h5 className="font-semibold">{ex.name}</h5>
                <span className="text-sm font-mono bg-brand-dark text-white px-2 py-1 rounded">{ex.sets} sets x {ex.reps} reps</span>
            </div>
            <p className="text-xs text-text-secondary mt-1">{ex.description}</p>
            <p className="text-xs text-text-secondary mt-1">Rest: {ex.rest}s</p>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Cool-down</h4>
        <p className="text-sm text-text-secondary">{workout.coolDown}</p>
      </div>
    </div>
  </Card>
);

const NutritionCard: React.FC<{ plan: MealPlan }> = ({ plan }) => (
    <Card>
        <div className="p-6">
            <h3 className="text-xl font-bold text-brand-secondary">Daily Nutrition Guide</h3>
            <p className="text-sm text-text-secondary mb-4">Target: {plan.dailyCalorieTarget} kcal</p>
            <ul className="space-y-3">
                {plan.meals.map((meal, i) => (
                    <li key={i} className="p-3 bg-bg-tertiary rounded-lg">
                        <h5 className="font-semibold">{meal.name}: <span className="font-normal">{meal.description}</span></h5>
                        <div className="flex justify-between text-xs text-text-secondary mt-1">
                            <span>{meal.calories} kcal</span>
                            <span>P: {meal.protein}g</span>
                            <span>C: {meal.carbs}g</span>
                            <span>F: {meal.fats}g</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </Card>
);


const Dashboard: React.FC<DashboardProps> = ({ userProfile, onResetProfile }) => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState({ workout: true, nutrition: true });
  const [currentMood, setCurrentMood] = useState<Mood | undefined>();

  const fetchPlans = useCallback(async (mood?: Mood) => {
    setLoading({ workout: true, nutrition: true });
    const [workout, nutrition] = await Promise.all([
        generateWorkoutPlan(userProfile, mood),
        generateMealPlan(userProfile)
    ]);
    setWorkoutPlan(workout);
    setMealPlan(nutrition);
    setLoading({ workout: false, nutrition: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleMoodSelect = (mood: Mood) => {
      setCurrentMood(mood);
      setWorkoutPlan(null);
      fetchPlans(mood);
  }

  const selectedExercise = workoutPlan?.exercises[0]?.name ?? 'Squat';

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl md:text-4xl font-bold">Hello, {userProfile.name}!</h1>
            <p className="text-text-secondary">Ready to crush your goals today?</p>
        </div>
        <Button onClick={onResetProfile} variant="secondary" size="sm">
            <i className="fa-solid fa-user-pen mr-2"></i> Edit Profile
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column (main content) */}
        <div className="lg:col-span-2 space-y-6">
            <MoodSelector onMoodSelect={handleMoodSelect} selectedMood={currentMood} />
            {loading.workout ? <Card className="flex justify-center items-center h-96"><Spinner/></Card> : workoutPlan ? <WorkoutCard workout={workoutPlan} /> : <Card><div className="p-6 text-center text-text-secondary">Could not generate a workout plan. Please try again.</div></Card>}
        </div>

        {/* Right column (sidebar) */}
        <div className="space-y-6">
            <PostureAnalyzer exerciseName={selectedExercise} />
            {loading.nutrition ? <Card className="flex justify-center items-center h-64"><Spinner/></Card> : mealPlan ? <NutritionCard plan={mealPlan} /> : <Card><div className="p-6 text-center text-text-secondary">Could not generate a meal plan.</div></Card>}
            <ProgressChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
