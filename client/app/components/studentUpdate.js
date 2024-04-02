'use client';

import { Button } from '@chakra-ui/react';
import { useCallback } from 'react';
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

    console.log(formData);

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
                `https://sctt-caramel-labs-2.koyeb.app/students/${formData.reg_number}`,
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
                description: 'Refresh the page to see changes',
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
    const updateStateOfFormData = useCallback(async (regNumber) => {
        try {
            // fetch student data
            const response = await fetch(
                `https://sctt-caramel-labs-2.koyeb.app/students/${regNumber}`
            );
            const { data: student } = await response.json();

            // update form data
            setFormData((prevFormData) => ({
                ...prevFormData,
                reg_number: student.reg_number,
                first_name: student.first_name,
                last_name: student.last_name,
                gender: student.gender,
                phone_number: student.phone_number,
                address: student.address,
                email: student.email,
                date_of_birth: student.date_of_birth,
                nic_number: student.nic_number,
                degree: student.degree,
                semester: student.semester,
                intake: student.intake,
            }));
        } catch (error) {
            console.error('Error updating formData:', error);
        }
    }, []);

    // Custom hook to manage state of modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Custom callback to update state of active courses and completed courses
    const updateStateOfCourses = useCallback(
        async (regNumber) => {
            await updateStateOfFormData(regNumber);
            try {
                // fetch student courses
                const response = await fetch(
                    `http://localhost:8000/courses/${regNumber}`
                );
                const data = await response.json();

                // update form data with course codes
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    active_course_codes: data.active_courses.map(
                        (course) => course.course_code
                    ),
                    completed_course_codes: data.completed_courses.map(
                        (course) => course.course_code
                    ),
                }));
            } catch (error) {
                console.error('Error updating data:', error);
            }
        },
        [updateStateOfFormData]
    );

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
