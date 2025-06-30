
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { UserProfile, WorkoutPlan, MealPlan, Mood } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash-preview-04-17';

function parseJsonResponse<T,>(text: string): T | null {
  let jsonStr = text.trim();
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = jsonStr.match(fenceRegex);
  if (match && match[2]) {
    jsonStr = match[2].trim();
  }
  try {
    return JSON.parse(jsonStr) as T;
  } catch (e) {
    console.error("Failed to parse JSON response:", e, "Original text:", text);
    return null;
  }
}

export const generateWorkoutPlan = async (profile: UserProfile, mood?: Mood): Promise<WorkoutPlan | null> => {
  const moodAdjustment = mood ? `The user is feeling ${mood.toLowerCase()} today, so adjust the intensity accordingly. For example, if they are tired, suggest a lighter or shorter workout. If they are energized, you can suggest a more challenging session.` : '';
  
  const prompt = `
    Based on the following user profile, create a single, detailed, one-day workout plan in JSON format.
    The JSON object must match this TypeScript interface:
    interface Exercise {
      name: string;
      sets: number;
      reps: string; // e.g., "10-12" or "30 seconds"
      rest: number; // in seconds
      description: string;
    }
    interface WorkoutPlan {
      day: string; // e.g. "Monday"
      focus: string; // e.g. "Full Body Strength"
      exercises: Exercise[];
      warmUp: string; // A brief description of the warm-up routine
      coolDown: string; // A brief description of the cool-down routine
    }

    User Profile:
    - Age: ${profile.age}
    - Gender: ${profile.gender}
    - Weight: ${profile.weight} kg
    - Height: ${profile.height} cm
    - Fitness Level: ${profile.fitnessLevel}
    - Goals: ${profile.goals.join(', ')}
    - Health Conditions: ${profile.healthConditions || 'None'}
    
    ${moodAdjustment}

    Instructions:
    - The plan should be a single day's workout.
    - Tailor the exercises, sets, reps, and rest times to the user's profile and goals.
    - Provide a brief, helpful description for each exercise.
    - Ensure the warm-up and cool-down are appropriate.
    - Only return the JSON object, with no extra text or markdown.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        },
    });
    return parseJsonResponse<WorkoutPlan>(response.text);
  } catch (error) {
    console.error("Error generating workout plan:", error);
    return null;
  }
};

export const generateMealPlan = async (profile: UserProfile): Promise<MealPlan | null> => {
    const prompt = `
    Based on the following user profile, create a one-day meal plan in JSON format.
    The JSON object must match this TypeScript interface:
    interface Meal {
      name: string; // e.g., "Breakfast", "Lunch", "Dinner", "Snack"
      description: string; // A descriptive name of the meal, e.g., "Oatmeal with Berries"
      calories: number;
      protein: number; // in grams
      carbs: number; // in grams
      fats: number; // in grams
    }
    interface MealPlan {
      dailyCalorieTarget: number;
      meals: Meal[];
    }

    User Profile:
    - Age: ${profile.age}
    - Gender: ${profile.gender}
    - Weight: ${profile.weight} kg
    - Height: ${profile.height} cm
    - Fitness Level: ${profile.fitnessLevel}
    - Goals: ${profile.goals.join(', ')}
    - Dietary Preferences: ${profile.dietaryPreferences.join(', ') || 'None'}
    - Health Conditions: ${profile.healthConditions || 'None'}

    Instructions:
    - Create a plan for 3 main meals (Breakfast, Lunch, Dinner) and one optional snack.
    - The total calories should be appropriate for the user's goals (e.g., a slight deficit for weight loss, a surplus for muscle gain).
    - The macronutrient split should be balanced and support their fitness goals.
    - Adhere strictly to the dietary preferences.
    - Only return the JSON object, with no extra text or markdown.
  `;
  
   try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        },
    });
    return parseJsonResponse<MealPlan>(response.text);
  } catch (error) {
    console.error("Error generating meal plan:", error);
    return null;
  }
};


export const analyzePosture = async (exerciseName: string): Promise<string> => {
    const prompt = `
        Provide real-time, corrective feedback for someone performing a ${exerciseName}. 
        The feedback should be concise, actionable, and encouraging. 
        Focus on 2-3 of the most common mistakes for this exercise.
        For example, for a Squat, you could say: "Great start! Try to keep your chest up and back straight. Make sure your knees are tracking over your toes, not caving inwards."
        Return only the feedback text.
    `;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model,
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error analyzing posture:", error);
        return "Sorry, I couldn't analyze your form right now. Please try again.";
    }
};
