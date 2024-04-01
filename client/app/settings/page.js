import { Box } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import NavigationBar from '../components/navigationBar';

export default function Page() {
    return (
        <Box paddingTop={'6.5rem'}>
            <NavigationBar />
            {/* Page layout */}
            <Box paddingX={'2rem'} paddingTop={'3rem'}>
                <Heading size={'3xl'} paddingBottom={'3rem'}>
                    Settings
                </Heading>
                <Flex w={'60%'}>
                    {/* Update Admin Credentials */}
                    <Link
                        href={'/settings/database'}
                        marginRight={'2rem'}
                        w={'33%'}
                    >
                        <Text
                            padding={'2rem'}
                            boxShadow={'base'}
                            rounded={'md'}
                            fontWeight={'bold'}
                        >
                            Update Database Credentials
                        </Text>
                    </Link>

                    {/* Check Logs */}
                    <Link
                        href={'/settings/logs'}
                        marginRight={'2rem'}
                        w={'33%'}
                    >
                        <Text
                            padding={'2rem'}
                            boxShadow={'base'}
                            rounded={'md'}
                            fontWeight={'bold'}
                        >
                            Check Logs
                        </Text>
                    </Link>

                    {/* About KDU SMS */}
                    <Link
                        href={'/settings/info'}
                        marginRight={'2rem'}
                        w={'33%'}
                    >
                        <Text
                            padding={'2rem'}
                            boxShadow={'base'}
                            rounded={'md'}
                            fontWeight={'bold'}
                        >
                            About KDU SMS
                        </Text>
                    </Link>
                </Flex>
            </Box>
        </Box>
    );
}
