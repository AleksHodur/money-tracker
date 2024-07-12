import { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";

function TransactionForm({ uid }) {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const { addDocument, response } = useFirestore('transactions'); //we pass the name of the collection

    const handleSubmit = (e) => {
        e.preventDefault();
        addDocument({
            uid,
            name,
            amount
        });
    }

    useEffect(() => {
        if(response.success){
            setName('');
            setAmount('');
        }
    }, [response.success]);

    return ( 
        <>
            <h3>Add a transaction</h3>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction name:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>

                <label>
                    <span>Amount (€):</span>
                    <input
                        type="number"
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                </label>

                <button>Add transaction</button>
            </form>
        </>
     );
}

export default TransactionForm;