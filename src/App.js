import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase'



class App extends Component {

  constructor() {
    // La Clase App está heredando de Component
    // Por eso usamos super()
    super()

    this.state = {
      user: null
    };

    this.handleAuth = this.handleAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  // Metodo de ciclo de vida... 
  // Proporcionado por Firebase y renderizado por React
  // podemos colocar librerias de ajax.
  componentWillMount() {
    firebase.auth().onAuthStateChanged( user => {
      this.setState({
        user: user
      })
    })
    
  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider()

    // Devuelve una promesa
    firebase.auth().signInWithPopup(provider)
    .then( result => console.log(`${result.user.email} Sesión iniciada`))
    .catch( error => console.log(`Error ${error.code}: ${error.message}`) )

  }

handleLogout() {
  firebase.auth().signOut()
    .then( result => console.log(`Cerrada sesión`))
    .catch( error => console.log(`Error: ${error.code}: ${error.message}`) )
}

renderBotonLogin() {
    // Si se inició sesión correctamente
  if(this.state.user) {
      return (
        <div>
          <img className="imgCuentaGoogle" src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p> Hola {this.state.user.displayName} </p>
          <button onClick={this.handleLogout} >Cerrar sesión </button>
        </div>
      );
    } else {
        // Si falló inició sesión
        return (
            <div>
              <button onClick={this.handleAuth}>Iniciar sesión con Google</button>
            </div>
          );
      }
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Iniciar sesión</h1>
        </header>
        <br />
        {this.renderBotonLogin()}
      </div>
    );
  }
}

export default App;
