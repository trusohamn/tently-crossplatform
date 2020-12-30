import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

const iconHeight = 100
const iconWidth = 100

const getCloudinaryImageWithDimensions = (
  imageUrl: string,
  height: number,
  width: number,
) => {
  const urlArray = imageUrl.split('/')
  urlArray[urlArray.length - 2] = `w_${width},h_${height}`
  return urlArray.join('/')
}

function Popup({
  title,
  description,
  imageUrl,
}: {
  title: string
  description: string
  imageUrl?: string
}) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text>{description}</Text>
      {!!imageUrl && (
        <Image
          style={styles.logo}
          source={{
            uri: getCloudinaryImageWithDimensions(
              imageUrl,
              iconHeight,
              iconWidth,
            ),
          }}
        ></Image>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: iconWidth,
    height: iconHeight,
  },
  title: {
    fontSize: 25,
  },
})

export default Popup
