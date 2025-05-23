import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Pigmenta</h2>
      <Link to="/">Dashboard</Link>
      <Link to="/usuarios">Usuarios</Link>
      <Link to="/pedidos">Pedidos</Link>
      <Link to="/conexiones">Conexiones en vivo</Link>
      <Link to="/pagos">Pagos</Link> {/* 🔥 Nuevo acceso agregado */}
    </div>
  );
}
