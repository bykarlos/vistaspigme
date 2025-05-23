import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";
import {
  Table, TableBody, TableCell, TableHead, TableRow, Button, Chip,
  Card, CardContent, Typography, Collapse, List, ListItem, ListItemText
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
    services: [],
    failedJobs: [],
    nuevosUsuarios: [],
  });

  const [expand, setExpand] = useState({
    errores: false,
    jobs: false,
    nuevos: false
  });

  const toggle = (key) => {
    setExpand(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
        { id: 103, tool: "Halftone", msg: "Invalid PNG format", time: "11:15" },
        { id: 104, tool: "Enhancer", msg: "Null pointer", time: "12:02" }
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
      ],
      failedJobs: [
        { usuario: "usuario_001", herramienta: "Quitar fondo", detalle: "Reintentos fallidos" },
        { usuario: "usuario_002", herramienta: "Semitono", detalle: "Archivo corrupto" },
        { usuario: "usuario_003", herramienta: "Mejora", detalle: "Sin respuesta del servidor" },
        { usuario: "usuario_001", herramienta: "Editor", detalle: "Timeout inesperado" }
      ],
      nuevosUsuarios: [
        "usuario_045", "usuario_046", "usuario_047", "usuario_048",
        "usuario_049", "usuario_050", "usuario_051", "usuario_052",
        "usuario_053", "usuario_054", "usuario_055", "usuario_056",
        "usuario_057", "usuario_058", "usuario_059", "usuario_060",
        "usuario_061", "usuario_062", "usuario_063", "usuario_064",
        "usuario_065", "usuario_066", "usuario_067"
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

      {/* 🔥 Errores recientes */}
      <div className="card log" onClick={() => toggle("errores")} style={{ cursor: "pointer" }}>
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
            {(expand.errores ? stats.recentErrors : stats.recentErrors.slice(0, 3)).map(e => (
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

      {/* ⏱ Tiempo promedio */}
      <div className="card b1">
        <h3>⏱ Tiempo promedio</h3>
        <ul>
          {stats.avgTime.map(t => (
            <li key={t.tool}>{t.tool}: {t.time}s</li>
          ))}
        </ul>
      </div>

      {/* ⚠️ Jobs fallidos 3 veces */}
      <div className="card b2" onClick={() => toggle("jobs")} style={{ cursor: "pointer" }}>
        <h3>⚠️ Jobs fallidos 3 veces seguidas</h3>
        <p>4 casos detectados hoy</p>
        <Collapse in={expand.jobs}>
          <ul>
            {stats.failedJobs.map((f, i) => (
              <li key={i}>{f.usuario} – {f.herramienta}: {f.detalle}</li>
            ))}
          </ul>
        </Collapse>
      </div>

      {/* 👤 Usuarios nuevos esta semana */}
      <div className="card b3" onClick={() => toggle("nuevos")} style={{ cursor: "pointer" }}>
        <h3>👤 Usuarios nuevos esta semana</h3>
        <p>+{stats.nuevosUsuarios.length} registros</p>
        <Collapse in={expand.nuevos}>
          <ul>
            {stats.nuevosUsuarios.map((u, i) => (
              <li key={i}>• {u}</li>
            ))}
          </ul>
        </Collapse>
      </div>
    </div>
  );
}
