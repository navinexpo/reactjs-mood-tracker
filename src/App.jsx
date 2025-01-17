import { useState, useEffect } from "react";
import MoodLog from "./pages/MoodLog";
import MoodHistory from "./pages/MoodHistory";
import WeeklySummary from "./pages/WeeklySummary";

const App = () => {
  const [moodData, setMoodData] = useState(() => {
    const savedData = localStorage.getItem("moodData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Sort the data by date (most recent first)
      return parsedData.sort((a, b) => {
        // Split the date strings into [month, day, year] and convert to Date objects
        const [monthA, dayA, yearA] = a.date.split("/").map(Number);
        const [monthB, dayB, yearB] = b.date.split("/").map(Number);

        // Create Date objects (months are zero-indexed in JavaScript)
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);

        // Sort in descending order: latest date first
        return dateB - dateA;
      });
    }
    return [];
  });

  const moodMessages = {
    "😊": "Happy",
    "😐": "Neutral",
    "😞": "Sad",
    "😡": "Angry",
    "😴": "Sleepy",
  };

  const [editingMood, setEditingMood] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Toggle theme on button click
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkTheme]);

  const addMood = (newMood) => {
    const today = new Date().toLocaleDateString();
    const existingIndex = moodData.findIndex((mood) => mood.date === today);

    let updatedMoodData;
    if (existingIndex !== -1) {
      // If there's already an entry for today, update it
      updatedMoodData = [...moodData];
      updatedMoodData[existingIndex] = newMood;
    } else {
      // Otherwise, add the new mood
      updatedMoodData = [...moodData, newMood];
    }

    setMoodData(updatedMoodData);
    localStorage.setItem("moodData", JSON.stringify(updatedMoodData));
  };

  const deleteMood = (date) => {
    const updatedMoodData = moodData.filter((mood) => mood.date !== date);
    setMoodData(updatedMoodData);
    localStorage.setItem("moodData", JSON.stringify(updatedMoodData));
  };

  const updateMood = (updatedMood) => {
    const updatedMoodData = moodData.map((mood) =>
      mood.date === updatedMood.date ? updatedMood : mood
    );
    setMoodData(updatedMoodData);
    localStorage.setItem("moodData", JSON.stringify(updatedMoodData));
    setEditingMood(null);
  };

  const predictMood = () => {
    if (moodData.length < 3) return { emoji: "❓", message: "Not enough data to predict your mood." };
    const recentMoods = moodData.slice(0, 3).map((entry) => entry.mood);
    const allSame = recentMoods.every((mood) => mood === recentMoods[0]);
    if (allSame) {
      const mood = recentMoods[0];  
      const moodText = moodMessages[mood] || "Unknown mood";
      return {
        emoji: mood,
        message: (
          <span>
            You have been feeling <span className="font-bold">{moodText}</span>{" "}
            for 3 days. You might feel{" "}
            <span className="font-bold">{moodText}</span> again tomorrow
            unless you take steps to change it.
          </span>
        ),
      };
    }
    return { emoji: "❓", message: "The moods for the last 3 days are mixed. No prediction available." };
  };
  
    const prediction = predictMood();

  return (
    <div>
      <div className="text-center mb-4 p-4">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer focus:outline-none focus:ring-0"
            onChange={toggleTheme}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium">
          {isDarkTheme ? "Light" : "Dark"} Mode
          </span>
        </label>
      </div>

      {/* <button onClick={toggleTheme}>
        Switch to {isDarkTheme ? "Light" : "Dark"} Theme
      </button> */}
      <div className="min-h-screen">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-4">Mood Tracker</h1>
          {editingMood ? (
            <MoodLog
              addMood={updateMood}
              editingMood={editingMood}
              setEditingMood={setEditingMood}
              isDarkTheme={isDarkTheme}
            />
          ) : (
            <MoodLog addMood={addMood} isDarkTheme={isDarkTheme} />
          )}
          <MoodHistory
            moodData={moodData?.slice(0, 5)}
            deleteMood={deleteMood}
            setEditingMood={setEditingMood}
            isDarkTheme={isDarkTheme}
          />
          <WeeklySummary moodData={moodData?.slice(0,7)} isDarkTheme={isDarkTheme} />

          <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} p-4 rounded shadow text-center mt-4`}>
          
          <p className="text-xl font-bold">Mood Prediction for Tomorrow</p>
          <p className="text-2xl font-bold">{prediction.emoji}</p>
          <p className=" mt-2">{prediction.message}</p>

        </div>
        </div>
      </div>
    </div>
  );
};

export default App;
