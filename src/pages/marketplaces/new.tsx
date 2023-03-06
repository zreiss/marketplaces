import { NextPage } from 'next';
import Link from 'next/link';

const NewMarketplacePage: NextPage = () => {
    // handle form submission and create the new marketplace
    // ...

    return (
        <>
            <h1>Create a new marketplace</h1>
            {/* display the new marketplace form */}
            {/* ... */}
            <button type="submit">Create</button>
            <Link href="/marketplaces">
                <a>Cancel</a>
            </Link>
        </>
    );
};

export default NewMarketplacePage;