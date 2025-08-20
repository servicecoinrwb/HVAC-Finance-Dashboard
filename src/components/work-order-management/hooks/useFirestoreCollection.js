import { useState, useEffect } from 'react';
import { getCollectionListener } from '../../services/firestore';

const useFirestoreCollection = (db, userId, collectionName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId || !db) return;

        setLoading(true);
        const unsubscribe = getCollectionListener(db, userId, collectionName, (fetchedData) => {
            setData(fetchedData);
            setLoading(false);
        });

        // Cleanup function
        return () => unsubscribe();
    }, [db, userId, collectionName]);

    return { data, loading };
};

export default useFirestoreCollection;