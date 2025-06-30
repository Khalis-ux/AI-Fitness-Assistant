# AI Fitness Assistant

An AI-driven fitness assistant that generates personalized workout routines and meal plans, tracks progress, and provides real-time feedback on exercise form using your camera. This project leverages the Google Gemini API to deliver a smart, adaptive, and personalized fitness experience directly in your browser.

![AI Fitness Assistant Screenshot](https://storage.googleapis.com/aif-quick-start-images/ai-fitness-coach-screenshot.png)

## ✨ Key Features

-   **Personalized Profile Setup**: A multi-step onboarding process captures user details like age, weight, height, fitness level, goals, and dietary preferences.
-   **AI-Generated Workout Plans**: Dynamically creates daily workout routines tailored to the user's profile and goals, complete with exercises, sets, reps, and rest times.
-   **AI-Generated Nutrition Guides**: Generates a full day's meal plan, including calorie targets and macronutrient breakdowns, based on user preferences and fitness objectives.
-   **Real-time Form Analysis (Simulated)**: Uses the device camera and AI to provide corrective feedback on common exercises, helping to improve form and prevent injury.
-   **Mood-Based Workout Adjustments**: Allows users to select their current mood (e.g., Energized, Tired) to get a workout plan with adjusted intensity.
-   **Visual Progress Tracking**: Displays charts to visualize progress over time (currently with mock data).
-   **Responsive & Modern UI**: A sleek, dark-mode interface built with Tailwind CSS for a great experience on any device.

## 🚀 Tech Stack

-   **Framework**: React 19
-   **AI Engine**: Google Gemini API (`@google/genai`)
-   **Styling**: Tailwind CSS
-   **Charts**: Recharts
-   **Icons**: Font Awesome
-   **Module System**: ES Modules with `importmap` (No build step required)
-   **Languages**: TypeScript, HTML

## ⚙️ Getting Started

This project is designed to run directly in the browser without any complex build steps.

### Prerequisites

1.  A modern web browser (e.g., Chrome, Firefox, Safari, Edge).
2.  A Google Gemini API Key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Running

1.  **Clone the repository or download the files.**

2.  **Set up the API Key:**
    The application is configured to use an environment variable `process.env.API_KEY` for the Google Gemini API key. Since this is a client-side application, you'll need to make this key available to the browser. The simplest way to do this is to create a `.env` file in the root of your project and use a simple web server that supports it.

    **Note:** Never expose your API key in public repositories.

3.  **Serve the application:**
    You need to serve the `index.html` file from a local web server.

    A simple way to do this is with the `serve` package:
    ```bash
    # Install serve globally if you don't have it
    npm install -g serve

    # Run the server from the project's root directory
    serve .
    ```
    Or, using Python's built-in HTTP server:
    ```bash
    # For Python 3
    python -m http.server
    ```
    Now, open your browser and navigate to the local address provided by the server (e.g., `http://localhost:3000` or `http://localhost:8000`).

## 📁 File Structure

```
.
├── README.md                 # This file
├── index.html                # Main HTML entry point, includes importmap and Tailwind CSS config
├── index.tsx                 # React application root
├── metadata.json             # App metadata and permissions
├── App.tsx                   # Main app component, handles state and view logic
├── types.ts                  # All TypeScript type definitions
├── services/
│   └── geminiService.ts      # Handles all interactions with the Google Gemini API
└── components/
    ├── ProfileSetup.tsx      # Multi-step user onboarding form
    ├── Dashboard.tsx         # The main dashboard displayed after profile setup
    ├── PostureAnalyzer.tsx   # Component for camera access and form feedback
    ├── MoodSelector.tsx      # UI for selecting user's mood
    ├── ProgressChart.tsx     # Chart for visualizing progress
    └── ui/
        ├── Button.tsx        # Reusable button component
        ├── Card.tsx          # Reusable card component
        ├── Input.tsx         # Reusable input field
        ├── Select.tsx        # Reusable select dropdown
        ├── Spinner.tsx       # Loading spinner
        └── Sparkles.tsx      # Animated background effect
```

## 🧠 How the AI Works

The core intelligence of this application comes from the `geminiService.ts` file, which communicates with the Google Gemini API.

-   **Prompt Engineering**: For features like workout and meal plan generation, the service constructs highly-detailed prompts. It sends the user's entire profile and asks the AI to act as an expert fitness coach.
-   **Structured JSON Output**: The prompts explicitly request that the AI return its response in a specific JSON format that matches the TypeScript interfaces defined in `types.ts`. This makes the API response predictable and easy to parse directly into the application's state.
-   **Simulated Analysis**: The `PostureAnalyzer` component simulates a real-time computer vision feature. It activates the camera to create an immersive experience and sends the *name* of the current exercise to the AI, which then returns common corrective tips for that specific movement.
