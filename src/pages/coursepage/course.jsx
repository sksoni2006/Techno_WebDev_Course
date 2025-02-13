import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { ExternalLink } from "lucide-react";
import "./course.css";

const Course = () => {
  const navigate = useNavigate();
  const [courseContent, setCourseContent] = useState([]);
  const [completionStatus, setCompletionStatus] = useState({});

  const redirectUrl =
    process.env.NODE_ENV === "production"
      ? "https://technothlon.techniche.org.in/leaderboard"
      : "http://localhost:3000/leaderboard";

  // Load course data and completion status on component mount
  useEffect(() => {
    // Fetch courses from local JSON instead of API
    fetch("/courseData.json")
      .then((res) => res.json())
      .then((data) => {
        setCourseContent(data);
        console.log("📚 Loaded course data:", data);
      })
      .catch((error) => console.error("❌ Error loading course data:", error));

    // Load completion status from localStorage
    const savedStatus = JSON.parse(localStorage.getItem("completionStatus")) || {};
    setCompletionStatus(savedStatus);
  }, []);

  // Handle checkbox click: Toggle and save state in localStorage
  const handleCheckboxChange = (keyname, videoIndex) => {
    const newStatus = {
      ...completionStatus,
      [`${keyname}-${videoIndex}`]: !completionStatus[`${keyname}-${videoIndex}`]
    };
    
    setCompletionStatus(newStatus);
    localStorage.setItem("completionStatus", JSON.stringify(newStatus));
  };

  return (
    <div className="course-container">
      <div className="course-content">
        <div className="course-header">
          <h1>Course Structure</h1>
          <Button onClick={() => (window.location.href = redirectUrl)}>Back to Dashboard</Button>
        </div>

        <div className="course-grid">
          {courseContent.map((section, index) => (
            <Card key={index} className="course-card">
              <h2>{section.keyname} <span className="date">({new Date(section.createdAt).toLocaleDateString()})</span></h2>
              <div className="table-wrapper">
                <table className="fancy-table">
                  <thead>
                    <tr>
                      <th>Video Title</th>
                      <th>Link</th>
                      <th>Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.links.map((link, videoIndex) => (
                      <tr key={videoIndex}>
                        <td>Video {videoIndex + 1}</td>
                        <td>
                          <a href={link} target="_blank" rel="noopener noreferrer" className="video-link">
                            Watch <ExternalLink size={16} />
                          </a>
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={completionStatus[`${section.keyname}-${videoIndex}`] || false}
                            onChange={() => handleCheckboxChange(section.keyname, videoIndex)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course;




// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import  Button  from "../../components/ui/button";
// import { Card } from "../../components/ui/card";
// import { ExternalLink } from "lucide-react";
// import axios from "axios";
// import "./course.css";

// const Course = () => {
//   const navigate = useNavigate();
//   const [courseContent, setCourseContent] = useState([]);
//   const [completionStatus, setCompletionStatus] = useState({});

//   const baseURL = process.env.NODE_ENV === "production"
//     ? "https://technothlon.techniche.org.in/api/"
//     : "http://localhost:3001/api/";

//   const redirectUrl = process.env.NODE_ENV === "production"
//     ? "https://technothlon.techniche.org.in/leaderboard"
//     : "http://localhost:/leaderboard";

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(`${baseURL}coursestructure/coursestructure`);
//         setCourseContent(response.data);

//         // Load completion status from localStorage
//         const savedStatus = JSON.parse(localStorage.getItem("completionStatus")) || {};
//         setCompletionStatus(savedStatus);
//       } catch (error) {
//         console.error("Error fetching course content:", error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleCheckboxChange = (keyname, videoIndex) => {
//     const newStatus = { ...completionStatus, [`${keyname}-${videoIndex}`]: !completionStatus[`${keyname}-${videoIndex}`] };
//     setCompletionStatus(newStatus);
//     localStorage.setItem("completionStatus", JSON.stringify(newStatus));
//   };

//   return (
//     <div className="course-container">
//       <div className="course-content">
//         <div className="course-header">
//           <h1>Course Structure</h1>
//           {/* <Button variant="outline" onClick={() => navigate("/dashboard")}>
//             Back to Dashboard
//           </Button> */}
//           <Button onClick={() => (window.location.href = redirectUrl)}>Back to Dashboard</Button>

//         </div>

//         <div className="course-grid">
//           {courseContent.map((section, index) => (
//             <Card key={index} className="course-card">
//               <h2>{section.keyname} <span className="date">({new Date(section.createdAt).toLocaleDateString()})</span></h2>
//               <div className="table-wrapper">
//                 <table className="fancy-table">
//                   <thead>
//                     <tr>
//                       <th>Video Title</th>
//                       <th>Link</th>
//                       <th>Completed</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {section.links.map((link, videoIndex) => (
//                       <tr key={videoIndex}>
//                         <td>Video {videoIndex + 1}</td>
//                         <td>
//                           <a href={link} target="_blank" rel="noopener noreferrer" className="video-link">
//                             Watch <ExternalLink size={16} />
//                           </a>
//                         </td>
//                         <td>
//                           <input
//                             type="checkbox"
//                             checked={completionStatus[`${section.keyname}-${videoIndex}`] || false}
//                             onChange={() => handleCheckboxChange(section.keyname, videoIndex)}
//                           />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Course;
