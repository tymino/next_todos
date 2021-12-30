import styles from '../styles/Home.module.sass';

import Head from 'next/head';
import React from 'react';

import io from 'socket.io-client';

const Home: React.FC = () => {
  const [socket, setSocket] = React.useState<any>(null);

  const [value, setValue] = React.useState<string>('');
  const [chat, setChat] = React.useState<any>([]);

  const handleSubmit = async () => {
    socket.emit('test', value);
    setValue('');
  };

  React.useEffect(() => {
    const newSocket = io();

    setSocket(newSocket);

    newSocket.on('now', (data) => {
      setValue(data.message);
    });

    newSocket.on('test', (message: any) => {
      chat.push(message);
      setChat([...chat]);
    });

    // socket.on('connect', () => {
    //   console.log('connect');
    // });

    // socket.on('disconnect', () => {
    //   console.log('disconnect');
    // });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Mentor | Todo app</title>
        <meta name="description" content="Todos - Next.js" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./favicon-32x32.png"
        />
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
