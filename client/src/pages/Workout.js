
// // import React, { useState, useEffect } from 'react';
// // import { Navigate, useNavigate } from 'react-router-dom';
// // import Auth from "../utils/auth";
// // import Header from "../components/Header";
// // import axios from 'axios';

// // export default function Exercise() {
// //   const loggedIn = Auth.loggedIn();
// //   const navigate = useNavigate();
// //   const [bodyParts, setBodyParts] = useState([]);
// //   const [exercises, setExercises] = useState({});
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [selectedExercise, setSelectedExercise] = useState(null);

// //   // If the user is not logged in, redirect to the login page
  

// //   // Fetch the body part list from the API
// //   useEffect(() => {
// //     if (!loggedIn) {
// //       return <Navigate to="/login" />;
// //     }
// //     const fetchBodyParts = async () => {
// //       try {
// //         const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', {
// //           headers: {
// //             'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
// //             'x-rapidapi-key': '81272db64bmsh4b5465076f958a7p19aa0cjsn4e605b389b6b', // Replace with your actual API key
// //           },
// //         });
// //         setBodyParts(response.data);
// //       } catch (err) {
// //         setError('Error fetching body parts.');
// //         console.error(err);
// //       }
// //     };
// //     fetchBodyParts();
// //   }, []);

// //   // Fetch exercises for a selected body part
// //   const fetchExercises = async (bodyPart) => {
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=10&offset=0`, {
// //         headers: {
// //           'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
// //           'x-rapidapi-key': '81272db64bmsh4b5465076f958a7p19aa0cjsn4e605b389b6b', // Replace with your actual API key
// //         },
// //       });
// //       setExercises((prevExercises) => ({ ...prevExercises, [bodyPart]: response.data }));
// //     } catch (err) {
// //       setError('Error fetching exercises for this body part.');
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleAddExercise = (exercise) => {
// //     navigate(`/exercise/resistance?name=${encodeURIComponent(exercise.name)}`);
// //   };

// //   const handleViewExercise = async (exercise) => {
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       const API_URL = `https://exercisedb.p.rapidapi.com/exercises/name/${exercise.name}?offset=0&limit=10`;
// //       const response = await axios.get(API_URL, {
// //         headers: {
// //           'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
// //           'x-rapidapi-key': '81272db64bmsh4b5465076f958a7p19aa0cjsn4e605b389b6b', // Replace with your actual API key
// //         },
// //       });

// //       if (response.data.length > 0) {
// //         console.log(response.data[0]);
// //         setSelectedExercise(response.data[0]); // Get the first exercise from the response
// //       } else {
// //         setError('No exercise found.');
// //       }
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       <Header />
// //       <div className="exercise d-flex flex-column align-items-center">
// //         <h2 className='title'>Workout Categories</h2>
// //         <div className="workout-categories">
// //           {bodyParts.map((bodyPart, index) => (
// //             <div key={index} className="workout-plan">
// //               <h3>{bodyPart}</h3>
// //               <button onClick={() => fetchExercises(bodyPart)}>Load Exercises</button>
// //               {loading && <p>Loading exercises...</p>}
// //               {error && <p>Error: {error}</p>}
// //               {exercises[bodyPart] && exercises[bodyPart].length > 0 && (
// //                 <ul>
// //                   {exercises[bodyPart].map((exercise, i) => (
// //                     <li key={i}>
// //                       <strong>{exercise.name}</strong>
// //                       <div>
// //                         <button 
// //                           className='view-btn'
// //                           onClick={() => handleViewExercise(exercise)}
// //                         >
// //                           View
// //                         </button>
// //                         <button 
// //                           className='add-btn'
// //                           onClick={() => handleAddExercise(exercise)}
// //                         >
// //                           Add to Exercise
// //                         </button>
// //                       </div>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               )}
// //             </div>
// //           ))}
// //         </div>

