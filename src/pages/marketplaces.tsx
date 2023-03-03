import Link from "next/link";
import {api} from "~/utils/api";
import {Button} from "@chakra-ui/react";
import {useSession} from "next-auth/react";

const MarketplacesPage = () => {
    // const utils = api.useContext();
    const {data: sessionData} = useSession();

    const {data: marketplaces, isLoading, error} =
        api.marketplaces
            .getAll
            .useQuery(
                undefined,
                {
                    enabled: sessionData?.user !== undefined,
                }
            );
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;

    if (!marketplaces?.length) return (
        <>
            <div>No marketplaces</div>
            <Button>
                <Link href="/NewMarketplace" as="/new-marketplace">Create</Link>
            </Button>
        </>
    )
    return (
        <>
            <Button>
                <Link href="/NewMarketplace" as="/new-marketplace">Create</Link>
            </Button>
            <div>
                <h1>Marketplaces</h1>
                {marketplaces.map((marketplace) => (
                    <div className={"flex justify-between"}
                         key={marketplace.id}
                    >
                        <h2>{marketplace.name}</h2>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MarketplacesPage