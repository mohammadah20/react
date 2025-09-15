import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter ,Route,Routes} from 'react-router-dom'
import MoviesDetails from './components/MoviesDetails.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<App/>}/>
    <Route path="/movie/:id" element={<MoviesDetails/>} />
   </Routes>
  </BrowserRouter>
     
     
)
//<BrowserRouter> برای مدیریت مسیرها در اپلیکیشن استفاده می‌شود. این کامپوننت به تمامی مسیرها (Routes) داخل آن، اجازه می‌دهد که از History API برای مدیریت مسیرها و آدرس‌ها استفاده کنند.
//<Routes> یک کامپوننت است که به شما امکان می‌دهد مسیرها (Routes) را به ترتیب درون آن قرار دهید. این کامپوننت باید به‌طور مستقیم داخل <BrowserRouter> قرار گیرد.
//هر Route داخل <Routes> یک مسیر خاص را تعریف می‌کند که به یک کامپوننت خاص رندر می‌شود.   