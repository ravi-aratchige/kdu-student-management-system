'use client';

import { Box } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@chakra-ui/react';
import NavigationBar from '../components/navigationBar';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';

export default function Page() {
    // Setup router to handle redirects
    const router = useRouter();

    // State for modal management
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box paddingTop={'6.5rem'}>
            <NavigationBar />
            {/* Page layout */}
            <Box paddingX={'2rem'} paddingTop={'3rem'}>
                {/* Page heading */}
                <Heading size={'3xl'} paddingBottom={'3rem'}>
                    Settings
                </Heading>

                {/* Page buttons */}
                <Flex w={'60%'}>
                    {/* 1. "Update Admin Credentials" */}
                    <Box
                        _hover={{ cursor: 'pointer', color: 'teal.500' }}
                        marginRight={'2rem'}
                        w={'33%'}
                        onClick={() => router.push('/settings/database')}
                    >
                        <Text
                            padding={'2rem'}
                            boxShadow={'base'}
                            rounded={'md'}
                            fontWeight={'bold'}
                        >
                            Update Database Credentials
                        </Text>
                    </Box>

                    {/* 2. "Check Logs" */}
                    <Box
                        _hover={{ cursor: 'pointer', color: 'teal.500' }}
                        marginRight={'2rem'}
                        w={'33%'}
                        onClick={() => router.push('/settings/logs')}
                    >
                        <Text
                            padding={'2rem'}
                            boxShadow={'base'}
                            rounded={'md'}
                            fontWeight={'bold'}
                        >
                            Check Logs
                        </Text>
                    </Box>

                    {/* 3. "About KDU SMS" */}
                    <Box
                        _hover={{ cursor: 'pointer', color: 'teal.500' }}
                        marginRight={'2rem'}
                        w={'33%'}
                        onClick={onOpen}
                    >
                        <Text
                            padding={'2rem'}
                            boxShadow={'base'}
                            rounded={'md'}
                            fontWeight={'bold'}
                        >
                            About KDU SMS
                        </Text>
                    </Box>
                </Flex>

                {/* Modal (for system info) */}
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>KDU Student Management System</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>
                                You are using version 0.1.0 of the KDU Student
                                Management System.
                            </Text>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme={'teal'}
                                mr={3}
                                onClick={onClose}
                            >
                                OK
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </Box>
    );
}
