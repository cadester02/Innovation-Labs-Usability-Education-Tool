"use client";
import "@/styles/statistics.scss";
import { useState, useContext } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import { userContext } from "../../UserData/UserData";

const heuristics = Array.from({ length: 10 }, (x, i) => `Heuristic ${i + 1}`);

// const exampleData = heuristics.map(() => [
//   {
//     name: `Number of Questions Right`,
//     value: Math.floor(Math.random() * 10),
//   },
//   {
//     name: `Number of Questions Wrong`,
//     value: Math.floor(Math.random() * 10),
//   },
// ]);

// const numCorrect = [
//   { name: "Completed", value: 10 },
//   { name: "Incomplete", value: 4 },
// ];

export default function Statistics() {
  const [currHeuristic, setCurrHeuristic] = useState(0);

  const importedUserData = useContext(userContext);

  return (
    <main>
      <div className="progress-container">
        <h2>Current Progress:</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart width={100} height={100}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={importedUserData.progressData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="main-stat-container">
        <section className="stat-buttons">
          {heuristics.map((heuristic, index) => (
            <button key={index} onClick={() => setCurrHeuristic(index)}>
              {heuristic}
            </button>
          ))}
        </section>
        <section className="stat-container">
          {/* <ResponsiveContainer width="50%" height="50%">
            <BarChart width={150} height={40} data={exampleData[currHeuristic]}>
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer> */}
          <ResponsiveContainer width="50%" height="50%">
            <PieChart width={350} height={450}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={importedUserData.heuristicData[currHeuristic].data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </section>
      </div>
    </main>
  );
}
