'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Checkbox } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import NavigationBar from '@/app/components/navigationBar';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import StudentInformation from '@/app/components/studentInformation';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';

export default function Page({ params }) {
    const [student, setStudent] = useState([]);
    const [activeCourses, setActiveCourses] = useState([]);
    // const completed_courses = [];

    const {
        isOpen: isOpenDialog,
        onOpen: onOpenDialog,
        onClose: onCloseDialog,
    } = useDisclosure();
    const cancelRef = React.useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(params);
                // Get data for student
                const studentInfoResponse = await fetch(
                    `http://localhost:8000/students/${params.reg_number}`
                );
                if (!studentInfoResponse.ok) {
                    throw new Error('Failed to fetch API data for students');
                }
                const studentData = await studentInfoResponse.json();
                setStudent(studentData.data);

                // Get data for student's courses
                const studentCoursesResponse = await fetch(
                    `http://localhost:8000/courses/${params.reg_number}`
                );
                if (!studentCoursesResponse.ok) {
                    throw new Error('Failed to fetch API data for courses');
                }
                const coursesData = await studentCoursesResponse.json();
                setActiveCourses(coursesData.active_courses);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box paddingTop={'5rem'}>
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

                        <Flex paddingBottom={'2rem'}>
                            <Button marginRight={'1rem'} colorScheme={'teal'}>
                                Update student
                            </Button>
                            <Button colorScheme={'red'} onClick={onOpenDialog}>
                                Delete student
                            </Button>

                            {/* Student delete confirmation dialog */}
                            <AlertDialog
                                isOpen={isOpenDialog}
                                leastDestructiveRef={cancelRef}
                                onClose={onCloseDialog}
                            >
                                <AlertDialogOverlay>
                                    <AlertDialogContent>
                                        <AlertDialogHeader
                                            fontSize="lg"
                                            fontWeight="bold"
                                        >
                                            Delete Student
                                        </AlertDialogHeader>

                                        <AlertDialogBody>
                                            Are you sure you want to delete{' '}
                                            {student.reg_number} from the
                                            system?
                                        </AlertDialogBody>

                                        <AlertDialogFooter>
                                            <Button
                                                ref={cancelRef}
                                                onClick={onCloseDialog}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                colorScheme="red"
                                                onClick={onCloseDialog}
                                                ml={3}
                                            >
                                                Delete
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialogOverlay>
                            </AlertDialog>
                        </Flex>
                    </Box>

                    {/* Courses followed by student */}
                    <Box w={'50%'}>
                        <Heading paddingBottom={'4rem'}>Courses</Heading>
                        <Table variant="simple" colorScheme="teal">
                            <Thead>
                                <Tr>
                                    <Th>Course name</Th>
                                    <Th>Course code</Th>
                                    <Th>Enrolled?</Th>
                                    <Th>Completed?</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {activeCourses.map((course) => (
                                    <Tr key={course.id}>
                                        <Td>{course.course_name}</Td>
                                        <Td>{course.course_code}</Td>
                                        <Td>
                                            <Checkbox />
                                        </Td>
                                        <Td>
                                            <Checkbox />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
}
