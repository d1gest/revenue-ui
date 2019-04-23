import * as React from "react";


interface Props {
    revenue: number;
}

export const RevenueOut: React.FunctionComponent<Props> = (props) => {
    return (
        <div>
            <label htmlFor="result">Revenue (₽) </label>
            <output className={props.revenue >= 0 ? 'green' : 'red'} name="result">{props.revenue}</output>
        </div>
    );
};