/* eslint-disable @next/next/no-page-custom-font */
import styles from '../styles/Home.module.sass';
import Head from 'next/head';

import React from 'react';

import useTheme from '../hooks/useTheme';

import Background from '../components/Background';
import Content from '../components/Content';
import Attribution from '../components/Attribution';

const Home: React.FC = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Mentor | Todo app</title>
        <meta name="description" content="Todos - Next.js" />
        <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png" />

        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Background theme={theme as string} />
      <Content theme={theme as string} toggleTheme={toggleTheme as () => void} />
      <Attribution />
    </div>
  );
};

export default Home;
