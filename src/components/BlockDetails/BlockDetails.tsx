import React, {useState, useEffect} from "react";
import "./BlockDetails.scss";
import {
    Switch, Route, useParams, useRouteMatch, Link
} from "react-router-dom";
import {getLatestBlock, getSingleBlock} from "../../services/blockchain_data.service";
import ContentSection from "../ContentSection/ContentSection";
import TransactionList from "../TransactionList/TransactionList";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";

interface IBlock {
    hash: string;
    ver: number;
    prev_block: string;
    mrkl_root: string;
    time: number;
    bits: number;
    nonce: number;
    n_tx: number;
    size: number;
    block_index: number;
    main_chain: boolean;
    height: number;
    received_time: number;
    relayed_by: string;
    tx: any[];
}

const BlockDetails: React.FC = () => {
    const {blockHash} = useParams();
    const isLatest = blockHash === "latest";
    const [currentBlock, setCurrentBlock] = useState<IBlock>({} as IBlock);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        setLoading(true);
        const getBlockInfo = (hash: string) => getSingleBlock(hash)
            .then(block =>{
                setCurrentBlock(block);
                setLoading(false);
                setCurrentPage(block.n_tx > 0? 1 : 0);
            });
        if (isLatest) {
            getLatestBlock().then(block => getBlockInfo(block.hash));
        } else {
            getBlockInfo(blockHash);
        }

    }, [blockHash, isLatest]);

    if (loading) {
        return <Loading/>;
    }
    const perPage = 10;
    const pages = Math.ceil(currentBlock.n_tx / perPage);
    const transactions = currentBlock.tx.slice(currentPage, currentPage + perPage);
    return (
        <div className="block__details">
            <ContentSection title={"Block Details:"}>
                <h4 className="block__details__header_hash">Hash: {currentBlock.hash}</h4>
                <div className="block__details_summary">
                    <div>Time: {currentBlock.time}</div>
                    <div>Relayed By: {currentBlock.relayed_by || "unknown"}</div>
                    <div>Received Time: {currentBlock.received_time || "unknown"}</div>

                    <div>Block Index: {currentBlock.block_index}</div>
                    <div>Block Size: {currentBlock.size}</div>
                    <div>Previous Block:
                        <Link to={`/block/${currentBlock.prev_block}`}>{currentBlock.prev_block}</Link>
                    </div>
                    <div>Number of Transactions: {currentBlock.n_tx}</div>
                </div>
            </ContentSection>
            <ContentSection title={"Transactions:"} appendToHeader={(
                <Pagination onClick={setCurrentPage} current={currentPage} pages={pages}/>
            )}>
                <TransactionList transactions={transactions}/>
            </ContentSection>
        </div>
    );
};

const Block: React.FC = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:blockHash`}>
                <BlockDetails/>
            </Route>
            <Route path={match.path}>
                <div className="unknown__block">Please select a valid block.</div>
            </Route>
        </Switch>
    );
};

export default Block;
