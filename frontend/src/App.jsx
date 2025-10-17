import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import MyPosts from './pages/MyPosts';
import Navbar from './pages/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';


export default function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProtectedRoute> <PostList /> </ProtectedRoute>} />
        <Route path="/posts/:id" element={<ProtectedRoute> <PostDetail /> </ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute> <CreatePost /> </ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute> <CreatePost /> </ProtectedRoute>} />
        <Route path="/my-posts" element={<ProtectedRoute> <MyPosts /> </ProtectedRoute>} />
        
        <Route path="/register" element={<PublicRoute> <Register /> </PublicRoute>} />
        <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
      </Routes>
    </Router>
  );
}
