import { useContext, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { AuthContext } from '../contexts/AuthContext';
import styles from '../styles/pages/Home.module.css';

export default function Home() {
  const { getGithubUser } = useContext(AuthContext);
  const router = useRouter();

  const [username, setUsername] = useState('');

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    getGithubUser(username);

    router.push({
      pathname: '/dashboard',
    });
  }

  return (
    <>
      <Head>
        <title>Login | move.it</title>
      </Head>

      <div className={styles.container}>
        <img src="logo-shadow.svg" alt="Logo Shadow" />

        <div className={styles.content}>
          <img src="logo-full.svg" alt="Logo Full" />

          <h1>Bem-vindo</h1>

          <p>
            <img src="icons/github.svg" alt="GitHub Logo" />
            Faça login com seu Github para começar
          </p>

          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Digite seu username"
              onChange={handleInputChange}
            />

            <button type="submit">
              <img src="icons/arrow-right.svg" alt="Acessar" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
