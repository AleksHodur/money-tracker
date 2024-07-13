import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    /* This is done so the the ueEffect doesn't trigger each time query
    is mounted on its own component, avoiding infinite loops */
    const query = useRef(_query).current;

    // fires whenever the collection changes
    useEffect(() => {
        let ref = projectFirestore.collection(collection);

        if(query){
            ref = ref.where(...query);
        }

        // real-time subscription
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

    }, [collection, query]); //all outside variables must be dependencies

    return { documents, error };

}