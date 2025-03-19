import UserTable from "./components/UserTable.tsx";

import { Routes, Route } from "react-router-dom";

import UserDetailPage from "./pages/UserDetail";
// import UserPostsPage from "./pages/UserPostsPage.js";
import UserCreate from "./pages/UserCreate.tsx";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserTable />} />
        <Route path="/user/create" element={<UserCreate />} />
        <Route path="/user/:id" element={<UserDetailPage />} />
        {/* <Route path="/user/:userId/posts" element={<UserPostsPage />} /> */}
      </Routes>
    </>
  );
};

export default App;
