import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';

export default function StudentCoursesTable(props) {
    // Get student data from props
    const student = props.data;

    // // Combine active_course_codes and completed_course_codes into a single array
    // const all_course_codes = [
    //     ...student.active_course_codes,
    //     ...student.completed_course_codes,
    // ];

    // // Log the new array
    // console.log(all_course_codes);

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
                    <Td>Introduction to Programming</Td>
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
