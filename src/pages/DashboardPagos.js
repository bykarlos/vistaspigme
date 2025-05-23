import { useEffect, useState } from "react";
import {
  Box, Grid, Typography, Card, CardContent, Table, TableHead,
  TableRow, TableCell, TableBody
} from "@mui/material";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const colores = ["#00ffff", "#8a2be2", "#b24e1b", "#d4b47a"];

// Simulación de pagos
const pagosJSON = [
  {
    id: "p_001",
    user: "usuario_001",
    status: "approved",
    amount: 4000,
    date: "2025-05-20T10:12:00Z"
  },
  {
    id: "p_002",
    user: "usuario_002",
    status: "approved",
    amount: 2300,
    date: "2025-05-21T11:30:00Z"
  },
  {
    id: "p_003",
    user: "usuario_003",
    status: "rejected",
    amount: 1800,
    date: "2025-05-21T12:45:00Z"
  },
  {
    id: "p_004",
    user: "usuario_001",
    status: "approved",
    amount: 3200,
    date: "2025-05-22T09:10:00Z"
  }
];

export default function DashboardPagos() {
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    setPagos(pagosJSON);
  }, []);

  const pagosPorUsuario = pagos.reduce((acc, pago) => {
    if (!acc[pago.user]) acc[pago.user] = 0;
    if (pago.status === "approved") acc[pago.user] += pago.amount;
    return acc;
  }, {});

  const datosBarras = Object.entries(pagosPorUsuario).map(([user, amount]) => ({
    name: user,
    total: amount
  }));

  const datosDonut = [
    { name: "Aprobados", value: pagos.filter(p => p.status === "approved").length },
    { name: "Rechazados", value: pagos.filter(p => p.status === "rejected").length }
  ];

  const datosLinea = pagos
    .filter(p => p.status === "approved")
    .map(p => ({
      date: new Date(p.date).toLocaleDateString("es-AR"),
      amount: p.amount
    }));

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Panel de Pagos
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pagos aprobados por usuario</Typography>
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
          <Card>
            <CardContent>
              <Typography variant="h6">Distribución de estados</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={datosDonut}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                    dataKey="value"
                  >
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
          <Card>
            <CardContent>
              <Typography variant="h6">Ingresos aprobados por fecha</Typography>
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

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Listado de pagos</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Usuario</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Importe</TableCell>
                    <TableCell>Fecha</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pagos.map((p, i) => (
                    <TableRow key={i}>
                      <TableCell>{p.id}</TableCell>
                      <TableCell>{p.user}</TableCell>
                      <TableCell>{p.status}</TableCell>
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
