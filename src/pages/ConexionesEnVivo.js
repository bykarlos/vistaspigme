import { useState } from "react";
import { Card, CardContent, Typography, Chip, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText } from "@mui/material";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const handleOpen = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setUsuarioSeleccionado(null);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 16 }}>
      {ejemplos.map(user => (
        <Card
          key={user.id}
          onClick={() => handleOpen(user)}
          style={{
            minWidth: 250,
            border: `1px solid ${user.color}`,
            background: "#121212",
            color: user.color,
            cursor: "pointer"
          }}
        >
          <CardContent>
            <Typography variant="h6">{user.nombre}</Typography>
            <Typography variant="body2">{user.herramienta}</Typography>
            <Chip label={`CPU: ${user.cpu}%`} style={{ marginTop: 8, backgroundColor: "#1a1a1a", color: user.color }} />
            <Chip label={`RAM: ${user.ram} MB`} style={{ marginTop: 8, marginLeft: 4, backgroundColor: "#1a1a1a", color: user.color }} />
            <Typography variant="caption" display="block" style={{ marginTop: 10 }}>
              Activo desde: {new Date(user.desde).toLocaleTimeString()}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Historial de {usuarioSeleccionado?.nombre}
        </DialogTitle>
        <DialogContent>
          <List>
            {usuarioSeleccionado?.historial.map((accion, index) => (
              <ListItem key={index}>
                <ListItemText primary={accion} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}
