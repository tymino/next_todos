import styles from '../styles/Home.module.sass';

import Head from 'next/head';
import React from 'react';

import { io } from 'socket.io-client';

const Home: React.FC = () => {
  const [value, setValue] = React.useState<string>('');
  const [chat, setChat] = React.useState<any>([]);

  const [sock, setSock] = React.useState<any>(null);

  const handleSubmit = async () => {
    console.log(sock.id);

    const resp = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: sock.id || 'none',
        message: value,
      }),
    });

    if (resp.ok) setValue('');
  };

  React.useEffect(() => {
    fetch('/api/socketio').finally(async () => {
      const socket = io(process.env.URL as string);

      setSock(socket);

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
    <div className={styles.container}>
      <Head>
        <title>Todos | Next.js</title>
        <meta name="description" content="Todos - Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Socket.io</h1>
        <div>
          {chat.map((e: any, index: number) => (
            <div key={`${e}${index}`}>{e}</div>
          ))}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleSubmit}>PUSH</button>
      </main>
    </div>
  );
};

export default Home;
