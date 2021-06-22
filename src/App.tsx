import { createContext, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import NewRoom from "./pages/NewRoom";
import Home from "./pages/Home";
import firebase from 'firebase/app';
import { auth } from './services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}


export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);
      if (result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || !photoURL ) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      <Switch>
        <Route path="/" exact component={ Home } />
        <Route path="/rooms/new" component={ NewRoom } />
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;

// Fast refresh  - React - permite que a aplicação tenha sua interface atualizada,
// sem necessidade de reload contínuo do usuário
// Componentes = partes isoladas de código que, uma vez juntas, compõem a aplicação
// Componente no React = função que devolve um HTML
// Novas APIs do React só funcionam em componentes funcionais, isto é, em componentes feitos com funções 
// e não com classes
// Propriedades - React: informações ou atributos que passamos aos componentes para que
// eles possam se comportar de maneira diferente
// --> diferença entre export default and named export
// useEffect - efeitos colaterais, dispara função toda vez que algo acontecer
