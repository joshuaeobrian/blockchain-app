import React, {useState} from "react";
import "./TransactionList.scss";
import {Button} from "../Button/Button";
import ContentSection from "../ContentSection/ContentSection";
import {ITransaction, Transactions} from "../block";
import { BlockValue } from "../BlockList/BlockList";
import {getTime} from "../BlockDetails/BlockDetails";

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
                <BlockValue title={"Hash"}>{props.hash}</BlockValue>
                <Button type={"primary"} onClick={handleClick}>View</Button>
            </div>
            {showDetails && (
                <ContentSection title={"Details:"}>
                    <div className="transaction__details">
                        <BlockValue title={"Block Height"}>{props.block_height}</BlockValue>
                        <BlockValue title={"Time"}>{getTime(props.time)}</BlockValue>
                        <BlockValue title={"Lock Time"}>{getTime(props.lock_time)}</BlockValue>
                        <BlockValue title={"Relayed By"}>{props.relayed_by}</BlockValue>
                        <BlockValue title={"Fee"}>{props.fee}</BlockValue>
                        <BlockValue title={"Balance"}>{props.balance}</BlockValue>
                        <BlockValue title={"Size"}>{props.size}</BlockValue>
                        <BlockValue title={"Weight"}>{props.weight}</BlockValue>
                        <BlockValue title={"Result"}>{props.result}</BlockValue>
                    </div>
                </ContentSection>
            )}
        </div>
    );
};

/**
 * @description generates a list of all transactions provided
 * @param {Transactions} transactions
 */
const TransactionList: React.FC<Transactions> = ({transactions}) => {
    return (
        <div className="transaction__list">
            {transactions.map((transaction: ITransaction) => {
                return (<Transaction key={transaction.hash} {...transaction}/>);
            })}
        </div>
    );
};

export default TransactionList;
