import React, {useState, useEffect} from "react";
import "./BlockList.scss";
import {getBlockList} from "../../services/blockchain_data.service";
import {Link, useLocation} from "react-router-dom";
import {LinkButton} from "../Button/Button";
import {IBlockListBlock} from "../block";

/**
 * @description generates the sub headers for Block List item
 * @param props
 */
export const BlockValue: React.FC<{ title: string }> = (props) => {
    return (
        <h4 className="block__list__block_value">
            {props.title}: <span className="block_value_text">{props.children}</span>
        </h4>
    );
};

/**
 * @description Creates a Block Link component with little description about the block.
 * If clicked it then routes to the block
 * @param height
 * @param hash
 * @param time
 */
export const Block: React.FC<IBlockListBlock> = ({height, hash, time}) => {
    const location = useLocation();
    const isActive = location.pathname.includes(hash);
    return (
        <Link className={`block__list__block${isActive ? " active" : ""}`} to={`/block/${hash}`}>
            <BlockValue title={"Hash"}>{hash}</BlockValue>
            <BlockValue title={"Height"}>{height}</BlockValue>
            <BlockValue title={"Time"}>{time}</BlockValue>
        </Link>
    );
};

/**
 * @description Renders a list of Blocks returned from /blocks?format=json
 */
const BlockList: React.FC = () => {
    const [blockList, setBlockList] = useState<IBlockListBlock[]>([]);
    useEffect(() => {
        getBlockList().then(list => setBlockList(list));
    }, []);
    return (
        <div>
            <div className="block__list__header">
                <h3 className="header__title">Blocks</h3>
                <LinkButton to={"/block/latest"}>
                    View Latest
                </LinkButton>
            </div>
            <div className="block__list">
                {blockList.map((block, i) => {
                    return (
                        <Block key={block.hash} {...block}/>
                    );
                })}
            </div>
        </div>
    );
};

export default BlockList;
