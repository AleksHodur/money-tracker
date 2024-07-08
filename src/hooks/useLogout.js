import { useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(null);
    const { dispatch } = useAuthContext();

    console.log('This is useLogout');
    const logout = async () => {
        setError(null);
        setIsPending(true);

        try{

            await projectAuth.signOut();

            //dispatch logout action
            dispatch({type: 'LOGOUT'});

            setError(null);

        }catch(err){
            console.log(err.message);
            setError(err.message);

        }finally{
            setIsPending(false);
        }

    }

    return { logout, error, isPending };
}