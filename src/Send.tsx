import * as React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native'
import { useMemoOne } from 'use-memo-one'

import Color from './Color'
import { IMessage } from './Models'
import { StylePropType } from './utils'
import { TEST_ID } from './Constant'

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'flex-end',
  },
  text: {
    color: Color.defaultBlue,
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: Color.backgroundTransparent,
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
})

export interface SendProps<TMessage extends IMessage> {
  text?: string
  label?: string
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  children?: React.ReactNode
  alwaysShowSend?: boolean
  disabled?: boolean
  sendButtonProps?: Partial<TouchableOpacityProps>
  onSend?(
    messages: Partial<TMessage> | Partial<TMessage>[],
    shouldResetInputToolbar: boolean,
  ): void
}

export const Send = <TMessage extends IMessage = IMessage>({
  text = '',
  containerStyle,
  children,
  textStyle,
  label = 'Send',
  alwaysShowSend = false,
  disabled = false,
  sendButtonProps,
  onSend = () => {},
}: SendProps<TMessage>) => {
  const handleOnPress = () =>
    onSend({ text: text.trim() } as Partial<TMessage>, false)
  const showSend = useMemoOne(
    () => alwaysShowSend || (text && text.trim().length > 0),
    [alwaysShowSend, text],
  )

  if (!showSend) {
    return null
  }

  return (
    <TouchableOpacity
      testID={TEST_ID.SEND_TOUCHABLE}
      accessible
      accessibilityLabel='send'
      style={[styles.container, containerStyle]}
      onPress={handleOnPress}
      accessibilityRole='button'
      disabled={disabled}
      {...sendButtonProps}
    >
      <View>
        {children || <Text style={[styles.text, textStyle]}>{label}</Text>}
      </View>
    </TouchableOpacity>
  )
}

Send.propTypes = {
  text: PropTypes.string,
  onSend: PropTypes.func,
  label: PropTypes.string,
  containerStyle: StylePropType,
  textStyle: StylePropType,
  children: PropTypes.element,
  alwaysShowSend: PropTypes.bool,
  disabled: PropTypes.bool,
  sendButtonProps: PropTypes.object,
}
