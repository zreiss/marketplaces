import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    HStack,
    useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import Link from "next/link";

export const Navbar = () => {
    return (
        <HStack bg="black" h="100" spacing="10" justify="flex-start">
            <Flex justify="space-between" flex="1">
                <ButtonGroup variant="link" spacing="8">
                    {[['Marketplaces', 'marketplaces'],].map((item) => (
                        <Button key={item[0]}>
                            <Link href={item[1]}>{item[0]}</Link>
                        </Button>
                        ))}
                </ButtonGroup>
            </Flex>
        </HStack>
)
}

export default Navbar;