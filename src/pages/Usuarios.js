import { useState } from "react";
import {
  Box, Grid, Typography, List, ListItem, ListItemText,
  TextField, Card, CardContent
} from "@mui/material";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

const usuariosFake = [
  { id: 1, nombre: "usuario_001" },
  { id: 2, nombre: "usuario_002" },
  { id: 3, nombre: "usuario_003" }
];

const historialEventos = {
  usuario_001: [
    { evento: "Subió archivo goku.png" },
    { evento: "Procesó quitar fondo" },
    { evento: "Descargó resultado" }
  ],
  usuario_002: [
    { evento: "Subió archivo portada.jpg" },
    { evento: "Aplicó mejora AI" },
    { evento: "Descargó resultado" }
  ],
  usuario_003: [
    { evento: "Cargó camiseta.png" },
    { evento: "Generó semitono" },
    { evento: "Descargó imagen final" }
  ]
};

const nombresGraficos = [
  "Tiempo promedio por sesión",
  "Acciones por sesión",
  "Errores por día",
  "Mejoras realizadas por día",
  "Tiempo en herramientas específicas",
  "Velocidad promedio por herramienta",
  "Herramientas más utilizadas",
  "Errores por herramienta",
  "Archivos procesados por tipo",
  "Clicks promedio por herramienta",
  "Tiempo total acumulado por herramienta",
  "% sesiones exitosas vs errores",
  "Origen de archivos (local vs URL)",
  "Frecuencia semanal",
  "% tareas abandonadas",
  "Nivel de satisfacción estimado"
];

const datosGenericos = Array.from({ length: 10 }, (_, i) => ({ name: `Día ${i + 1}`, valor: Math.floor(Math.random() * 100) }));
const dataDonut = [
  { name: "Exitosas", value: 80 },
  { name: "Errores", value: 20 }
];
const colores = ["#00ffff", "#8a2be2", "#b24e1b", "#d4b47a"];

const cardStyle = {
  background: "linear-gradient(135deg, #0d0d0d, #1a1a1a)",
  border: "1px solid #00ffff",
  borderRadius: "16px",
  boxShadow: "0 0 15px #00ffff55",
  color: "#ffffff"
};

const titleStyle = {
  color: "#00ffff",
  fontWeight: "bold",
  marginBottom: "8px"
};

export default function Usuarios() {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  return (
    <Box display="flex" flexDirection="column" gap={2} p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card style={cardStyle}>
            <CardContent>
              <Typography style={titleStyle} variant="h6">Filtros de experiencia</Typography>
              <TextField fullWidth margin="normal" label="Buscar por nombre" />
              <TextField fullWidth margin="normal" label="Rango de fechas" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card style={cardStyle}>
            <CardContent>
              <Typography style={titleStyle} variant="h6">Usuarios</Typography>
              <List>
                {usuariosFake.map(u => (
                  <ListItem
                    button
                    key={u.id}
                    selected={usuarioSeleccionado?.id === u.id}
                    onClick={() => setUsuarioSeleccionado(u)}
                  >
                    <ListItemText primary={u.nombre} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {usuarioSeleccionado && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom style={titleStyle}>
            Información detallada: {usuarioSeleccionado.nombre}
          </Typography>

          <Grid container spacing={2}>
            {nombresGraficos.map((titulo, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card style={cardStyle}>
                  <CardContent>
                    <Typography style={titleStyle} variant="subtitle1">{titulo}</Typography>
                    <ResponsiveContainer width="100%" height={150}>
                      {i < 6 ? (
                        <LineChart data={datosGenericos}>
                          <XAxis dataKey="name" stroke="#ccc" />
                          <YAxis stroke="#ccc" />
                          <Tooltip />
                          <Line type="monotone" dataKey="valor" stroke="#00ffff" strokeWidth={2} />
                        </LineChart>
                      ) : i < 11 ? (
                        <BarChart data={datosGenericos}>
                          <XAxis dataKey="name" stroke="#ccc" />
                          <YAxis stroke="#ccc" />
                          <Tooltip />
                          <Bar dataKey="valor" fill="#8a2be2" />
                        </BarChart>
                      ) : (
                        <PieChart>
                          <Pie data={dataDonut} cx="50%" cy="50%" outerRadius={50} label>
                            {dataDonut.map((entry, idx) => (
                              <Cell key={`cell-${idx}`} fill={colores[idx % colores.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      )}
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box mt={4}>
            <Typography variant="h6" style={titleStyle}>Eventos recientes</Typography>
            <Grid container spacing={2}>
              {historialEventos[usuarioSeleccionado.nombre]?.map((e, i) => (
                <Grid item xs={12} md={6} key={i}>
                  <Card style={{ ...cardStyle, border: "1px solid #8a2be2", boxShadow: "0 0 12px #8a2be255" }}>
                    <CardContent>
                      <Typography>{e.evento}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
}
