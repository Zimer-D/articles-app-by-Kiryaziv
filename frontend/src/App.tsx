import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from "./redux";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from "redux-persist";
function App() {
  const persistor = persistStore(store)
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Layout />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>)
}

export default App
