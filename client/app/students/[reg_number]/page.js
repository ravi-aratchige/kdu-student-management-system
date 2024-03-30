'use client';

import { Box } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import NavigationBar from '@/app/components/navigationBar';
import StudentInformation from '@/app/components/studentInformation';
import StudentCoursesTable from '@/app/components/studentCoursesTable';

export default function Page({ params }) {
    const [student, setStudent] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(params);
                const response = await fetch(
                    `http://localhost:8000/students/${params.reg_number}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch API data');
                }
                const studentData = await response.json();
                setStudent(studentData.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
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
                {/* Page title */}
                <Heading size={'lg'} paddingBottom={'1.5rem'}>
                    Student
                </Heading>

                {/* Student name */}
                <Heading size={'3xl'} paddingBottom={'4rem'}>
                    {student.first_name} {student.last_name}
                </Heading>

                {/* Student information */}
                <Flex justify={'space-between'}>
                    {/* Personal information */}
                    <Box w={'50%'}>
                        <Heading paddingBottom={'4rem'}>
                            Personal Information
                        </Heading>
                        <StudentInformation data={student} />
                    </Box>

                    {/* Courses followed by student */}
                    <Box w={'50%'}>
                        <Heading paddingBottom={'4rem'}>Courses</Heading>
                        <StudentCoursesTable data={student} />
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
}
