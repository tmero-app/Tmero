import React from 'react';
import Layout from "../components/layout/Layout";
import PageTitle from "../components/sections/PageTitle";
import BlogInner from "../components/sections/BlogInner";

export default function Home() {

    return (
        <>
            <Layout HeaderStyle="one">
                <PageTitle pageName="News" />
                <BlogInner />
            </Layout>
        </>
    )
}
