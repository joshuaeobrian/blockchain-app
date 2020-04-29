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
import {BlockValue} from "../BlockList/BlockList";
import {IBlock} from "../block";

export const getTime = (time: number) => time && new Date(time*1000).toLocaleString(undefined, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
});

/**
 * @description renders the details of a single block
 */
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
            getLatestBlock().then(block =>
                getBlockInfo(block.hash));
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
                <div className="block__details_summary">
                    <BlockValue title={"Hash"}>{currentBlock.hash}</BlockValue>
                    <BlockValue title={"Time"}>{getTime(currentBlock.time)}</BlockValue>
                    <BlockValue title={"Received Time"}>{getTime(currentBlock.received_time)}</BlockValue>
                    <BlockValue title={"Relayed By"}>{currentBlock.relayed_by}</BlockValue>
                    <BlockValue title={"Block Index"}>{currentBlock.block_index}</BlockValue>
                    <BlockValue title={"Block Size"}>{currentBlock.size}</BlockValue>
                    <BlockValue title={"Previous Block"}>
                        <Link to={`/block/${currentBlock.prev_block}`}>
                            {currentBlock.prev_block}
                        </Link>
                    </BlockValue>
                    <BlockValue title={"Number of Transactions"}>{currentBlock.n_tx}</BlockValue>
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
