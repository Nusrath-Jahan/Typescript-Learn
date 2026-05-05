import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const projects = [
    {
      id: "todo",
      name: "📝 Todo App",
      description: "Learn state management, forms, and API calls",
      path: "/todo",
    },
    {
      id: "calculator",
      name: "🧮 Calculator",
      description: "Learn state management and operations",
      path: "/calculator",
    },
  ];

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>TypeScript Learning Projects</h1>
        <p>Choose a project to practice and learn TypeScript</p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <Link to={project.path} key={project.id} className="project-card">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <button className="project-button">Start Learning →</button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
