import { BrowserRouter , Routes ,Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import PublicRoute from "./components/PublicRoute";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
function App() {
  const {loading} = useSelector((state)=>state.alerts);
  return (
    <div className="App">
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
