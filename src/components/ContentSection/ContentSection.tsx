import * as React from "react";
import "./ContentSection.scss";

export interface IContentSection {
    title: string;
    appendToHeader?: any;
}
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
}

export default ContentSection;
