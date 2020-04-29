import * as React from "react";
import {Link} from "react-router-dom";
import "./Button.scss";
interface IButton {
    type?: "primary" | "secondary";
    disabled?: boolean;
    solid?: boolean;
    onClick(): void;
}
export const Button: React.FC<IButton> = ({children, type, onClick, disabled}) => {
    return (
        <button className={`btn${type? ` btn-${type}`: ''}`}
                onClick={onClick}
                disabled={disabled}
        >
            {children}
        </button>
    );
};

export const LinkButton: React.FC<{to: string, className?: string}> = (props) => {
    return (
        <Link {...props} className={`btn${props.className? ' '+ props.className: ''}`}>
            {props.children}
        </Link>
    );
};
