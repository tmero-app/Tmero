import React from 'react';
import Layout from "../components/layout/Layout";
import PageTitle from "../components/sections/PageTitle";
import CountdownOne from '../components/sections/CountdownOne';

export default function Home() {

    return (
        <>
            <Layout HeaderStyle="one">
                <PageTitle pageName="Coming Soon" />
                <CountdownOne />
            </Layout>
        </>
    )
}
