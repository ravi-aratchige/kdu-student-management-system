import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';

export default function StudentCoursesTable(props) {
    // Get student data from props
    const student = props.data;

    if (student) {
        // console.log(student.reg_number);
    }

    return (
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
                <Tr>
                    <Td>{student.reg_number}</Td>
                    <Td>CSE101</Td>
                    <Td>
                        <Checkbox defaultChecked />
                    </Td>
                    <Td>
                        <Checkbox />
                    </Td>
                </Tr>
                <Tr>
                    <Td>Data Structures and Algorithms</Td>
                    <Td>CSE201</Td>
                    <Td>
                        <Checkbox />
                    </Td>
                    <Td>
                        <Checkbox defaultChecked />
                    </Td>
                </Tr>
                <Tr>
                    <Td>Web Development</Td>
                    <Td>CSE301</Td>
                    <Td>
                        <Checkbox defaultChecked />
                    </Td>
                    <Td>
                        <Checkbox defaultChecked />
                    </Td>
                </Tr>
            </Tbody>
        </Table>
    );
}
