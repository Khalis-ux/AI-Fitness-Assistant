
export enum FitnessGoal {
  Strength = 'Strength',
  Flexibility = 'Flexibility',
  Endurance = 'Endurance',
  WeightLoss = 'Weight Loss',
  MuscleGain = 'Muscle Gain',
}

export enum FitnessLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export enum DietaryPreference {
  None = 'None',
  Vegan = 'Vegan',
  Vegetarian = 'Vegetarian',
  GlutenFree = 'Gluten-Free',
  Keto = 'Keto',
}

export interface UserProfile {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  weight: number; // in kg
  height: number; // in cm
  fitnessLevel: FitnessLevel;
  goals: FitnessGoal[];
  healthConditions: string;
  dietaryPreferences: DietaryPreference[];
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string; // e.g., "10-12" or "30 seconds"
  rest: number; // in seconds
  description: string;
}

export interface WorkoutPlan {
  day: string;
  focus: string;
  exercises: Exercise[];
  warmUp: string;
  coolDown: string;
}

export interface Meal {
  name: string; // e.g., Breakfast, Lunch, Dinner
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface MealPlan {
  dailyCalorieTarget: number;
  meals: Meal[];
}

export type Mood = 'Energized' | 'Neutral' | 'Tired' | 'Stressed';
