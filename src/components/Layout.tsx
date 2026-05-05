import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="layout">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          🚀 TypeScript Learning
        </Link>
        {!isHome && (
          <button className="back-button">
            <Link to="/">← Back to Home</Link>
          </button>
        )}
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
}

export default Layout;
