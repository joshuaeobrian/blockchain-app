export interface IBlock {
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

export interface IBlockListBlock {
    height: number;
    hash: string;
    time: number;
    main_chain: boolean;
}

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

export type Transactions = { transactions: ITransaction[] };
