import Link from 'next/link';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const MarketplaceDetailsPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    if(!id) return null;

    return (
        <>
            <h1>Marketplace {id}</h1>
            <Link href={`/marketplaces/${id.toString()}/edit`}>
                Edit this marketplace
            </Link>
        </>
    );
};

export default MarketplaceDetailsPage;