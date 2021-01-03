import React, { useState } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'

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
  const [isShowingReviews, setIsShowingReviews] = useState(false)
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
      <TouchableHighlight
        style={{ ...styles.button, backgroundColor: '#2196F3' }}
        onPress={() => {
          console.log(false)
        }}
      >
        <Text style={styles.textStyle}>Reviews</Text>
      </TouchableHighlight>
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
  button: {
    backgroundColor: '#F194FF',
    borderRadius: 40,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default Popup
