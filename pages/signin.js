import Reload from "../components/reload";
import styles from "../styles/SignIn.module.css"
import Head from "next/head";
import { useState } from "react";

export default function SignIn() {

    const [formData, setFormData] = useState({
        userId: '',
        password: '',
    });

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

    const onSubmit = (e) => {
        console.log(e.target);

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
                                <label className={styles.label}>Email (or) Username</label>
                                <input type="text"
                                        className={styles.input}
                                        id="userId"
                                        name="userId"
                                        value={formData.emailAddr}
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