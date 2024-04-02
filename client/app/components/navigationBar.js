import Link from 'next/link';
import { Heading } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';

export default function NavigationBar() {
    return (
        <Flex
            height={'6.5rem'}
            backgroundColor={'teal.500'}
            color={'white'}
            justify={'space-between'}
            position={'fixed'}
            top={'0'}
            left={'0'}
            right={'0'}
            zIndex={'1'}
        >
            <Center paddingLeft={'2rem'}>
                <Link href={'/'}>
                    <Heading>KDU Student Management System</Heading>
                </Link>
            </Center>
            <Center paddingRight={'2rem'}>
                <Link href={'/settings'}>Settings</Link>
            </Center>
        </Flex>
    );
}
