import "./App.css";
import Cart from "./Components/Cart";
import { Navbar } from "./Components/Navbar";
import { MainRoutes } from "./pages/MainRoutes";

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <MainRoutes />
    </div>
  );
}

export default App;
