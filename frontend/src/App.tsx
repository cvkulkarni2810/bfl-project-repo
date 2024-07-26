import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import DefaultLayout from './layouts/DefaultLayout'
import HomePageDemo from './pages/HomePageDemo'
import ResultsPage from './pages/ResultsPage'

function App() {

  return (
    <>
      <Routes>
        <Route element={<DefaultLayout/>}>
          <Route path='/home' element={<HomePage />} />
          {/* <Route path='/demo' element={<HomePageDemo />} /> */}
          <Route path='/' element={<HomePageDemo />} />
          <Route path='/results' element={<ResultsPage />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App