/* eslint-disable react/prop-types */


const MoodHistory = ({ moodData, deleteMood, setEditingMood, isDarkTheme }) => {
  console.log("object", moodData);
  return (
    <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} p-4 rounded shadow mb-4`}>
      <h2 className="text-xl font-bold mb-2">Mood History</h2>
      <ul>
        {moodData?.length>0 ? moodData.map(({ date, mood, note }) => (
          <>
          <li key={date} className="flex justify-between items-center mb-2">
            <div>
              <span className="text-xl">{mood}</span>  {date}
              <p className="text-sm">Note: {note !== '' ? note : 'NA'}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingMood({ date, mood, note })}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteMood(date)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
          <hr className="border-gray-300 my-2" />
          </>
        ))
      : <p className="text-center">No data available.</p>}
      </ul>
    </div>
  );
};

export default MoodHistory;
