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
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

export default function NewStudentCreation() {
    // Initialize toast message

    // Form data to store new student information
    const toast = useToast();
    const [formData, setFormData] = useState({
        reg_number: '',
        first_name: '',
        last_name: '',
        address: '',
        email: '',
        date_of_birth: '',
        nic_number: '',
        degree: '',
        active_course_codes: [],
        completed_course_codes: [],
        semester: 1,
        batch: 0,
    });

    // Get data for new student from form input values
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'batch') {
            setFormData({ ...formData, [name]: parseInt(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/students/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to register student');
            }

            // Display success message using toast
            toast({
                title: 'Student Registered',
                description: 'Student registered successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            // Close the modal
            onClose();
        } catch (error) {
            console.error('Error registering student:', error);
        }
    };

    // Custom hook to manage state of modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {/* "Register Student" button */}
            <Button colorScheme={'teal'} onClick={onOpen}>
                Register Student
            </Button>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    {/* Heading */}
                    <ModalHeader>Register Student</ModalHeader>

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
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                        </FormControl>

                        {/* Last name */}
                        <FormControl paddingBottom={'0.5rem'}>
                            <FormLabel>Last name</FormLabel>
                            <Input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </FormControl>

                        {/* NIC number */}
                        <FormControl paddingBottom={'0.5rem'}>
                            <FormLabel>NIC number</FormLabel>
                            <Input
                                type="text"
                                name="nic_number"
                                value={formData.nic_number}
                                onChange={handleChange}
                            />
                        </FormControl>

                        {/* Registration number */}
                        <FormControl paddingBottom={'0.5rem'}>
                            <FormLabel>Registration number</FormLabel>
                            <Input
                                type="text"
                                name="reg_number"
                                value={formData.reg_number}
                                onChange={handleChange}
                            />
                        </FormControl>

                        {/* Email address */}
                        <FormControl paddingBottom={'0.5rem'}>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
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
                                value={formData.date_of_birth}
                                onChange={handleChange}
                            />
                        </FormControl>

                        {/* Address */}
                        <FormControl paddingBottom={'0.5rem'}>
                            <FormLabel>Address</FormLabel>
                            <Input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </FormControl>

                        {/* Degree */}
                        <FormControl paddingBottom={'0.5rem'}>
                            <FormLabel>Degree</FormLabel>
                            <Select
                                placeholder="Select degree"
                                name="degree"
                                value={formData.degree}
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
                                name="batch"
                                value={formData.batch}
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
                            Register Student
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
