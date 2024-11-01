import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CategoriesPage from './pages/CategoriesPage';
import FavoritesPage from './pages/FavoritesPage';
import RepairDetailsPage from './pages/RepairDetailsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:category" element={<CategoriesPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="article/:id" element={<RepairDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;