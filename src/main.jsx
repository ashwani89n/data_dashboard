import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailsView from './routes/DetailsView.jsx';
import NotFound from './routes/NotFound.jsx';
import About from './routes/About.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index={true} path="/" element={<App />} />
        <Route index={false} path="/brewDetails/:symbol" element={<DetailsView />} />
        <Route path="/about" element={ <About /> }/>
        <Route path="*" element={ <NotFound /> }/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
