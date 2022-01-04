/* eslint-disable @next/next/no-page-custom-font */
import styles from '../styles/Home.module.sass';
import Head from 'next/head';

import { io, Socket } from 'socket.io-client';

import React, { useState, useEffect } from 'react';

import Background from '../components/Background';
import Content from '../components/Content';

const Home: React.FC = () => {
  const [theme, setTheme] = useState<string>('light');
  const [socket, setSocket] = useState<Socket>(io);

  const [value, setValue] = useState<string>('');
  const [chat, setChat] = useState<any>([]);

  const handleSubmit = async () => {
    socket.emit('test', value);
    setValue('');
  };

  useEffect(() => {
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

        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Background theme={theme} />
      <Content />
    </div>
  );
};

export default Home;
