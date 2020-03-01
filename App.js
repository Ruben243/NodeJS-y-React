import React from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';
import MiComponente from './componets/MiComponente';




function App() {
    var nombre = "Ruben Gines";
    var presentacion = <h2>Hola soy,{nombre}</h2>;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hola Linkedin,esto es una prueba en React <br></br>
          {presentacion}
        </p>
     
        <section className='componentes'>
              <MiComponente/>
              
          </section>
      </header>
        
    </div>
  );
}

export default App;
