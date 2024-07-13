import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    // fires whenever the collection changes
    useEffect(() => {
        let ref = projectFirestore.collection(collection);

        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            });

            setDocuments(results);
            setError(null);
        }, (error) => {
            console.log(error);
            setError('could not fetch the data');;
        });

        // unsubscribe on unmount: so when we exit the page, this cycle stops
        return () => unsubscribe();

    }, [collection]);

    return { documents, error };

}