import Reload from "../components/reload";
import styles from "../styles/SignIn.module.css"
import Head from "next/head";
import { useState } from "react";
import useUser from '../lib/useUser';
import fetchJson, {FetchError} from "../lib/fetchJson";
import config from "../config";
import { User } from "../types/user";

export default function SignIn() {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { mutateUser } = useUser({
        redirectTo: '/',
        redirectIfFound: true,
    })

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleChange = (e) => {
        console.log(e.target);
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name] : value,
        })
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(event.target);

        setIsLoading(true);
        const dataKey = config.serverAddr + `v1/signin?username=${formData.username}&password=${formData.password}`;
        try {
            const resp = await fetchJson(dataKey, {
                method: 'GET',
                // cache: 'no-cache',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(resp);
            if (resp.data.isAuthenticated === true) {
                mutateUser(new User(true, resp.data.username));
            } else {
                setErrorMsg('Invalid Credential');
            }
        } catch (error) {
            if (error instanceof FetchError) {
                if (error.response.status === 409) {
                    setErrorMsg('Invalid Username');
                } else if (error.response.status === 500) {
                    setErrorMsg('Server Error! Please try again later');
                } else if (error.response.status === 401) {
                    console.debug("unauthorized");
                    setErrorMsg('Unauthorized');
                }
            } else {
                console.error('An unexpected error happened:', error)
            }
        }
        setIsLoading(false);
    };

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>

            <main>
                {isLoading ? <Reload/> : 
                
                <>
                    <div className={styles.card}>
                        <h3>Sign In</h3>
                        <form onSubmit={onSubmit}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Username</label>
                                <input type="text"
                                        className={styles.input}
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required>
                                </input>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Password</label>
                                <input type="password"
                                        className={styles.input}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required>
                                </input>
                            </div>

                            {
                                errorMsg  && (<p className={styles.errorMsg}> {errorMsg} </p>)
                            }

                            <button className={styles.submitButton} type="submit">Sign In</button>
                        </form>
                    </div>
                </>
                }
            </main>
        </div>
    )
}