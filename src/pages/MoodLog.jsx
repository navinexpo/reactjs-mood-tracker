/* eslint-disable react/prop-types */
import  { useState, useEffect } from "react";

const MoodLog = ({ addMood, editingMood, setEditingMood, isDarkTheme }) => {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  useEffect(() => {
    if (editingMood) {
      setMood(editingMood.mood);
      setNote(editingMood.note);
    }
  }, [editingMood]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood) return alert("Please select a mood!");
    const newMood = {
      date: editingMood?.date || new Date().toLocaleDateString(),
      mood,
      note,
    };
    addMood(newMood);
    setMood("");
    setNote("");
  };

  const handleCancel = () => {
    setEditingMood(null);
    setMood("");
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit} className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} p-4 rounded shadow mb-4`}>
      <h2 className="text-xl font-bold mb-2">
        {editingMood ? "Update Mood" : "Log Your Mood"}
      </h2>
      <div className="flex items-center space-x-2 mb-2">
        {["😊", "😐", "😞", "😡", "😴"].map((emoji) => (
          <button
            type="button"
            key={emoji}
            className={`text-2xl ${mood === emoji ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => setMood(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
      <textarea
        className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} w-full p-2 border rounded mb-2`}
        placeholder="Optional note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingMood ? "Update Mood" : "Add Mood"}
        </button>
        {editingMood && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default MoodLog;
