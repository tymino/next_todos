import Head from 'next/head';
import styles from '../styles/Home.module.sass';

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Todos | Next.js</title>
        <meta name="description" content="Todos - Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Next.js</h1>
      </main>
    </div>
  );
};

export default Home;
