import { useState } from 'react';
import { Box, Button, Container, Flex, Input, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTasks = [...tasks, { id: Date.now(), text: input.trim(), isCompleted: false }];
      setTasks(newTasks);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  const handleCompleteTask = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const bg = useColorModeValue('gray.50', 'gray.800');

  return (
    <Container maxW="container.md" py={8}>
      <Flex as="nav" justify="center" mb={8}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
      </Flex>
      <Box bg={bg} p={8} borderRadius="lg" boxShadow="base">
        <Flex mb={4}>
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <Button onClick={handleAddTask} ml={2} colorScheme="blue">Add</Button>
        </Flex>
        <List spacing={3}>
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" alignItems="center" justifyContent="space-between">
              <Text as={task.isCompleted ? 's' : 'span'}>{task.text}</Text>
              <Flex>
                <Button onClick={() => handleCompleteTask(task.id)} size="sm" colorScheme={task.isCompleted ? "green" : "gray"}>
                  <FaCheckCircle />
                </Button>
                <Button onClick={() => handleDeleteTask(task.id)} size="sm" colorScheme="red" ml={2}>
                  <FaTrash />
                </Button>
              </Flex>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Index;