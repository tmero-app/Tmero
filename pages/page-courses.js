import React from 'react';
import Layout from "../components/layout/Layout";
import PageTitle from "../components/sections/PageTitle";
import CoursesInner from "../components/sections/CoursesInner";

export default function Home() {

    return (
        <>
            <Layout HeaderStyle="one">
                <PageTitle pageName="Courses" />
                <CoursesInner />
            </Layout>
        </>
    )
}
