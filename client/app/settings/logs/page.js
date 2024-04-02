'use client';

import { Box } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import NavigationBar from '@/app/components/navigationBar';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react';

export default function Page() {
    // State to store and manage logs
    const [logs, setLogs] = useState([]);

    // Fetch logs from endpoint and update state
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://sctt-caramel-labs-2.koyeb.app/logs/'
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch API data');
                }
                const data = await response.json();
                setLogs(data.data);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box paddingTop={'6.5rem'}>
            {/* Header (navigation bar) */}
            <NavigationBar />

            {/* Page layout */}
            <Box paddingX={'2rem'} paddingTop={'3rem'}>
                <Heading size={'3xl'} paddingBottom={'3rem'}>
                    Logs
                </Heading>

                {/* Table of logs */}
                <TableContainer>
                    <Table variant="simple">
                        {/* Table caption (to explain table) */}
                        <TableCaption>
                            Logs include creation, update and deletion of
                            students and courses
                        </TableCaption>

                        {/* Table column headings */}
                        <Thead>
                            <Tr>
                                <Th>Timestamp</Th>
                                <Th>Logger</Th>
                                <Th>Action</Th>
                                <Th>Detail</Th>
                            </Tr>
                        </Thead>

                        {/* Table body with log data */}
                        <Tbody>
                            {logs.map((log) => (
                                <Tr key={log.timestamp}>
                                    <Td>{log.timestamp}</Td>
                                    <Td>{log.logger}</Td>
                                    <Td>{log.action}</Td>
                                    <Td>{log.detail}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}
