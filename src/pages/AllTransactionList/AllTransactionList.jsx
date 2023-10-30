import React from 'react';
import './AllTransactionList.scss'
import Header from '../../components/header/header';
import useReaderHook from '../../hooks/useReaderHook';

function AllTransactionList() {
    const { allTransactions } = useReaderHook();

    return (
        <>
            <Header />
            <div className='user-container'>
                <h1>Transactions</h1>
                {allTransactions?.map((transaction, index) => (
                    <div className='trans-user-block' key={index}>
                        <div><h4>Name: </h4>{transaction?.reader?.reader_name}</div>
                        <div className='user-items'>
                            {transaction?.bought_books?.map((book, innerIndex) => (
                                <div className='trans-card' key={innerIndex}>
                                    <div className='trans-img-container'>
                                        <img src={book?.id?.image}></img>
                                    </div>
                                    <div className='info'>
                                        <h4>Book</h4>
                                        <div>{book?.id?.title}</div>
                                        <div>{book?.id?.author}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='price'><h4>Total spent: </h4>{transaction?.total_spent}</div>
                        <div>{transaction?.date}</div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default AllTransactionList;
