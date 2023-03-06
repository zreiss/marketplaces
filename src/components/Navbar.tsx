import {
    Flex,
    Image,
    Button,
    HStack,
    ButtonGroup,
} from '@chakra-ui/react'
import Link from "next/link";
import * as React from 'react';

export const Navbar = () => {
    return (
        <HStack bg="black" h="100" spacing="10" justify="flex-start" pl={4}>
            <Flex gap={5}>
                <Image
                    alt="Zreiss Logo" h="35"
                    src="https://s3.amazonaws.com/magento-luzerne/zreiss/zreiss-icon-transparent.png"
                />
                <ButtonGroup variant="link" spacing="8">
                    {[
                        ['Marketplaces', 'marketplaces'],
                        ['Products', 'products'],
                    ].map((item) => (
                        <Button key={item[0]}>
                            <Link href={`/${item[1] ?? ""}`}>{item[0]}</Link>
                        </Button>
                    ))}
                </ButtonGroup>
            </Flex>
        </HStack>
    )
}

export default Navbar;