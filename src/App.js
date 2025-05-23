import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import Pedidos from "./pages/Pedidos";
import ConexionesEnVivo from "./pages/ConexionesEnVivo";
import DashboardPagos from "./pages/DashboardPagos";




function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px", color: "#fff" }}>
          <Routes>
          <Route path="/pagos" element={<DashboardPagos />} />
            <Route path="/conexiones" element={<ConexionesEnVivo />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/pedidos" element={<Pedidos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
