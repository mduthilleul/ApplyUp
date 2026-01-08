import "./App.css";
import { AppliancesList } from "./components/AppliancesList";
import { ApplyForm } from "./components/ApplyForm";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppliancesProvider } from "./contexts/AppliancesContext";
import { ApplianceDetails } from "./components/ApplianceDetails";
import { LoginForm } from "./components/LoginForm";
import { AuthProvider } from "./contexts/AuthContext";
import { Header } from "./components/Header";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useEffect, useState } from "react";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppliancesProvider>
          <AppRoot />
        </AppliancesProvider>
      </AuthProvider>
    </Router>
  );
}

const AppRoot = () => {
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/jobs");
        const object = await response.json();
        setResult(object);
      } catch (error) {
        setError("Error connecting to server");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <span>{isLoading ? "Loading..." : result.join(", ")}</span>
      {error && <span className="text-red-500">{error}</span>}
      <Header />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/form"
          element={
            <ProtectedRoute role="candidate" roleFallbackPath="/list">
              <ApplyForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list"
          element={
            <ProtectedRoute role="interviewer" roleFallbackPath="/form">
              <AppliancesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/details/:id"
          element={
            <ProtectedRoute role="interviewer" roleFallbackPath="/form">
              <ApplianceDetails />
            </ProtectedRoute>
          }
        />
        {/* Syntax with search params instead of path params <Route path="/details" element={<ApplianceDetails />} /> */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
};

export default App;
