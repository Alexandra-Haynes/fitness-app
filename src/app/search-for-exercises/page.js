import React from 'react'
import ExerciseSearch from '../components/ExerciseSearch'
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const SearchForExercises = () => {
  return (
    <>
    <NavBar />
      <div className="h-screen bg-slate-300 ">
        
       <ExerciseSearch />
      </div>
      <Footer />
    </>
  );
}

export default SearchForExercises


// {
//     "categories": [
//         "Barbell",
//         "Dumbbells",
//         "Kettlebells",
//         "Stretches",
//         "Cables",
//         "Band",
//         "Plate",
//         "TRX",
//         "Bodyweight",
//         "Yoga",
//         "Machine"
//     ],
//     "difficulties": [
//         "Beginner",
//         "Intermediate",
//         "Advanced"
//     ],
//     "forces": [
//         "Pull",
//         "Push",
//         "Hold"
//     ],
//     "muscles": [
//         "Biceps",
//         "Forearms",
//         "Shoulders",
//         "Triceps",
//         "Quads",
//         "Glutes",
//         "Lats",
//         "Mid back",
//         "Lower back",
//         "Hamstrings",
//         "Chest",
//         "Abdominals",
//         "Obliques",
//         "Traps",
//         "Calves"
//     ]
// }