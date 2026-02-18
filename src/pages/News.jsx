import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Notices from '../components/Notices';

function News() {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <div style={{ paddingTop: '80px' }}>
            <Notices singleNoticeId={id} />
        </div>
    );
}

export default News;
