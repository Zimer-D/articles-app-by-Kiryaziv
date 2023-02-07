import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from "./redux";
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Layout />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>)
}

export default App
