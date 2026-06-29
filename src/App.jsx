import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import WelcomeModal from './components/WelcomeModal';
import Dashboard from './pages/Dashboard';
import RecipesHome from './pages/RecipesHome';
import CategoryView from './pages/CategoryView';
import RecipeDetail from './pages/RecipeDetail';
import Learn from './pages/Learn';
import LessonDetail from './pages/LessonDetail';
import PresentationView from './pages/PresentationView';
import Sell from './pages/Sell';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <WelcomeModal />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/receitas" element={<RecipesHome />} />
            <Route path="/category/:categoryId" element={<CategoryView />} />
            <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
            <Route path="/aprender" element={<Learn />} />
            <Route path="/aula/:lessonId" element={<LessonDetail />} />
            <Route path="/apresentacao/:recipeId" element={<PresentationView />} />
            <Route path="/vender" element={<Sell />} />
            <Route path="/eu" element={<Profile />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
