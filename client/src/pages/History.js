import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { getMe } from '../utils/API';
import Auth from "../utils/auth";
import { formatDate } from '../utils/dateFormat';
import Header from "../components/Header";
import cardioIcon from "../assets/images/cardio.png";
import resistanceIcon from "../assets/images/resistance.png";
import Streak from '../components/Streak'; // Import the Streak component

export default function History() {
  const [userData, setUserData] = useState({});
  const [exerciseData, setExerciseData] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(6);
  const [consecutiveDays, setConsecutiveDays] = useState(0); // State to hold consecutive days

  const loggedIn = Auth.loggedIn();
  let currentDate;

  // every time loggedIn/userdata changes, the getUserData runs
  useEffect(() => {
    const getUserData = async () => {
      try {
        // get token
        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const user = await response.json();

        // combine cardio and resistance data together
        if (user.cardio && user.resistance) {
          const cardio = user.cardio;
          const resistance = user.resistance;
          const exercise = cardio.concat(resistance);

          // sort exercise data by date
          exercise.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });

          // format date in exercise data
          exercise.forEach(item => {
            item.date = formatDate(item.date);
          });

          setUserData(user);
          setExerciseData(exercise);
          calculateConsecutiveDays(exercise); // Calculate consecutive days
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [loggedIn, userData]);

  const calculateConsecutiveDays = (exercises) => {
    if (exercises.length === 0) {
      setConsecutiveDays(0);
      return;
    }

    // Extract unique dates from exercises and sort them
    const exerciseDates = exercises.map(exercise => new Date(exercise.date).setHours(0, 0, 0, 0));
    const uniqueDates = [...new Set(exerciseDates)].sort((a, b) => b - a);

    let count = 1; // Start with 1 for the last logged day

    // Check for consecutive days
    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const currentDay = uniqueDates[i];
      const nextDay = uniqueDates[i + 1];

      // Check if the next day is exactly one day before the current day
      if ((currentDay - nextDay) === 86400000) { // 86400000 ms = 1 day
        count++;
      } else {
        break; // Stop counting if there's a gap
      }
    }

    setConsecutiveDays(count);
  };

  function showMoreItems() {
    setDisplayedItems(displayedItems + 6);
  }

  // If the user is not logged in, redirect to the login page
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='history'>
      <Header />
      <div className="d-flex flex-column align-items-center">
        <h2 className='title'>History</h2>
        {/* Include the Streak component */}
        <Streak days={consecutiveDays} />
        {exerciseData.length ? (
          <div className='history-data'>
            {/* Map the exercise data */}
            {exerciseData.slice(0, displayedItems).map((exercise) => {
              let dateToDisplay;
              if (exercise.date !== currentDate) {
                currentDate = exercise.date;
                dateToDisplay = exercise.date;
              }
              return (
                <div className='history-div d-flex' key={exercise._id}>
                  <div className='date d-flex align-items-center'>{dateToDisplay}</div>
                  <Link className='text-decoration-none' to={`/history/${exercise.type}/${exercise._id}`}>
                    {exercise.type === "cardio" ? (
                      <div className="history-card cardio-title d-flex">
                        <div className='d-flex align-items-center'><img alt="cardio" src={cardioIcon} className="history-icon" /></div>
                        <div>
                          <p className='history-name'>{exercise.name}</p>
                          <p className='history-index'>{exercise.distance} miles </p>
                        </div>
                      </div>
                    ) : (
                      <div className="history-card resistance-title d-flex">
                        <div className='d-flex align-items-center'><img alt="resistance" src={resistanceIcon} className="history-icon" /></div>
                        <div>
                          <p className='history-name'>{exercise.name}</p>
                          <p className='history-index'>{exercise.weight} pounds </p>
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
              );
            })}
            {/* Show more items */}
            {exerciseData.length > displayedItems ? (
              <div className='d-flex justify-content-center'>
                <button className='show-btn' onClick={showMoreItems}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                  Show More
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <h3 className='history-text'>No exercise data yet...</h3>
            <Link to="/exercise"><button className='home-btn'>Add Exercise</button></Link>
          </div>
        )}
      </div>
    </div>
  );
}
