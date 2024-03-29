import Link from 'next/link';
import { Box } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import NavigationBar from './components/navigationBar';

export default async function Home() {
    return (
        <Box paddingTop={'6.5rem'}>
            {/* Header (navigation bar) */}
            <NavigationBar />

            {/* Page layout */}
            <Box paddingX={'2rem'} paddingTop={'3rem'}>
                <Link href={'/students'}>
                    <Button colorScheme={'teal'}>Manage Students</Button>
                </Link>
            </Box>
        </Box>
    );
}
