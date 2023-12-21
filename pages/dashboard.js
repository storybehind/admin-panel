import fetchJson, { FetchError } from '../lib/fetchJson';
import config from '../config';
import Layout from '../components/Layout'
import {useRouter } from 'next/router';
import {AuthContext, PageContext} from '../contexts/context'
import { useEffect, useState } from 'react';
import styles from '../styles/Dashboard.module.css'
import Image from 'next/image';
import TipBar from '../components/Tipbar';


export default function Dashboard({user}) {
    console.log(user);

    const router = useRouter();
    const sidebarData = {
      name: 'dashboard',
      redirectTo: () => {
            console.log("redirecting dashboard");
            router.push('/dashboard');
      }
    }

    const [searchQuery, setSearchQuery] = useState('');
    const [searchBy, setSearchBy] = useState('all');
    const [users, setUsers] = useState([]);
    const [roleFilter, setRoleFilter] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [tipBarMsg, setTipBarMsg] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10); // Number of users per page

    const handleSearchByChange = (event) => {
      console.log(event.target.value);
      setSearchBy(event.target.value);
    };

    const handleSearchChange = event => {
      setSearchQuery(event.target.value);
    };
  
    const handleRoleFilterChange = (event) => {
      console.log(event.target.value);
      setRoleFilter(event.target.value);
    }

    const updateRole = async (username, newrole) => {
      console.log(username, newrole);
      const dataKey = config.serverAddr + `v1/updateRole`;
        try {
            const resp = await fetchJson(dataKey, {
                method: 'PUT',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "username": username,
                  "newrole" : newrole,
                }),
            });
            console.log(resp);
            setTipBarMsg(`${resp.data.username} is updated to ${resp.data.role} role`);
        } catch (error) {
            console.error('An unexpected error happened:', error);
            setTipBarMsg(`Server error! Please try again later!`);
        }
    }

    useEffect(() => {
        console.log(searchBy, searchQuery, roleFilter, currentPage);
        async function fetchData() {
          let queryParams = `searchBy=${searchBy}`;
          if (searchQuery !== '') {
            queryParams += `&searchQuery=${searchQuery}`;
          }
          if (roleFilter !== '') {
            queryParams += `&role=${roleFilter}`;
          }
          queryParams += `&limit=${usersPerPage}`;
          queryParams += `&offset=${(currentPage - 1) * usersPerPage}`;
  
          try {
              const usersData = await fetchJson(config.serverAddr + `v1/list?${queryParams}`, {
                method: 'GET',
                credentials: "include",
              });
              console.log(usersData);
              console.log(usersData.data.totalCount);
              setUsers(usersData.data.users);
          }
          catch(error) {
            if (error instanceof FetchError) {
                setErrorMsg(error.message);
            } else {
                console.error('An unexpected error happened:', error)
                setErrorMsg(error.message);
             }
          }
        } 
        fetchData();
    }, [searchBy, searchQuery, roleFilter, currentPage, tipBarMsg]);

    if (errorMsg) {
        return (
          <AuthContext.Provider value={user}>
            <PageContext.Provider value={sidebarData}>
              <Layout>
                <h3>Server Error: {errorMsg}</h3>
              </Layout>
            </PageContext.Provider>
          </AuthContext.Provider>
        )
    }

    return (
      <AuthContext.Provider value={user}>
        <PageContext.Provider value={sidebarData}>
          <Layout>
              <div>
                {tipBarMsg && <TipBar message={tipBarMsg} onClose={() => setTipBarMsg(null)}/>}
                <p>Welcome to dashboard page {user.username}</p>
                <div className={styles.userPageList}>
                  <div className={styles.searchbarContainer}>
                    <h4>Search By</h4>
                    <div className={styles.dropdown}>

                      <select value={searchBy} 
                              onChange={handleSearchByChange}
                              className={styles.dropbtn}>

                          <option value="all" className={styles.dropdownContent}>ALL</option>
                          <option value="username" className={styles.dropdownContent}>NAME</option>
                          <option value="email" className={styles.dropdownContent}>EMAIL</option>
                      </select> 
                    </div>
                    <input
                        type="text"
                        placeholder="Search users"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className={styles.searchInput}
                    />
                  </div>
                  <div className={styles.filters}>
                      <h4>Filters</h4>
                      <div className={styles.filter}>
                        <p className={styles.filterName}>Role</p>
                        <select
                          value={roleFilter}
                          onChange={handleRoleFilterChange}
                          className={`${styles.dropbtn}  ${styles.filterDropDown}`}
                        >
                          <option value="" className={styles.dropdownContent}>None</option>
                          <option value="root" className={styles.dropdownContent}>Root</option>
                          <option value="admin" className={styles.dropdownContent}>Admin</option>
                          <option value="user" className={styles.dropdownContent}>User</option>
                        </select> 
                      </div>
                  </div>
                  <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                          <tr>
                            <th className={styles.th}>Avatar</th>
                            <th className={styles.th}>Username</th>
                            <th className={styles.th}>Email</th>
                            <th className={styles.th}>Role</th>
                            <th className={styles.th}>Promote</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((u1, index) => (
                            <tr key={index}>
                              <td className={styles.td}>
                                <Image 
                                  src={u1.avatarUrl !== null ? u1.avatarUrl : "/default_user.png"} 
                                  width={24}
                                  height={24}
                                  style={{ borderRadius: '50%', overflow: 'hidden'}}
                                  alt='user_photo'
                                  />
                              </td>
                              <td className={styles.td}>{u1.username}</td>
                              <td className={styles.td}>{u1.email}</td>
                              <td className={styles.td}>{u1.role}</td>
                              <td className={styles.td}>
                                <div>
                                  {(u1.role === 'user' && (
                                    <button className={styles.promote} onClick={() => {
                                      updateRole(u1.username, 'admin')
                                    }}>Promote</button>
                                  ))}

                                  {
                                    (user.role === 'root' && u1.role === 'admin' && (
                                      <button className={styles.depromote} onClick={() => {
                                        updateRole(u1.username, 'user')
                                      }}>Depromote</button>
                                    ))
                                  }
                                </div>   
                              </td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                  </div>
                </div>
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