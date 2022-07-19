import React from "react";
import {Route, Routes} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

const Home = React.lazy(() => import(/* webpackChunkName: "Home" */ "./pages/Home"));
const Organization = React.lazy(() => import(/* webpackChunkName: "Organization" */ "./pages/Organization"));
const Organizations = React.lazy(() => import(/* webpackChunkName: "Organizations" */ "./pages/Organizations"));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"));

function App() {
  return (
    <>
      <React.Suspense>
        <Routes >
          <Route path="/" element={<MainLayout/>}>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/organizations" element={<Organizations/>}></Route>
            <Route path="/organizations/:id" element={<Organization/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
          </Route>
        </Routes>
      </React.Suspense>
    </>
  );
}

export default App;
