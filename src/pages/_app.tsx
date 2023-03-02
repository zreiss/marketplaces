import {api} from "~/utils/api";
import {type AppType} from "next/app";
import {type Session} from "next-auth";
import Navbar from "~/components/Navbar";
import {SessionProvider} from "next-auth/react";
import {ChakraProvider, Container} from '@chakra-ui/react'

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: {session, ...pageProps},
}) => {
    return (
        <SessionProvider session={session}>
            <ChakraProvider>
                <Navbar/>
                <Container maxW={"container.xl"}>
                    <Component {...pageProps} />
                </Container>
            </ChakraProvider>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
