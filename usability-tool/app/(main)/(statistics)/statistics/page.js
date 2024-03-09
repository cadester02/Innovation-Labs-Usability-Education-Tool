"use client";
import "@/styles/statistics.scss";
import { useState, useEffect, Suspense } from "react";

import { getAuthContext } from "../../components/AuthContextProvider";
import {
  readHeuristicData,
  readUIData,
  readAllHeuristicData,
} from "@/lib/firebase/firestore";

import { IoAlertCircle } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { IconContext } from "react-icons";

import { getMetadata } from "@/lib/firebase/firestore";

import styles from "@/styles/stats.module.scss";

import PieGraph from "@/components/stats/PieGraph";
import BarGraph from "@/components/stats/BarGraph";

const heuristics = Array.from({ length: 10 }, (x, i) => `Heuristic ${i + 1}`);
/*
[
    { name: "Correct", value: 3 },
    { name: "incorrect", value: 2 },
  ]
  */
// function AlertIcon() {
//   return (
//     <IconContext.Provider
//       value={{
//         color: "red",
//         size: "25%",
//       }}
//     >
//       <IoAlertCircle />
//       <h3>No Data</h3>
//     </IconContext.Provider>
//   );
// }

export default function Statistics() {
  //Stores the data for the current heuristic
  const [currHeuristicData, setCurrHeuristicData] = useState(null);
  const [currUIData, setCurrUIData] = useState(null);

  //Stores the current heuristic that is selected
  const [currHeuristic, setCurrheuristic] = useState(0);

  //Loading state
  const [loading, setLoading] = useState(true);

  //Get user and metadata
  const {
    user,
    metaDataSuite: { metaData: completedHeuristics },
  } = getAuthContext();

  //Get new data when the heuristic changes
  useEffect(() => {
    setLoading(true);
    const getAllCurrData = async () => {
      try {
        await Promise.all([
          getNewHeuristicdata(currHeuristic + 1),
          getNewUIdata(currHeuristic + 1),
        ]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    getAllCurrData();
  }, [currHeuristic]);

  //Get the heuristic data.
  async function getNewHeuristicdata(heuristic) {
    try {
      const data = await readHeuristicData(heuristic, user.uid);
      console.log(data);
      setCurrHeuristicData(data);
    } catch (e) {
      console.error("Erroring reading heuristic data");
    }
  }

  //Get the UI data
  async function getNewUIdata(heuristic) {
    try {
      const data = await readUIData(heuristic, user.uid);
      console.log(data);
      setCurrUIData(data);
    } catch (e) {
      console.error("Erroring reading UI data");
    }
  }

  const getHeuristicDataForPie = () => {
    const latestAttempt = currHeuristicData.attempts.slice(-1)[0];
    return Object.keys(latestAttempt)
      .filter((key) => key === "correct" || key === "incorrect")
      .map((key) => {
        return {
          name: key.charAt(0).toUpperCase() + key.slice(1),
          value: latestAttempt[key],
        };
      });
  };

  const getUIDataForPie = () => {
    const latestAttempt = currUIData.attempts.slice(-1)[0];
    return Object.keys(latestAttempt)
      .filter((key) => key === "correct" || key === "incorrect")
      .map((key) => {
        return {
          name: key.charAt(0).toUpperCase() + key.slice(1),
          value: latestAttempt[key],
        };
      });
  };

  //   const [currHeuristic, setCurrHeuristic] = useState(0);
  //   const [activeButton, setActiveButton] = useState(0);
  //   const [currQuizData, setCurrQuizData] = useState(null);
  //   const [currUIData, setCurrUIData] = useState(null);
  //   const [isMobile, setIsMobile] = useState(false);
  //   const [quizDataArray, setQuizDataArray] = useState([]);
  //   const [uiDataArray, setUIDataArray] = useState([]);
  //   const [bestQuizTime, setBestQuizTime] = useState(100000000);
  //   const [bestUITime, setBestUITime] = useState(10000000);

  //   const colors = { Incorrect: "#F24336", Correct: "#4BAE4F" };

  //   function handleScreenResize() {
  //     if (window.innerWidth <= 768) setIsMobile(true);
  //     else setIsMobile(false);
  //   }

  //   //Returns the data in a form that the graph can read
  //   function getDataForGraph() {
  //     return Object.keys(currQuizData)
  //       .filter((key) => key === "correct" || key === "incorrect")
  //       .map((key) => {
  //         return {
  //           name: key.charAt(0).toUpperCase() + key.slice(1),
  //           value: currQuizData[key],
  //         };
  //       });
  //   }

  //   function getDataForUIGraph() {
  //     return Object.keys(currUIData)
  //       .filter((key) => key === "correct" || key === "incorrect")
  //       .map((key) => {
  //         return {
  //           name: key.charAt(0).toUpperCase() + key.slice(1),
  //           value: currUIData[key],
  //         };
  //       });
  //   }

  //   function getDataForTable() {
  //     return Object.keys(currQuizData)
  //       .filter((key) => key === "time")
  //       .map((key) => {
  //         return {
  //           name: key,
  //           value: currQuizData[key],
  //         };
  //       });
  //   }

  //   function getDataForUITable() {
  //     return Object.keys(currUIData)
  //       .filter((key) => key === "time")
  //       .map((key) => {
  //         return {
  //           name: key,
  //           value: currUIData[key],
  //         };
  //       });
  //   }

  //   function getDataForAttempts() {
  //     return Object.keys(currQuizData)
  //       .filter((key) => key === "attempts")
  //       .map((key) => {
  //         return {
  //           name: key,
  //           value: currQuizData[key],
  //         };
  //       });
  //   }

  //   function getDataForUIAttempts() {
  //     return Object.keys(currUIData)
  //       .filter((key) => key === "attempts")
  //       .map((key) => {
  //         return {
  //           name: key,
  //           value: currUIData[key],
  //         };
  //       });
  //   }

  //   useEffect(() => {
  //     window.addEventListener("resize", handleScreenResize);
  //     return () => window.removeEventListener("resize", handleScreenResize);
  //   }, []);

  //   //Get the data on the first load
  //   useEffect(() => {
  //     async function getAllHeuristicData() {
  //       //The new state array
  //       const heuristicDataArray = [];
  //       const UIDataArray = [];
  //       try {
  //         //Loop through all 10 heurisics
  //         for (let i = 0; i < 10; i++) {
  //           //Get the data or put null if there isn't any
  //           const heuristicData = await readHeuristicData(i + 1, user.uid);
  //           heuristicDataArray[i] = heuristicData.data || null;

  //           const uiData = await readUIData(i + 1, user.uid);
  //           UIDataArray[i] = uiData.data || null;
  //         }
  //         //Set the state
  //         setQuizDataArray(heuristicDataArray);
  //         setCurrQuizData(heuristicDataArray[0]);
  //         setUIDataArray(UIDataArray);
  //         setCurrUIData(UIDataArray[0]);
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     }
  //     getAllHeuristicData();
  //   }, []);

  //   function calculateBestQuizTime(data) {
  //     console.log({ data });
  //     //setBestTime(data.value[0]);
  //     if (data.value < bestQuizTime) {
  //       setBestQuizTime(data.value);
  //     }
  //     return bestQuizTime;
  //   }

  //   function calculateBestUITime(data) {
  //     console.log({ data });
  //     //setBestTime(data.value[0]);
  //     if (data.value < bestUITime) {
  //       setBestUITime(data.value);
  //     }
  //     return bestUITime;
  //   }

  //   //Set the currData to the new heuristic's data
  //   useEffect(() => {
  //     setCurrQuizData(quizDataArray[currHeuristic]);
  //     setCurrUIData(uiDataArray[currHeuristic]);
  //   }, [currHeuristic]);

  //   function handleClick(index) {
  //     setCurrHeuristic(index);
  //     setActiveButton(index);
  //   }

  return (
    <main class="container-fluid p-4">
      <div class="row h-100">
        {
          //The buttons
        }
        <div
          class="col col-md-2 btn-group-vertical"
          role="group"
          aria-label="Heuristic data buttons"
        >
          {heuristics.map((_, i) => (
            <button
              key={i}
              type="button"
              class="btn h-100 text-center"
              disabled={!completedHeuristics[i + 1]}
              onClick={() => setCurrheuristic(i)}
            >
              Heuristic {i + 1}
            </button>
          ))}
        </div>
        {
          //The actual graphs / data
        }
        {!loading ? (
          <div className={`col ${styles.statsContainer}`}>
            <div class="row h-100">
              <div
                class="col col-md-4"
                style={{
                  height: "100%",
                }}
              >
                <PieGraph
                  data={getHeuristicDataForPie()}
                  graphTitle={"Heuristic Data"}
                />
                <PieGraph
                  data={getUIDataForPie()}
                  graphTitle={"UI Builder Data"}
                />
              </div>
              <div class="col" style={{ height: "100%" }}>
                <BarGraph
                  data={currHeuristicData.attempts}
                  graphTitle={"Heuristic Data"}
                />
                <BarGraph
                  data={currUIData.attempts}
                  graphTitle={"UI Builder Data"}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </main>
    // <main>
    //   {/* {isMobile ? (
    //     <label className="mobile-dropdown">
    //       Select a Heuristic:
    //       <select
    //         name="selectedHeuristic"
    //         value={currHeuristic}
    //         onChange={(e) => handleClick(Number(e.target.value))}
    //       >
    //         {heuristics.map((_, i) => (
    //           <option value={i}>{i + 1}</option>
    //         ))}
    //       </select>
    //     </label>
    //   ) : null} */}

    //   <div className="main-stat-container">
    //     {!isMobile ? (
    //       <section className="stat-buttons">
    //         {quizDataArray.map((data, i) =>
    //           !data ? (
    //             <button key={i} disabled className="disabled">
    //               <FaLock />
    //               Complete Heuristic {i + 1} to Unlock
    //             </button>
    //           ) : (
    //             <button
    //               key={i}
    //               onClick={() => handleClick(i)}
    //               className={activeButton === i ? "active" : ""}
    //             >
    //               Heuristic {i + 1}
    //             </button>
    //           )
    //         )}
    //       </section>
    //     ) : null}
    //     <section className="stat-container">
    //       <div className="stat-graphs">
    //         {/* <ResponsiveContainer className="stats-container"> */}
    //         <div className="stat-graph-container">
    //           <h2 className="heuristic-title">Quiz Data</h2>
    //           {currQuizData ? (
    //             <ResponsiveContainer>
    //               <PieChart>
    //                 <Pie
    //                   dataKey="value"
    //                   isAnimationActive={false}
    //                   data={getDataForGraph()}
    //                   fill="#8884d8"
    //                   label
    //                 >
    //                   {getDataForGraph().map((entry, index) => (
    //                     <Cell key={`cell-${index}`} fill={colors[entry.name]} />
    //                   ))}
    //                 </Pie>

    //                 <Tooltip />
    //               </PieChart>
    //             </ResponsiveContainer>
    //           ) : (
    //             <AlertIcon />
    //           )}
    //         </div>
    //         <div className="stat-graph-container">
    //           <h2 className="heuristic-title">UI Builder Data</h2>
    //           {currUIData ? (
    //             <ResponsiveContainer>
    //               <PieChart>
    //                 <Pie
    //                   dataKey="value"
    //                   isAnimationActive={false}
    //                   data={getDataForUIGraph()}
    //                   fill="#8884d8"
    //                   label
    //                 >
    //                   {getDataForUIGraph().map((entry, index) => (
    //                     <Cell key={`cell-${index}`} fill={colors[entry.name]} />
    //                   ))}
    //                 </Pie>
    //                 <Tooltip />
    //               </PieChart>
    //             </ResponsiveContainer>
    //           ) : (
    //             <AlertIcon />
    //           )}
    //         </div>
    //         {/* </ResponsiveContainer> */}
    //       </div>
    //       <div className="space"></div>
    //       <div className="stat-graphs">
    //         <div className="panel-container">
    //           {currQuizData ? (
    //             <div className="panel">
    //               <h2 className="heuristic-title">Quiz</h2>
    //               <div className="content">
    //                 <table className="stat-table">
    //                   <thead>
    //                     <tr>
    //                       <th>Attempt Number</th>
    //                       <th>Time Taken (sec)</th>
    //                     </tr>
    //                   </thead>
    //                   <tbody>
    //                     {getDataForTable().map((data, index) => (
    //                       <tr key={index}>
    //                         <td>{index + 1}</td>
    //                         <td>{data.value}</td>
    //                       </tr>
    //                     ))}
    //                   </tbody>
    //                 </table>
    //                 <div className="additional-info">
    //                   {getDataForAttempts().map((data, index) => (
    //                     <div key={index}>
    //                       <p className="number-of-attempts">
    //                         Number of Attempts: {data.value}
    //                       </p>
    //                     </div>
    //                   ))}
    //                   {getDataForTable().map((data, index) => (
    //                     <div key={index}>
    //                       <p className="number-of-attempts">
    //                         Best Time Taken: {calculateBestQuizTime(data)}
    //                       </p>
    //                     </div>
    //                   ))}
    //                 </div>
    //               </div>
    //             </div>
    //           ) : null}

    //           {currUIData ? (
    //             <div className="panel">
    //               <h2 className="heuristic-title">UI Builder</h2>
    //               <div className="content">
    //                 <table className="stat-table">
    //                   <thead>
    //                     <tr>
    //                       <th className="table-heading">Attempt Number</th>
    //                       <th className="table-heading">Time Taken (sec)</th>
    //                     </tr>
    //                   </thead>
    //                   <tbody>
    //                     {getDataForUITable().map((data, index) => (
    //                       <tr key={index}>
    //                         <td>{index + 1}</td>
    //                         <td>{data.value}</td>
    //                       </tr>
    //                     ))}
    //                   </tbody>
    //                 </table>
    //                 <div className="additional-info">
    //                   {getDataForUIAttempts().map((data, index) => (
    //                     <div key={index}>
    //                       <p className="number-of-attempts">
    //                         Number of Attempts: {data.value}
    //                       </p>
    //                     </div>
    //                   ))}
    //                   {getDataForUITable().map((data, index) => (
    //                     <div key={index}>
    //                       <p className="number-of-attempts">
    //                         Best Time Taken: {calculateBestUITime(data)}
    //                       </p>
    //                     </div>
    //                   ))}
    //                 </div>
    //               </div>
    //             </div>
    //           ) : null}
    //         </div>
    //       </div>
    //     </section>
    //   </div>
    // </main>
  );
}
