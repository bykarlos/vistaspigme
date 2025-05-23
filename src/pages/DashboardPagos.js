import { useEffect, useState } from "react";
import {
  Box, Grid, Typography, Card, CardContent, Table, TableHead,
  TableRow, TableCell, TableBody, Collapse, List, ListItem, ListItemText
} from "@mui/material";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const colores = ["#00ffff", "#8a2be2", "#b24e1b", "#d4b47a"];

const cardStyle = {
  background: "linear-gradient(135deg, #0d0d0d, #1a1a1a)",
  border: "1px solid #00ffff",
  borderRadius: "16px",
  boxShadow: "0 0 15px #00ffff55",
  color: "#ffffff",
  cursor: "pointer"
};

const titleStyle = {
  color: "#00ffff",
  fontWeight: "bold",
  marginBottom: "8px"
};

export default function DashboardPagos() {
  const [pagos, setPagos] = useState([]);
  const [expand, setExpand] = useState({ errores: false, jobs: false, nuevos: false });

  useEffect(() => {
    setPagos([
      { id: "p_001", user: "usuario_001", status: "approved", amount: 4000, date: "2025-05-20T10:12:00Z" },
      { id: "p_002", user: "usuario_002", status: "approved", amount: 2300, date: "2025-05-21T11:30:00Z" },
      { id: "p_003", user: "usuario_003", status: "rejected", amount: 1800, date: "2025-05-21T12:45:00Z" },
      { id: "p_004", user: "usuario_001", status: "approved", amount: 3200, date: "2025-05-22T09:10:00Z" }
    ]);
  }, []);

  const pagosPorUsuario = pagos.reduce((acc, pago) => {
    if (!acc[pago.user]) acc[pago.user] = 0;
    if (pago.status === "approved") acc[pago.user] += pago.amount;
    return acc;
  }, {});

  const datosBarras = Object.entries(pagosPorUsuario).map(([user, amount]) => ({ name: user, total: amount }));
  const datosDonut = [
    { name: "Aprobados", value: pagos.filter(p => p.status === "approved").length },
    { name: "Rechazados", value: pagos.filter(p => p.status === "rejected").length }
  ];
  const datosLinea = pagos.filter(p => p.status === "approved").map(p => ({
    date: new Date(p.date).toLocaleDateString("es-AR"),
    amount: p.amount
  }));

  const errores = [
    { id: 1, tool: "Enhancer", msg: "Timeout processing", time: "10:24" },
    { id: 2, tool: "BG Remover", msg: "File too large", time: "10:41" },
    { id: 3, tool: "Halftone", msg: "Invalid PNG format", time: "11:15" }
  ];

  const failedJobs = [
    { usuario: "usuario_001", herramienta: "Quitar fondo", detalle: "Reintentos fallidos" },
    { usuario: "usuario_003", herramienta: "Semitono", detalle: "Archivo corrupto" },
    { usuario: "usuario_002", herramienta: "Mejora AI", detalle: "Sin respuesta del servidor" },
    { usuario: "usuario_001", herramienta: "Editor", detalle: "Cuelgue de interfaz" }
  ];

  const nuevosUsuarios = [
    "usuario_045", "usuario_046", "usuario_047", "usuario_048", "usuario_049", "usuario_050"
  ];

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom style={titleStyle}>Panel de Pagos</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card style={cardStyle}>
            <CardContent>
              <Typography variant="h6" style={titleStyle}>Pagos aprobados por usuario</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={datosBarras}>
                  <XAxis dataKey="name" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Bar dataKey="total" fill="#00ffff" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card style={cardStyle}>
            <CardContent>
              <Typography variant="h6" style={titleStyle}>Distribución de estados</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={datosDonut} cx="50%" cy="50%" outerRadius={60} label dataKey="value">
                    {datosDonut.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={colores[idx % colores.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card style={cardStyle}>
            <CardContent>
              <Typography variant="h6" style={titleStyle}>Ingresos aprobados por fecha</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={datosLinea}>
                  <XAxis dataKey="date" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#8a2be2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Expandibles */}
        <Grid item xs={12} md={4}>
          <Card style={cardStyle} onClick={() => setExpand(prev => ({ ...prev, errores: !prev.errores }))}>
            <CardContent>
              <Typography variant="h6" style={titleStyle}>🔥 Errores recientes</Typography>
              {!expand.errores ? (
                errores.slice(0, 2).map(e => (
                  <Typography key={e.id} variant="body2">{e.time} - {e.tool}: {e.msg}</Typography>
                ))
              ) : (
                <Collapse in={expand.errores}>
                  <List dense>
                    {errores.map(e => (
                      <ListItem key={e.id}><ListItemText primary={`[${e.time}] ${e.tool} → ${e.msg}`} /></ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card style={cardStyle} onClick={() => setExpand(prev => ({ ...prev, jobs: !prev.jobs }))}>
            <CardContent>
              <Typography variant="h6" style={titleStyle}>⚠️ Jobs fallidos 3 veces</Typography>
              <Typography>4 casos detectados hoy</Typography>
              <Collapse in={expand.jobs}>
                <List dense>
                  {failedJobs.map((f, idx) => (
                    <ListItem key={idx}><ListItemText primary={`${f.usuario} – ${f.herramienta}: ${f.detalle}`} /></ListItem>
                  ))}
                </List>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card style={cardStyle} onClick={() => setExpand(prev => ({ ...prev, nuevos: !prev.nuevos }))}>
            <CardContent>
              <Typography variant="h6" style={titleStyle}>👤 Usuarios nuevos esta semana</Typography>
              <Typography>+{nuevosUsuarios.length} registros</Typography>
              <Collapse in={expand.nuevos}>
                <List dense>
                  {nuevosUsuarios.map((u, i) => (
                    <ListItem key={i}><ListItemText primary={`• ${u}`} /></ListItem>
                  ))}
                </List>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>

        {/* Tabla de pagos */}
        <Grid item xs={12}>
          <Card style={cardStyle}>
            <CardContent>
              <Typography variant="h6" style={titleStyle}>Listado de pagos</Typography>
              <Table size="small" sx={{ color: "white" }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#00ffff" }}>ID</TableCell>
                    <TableCell sx={{ color: "#00ffff" }}>Usuario</TableCell>
                    <TableCell sx={{ color: "#00ffff" }}>Estado</TableCell>
                    <TableCell sx={{ color: "#00ffff" }}>Importe</TableCell>
                    <TableCell sx={{ color: "#00ffff" }}>Fecha</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pagos.map((p, i) => (
                    <TableRow key={i}>
                      <TableCell>{p.id}</TableCell>
                      <TableCell>{p.user}</TableCell>
                      <TableCell style={{ color: p.status === "approved" ? "#00ff99" : "#ff5555" }}>{p.status}</TableCell>
                      <TableCell>${p.amount}</TableCell>
                      <TableCell>{new Date(p.date).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}