import React, { useEffect } from 'react';
import Notices from '../components/Notices';

function News() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ paddingTop: '80px' }}>
            <Notices />
        </div>
    );
}

export default News;
