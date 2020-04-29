import React from "react";
import "./Pagination.scss";
import {Button} from "../Button/Button";

interface IPagination {
    onClick: (num: number) => void;
    current: number;
    pages: number;
    position?: "left" | "center" | "right";
}

/**
 *
 * @param current
 * @param pages
 * @param onClick
 */
const Pagination: React.FC<IPagination> = ({current, pages, onClick}) => {
    const handlePrev = () => onClick(current - 1);
    const handleNext = () => onClick(current + 1);
    return (
        <div className="pagination">
            <Button onClick={handlePrev} type="secondary" disabled={current <=1}>Prev</Button>
            <span>{current} of {pages}</span>
            <Button onClick={handleNext} type="secondary" disabled={pages === current}>Next</Button>
        </div>
    );
};

export default Pagination;
