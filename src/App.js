import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/home/index";
import Dashboard from "./components/admin/Dashboard";
import PageNotFound from "./components/admin/PageNotFound";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
