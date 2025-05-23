import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import {
  Table, TableBody, TableCell, TableHead, TableRow, Button, Chip
} from "@mui/material";

const rust = "#b24e1b";
const sand = "#d4b47a";
const violet = "#99713b";

export default function Dashboard() {
  const [stats, setStats] = useState({
    usage: [],
    errorsByTool: [],
    recentErrors: [],
    avgTime: [],
    queue: 4,
    activeUsers: 123,
    services: [
      { name: "Background Remover", status: true },
      { name: "Halftone Generator", status: true },
      { name: "Enhancer AI", status: false }
    ]
  });

  useEffect(() => {
    setStats({
      usage: [
        { day: "Lun", bg: 34, enh: 20, half: 7 },
        { day: "Mar", bg: 28, enh: 25, half: 10 },
        { day: "Mié", bg: 41, enh: 30, half: 9 },
        { day: "Jue", bg: 37, enh: 32, half: 14 },
        { day: "Vie", bg: 60, enh: 40, half: 18 }
      ],
      errorsByTool: [
        { name: "BG Remover", errors: 8 },
        { name: "Halftone", errors: 3 },
        { name: "Enhancer", errors: 12 }
      ],
      recentErrors: [
        { id: 101, tool: "Enhancer", msg: "Timeout processing", time: "10:24" },
        { id: 102, tool: "BG Remover", msg: "File too large", time: "10:41" },
        { id: 103, tool: "Halftone", msg: "Invalid PNG format", time: "11:15" }
      ],
      avgTime: [
        { tool: "BG Remover", time: 1.5 },
        { tool: "Halftone", time: 2.8 },
        { tool: "Enhancer", time: 4.2 }
      ],
      queue: 3,
      activeUsers: 198,
      services: [
        { name: "Background Remover", status: true },
        { name: "Halftone Generator", status: true },
        { name: "Enhancer AI", status: false }
      ]
    });
  }, []);

  return (
    <div className="dashboard-grid">
      {/* KPIs superiores */}
      <div className="card kpi1">
        <h3>Usuarios activos</h3>
        <p style={{ fontSize: "2rem", color: sand }}>{stats.activeUsers}</p>
      </div>
      <div className="card kpi2">
        <h3>Trabajos en cola</h3>
        <p style={{ fontSize: "2rem", color: rust }}>{stats.queue}</p>
      </div>
      <div className="card kpi3">
        <h3>Servicios activos</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {stats.services.map(s => (
            <li key={s.name}>
              <Chip label={s.name} color={s.status ? "success" : "error"} size="small" style={{ margin: "2px" }} />
            </li>
          ))}
        </ul>
      </div>

      {/* Gráfico de uso diario */}
      <div className="card graph">
        <h3>Uso diario por herramienta</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={stats.usage}>
            <XAxis dataKey="day" stroke={sand} />
            <YAxis stroke={sand} />
            <Tooltip />
            <Line type="monotone" dataKey="bg" stroke={rust} strokeWidth={2} />
            <Line type="monotone" dataKey="enh" stroke={sand} strokeWidth={2} />
            <Line type="monotone" dataKey="half" stroke={violet} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      

      {/* Mini panel: errores por herramienta */}
      <div className="card mini1">
        <h3>Errores por herramienta</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={stats.errorsByTool} layout="vertical">
            <XAxis type="number" stroke={sand} />
            <YAxis dataKey="name" type="category" stroke={sand} />
            <Tooltip />
            <Bar dataKey="errors" fill={rust} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Log de errores recientes */}
      <div className="card log">
        <h3>🔥 Errores recientes</h3>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Hora</TableCell>
              <TableCell>Herramienta</TableCell>
              <TableCell>Error</TableCell>
              <TableCell align="right">Log</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.recentErrors.map(e => (
              <TableRow key={e.id}>
                <TableCell>{e.time}</TableCell>
                <TableCell>{e.tool}</TableCell>
                <TableCell>{e.msg}</TableCell>
                <TableCell align="right">
                  <Button size="small" variant="outlined" color="error">Descargar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Inferiores */}
      <div className="card b1">
        <h3>Tiempo promedio</h3>
        <ul>
          {stats.avgTime.map(t => (
            <li key={t.tool}>{t.tool}: {t.time}s</li>
          ))}
        </ul>
      </div>

      <div className="card b2">
        <h3>Jobs fallidos 3 veces seguidas</h3>
        <p>4 casos detectados hoy</p>
      </div>

      <div className="card b3">
        <h3>Usuarios nuevos esta semana</h3>
        <p>+23 registros</p>
      </div>
    </div>
  );
}
