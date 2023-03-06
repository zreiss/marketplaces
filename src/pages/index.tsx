import Head from "next/head";

import {type NextPage} from "next";
import {getSession} from "next-auth/react";
import { GetServerSidePropsContext } from 'next';
import initializeBasicAuth from 'nextjs-basic-auth'
const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Zreiss Marketplaces</title>
                <meta name="description" content="Lots of sales"/>
                <link rel="shortcut icon" href='https://s3.amazonaws.com/magento-luzerne/zreiss/zreiss-icon-transparent.png' type='image/x-icon'/>
            </Head>
            <main>
                <h1>HI</h1>
            </main>
        </>
    );
};

export default Home

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const session = await getSession(context)
    const users = [
        { user: 'moshiach', password: 'now' },
        { user: 'yechi', password: 'hamelech' },
    ]
    const basicAuthCheck = initializeBasicAuth({
        users: users
    })
    const {req, res} = context

    await basicAuthCheck(req, res)

    if (!session) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            },
        }
    }

    return {
        props: { session }
    }
}
