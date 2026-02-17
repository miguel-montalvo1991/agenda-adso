import './App.css';
export default function App() {
  const fecha = new Date().toLocaleString();

  return (
    <main>
      <h1>HOLA SOY MIGUEL, APRENDIZ DEL SENA </h1>
      <p>Espero ser un gran desarrollador y poder vivir de ello</p>
      <p>{fecha}</p>
    </main>
  );
}