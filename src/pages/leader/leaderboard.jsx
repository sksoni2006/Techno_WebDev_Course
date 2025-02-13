import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button";
import { Check } from "lucide-react";
import { toast } from "sonner";
import "./leaderboard.css";

const ASSIGNMENTS = ["Assignment 1", "Assignment 2", "Assignment 3", "Assignment 4"];

const Leader = () => {
  const redirectUrl =
    process.env.NODE_ENV === "production"
      ? "https://techno-web-dev-course.vercel.app/CourseStructure"
      : "http://localhost:3000/CourseStructure";

  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    fetch("/credentials.json")
      .then((res) => res.json())
      .then((data) => {
        setLeaderboard(data);
        console.log("📊 Loaded leaderboard data:", data);
      })
      .catch((error) => {
        console.error("❌ Error loading leaderboard:", error);
        toast.error("Failed to load leaderboard");
        setLeaderboard([]);
      });

    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      setLoggedInUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1>Leaderboard</h1>
        <Button onClick={() => (window.location.href = redirectUrl)}>View Course</Button>
      </div>

      <div className="leaderboard-wrapper">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th className="sticky-header">Username</th>
              {ASSIGNMENTS.map((assignment, index) => (
                <th key={index} className="sticky-header">{assignment}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(leaderboard) && leaderboard.length > 0 ? (
              leaderboard.map((user, userIndex) => (
                <tr
                  key={userIndex}
                  className={`leaderboard-row ${loggedInUser && loggedInUser.name === user.name ? "highlighted" : ""}`}
                >
                  <td>{user.name}</td>
                  {user.completedAssignments.map((status, assignmentIndex) => (
                    <td key={assignmentIndex} className="text-center">
                      {status === 1 ? <Check className="checkmark-icon" /> : "-"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={ASSIGNMENTS.length + 1} className="text-center no-data">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leader;




// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../../components/ui/button";
// import { Check } from "lucide-react";
// import { toast } from "sonner";
// import axios from "axios";
// import "./leaderboard.css"; // Import the separate CSS file

// const ASSIGNMENTS = ["Assignment 1", "Assignment 2", "Assignment 3", "Assignment 4"];

// const Leader = () => {
//   const baseURL =
//     process.env.NODE_ENV === "production"
//       ? "https://technothlon.techniche.org.in/api/"
//       : "http://localhost:3001/api/";

//   const redirectUrl =
//     process.env.NODE_ENV === "production"
//       ? "https://technothlon.techniche.org.in/leaderboard"
//       : "http://localhost:3000/CourseStructure";

//   const navigate = useNavigate();
//   const [leaderboard, setLeaderboard] = useState([]);

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       try {
//         const { data } = await axios.get(`${baseURL}user/points`);
//         console.log("📊 API Response:", data); // Debug API response
//         setLeaderboard(Array.isArray(data) ? data : []); // Ensure `leaderboard` is always an array
//       } catch (error) {
//         console.error("❌ Error fetching leaderboard:", error);
//         toast.error("Failed to load leaderboard");
//         setLeaderboard([]); // Fallback to an empty array
//       }
//     };

//     fetchLeaderboard();
//   }, []);

//   return (
//     <div className="leaderboard-container">
//       <div className="leaderboard-header">
//         <h1>Leaderboard</h1>
//         <Button onClick={() => (window.location.href = redirectUrl)}>View Course</Button>
//         </div>

//       <div className="leaderboard-wrapper">
//         <table className="leaderboard-table">
//           <thead>
//             <tr>
//               <th className="sticky-header">Username</th>
//               {ASSIGNMENTS.map((assignment, index) => (
//                 <th key={index} className="sticky-header">{assignment}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(leaderboard) && leaderboard.length > 0 ? (
//               leaderboard.map((user, userIndex) => (
//                 <tr key={userIndex} className="leaderboard-row">
//                   <td>{user.name}</td>
//                   {(Array.isArray(user.completedAssignments) ? user.completedAssignments : []).map((status, assignmentIndex) => (
//                     <td key={assignmentIndex} className="text-center">
//                       {status === 1 && <Check className="checkmark-icon" />}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={ASSIGNMENTS.length + 1} className="text-center no-data">
//                   No data available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Leader;
