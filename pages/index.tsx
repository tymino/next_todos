/* eslint-disable @next/next/no-page-custom-font */
import styles from '../styles/Home.module.sass';
import Head from 'next/head';

import React, { useState } from 'react';

import Background from '../components/Background';
import Content from '../components/Content';
import Attribution from '../components/Attribution';

const Home: React.FC = () => {
  const [theme, setTheme] = useState<string>('light');

  const changeTheme = (actualTheme: string) => {
      setTheme(actualTheme);
  };

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
      <Content theme={theme} changeTheme={changeTheme} />
      <Attribution />
    </div>
  );
};

export default Home;
