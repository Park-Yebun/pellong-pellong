import React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={ <App /> }>
        </Route>
      </Routes>
    </BrowserRouter>
)
reportWebVitals();

// // ReactDOM.render(
// // <React.StrictMode>
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="*" element={ <App /> }>
// //         </Route>
// //       </Routes>
// //     </BrowserRouter>
// //   </React.StrictMode>,
// //   document.getElementById('root')
// // );

// serviceWorkerRegistration.register();