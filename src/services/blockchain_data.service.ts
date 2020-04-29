import axios from "axios";

export const blockChainData = axios.create({
    baseURL: "https://blockchain.info/"
});

/**
 * @description makes the call to the Block Chain api and adds Cors true then
 * trims out the data from the response
 * @param { string }url
 * @param { [key:string]: any } params
 */
const getFromBlockChainData = (url: string, params: {[key: string]: any} = {}) =>
    blockChainData.get(url, {
        params: {
            cors: "true",
            ...params
        }
    }).then(rs => rs.data);

/**
 * @description gets the brief summary of the latest block
 * @return {hash: string, time: number, height: number}
 */
export const getLatestBlock = () => getFromBlockChainData("/latestblock");

/**
 * @description Makes a call to api to return a single block based of hash
 * @param {string} blockHash
 * @return Promise<>
 */
export const getSingleBlock = (blockHash: string) => getFromBlockChainData(`/rawblock/${blockHash}`);

/**
 * @description gets a list of all the blocks
 * @return Promise<{ blocks: [] }>
 */
export const getBlockList = () => getFromBlockChainData('/blocks?format=json').then(rs => rs.blocks);
