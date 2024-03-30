import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

export default function StudentInformation(props) {
    // Get student data from props
    const student = props.data;

    return (
        <Flex justifyContent={'normal'}>
            {/* Labels */}
            <Box>
                <Text fontWeight={'bold'} paddingBottom={'1.5rem'}>
                    Name
                </Text>

                <Text fontWeight={'bold'} paddingBottom={'1.5rem'}>
                    Registration Number
                </Text>

                <Text fontWeight={'bold'} paddingBottom={'1.5rem'}>
                    Address
                </Text>

                <Text fontWeight={'bold'} paddingBottom={'1.5rem'}>
                    Phone Number
                </Text>

                <Text fontWeight={'bold'} paddingBottom={'1.5rem'}>
                    Email
                </Text>

                <Text fontWeight={'bold'} paddingBottom={'1.5rem'}>
                    Degree
                </Text>

                <Text fontWeight={'bold'} paddingBottom={'1.5rem'}>
                    Intake
                </Text>

                <Text fontWeight={'bold'} paddingBottom={'1.5rem'}>
                    Semester
                </Text>
            </Box>

            {/* Data */}
            <Box paddingLeft={'3rem'}>
                <Text paddingBottom={'1.5rem'}>
                    {student.first_name} {student.last_name}
                </Text>

                <Text paddingBottom={'1.5rem'}>{student.reg_number}</Text>

                <Text paddingBottom={'1.5rem'}>{student.address}</Text>

                <Text paddingBottom={'1.5rem'}>076 494 2027</Text>

                <Text paddingBottom={'1.5rem'}>{student.email}</Text>

                <Text paddingBottom={'1.5rem'}>{student.degree}</Text>

                <Text paddingBottom={'1.5rem'}>{student.batch}</Text>

                <Text paddingBottom={'1.5rem'}>{student.semester}</Text>
            </Box>
        </Flex>
    );
}
