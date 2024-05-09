import { useState } from 'react';
import { Box, Button, Container, Flex, IconButton, Input, List, ListItem, Text, VStack } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTasks = [...tasks, { id: Date.now(), text: input, isCompleted: false }];
      setTasks(newTasks);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex as="nav" justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
      </Flex>
      <VStack spacing={4}>
        <Flex>
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <Button onClick={handleAddTask} ml={2}>Add</Button>
        </Flex>
        <List w="full">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" p={2} bg={task.isCompleted ? 'green.100' : 'gray.100'}>
              <Text as={task.isCompleted ? 's' : 'span'}>{task.text}</Text>
              <Flex>
                <IconButton
                  aria-label="Complete task"
                  icon={<FaCheckCircle />}
                  onClick={() => handleToggleComplete(task.id)}
                  colorScheme={task.isCompleted ? 'green' : 'gray'}
                  mr={2}
                />
                <IconButton
                  aria-label="Delete task"
                  icon={<FaTrash />}
                  onClick={() => handleDeleteTask(task.id)}
                  colorScheme="red"
                />
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;