// //         {loading && <p>Loading exercise details...</p>}
// //         {error && <p>Error: {error}</p>}
// //         {selectedExercise && (
// //           <div className="exercise-details">
// //             <h3>{selectedExercise.name}</h3>
// //             <p>Body Part: {selectedExercise.bodyPart}</p>
// //             <p>Equipment: {selectedExercise.equipment}</p>
// //             <p>Target: {selectedExercise.target}</p>
// //             <img src={selectedExercise.gifUrl} alt={selectedExercise.name} />
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";
import Header from "../components/Header";
import axios from 'axios';
import './Exercise.css'; // Updated CSS file for styling

export default function Exercise() {
  const loggedIn = Auth.loggedIn();
  const navigate = useNavigate();
  const [bodyParts, setBodyParts] = useState([]);
  const [exercises, setExercises] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // If the user is not logged in, redirect to the login page
  

  // Fetch the body part list from the API
  useEffect(() => {
    if (!loggedIn) {
      return <Navigate to="/login" />;
    }
    const fetchBodyParts = async () => {
      try {
        const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', {
          headers: {
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
            'x-rapidapi-key': '81272db64bmsh4b5465076f958a7p19aa0cjsn4e605b389b6b', // Replace with your actual API key
          },
        });
        setBodyParts(response.data);
      } catch (err) {
        setError('Error fetching body parts.');
        console.error(err);
      }
    };
    fetchBodyParts();
  }, []);

  // Fetch exercises for a selected body part
  const fetchExercises = async (bodyPart) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=10&offset=0`, {
        headers: {
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
          'x-rapidapi-key': '81272db64bmsh4b5465076f958a7p19aa0cjsn4e605b389b6b', // Replace with your actual API key
        },
      });
      setExercises((prevExercises) => ({ ...prevExercises, [bodyPart]: response.data }));
    } catch (err) {
      setError('Error fetching exercises for this body part.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExercise = (exercise) => {
    navigate(`/exercise/resistance?name=${encodeURIComponent(exercise.name)}`);
  };

  const handleViewExercise = async (exercise) => {
    setLoading(true);
    setError(null);

    try {
      const API_URL = `https://exercisedb.p.rapidapi.com/exercises/name/${exercise.name}?offset=0&limit=10`;
      const response = await axios.get(API_URL, {
        headers: {
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
          'x-rapidapi-key': '81272db64bmsh4b5465076f958a7p19aa0cjsn4e605b389b6b', // Replace with your actual API key
        },
      });

      if (response.data.length > 0) {
        setSelectedExercise(response.data[0]); // Get the first exercise from the response
        setModalVisible(true); // Show the modal
      } else {
        setError('No exercise found.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedExercise(null); // Clear selected exercise when closing
  };

  return (
    <div className="exercise-container">
      <Header />
      <div className="exercise d-flex flex-column align-items-center">
        <h2 className='title'>Workout Categories</h2>
        <div className="workout-categories">
          {bodyParts.map((bodyPart, index) => (
            <div key={index} className="workout-plan">
              <h3>{bodyPart}</h3>
              <button className="load-exercises-btn" onClick={() => fetchExercises(bodyPart)}>Load Exercises</button>
              {loading && <p>Loading exercises...</p>}
              {error && <p className="error-message">{error}</p>}
              {exercises[bodyPart] && exercises[bodyPart].length > 0 && (
                <ul className="exercise-list">
                  {exercises[bodyPart].map((exercise, i) => (
                    <li key={i} className="exercise-item">
                      <strong>{exercise.name}</strong>
                      <div>
                        <button 
                          className='view-btn'
                          onClick={() => handleViewExercise(exercise)}
                        >
                          View
                        </button>
                        <button 
                          className='add-btn'
                          onClick={() => handleAddExercise(exercise)}
                        >
                          Add to Exercise
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {modalVisible && selectedExercise && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h3>{selectedExercise.name}</h3>
              <p><strong>Body Part:</strong> {selectedExercise.bodyPart}</p>
              <p><strong>Equipment:</strong> {selectedExercise.equipment}</p>
              <p><strong>Target:</strong> {selectedExercise.target}</p>
              <img src={selectedExercise.gifUrl} alt={selectedExercise.name} className="exercise-gif" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
