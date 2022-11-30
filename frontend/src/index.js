import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context from './contexts/userContext';


ReactDOM.render(
<Context>
<App />
</Context>
, document.getElementById('root'));



// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import Context from './contexts/userContext';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Context>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </Context>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();