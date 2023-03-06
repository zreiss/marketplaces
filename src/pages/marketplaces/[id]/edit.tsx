import Link from 'next/link';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const EditMarketplacePage: NextPage = () => {
    const router = useRouter();
    const {id} = router.query;

    if (!id) return null;

    return (
        <>
            <h1>Edit Marketplace {id}</h1>
            {/* display the marketplace details */}
            {/* ... */}
            <Link href={`/marketplaces/${id.toString()}`}>
                Back to marketplaces!
            </Link>
        </>
    );
}

export default EditMarketplacePage;
