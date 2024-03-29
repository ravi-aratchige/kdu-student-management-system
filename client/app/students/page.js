import { Box } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import StudentList from '../components/studentList';
import NavigationBar from '../components/navigationBar';
import NewStudentCreation from '../components/newStudentCreation';

export default function Page() {
    return (
        <Box paddingTop={'6.5rem'}>
            {/* Header (navigation bar) */}
            <NavigationBar />

            {/* Page layout */}
            <Box paddingX={'2rem'} paddingTop={'3rem'}>
                {/* Page heading */}
                <Flex justify={'space-between'}>
                    <Heading size={'3xl'} paddingBottom={'3rem'}>
                        Students
                    </Heading>
                    <Input
                        placeholder="Search for students"
                        width={'25%'}
                        size={'lg'}
                        variant={'filled'}
                    ></Input>
                </Flex>

                {/* "Register Student" button and modal */}
                <NewStudentCreation />

                <Flex paddingTop={'3rem'}>
                    {/* Software Engineering */}
                    <StudentList degree={'Software Engineering'}></StudentList>

                    {/* Computer Science */}
                    <StudentList degree={'Computer Science'}></StudentList>

                    {/* Computer Engineering */}
                    <StudentList degree={'Computer Engineering'}></StudentList>
                </Flex>
            </Box>
        </Box>
    );
}
