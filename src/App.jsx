import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import FarmlandList from './pages/FarmlandList';
import StrategyGenerator from './pages/StrategyGenerator';
import TaskCenter from './pages/TaskCenter';
import KnowledgeMarket from './pages/KnowledgeMarket';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="farmlands" element={<FarmlandList />} />
          <Route path="strategy" element={<StrategyGenerator />} />
          <Route path="tasks" element={<TaskCenter />} />
          <Route path="market" element={<KnowledgeMarket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
