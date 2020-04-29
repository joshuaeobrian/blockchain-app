import * as React from "react";
import "./ContentSection.scss";

export interface IContentSection {
    title: string;
    appendToHeader?: any;
}

/**
 * @description renders a content section with a header which you can append elements and pass children
 * @param title
 * @param children
 * @param appendToHeader
 */
const ContentSection: React.FC<IContentSection> = ({title, children, appendToHeader = null}) =>{
    return (
        <div className="content__section">
            <div className="content__section__header">
                <h3 className="content__section__header_title">{title}</h3>
                {appendToHeader}
            </div>

            <div>
                {children}
            </div>
        </div>
    );
};

export default ContentSection;
