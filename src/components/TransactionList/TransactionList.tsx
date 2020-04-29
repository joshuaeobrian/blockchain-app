import React, {useState} from "react";
import "./TransactionList.scss";
import {Button} from "../Button/Button";
import ContentSection from "../ContentSection/ContentSection";

export interface ITransaction {
    hash: string;
    ver: number;
    vin_sz: number;
    vout_sz: number;
    size: number;
    weight: number;
    fee: number;
    relayed_by: string;
    lock_time: number;
    tx_index: number;
    double_spend: boolean;
    result: number;
    balance: number;
    time: number;
    block_index: number;
    block_height: number;
}

/**
 * @description renders a Transaction which has the ability to be toggled
 * to see the details of it
 * @param {ITransaction} props
 */
export const Transaction: React.FC<ITransaction> = (props) => {
    const [showDetails, setShowDetails] = useState(false);
    const handleClick = () => setShowDetails(!showDetails);
    return (
        <div className="transaction">
            <div className="transaction__summary">
                <h4 className="transaction__summary_hash">Hash: {props.hash}</h4>
                <Button type={"primary"} onClick={handleClick}>View</Button>
            </div>
            {showDetails && (
                <ContentSection title={"Details:"}>
                    <div className="transaction__details">
                        <div>Block Height: {props.block_height}</div>
                        <div>Time: {props.time}</div>
                        <div>Lock Time: {props.lock_time}</div>
                        <div>Relayed By: {props.relayed_by}</div>
                        <div>Fee: {props.fee}</div>
                        <div>Balance: {props.balance}</div>
                        <div>Size: {props.size}</div>
                        <div>Weight: {props.weight}</div>
                        <div>Result: {props.result}</div>
                    </div>
                </ContentSection>
            )}
        </div>
    );
};

type Transactions = { transactions: ITransaction[] };
/**
 * @description generates a list of all transactions provided
 * @param {Transactions} transactions
 */
const TransactionList: React.FC<Transactions> = ({transactions}) => {
    return (
        <div className="transaction__list">
            {transactions.map(transaction => {
                return (<Transaction key={transaction.hash} {...transaction}/>);
            })}
        </div>
    );
};

export default TransactionList;
