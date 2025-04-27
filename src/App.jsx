import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import Header from './components/Header/Header';

const Home = lazy(() => import('./pages/Home'));
const SearchCountry = lazy(() => import('./pages/SearchCountry'));
const Country = lazy(() => import('./pages/Country'));
export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country" element={<SearchCountry />} />
            <Route path="/country/:countryId" element={<Country />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
};
