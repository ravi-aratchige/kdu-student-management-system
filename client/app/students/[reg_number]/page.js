'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Checkbox } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import NavigationBar from '@/app/components/navigationBar';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import StudentInformation from '@/app/components/studentInformation';
import StudentUpdate from '@/app/components/studentUpdate';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';

export default function Page({ params }) {
    // State to store student informaiton
    const [student, setStudent] = useState([]);

    // States to store student course information
    const [activeCourses, setActiveCourses] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);

    const {
        isOpen: isOpenDialog,
        onOpen: onOpenDialog,
        onClose: onCloseDialog,
    } = useDisclosure();
    const cancelRef = React.useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get data for student
                const studentInfoResponse = await fetch(
                    `https://sctt-caramel-labs-2.koyeb.app/students/${params.reg_number}`
                );
                if (!studentInfoResponse.ok) {
                    throw new Error('Failed to fetch API data for students');
                }
                const studentData = await studentInfoResponse.json();
                setStudent(studentData.data);

                // Get data for student's courses
                const studentCoursesResponse = await fetch(
                    `https://sctt-caramel-labs-2.koyeb.app/courses/${params.reg_number}`
                );
                if (!studentCoursesResponse.ok) {
                    throw new Error('Failed to fetch API data for courses');
                }
                const coursesData = await studentCoursesResponse.json();
                setActiveCourses(coursesData.active_courses);
                setCompletedCourses(coursesData.completed_courses);
                setAllCourses(coursesData.all_courses);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // State for "Save Changes" button below the table
    const [isInteracted, setIsInteracted] = useState(false);

    // Listen for changes to the table
    const handleTableInteraction = () => {
        setIsInteracted(true);
    };

    // Handler for deleting a student
    const deleteStudent = async () => {
        try {
            const response = await fetch(
                `https://sctt-caramel-labs-2.koyeb.app/students/${student.reg_number}`,
                {
                    method: 'DELETE',
                }
            );
            if (!response.ok) {
                throw new Error('Failed to delete student');
            }
            // Redirect back to students page
            redirect('/students');
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    // Filter out courses that are already in active or completed courses
    const remainingCourses = allCourses.filter((course) => {
        return (
            !activeCourses.find((ac) => ac.id === course.id) &&
            !completedCourses.find((cc) => cc.id === course.id)
        );
    });

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
                <Flex justify={'space-between'} paddingBottom={'8rem'}>
                    {/* Personal information */}
                    <Box w={'50%'}>
                        <Heading paddingBottom={'4rem'}>
                            Personal Information
                        </Heading>
                        <StudentInformation data={student} />

                        <Flex paddingBottom={'2rem'}>
                            {/* <Button marginRight={'1rem'} colorScheme={'teal'}>
                                Update student
                            </Button> */}
                            <StudentUpdate data={student} />
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
                                                onClick={() => {
                                                    deleteStudent();
                                                    onCloseDialog();
                                                }}
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
                                {completedCourses.map((course) => (
                                    <Tr key={course.id}>
                                        <Td>{course.course_name}</Td>
                                        <Td>{course.course_code}</Td>
                                        <Td>
                                            <Checkbox
                                                defaultChecked
                                                onChange={
                                                    handleTableInteraction
                                                }
                                            />
                                        </Td>
                                        <Td>
                                            <Checkbox
                                                defaultChecked
                                                onChange={
                                                    handleTableInteraction
                                                }
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                                {activeCourses.map((course) => (
                                    <Tr key={course.id}>
                                        <Td>{course.course_name}</Td>
                                        <Td>{course.course_code}</Td>
                                        <Td>
                                            <Checkbox
                                                defaultChecked
                                                onChange={
                                                    handleTableInteraction
                                                }
                                            />
                                        </Td>
                                        <Td>
                                            <Checkbox
                                                onChange={
                                                    handleTableInteraction
                                                }
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                                {remainingCourses.map((course) => (
                                    <Tr key={course.id}>
                                        <Td>{course.course_name}</Td>
                                        <Td>{course.course_code}</Td>
                                        <Td>
                                            <Checkbox
                                                onChange={
                                                    handleTableInteraction
                                                }
                                            />
                                        </Td>
                                        <Td>
                                            <Checkbox
                                                onChange={
                                                    handleTableInteraction
                                                }
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>

                        {console.log(!isInteracted)}

                        {/* Button to save changes to student's courses */}
                        <Button
                            colorScheme={'teal'}
                            marginTop={'2rem'}
                            isDisabled={!isInteracted}
                        >
                            Save Changes
                        </Button>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
}
