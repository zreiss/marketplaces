import Link from 'next/link';
import {NextPage} from 'next';
import {api} from "~/utils/api";
import {useRouter} from 'next/router';
import {useSession} from "next-auth/react";

const MarketplaceDetailsPage: NextPage = () => {
    const router = useRouter();
    const {id} = router.query;

    const {data: sessionData} = useSession();

    const {data: marketplace, isLoading, error} =
        api.marketplaces
            .get
            .useQuery(
                {id: parseInt(id as string)},
                {
                    enabled: sessionData?.user !== undefined,
                }
            );

    if (error) return <div>Error</div>;
    if (isLoading) return <div>Loading...</div>;

    if (!id) return null;

    return (
        <>
            <h1>Marketplace {id}</h1>
            <pre>{JSON.stringify(marketplace, null, 2)}</pre>
            <Link href={`/marketplaces/${id.toString()}/edit`}>
                Edit this marketplace
            </Link>
        </>
    );
};

export default MarketplaceDetailsPage;