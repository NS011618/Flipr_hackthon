import { BrowserRouter , Routes ,Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import PublicRoute from "./components/PublicRoute";
import CreateEditPlaylist from './pages/CreateEditPlaylist';
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import { Toaster } from 'react-hot-toast';
function App() {
  const {loading} = useSelector((state)=>state.alerts);
  return (
    <div className="App">
      {loading && <Spinner />}
      
      <Toaster position="top-center" reverseOrder={false}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/create-edit-playlist" element={<ProtectedRoute><CreateEditPlaylist /> </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
