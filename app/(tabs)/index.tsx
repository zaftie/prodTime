import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Platform,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Dimensions,
    FlatList,
    Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
    const [userInput, setUserInput] = useState('');
    const [tasks, setTasks] = useState([]); // Array to store tasks
    const [inputVisible, setInputVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);

    // Load tasks from AsyncStorage when the app starts
    useEffect(() => {
        loadTasks();
    }, []);

    // Save tasks to AsyncStorage whenever they change
    useEffect(() => {
        saveTasks();
    }, [tasks]);

    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.error('Failed to load tasks:', error);
        }
    };

    const saveTasks = async () => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Failed to save tasks:', error);
        }
    };

    const handleAddTask = () => {
        if (userInput.trim()) {
            setTasks([...tasks, userInput]);
            setUserInput('');
            setInputVisible(false);
        }
    };

    const handleDeleteTask = () => {
        if (selectedTaskIndex !== null) {
            const updatedTasks = [...tasks];
            updatedTasks.splice(selectedTaskIndex, 1);
            setTasks(updatedTasks);
            setModalVisible(false);
        }
    };

    const handleEditTask = () => {
        if (selectedTaskIndex !== null) {
            setUserInput(tasks[selectedTaskIndex]);
            setInputVisible(true);
            setModalVisible(false);
        }
    };

    const openTaskOptions = (index) => {
        setSelectedTaskIndex(index);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={styles.taskItem}
                        onLongPress={() => openTaskOptions(index)}
                    >
                        <Text style={styles.taskText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* Floating Button */}
            <TouchableOpacity style={styles.bottomRightButton} onPress={() => setInputVisible(true)}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>

            {/* Input Field in the Center */}
            {inputVisible && (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter a task"
                        value={userInput}
                        onChangeText={setUserInput}
                        onSubmitEditing={handleAddTask}
                        autoFocus={true}
                    />
                    <TouchableOpacity style={styles.submitButton} onPress={handleAddTask}>
                        <Text style={styles.submitButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Modal for Task Options */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.modalButton} onPress={handleEditTask}>
                            <Text style={styles.modalButtonText}>Edit Task</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={handleDeleteTask}>
                            <Text style={[styles.modalButtonText, styles.deleteButtonText]}>Delete Task</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    bottomRightButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#6200ee',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    inputContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        transform: [
            { translateX: -(Dimensions.get('window').width * 0.4) },
            { translateY: -50 },
        ],
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%',
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: '#6200ee',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskItem: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#e0f7fa',
        borderRadius: 5,
    },
    taskText: {
        fontSize: 16,
        color: '#00796b',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalButton: {
        padding: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    modalButtonText: {
        fontSize: 18,
        color: '#6200ee',
    },
    deleteButtonText: {
        color: '#e53935',
    },
});
