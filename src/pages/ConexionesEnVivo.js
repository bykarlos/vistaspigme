import { useState } from "react";
import {
  Card, CardContent, Typography, Chip,
  Collapse, List, ListItem, ListItemText
} from "@mui/material";

const ejemplos = [
  {
    id: 1,
    nombre: "usuario_001",
    herramienta: "Quitar Fondo",
    cpu: 45,
    ram: 2048,
    desde: Date.now() - 300000,
    color: "#00ffff",
    historial: [
      "Subió archivo goku.png",
      "Procesó quitar fondo",
      "Descargó resultado",
      "Abrió editor de semitonos"
    ]
  },
  {
    id: 2,
    nombre: "usuario_002",
    herramienta: "Mejorar Imagen",
    cpu: 73,
    ram: 3120,
    desde: Date.now() - 500000,
    color: "#8a2be2",
    historial: [
      "Subió archivo portada.jpg",
      "Aplicó IA Mejora",
      "Descargó resultado"
    ]
  },
  {
    id: 3,
    nombre: "usuario_003",
    herramienta: "Semitonos",
    cpu: 61,
    ram: 1820,
    desde: Date.now() - 800000,
    color: "#d4b47a",
    historial: [
      "Cargó archivo camiseta.png",
      "Generó semitono",
      "Modificó contraste"
    ]
  }
];

export default function ConexionesEnVivo() {
  const [activos, setActivos] = useState({});

  const toggleHistorial = (id) => {
    setActivos(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 16 }}>
      {ejemplos.map(user => {
        const isActive = activos[user.id];
        return (
          <Card
            key={user.id}
            onClick={() => toggleHistorial(user.id)}
            style={{
              minWidth: 280,
              flex: "1 1 300px",
              border: `1px solid ${user.color}`,
              background: "linear-gradient(135deg, #0d0d0d, #1a1a1a)",
              boxShadow: `0 0 12px ${user.color}66`,
              color: user.color,
              borderRadius: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out"
            }}
          >
            <CardContent>
              <Typography variant="h6">{user.nombre}</Typography>
              <Typography variant="body2">{user.herramienta}</Typography>
              <div style={{ marginTop: 8 }}>
                <Chip label={`CPU: ${user.cpu}%`} style={{ backgroundColor: "#1a1a1a", color: user.color }} />
                <Chip label={`RAM: ${user.ram} MB`} style={{ marginLeft: 8, backgroundColor: "#1a1a1a", color: user.color }} />
              </div>
              <Typography variant="caption" display="block" style={{ marginTop: 10 }}>
                Activo desde: {new Date(user.desde).toLocaleTimeString()}
              </Typography>

              <Collapse in={isActive}>
                <div style={{ marginTop: 12, paddingTop: 8, borderTop: `1px solid ${user.color}55` }}>
                  <Typography variant="subtitle2" style={{ color: "#ffffff" }}>Historial:</Typography>
                  <List dense>
                    {user.historial.map((accion, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemText primary={`• ${accion}`} primaryTypographyProps={{ style: { color: "#aaa" } }} />
                      </ListItem>
                    ))}
                  </List>
                </div>
              </Collapse>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
