import React, { useContext, useState } from 'react';
import styles from '../styles/Sidebar.module.css'; // Import your CSS file for styling
import { AuthContext, PageContext } from '../contexts/context';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { redirect } from 'next/dist/server/api-utils';

export default function() {
    
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    const user = useContext(AuthContext);
    const page = useContext(PageContext);
    const router = useRouter();

    if (isOpen) {
        return (
            <div className={styles.sidebar}>
                {/* Sidebar Header */}
                <div className={styles.sidebarHeader}>
                    <h2>Admin Panel</h2>
                    <div className={styles.menuIcon} onClick={toggleSidebar}>
                        ☰
                    </div>
                </div>

                <hr className={styles.sidebarDivider} />

                {/* Sidebar Navigation */}
                <ul className={styles.sidebarNavigation}>
                    <li className={page.name === 'home' ? styles.active : ''} 
                        onClick={() => {
                            console.log("redirecting home");
                            router.push('/');
                        }}>
                            Home
                    </li>
                    <li className={page.name === 'dashboard' ? styles.active : ''}
                        onClick={() => {
                            console.log("redirecting dashboard");
                            router.push('/dashboard');
                        }}>
                            Dashboard
                    </li>
                    <li className={page.name === 'invite' ? styles.active : ''}
                        onClick={() => {
                            console.log("redirecting invite");
                            router.push('/invite');
                        }}>
                            Invite
                    </li>
                    {/* Add more navigation items here */}
                </ul>

                <hr className={styles.sidebarDivider} />

                {/* Sidebar Footer */}
                <div className={styles.sidebarFooter}>
                    <Image 
                        src={user.avatarUrl !== undefined ? user.avatarUrl : "/default_user.png"} 
                        width={24}
                        height={24}
                        style={{ borderRadius: '50%', overflow: 'hidden'}}
                        alt='user_photo'
                        />
                    <h3> {user.username} </h3>
                </div>
            </div>
        )
    }
    
    return (
        <div className={styles.sideBarNotOpen} onClick={toggleSidebar}>
            <div className={styles.menuIconNotOpen}>
                ☰
            </div>
        </div>
    )

};

// export default Sidebar;
