import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(null);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        try{

            await projectAuth.signOut();

            //dispatch logout action
            dispatch({type: 'LOGOUT'});

            if(!isCancelled){
                setError(null);
            }

        }catch(err){
            if(!isCancelled){
                console.log(err.message);
                setError(err.message);
            }

        }finally{
            if(!isCancelled){
                setIsPending(false);
            }
        }

    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { logout, error, isPending };
}