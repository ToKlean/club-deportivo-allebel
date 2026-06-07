import './styles/globals.css';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Nosotros } from './components/Nosotros';
import { Categorias } from './components/Categorias';
import { Reclutamiento } from './components/Reclutamiento';
import { Galeria } from './components/Galeria';
import { Contacto } from './components/Contacto';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Nosotros />
      <Categorias />
      <Reclutamiento />
      <Galeria />
      <Contacto />
    </>
  );
}

export default App;
