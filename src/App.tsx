import { Routes, Route } from "react-router-dom";

import UserDetailPage from "./pages/UserDetail";

import UserCreate from "./pages/UserCreate.tsx";
import Table from "./components/UserTable/index.tsx";
import UserPostPage from "./pages/UserPosts/index.tsx";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/user/create" element={<UserCreate />} />
        <Route path="/user/:id" element={<UserDetailPage />} />
        <Route path="/user/:userId/posts" element={<UserPostPage />} />
      </Routes>
    </>
  );
};

export default App;
