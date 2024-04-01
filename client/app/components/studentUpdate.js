'use client';

import { Button } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

export default function StudentUpdate(props) {
    // Get student from props
    const student = props.data;

    // Form data to store new student information
    const toast = useToast();
    const [formData, setFormData] = useState({
        reg_number: '',
        first_name: '',
        last_name: '',
        gender: '',
        phone_number: '',
        address: '',
        email: '',
        date_of_birth: '',
        nic_number: '',
        degree: '',
        active_course_codes: [],
        completed_course_codes: [],
        semester: 0,
        intake: 0,
    });

    // Get data for new student from form input values
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'intake') {
            setFormData({ ...formData, [name]: parseInt(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handler for submitting the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('About to send request');
            // Send student data to endpoint to register new student
            const response = await fetch(
                `http://localhost:8000/students/${formData.reg_number}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );
            console.log('Sent request');

            // Check if the server sends an error response
            if (!response.ok) {
                // Display toast with error message
                toast({
                    title: 'Update Failed',
                    description: 'Student details could not be updated',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                throw new Error('Failed to update student');
            }

            // Display toast with success message
            toast({
                title: 'Student Updated',
                description: 'Student updated successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            // Close the modal
            onClose();
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    // Function to update state of formData
    async function updateStateOfFormData(regNumber) {
        try {
            let updatedFormData = { ...formData };
            // 1. Get data for student from database
            const response = await fetch(
                `http://localhost:8000/students/${regNumber}`
            );
            const { data: student } = await response.json();

            // 2. Get all of the student's data out of the above data
            const {
                reg_number,
                first_name,
                last_name,
                gender,
                phone_number,
                address,
                email,
                date_of_birth,
                nic_number,
                degree,
                semester,
                intake,
            } = student;

            console.log(`Number: ${reg_number}`);

            // 3. Update the formData with these values
            if (reg_number) {
                updatedFormData.reg_number = reg_number;
            }
            if (first_name) {
                updatedFormData.first_name = first_name;
            }
            if (last_name) {
                updatedFormData.last_name = last_name;
            }
            if (gender) {
                updatedFormData.gender = gender;
            }
            if (phone_number) {
                updatedFormData.phone_number = phone_number;
            }
            if (address) {
                updatedFormData.address = address;
            }
            if (email) {
                updatedFormData.email = email;
            }
            if (date_of_birth) {
                updatedFormData.date_of_birth = date_of_birth;
            }
            if (nic_number) {
                updatedFormData.nic_number = nic_number;
            }
            if (degree) {
                updatedFormData.degree = degree;
            }
            if (semester) {
                updatedFormData.semester = semester;
            }
            if (intake) {
                updatedFormData.intake = intake;
            }

            setFormData(updatedFormData);

            // console.log(updatedFormData.reg_number);
            console.log(formData.reg_number);
        } catch (error) {
            console.error('Error updating formData:', error);
        }

        console.log('Updated state of form data');
    }

    // Custom hook to manage state of modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Function to update state of active courses and completed courses
    async function updateStateOfCourses(regNumber) {
        updateStateOfFormData(regNumber);
        try {
            // Get data for student courses from the endpoint
            const response = await fetch(
                `http://localhost:8000/courses/${regNumber}`
            );
            const data = await response.json();

            // Check if the server sends an error response
            if (!response.ok) {
                throw new Error('Failed to fetch student courses');
            }

            // Extract active and completed courses
            const { active_courses, completed_courses } = data;

            // Create two arrays named "currentActiveCourseCodes" and "currentCompletedCourseCodes" using the data from the endpoint
            const currentActiveCourseCodes = active_courses.map(
                (course) => course.course_code
            );
            const currentCompletedCourseCodes = completed_courses.map(
                (course) => course.course_code
            );

            // Empty the arrays called "active_course_codes" and "completed_course_codes" in the formData
            const updatedFormData = {
                ...formData,
                active_course_codes: [],
                completed_course_codes: [],
            };

            // Put the course codes in "currentActiveCourseCodes" and "currentCompletedCourseCodes"
            // to "active_course_codes" and "completed_course_codes" in the formData respectively (i.e. update the state)
            updatedFormData.active_course_codes = currentActiveCourseCodes;
            updatedFormData.completed_course_codes =
                currentCompletedCourseCodes;

            // Update the formData state
            setFormData(updatedFormData);

            console.log(formData.active_course_codes);
            console.log(formData.completed_course_codes);

            console.log('Hello');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    return (
        <>
            {/* "Update Student" button */}
            <Button
                marginRight={'1rem'}
                colorScheme={'teal'}
                onClick={() => {
                    updateStateOfCourses(student.reg_number);
                    onOpen();
                }}
            >
                Update Student
            </Button>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    {/* Heading */}
                    <ModalHeader>Update Student</ModalHeader>

                    {/* Close button */}
                    <ModalCloseButton />

                    {/* Modal content */}
                    <ModalBody>
                        {/* First name */}
                        <FormControl paddingBottom={'0.5rem'}>
                            <FormLabel>First name</FormLabel>
                            <Input
                                type="text"
                                name="first_name"
                                defaultValue={student.first_name}
                                onChange={handleChange}
                            />
                        </FormControl>

                        {/* Last name */}
                        <FormControl paddingBottom={'0.5rem'}>
                            <FormLabel>Last name</FormLabel>
                            <Input
                                type="text"
                                name="last_name"
                                defaultValue={student.last_name}
                                onChange={handleChange}
                            />
                        </FormControl>

                        {/* Gender */}
                        <FormControl paddingBottom={'0.5rem'}>
                            <FormLabel>Gender</FormLabel>
                            <Select
                                placeholder="Select gender"
                                name="gender"
                                defaultValue={student.gender}
                                onChange={handleChange}
                            >
                                <option>Male</option>
                                <option>Female</option>
                            </Select>
                        </FormControl>

                        {/* Phone number */}
                        <FormControl paddingBottom={'0.5rem'}>
                            <FormLabel>Phone number</FormLabel>
                            <Input
                                type="number"
                                name="phone_number"
                                defaultValue={student.phone_number}
                                onChange={handleChange}
                            />
                        </FormControl>

                        {/* NIC number */}
                        <FormControl paddingBottom={'0.5rem'}>
                            <FormLabel>NIC number</FormLabel>
                            <Input
                                type="text"
                                name="nic_number"
                                defaultValue={student.nic_number}
                                onChange={handleChange}
                            />
                        </FormControl>

                        {/* Registration number */}
                        <FormControl paddingBottom={'0.5rem'}>
                            <FormLabel>Registration number</FormLabel>
                            <Input
                                type="text"
                                name="reg_number"
                                defaultValue={student.reg_number}
                                onChange={handleChange}
                            />
                        </FormControl>

                        {/* Email address */}
                        <FormControl paddingBottom={'0.5rem'}>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                defaultValue={student.email}
                                onChange={handleChange}
                            />
                            <FormHelperText>
                                Example: 39-bse-0001@kdu.ac.lk
                            </FormHelperText>
                        </FormControl>

                        {/* Date of birth */}
                        <FormControl paddingBottom={'0.5rem'}>
                            <FormLabel>Date of Birth</FormLabel>
                            <Input
                                type="date"
                                name="date_of_birth"
                                defaultValue={student.date_of_birth}
                                onChange={handleChange}
                            />
                        </FormControl>

                        {/* Address */}
                        <FormControl paddingBottom={'0.5rem'}>
                            <FormLabel>Address</FormLabel>
                            <Input
                                type="text"
                                name="address"
                                defaultValue={student.address}
                                onChange={handleChange}
                            />
                        </FormControl>

                        {/* Degree */}
                        <FormControl paddingBottom={'0.5rem'}>
                            <FormLabel>Degree</FormLabel>
                            <Select
                                placeholder="Select degree"
                                name="degree"
                                defaultValue={student.degree}
                                onChange={handleChange}
                            >
                                <option>Software Engineering</option>
                                <option>Computer Science</option>
                                <option>Computer Engineering</option>
                            </Select>
                        </FormControl>

                        {/* Intake */}
                        <FormControl paddingBottom={'0.5rem'}>
                            <FormLabel>Intake</FormLabel>
                            <Select
                                placeholder="Select intake"
                                name="intake"
                                defaultValue={student.intake}
                                onChange={handleChange}
                            >
                                <option>39</option>
                                <option>40</option>
                                <option>41</option>
                            </Select>
                        </FormControl>
                    </ModalBody>

                    {/* Modal footer */}
                    <ModalFooter>
                        <Button colorScheme={'teal'} onClick={handleSubmit}>
                            Update Student Details
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
