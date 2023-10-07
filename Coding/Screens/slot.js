import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Agenda } from 'react-native-calendars';

const slot = () => {
  return (
    <View style={{ flex: 1 }}>
    <Agenda
      // Add your configuration props here
      items={{
        // Your agenda items data
        '2023-10-10': [{ name: 'Meeting with Client', time: '10:00 AM' }],
        '2023-10-11': [{ name: 'Lunch with Team', time: '12:30 PM' }],
        // Add more items for different dates
      }}
      renderItem={(item) => (
        <View style={styles.item}>
          <Text>{item.name}</Text>
          <Text>{item.time}</Text>
        </View>
      )}
    />
  </View>
  )
}

export default slot

const styles = StyleSheet.create({
   item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
})