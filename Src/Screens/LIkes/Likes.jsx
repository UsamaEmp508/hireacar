import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Slider } from '@rneui/themed'

const Likes = () => {
  const [hourlyPrice, setHourlyPrice] = useState(0);
  const [dailyPrice, setDailyPrice] = useState(0);
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [misctext, setMisctext] = useState('');
  return (
    <View>
    <Slider
        value={hourlyPrice}
        onValueChange={(value) => setHourlyPrice(value)}
        minimumValue={0}
        maximumValue={1000}
        step={100}
      />
      <Slider
        value={dailyPrice}
        onValueChange={(value) => setDailyPrice(value)}
        minimumValue={0}
        maximumValue={1000}
        step={100}
      />
      <Slider
        value={monthlyPrice}
        onValueChange={(value) => setMonthlyPrice(value)}
        minimumValue={0}
        maximumValue={1000}
        step={100}
      />
      <Input
        placeholder="Description"
        multiline
        value={misctext}
        onChangeText={(value) => setMisctext(value)}
      />
    </View>
  )
}

export default Likes

const styles = StyleSheet.create({})