import styles from '../styles/Home.module.sass';

import { io, Socket } from 'socket.io-client';

import Head from 'next/head';
import React from 'react';

import Background from '../components/Background';

const Home: React.FC = () => {
  const [socket, setSocket] = React.useState<Socket>(io);

  const [value, setValue] = React.useState<string>('');
  const [chat, setChat] = React.useState<any>([]);

  const handleSubmit = async () => {
    socket.emit('test', value);
    setValue('');
  };

  React.useEffect(() => {
    socket.on('now', (data) => {
      setValue(data.message);
    });

    socket.on('test', (message: any) => {
      chat.push(message);
      setChat([...chat]);
    });

    // socket.on('connect', () => {
    //   console.log('connect');
    // });

    // socket.on('disconnect', () => {
    //   console.log('disconnect');
    // });

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      <Background themeMode='dark' />

      <main className={styles.main}>
        
      </main>
    </div>
  );
};

export default Home;
