import Link from 'next/link';
import {api} from "~/utils/api";
import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useSession} from "next-auth/react";

const EditMarketplacePage: NextPage = () => {
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
            <h1>Edit Marketplace {id}</h1>
            <pre>{JSON.stringify(marketplace, null, 2)}</pre>
            <Link href={`/marketplaces/${id.toString()}`}>
                Back to marketplaces!
            </Link>
        </>
    );
}

export default EditMarketplacePage;
