// import Head from 'next/head';
// import styles from '../styles/Home.module.sass';

// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// function useSocket(url) {
//   const [socket, setSocket] = useState(null);

//   console.log('test');

//   useEffect(() => {
//     const socketio = io(url);

//     socketio.on('connect', () => {
//       console.log('connect');
//       socketio.emit('hello');
//     });

//     socketio.on('disconnect', () => {
//       console.log('disconnect');
//     });
//     setSocket(socketio);

//     return () => socketio.close();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return socket;
// }

// const Home = () => {
//   const socket = useSocket('/api/socketio');
//   const [message, setMessage] = useState('');
//   const [user, setUser] = useState('0');

//   useEffect(() => {
//     console.log(socket);

//     if (socket) {
//       socket.on('hello', (data) => {
//         console.log('hello', data);
//         setMessage(data);
//       });
//       socket.on('a user connected', () => {
//         setUser('a user connected');
//       });
//     }
//   }, [socket]);

//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Todos | Next.js</title>
//         <meta name="description" content="Todos - Next.js" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>Next.js</h1>

//         <h2>Socket Message: {message}</h2>
//         <p>User Onle Visible when you open in Sencond Tab</p>
//         <h3>User: {user}</h3>
//       </main>
//     </div>
//   );
// };

// export default Home;

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Home = () => {
  const [value, setValue] = useState('');
  const [chat, setChat] = useState([]);

  const handleSubmit = async () => {
    const resp = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });

    if (resp.ok) setValue('');
  };

  useEffect(() => {
    fetch('/api/socketio').finally(() => {
      const socket = io();

      socket.on('connect', () => {
        console.log('connect');
        socket.emit('hello');
      });

      socket.on('hello', (data) => {
        console.log('hello', data);
      });

      socket.on('a user connected', () => {
        console.log('a user connected');
      });

      socket.on('disconnect', () => {
        console.log('disconnect');
      });

      socket.on('message', (message) => {
        chat.push(message);
        setChat([...chat]);
      });
    });
  }, []);

  return (
    <div>
      <h1>Socket.io</h1>
      <div>{chat.map(e => <div key={e}>{e}</div>)}</div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleSubmit}>Click</button>
    </div>
  );
};

export default Home;
