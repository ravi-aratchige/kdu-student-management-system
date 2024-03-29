import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';

const getData = async () => {
    // Get response from API endpoint
    const response = await fetch('http://localhost:8000/students/');

    // Throw error if response is not ok :(
    if (!response.ok) {
        throw new Error('Failed to fetch API data');
    }

    // Return JSONified output if response is ok :)
    return response.json();
};

export default async function StudentList({ degree }) {
    // Get JSON object of all students
    const studentData = await getData();

    // Separate array of "data" from JSON object
    const students = studentData.data;

    return (
        <Box w={'33%'}>
            {/* Degree name */}
            <Heading paddingBottom={'4rem'}>{degree}</Heading>

            {/* List of students */}
            {students
                .filter((student) => student.degree === degree)
                .map((student) => (
                    <Box paddingBottom={'2rem'} key={student.reg_number}>
                        {/* Student name */}
                        <Text as={'b'}>
                            {student.first_name} {student.last_name}
                        </Text>

                        {/* Student registration number */}
                        <Text paddingTop={'0.5rem'}>{student.reg_number}</Text>
                    </Box>
                ))}
        </Box>
    );
}
