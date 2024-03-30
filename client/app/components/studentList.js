'use client';

import Link from 'next/link';
import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export default function StudentList({ degree }) {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/students/');
                if (!response.ok) {
                    throw new Error('Failed to fetch API data');
                }
                const studentData = await response.json();
                setStudents(studentData.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box w={'33%'}>
            {/* Degree name */}
            <Heading paddingBottom={'4rem'}>{degree}</Heading>

            {/* List of students */}
            {students
                .filter((student) => student.degree === degree)
                .map((student) => (
                    <Box
                        key={student.reg_number}
                        paddingBottom={'2rem'}
                        _hover={{ cursor: 'pointer', color: 'teal.500' }}
                    >
                        <Link href={`/students/${student.reg_number}`}>
                            {/* Student name */}
                            <Text as={'b'}>
                                {student.first_name} {student.last_name}
                            </Text>

                            {/* Student registration number */}
                            <Text paddingTop={'0.5rem'}>
                                {student.reg_number}
                            </Text>
                        </Link>
                    </Box>
                ))}
        </Box>
    );
}
