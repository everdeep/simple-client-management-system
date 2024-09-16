import React, { useEffect, useState } from 'react';

import './Application.scss';
import { ClientTable } from '../Clients/ClientTable';
import ClientFormDialog from '../Clients/ClientFormDialog/ClientFormDialog';

const Application: React.FC = () => {
    const [darkTheme, setDarkTheme] = useState(true);

    /**
     * On component mount
     */
    useEffect(() => {
        const useDarkTheme = parseInt(localStorage.getItem('dark-mode'));
        if (isNaN(useDarkTheme)) {
            setDarkTheme(true);
        } else if (useDarkTheme == 1) {
            setDarkTheme(true);
        } else if (useDarkTheme == 0) {
            setDarkTheme(false);
        }
    }, []);

    /**
     * On Dark theme change
     */
    useEffect(() => {
        if (darkTheme) {
            localStorage.setItem('dark-mode', '1');
            document.body.classList.add('dark-mode');
        } else {
            localStorage.setItem('dark-mode', '0');
            document.body.classList.remove('dark-mode');
        }
    }, [darkTheme]);

    /**
     * Toggle Theme
     */
    function toggleTheme() {
        setDarkTheme(!darkTheme);
    }

    return (
        <div id='app'>
            <header>
                <h1>Client Management</h1>
                <nav>
                    <ClientFormDialog />
                </nav>
            </header>
            <div className='content'>
                <ClientTable />
            </div>
        </div>
    );
};

export default Application;
