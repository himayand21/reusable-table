import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from "react-router-dom";
import Table from './Table';

export const FundDetails = () => {
    const [fundDetails, setFundDetails] = useState();
    const { fundId } = useParams();

    const getFundDetails = async (fundId) => {
        const response = await fetch(`https://api.kuvera.in/api/v3/funds/${fundId}.json`);
        const responseJSON = await response.json();
        setFundDetails(responseJSON);
    }

    useEffect(() => {
        getFundDetails(fundId);
    }, [fundId]);

    if (!fundDetails) return <div>Loading...</div>;
    return (
        <Fragment>
            <h1>Fund Details</h1>
            <Table
                data={fundDetails}
                columns={[
                    {
                        header: "Code",
                        key: "code",
                        accessor: d => d.code,
                    },
                    {
                        header: "Name",
                        key: "name",
                        accessor: d => d.name
                    },
                    {
                        header: "Lump available",
                        key: "lumpAvail",
                        accessor: d => d.lump_available
                    },
                    {
                        header: "SIP Available",
                        key: "sipAvail",
                        accessor: d => d.sip_available
                    },
                    {
                        header: "Instant",
                        key: "instant",
                        accessor: d => d.instant
                    },
                    {
                        header: "Fund Type",
                        key: "type",
                        accessor: d => d.fund_type
                    },
                    {
                        header: "Fund Category",
                        key: "category",
                        accessor: d => d.fund_category
                    },
                    {
                        header: "Plan",
                        key: "plan",
                        accessor: d => d.plan
                    }
                ]}
            />
        </Fragment>
    )
}
