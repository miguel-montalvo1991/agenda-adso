import "./App.css";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const contactos = [
    {
      id: 1,
      nombre: "Carolina Pérez",
      telefono: "300 123 4567",
      correo: "carolina@sena.edu.co",
      etiqueta: "Compañera",
    },
    {
      id: 2,
      nombre: "Miguel Montalvo",
      telefono: "301 987 6543",
      correo: "Montalvo@gmail.com",
      etiqueta: "Instructor",
    },
    {
      id: 3,
      nombre: "Luisa Martínez",
      telefono: "320 555 7788",
      correo: "luisa@sena.edu.co",
      etiqueta: "Cliente",
    },
    {
      id: 4,
      nombre: "Davier Q+uinto",
      telefono: "315 444 2211",
      correo: "Davier@quinto.afro",
      etiqueta: "Familia",
    },
    {
      id: 5,
      nombre: "Maniuela Cordoba ",
      telefono: "312 678 9900",
      correo: "Manuela@gmail.com",
      etiqueta: "Compañera de ficha",
    },
  ];

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO 📒</h1>
      <p className="app-subtitle">Contactos guardados</p>

      {contactos.map((c) => (
        <ContactoCard
          key={c.id}
          nombre={c.nombre}
          telefono={c.telefono}
          correo={c.correo}
          etiqueta={c.etiqueta}
        />
      ))}

      <p className="app-nota">
        (Versión 0.1 - solo lectura, sin agregar ni editar todavía)
      </p>
    </main>
  );
}
