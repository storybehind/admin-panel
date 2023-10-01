import Head from "next/head";
import styles from "../styles/SignUp.module.css"
import { useState } from "react";
import Reload from "../components/reload";
import useSWR from "swr";
import config from "../config";
import { useRouter } from 'next/router';
import Link from "next/link";


export default function SignUp() {

    const [formData, setFormData] = useState({
        emailAddr: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        console.log(e.target);
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name] : value,
        })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg(null);
        console.log("FormData: ", formData);
        if (formData.password !== formData.confirmPassword) {
            setErrorMsg("Passwords don't match");
            setIsLoading(false);
            return;
        }
        console.log("Sending data to server: ", formData);
        
        const dataKey = config.serverAddr + "v1/signup";
        fetch(dataKey, {
            method: 'POST',
            cache: 'no-cache',
            // credentials: 'same-origin',
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin':'*',
                // 'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS',
                // 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
            body: JSON.stringify({
                "emailAddress": formData.emailAddr,
                "username" : formData.username,
                "password" : formData.password,
            }),
        }).then(async (response) => {
            // console.log(response);
            // if (!response.ok) {
            //     throw new Error('Network response was not ok! Please try again later');
            // }
            const resp = await response.json();
            console.log(resp);
            if (response.status === 409) {
                switch (resp.errorCode) {
                    case 1:
                        throw new Error('Email is already registered');
                    case 2 : 
                        throw new Error('Username is already taken');
                    default:
                        console.error('Unknown errorCode');
                }

            }
            if (response.status === 500) {
                throw new Error('Server Error! Please try again later');
            }
            return resp;
        }).then((data) => {
            console.log(data);

        }).catch((error) => {
            console.log(error);
            setErrorMsg(JSON.stringify(error.message)) 
        }).finally(() => {
            setIsLoading(false);
        })

        // console.log(response);
        // if (response.status === 201) {
        //     router.push('/home');
        // }
        // else if (response.status === 500) {
        //     setErrorMsg('server error! please try again later')
        // }
        // else if (response.status === 409) {
        //     if (response.body.errorCode === 1) {
        //         setErrorMsg('Email already exists');
        //     }
        //     else if (response.body.errorCode === 2) {
        //         setErrorMsg('Username already taken');
        //     }
        // }
        // setIsLoading(false);
    }

    return (
        <div>
            <Head>
                <title>Create Account</title>
            </Head>
            <main>

                {isLoading ? <Reload /> : 

                <>
                    {/* <h1 className={styles.title}>
                        Welcome to Brucheion
                    </h1> */}
                    <div className={styles.card}>
                        <h3>Create Brucheion Account</h3>
                        <form onSubmit={onSubmit}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Email</label>
                                <input type="text"
                                        className={styles.input}
                                        id="emailAddr"
                                        name="emailAddr"
                                        value={formData.emailAddr}
                                        onChange={handleChange}
                                        // placeholder="Enter Your Email Address"
                                        required>
                                </input>
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Username</label>
                                <input type="text"
                                        className={styles.input}
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        // placeholder="Enter Your Email Address"
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
                                        // placeholder="Enter Your Email Address"
                                        required>
                                </input>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Confirm Password</label>
                                <input type="password"
                                        className={styles.input}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        // placeholder="Enter Your Email Address"
                                        required>
                                </input>
                            </div>

                            {
                                errorMsg  && (<p className={styles.errorMsg}> {errorMsg} </p>)
                            }

                            <button className={styles.submitButton} type="submit">Sign Up</button>
                        </form>

                        <div className={styles.line}></div>

                        <div className={styles.signIn}>
                            Already on Brucheion? <Link href="/signin">Sign In</Link>
                        </div>
                    </div>
                </>
            }
            </main>
        </div>
    )
}
