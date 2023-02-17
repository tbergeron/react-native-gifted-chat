import * as React from 'react'
import { Animated } from 'react-native'
import { TypingAnimation } from 'react-native-typing-animation'
import { useUpdateLayoutEffect } from './hooks/useUpdateLayoutEffect'
import Color from './Color'

interface Props {
  isTyping?: boolean
  backgroundColor?: string
  dotColor?: string
}

const TypingIndicator = ({ isTyping, backgroundColor, dotColor }: Props) => {
  const { yCoords, heightScale, marginScale } = React.useMemo(
    () => ({
      yCoords: new Animated.Value(200),
      heightScale: new Animated.Value(0),
      marginScale: new Animated.Value(0),
    }),
    [],
  )

  // on isTyping fire side effect
  useUpdateLayoutEffect(() => {
    if (isTyping) {
      slideIn()
    } else {
      slideOut()
    }
  }, [isTyping])

  // side effect
  const slideIn = () => {
    Animated.parallel([
      Animated.spring(yCoords, {
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.timing(heightScale, {
        toValue: 35,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(marginScale, {
        toValue: 8,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start()
  }

  // side effect
  const slideOut = () => {
    Animated.parallel([
      Animated.spring(yCoords, {
        toValue: 200,
        useNativeDriver: false,
      }),
      Animated.timing(heightScale, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(marginScale, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start()
  }
  return (
    <Animated.View
      style={[
        {
          marginLeft: 8,
          width: 45,
          borderRadius: 15,
          backgroundColor: backgroundColor
            ? backgroundColor
            : Color.leftBubbleBackground,
        },
        {
          transform: [
            {
              translateY: yCoords,
            },
          ],
          height: heightScale,
          marginBottom: marginScale,
        },
      ]}
    >
      {isTyping ? (
        <TypingAnimation
          style={{ marginLeft: 6, marginTop: 7.2 }}
          dotRadius={4}
          dotMargin={5.5}
          dotColor={dotColor ? dotColor : 'rgba(0, 0, 0, 0.38)'}
        />
      ) : null}
    </Animated.View>
  )
}

export default TypingIndicator
