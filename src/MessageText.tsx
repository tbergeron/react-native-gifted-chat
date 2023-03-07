import PropTypes from 'prop-types'
import React from 'react'
import {
  Linking,
  StyleSheet,
  View,
  TextProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native'
import Markdown from 'react-native-markdown-display'

// @ts-ignore
import { LeftRightStyle, IMessage } from './Models'
import { StylePropType } from './utils'

const { textStyle } = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    lineHeight: 20,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
})

const styles = {
  left: StyleSheet.create({
    container: {},
    text: {
      color: 'black',
      ...textStyle,
    },
    link: {
      color: 'black',
      textDecorationLine: 'underline',
    },
  }),
  right: StyleSheet.create({
    container: {},
    text: {
      color: 'white',
      ...textStyle,
    },
    link: {
      color: 'white',
      textDecorationLine: 'underline',
    },
  }),
}

export interface MessageTextProps<TMessage extends IMessage> {
  position?: 'left' | 'right'
  optionTitles?: string[]
  currentMessage?: TMessage
  containerStyle?: LeftRightStyle<ViewStyle>
  textStyle?: LeftRightStyle<TextStyle>
  linkStyle?: LeftRightStyle<TextStyle>
  textProps?: TextProps
  customTextStyle?: StyleProp<TextStyle>
  parsePatterns?(linkStyle: TextStyle): any
}

export function MessageText<TMessage extends IMessage = IMessage>({
  currentMessage = {} as TMessage,
  position = 'left',
  containerStyle,
  textStyle,
  customTextStyle,
}:
MessageTextProps<TMessage>) {
  // const { actionSheet } = useChatContext()

  // TODO: React.memo
  // const shouldComponentUpdate = (nextProps: MessageTextProps<TMessage>) => {
  //   return (
  //     !!currentMessage &&
  //     !!nextProps.currentMessage &&
  //     currentMessage.text !== nextProps.currentMessage.text
  //   )
  // }

  const onLinkPress = (url: string) => {
    if (url) {
      return false;
    }
    Linking.openURL(url);
    return true;
  };

  const mergedStyles = StyleSheet.flatten([
    styles[position].text,
    textStyle && textStyle[position],
    customTextStyle,
  ])

  // const container: ViewStyle = containerStyle && containerStyle[position];
  const backgroundColor = '#000000';

  const markdownStyles = StyleSheet.create({
    body: mergedStyles,
    code_block: {
      backgroundColor: backgroundColor
    },
    code_inline: {
      backgroundColor: backgroundColor
    }
  });

  return (
    <View
      style={[
        styles[position].container,
        containerStyle && containerStyle[position],
      ]}
    >
      <Markdown onLinkPress={onLinkPress} mergeStyle={true} style={markdownStyles}>
        {currentMessage!.text}
      </Markdown>
    </View>
  )
}

MessageText.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  optionTitles: PropTypes.arrayOf(PropTypes.string),
  currentMessage: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: StylePropType,
    right: StylePropType,
  }),
  textStyle: PropTypes.shape({
    left: StylePropType,
    right: StylePropType,
  }),
  linkStyle: PropTypes.shape({
    left: StylePropType,
    right: StylePropType,
  }),
  parsePatterns: PropTypes.func,
  textProps: PropTypes.object,
  customTextStyle: StylePropType,
}
