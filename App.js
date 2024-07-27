import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const App = () => {
  const [visible, setVisible] = useState(false);
  const [task, setTask] = useState("");
  const [values, setValues] = useState([
    { text: "Identify and contextualize the problem", completed: true },
    { text: "Present ideas and changes to team", completed: true },
    { text: "Prepare User Flows", completed: true },
    { text: "Prepare design style guide", completed: false },
    { text: "Delivery stage: test and release", completed: false },
  ]);

  const toggleTask = (index) => {
    const newValues = values.map((val, i) => {
      if (i === index) {
        return { ...val, completed: !val.completed };
      }
      return val;
    });
    setValues(newValues);
  };

  const addTask = () => {
    setVisible(true);
    if (task.trim() !== "") {
      setValues([...values, { text: task, completed: false }]);
      setTask("");
      setVisible(false);
    }
  };

  const completedTasks = values.filter(task => task.completed).length;
  const totalTasks = values.length;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.header}>
          <Image source={require('./header.webp')} style={styles.headerImage} />
          <Text style={styles.headerText}>TODO</Text>
        </View>
        <View style={styles.tasklist}>
          <View style={styles.list}>
            <Text style={styles.listTitle}>Tasklist</Text>
            <Text style={styles.taskCount}>{completedTasks}/{totalTasks} done</Text>
          </View>
          <ScrollView style={styles.checkbox}>
            {values.map((val, index) => (
              <View key={index} style={styles.checkboxItem}>
                <TouchableOpacity onPress={() => toggleTask(index)}>
                  <Text style={styles.checkboxText}>{val.completed ? '✔' : '⬜'}</Text>
                </TouchableOpacity>
                <Text style={val.completed ? styles.taskCompleted : styles.taskText}>
                  {val.completed ? <Text style={styles.strikethrough}>{val.text}</Text> : val.text}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.buttonbox}>
          {visible && (
            <TextInput
              style={styles.inputfield}
              placeholder="Enter your task"
              value={task}
              onChangeText={setTask}
            />
          )}
          <TouchableOpacity style={styles.addtask} onPress={addTask}>
            <Text style={styles.addtaskText}>+ Add Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'antiquewhite',
  },
  box: {
    width: '90%',
    height: '90%',
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  header: {
    width: '90%',
    height: '25%',
    borderRadius: 20,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  headerText: {
    position: 'absolute',
    fontSize: 40,
    color: '#1b46b277',
    fontWeight: 'bold',
  },
  tasklist: {
    width: '90%',
    height: '45%',
  },
  list: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listTitle: {
    fontSize: 20,
  },
  taskCount: {
    fontSize: 16,
  },
  checkbox: {
    width: '100%',
    height: '80%',
  },
  checkboxItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  checkboxText: {
    fontSize: 20,
  },
  taskText: {
    fontSize: 18,
  },
  taskCompleted: {
    fontSize: 18,
    color: 'grey',
    textDecorationLine: 'line-through',
  },
  buttonbox: {
    width: '90%',
    alignItems: 'center',
  },
  inputfield: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    fontSize: 16,
    marginBottom: 10,
  },
  addtask: {
    width: '100%',
    height: 40,
    backgroundColor: '#2f69fe',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addtaskText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
