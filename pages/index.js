import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '../lib/session';
import {User} from '../types/user'
import useUser from '../lib/useUser';
import fetchJson from '../lib/fetchJson';
import config from '../config';
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import { Router, useRouter } from 'next/router';
import {AuthContext, PageContext} from '../contexts/context'


export default function Home({user}) {
    console.log(user);

    const router = useRouter();
    const sidebarData = {
      isOpen: true,
      name: 'home',
      redirectTo: () => {
          router.push('/');
      }
    }

    return (
      <AuthContext.Provider value={user}>
        <PageContext.Provider value={sidebarData}>
          <Layout>
              <div>
                <p>Welcome to home page {user.username}</p>
              </div>
          </Layout>
        </PageContext.Provider>
      </AuthContext.Provider>
    )
} 

export const getServerSideProps = async ({req, res}) => {
  const { cookie } = req.headers;
  console.log(cookie);
  
  try {
    const user = await fetchJson(config.serverAddr + `v1/user`, {
      method: 'GET',
      credentials: "include",
      headers: { cookie },
    });
    console.log(user);
    if (user.isLoggedIn === false) {
      res.setHeader('location', '/signin')
      res.statusCode = 302
      res.end()
      return {
        props: {
          user: {isLoggedIn: false, username: ''}
        }
      }
    }
  
    return {
      props: {user}
    }
  }
  catch(error) {
    console.error(error);
  }
};