import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    /* This is done so the the ueEffect doesn't trigger each time query
    is mounted on its own component, avoiding infinite loops */
    const query = useRef(_query).current;
    const orderBy = useRef(_orderBy).current;

    // fires whenever the collection changes
    useEffect(() => {
        let ref = projectFirestore.collection(collection);

        if(query){
            ref = ref.where(...query);
        }

        if(orderBy){
            ref = ref.orderBy(...orderBy);
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

    }, [collection, query, orderBy]); //all outside variables must be dependencies

    return { documents, error };

}