import Link from "next/link";
import {api} from "~/utils/api";
import {getSession, useSession} from "next-auth/react";
import {Box, Button, Image, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";

const MarketplacesPage = () => {
    // const utils = api.useContext();
    const router = useRouter();
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

    const handleMarketplaceClick = (id: number) => {
        // navigate to the dynamic route for the selected marketplace
        void router.push(`/marketplaces/${id}`);
    };

    if (!marketplaces?.length) return (
        <>
            <div>No marketplaces</div>
            <Button>
                <Link href="/src/pages/NewMarketplace" as="/new-marketplace">Create</Link>
            </Button>
        </>
    )
    return (
        <>
            <div>
                <Text mt={4} fontSize={"4xl"}>Marketplaces</Text>
                {marketplaces.map((marketplace) => (
                    <div
                        key={marketplace.id}
                        onClick={() => handleMarketplaceClick(marketplace.id)}
                        className={"h-16 p-4 flex items-center hover:bg-gray-200 rounded"}
                    >
                        <Image src={marketplace.image_url} alt={marketplace.name}/>
                        <Text ml={4} fontSize={"2xl"}>{marketplace.name}</Text>
                    </div>
                ))}
            </div>
            <Box position={"fixed"} sx={{bottom: 75, right: 125}}>
                <Button>
                    <Link href="/src/pages/NewMarketplace" as="/new-marketplace">Create</Link>
                </Button>
            </Box>
        </>
    );
};

export default MarketplacesPage

export async function getServerSideProps(context: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            },
        }
    }

    return {
        props: {session}
    }
}