import PropTypes from 'prop-types';
import React from 'react';
import { Linking, StyleSheet, View, Dimensions, } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { StylePropType } from './utils';
const { textStyle } = StyleSheet.create({
    textStyle: {
        fontSize: 16,
        lineHeight: 20,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
    },
});
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
};
export function MessageText({ currentMessage = {}, position = 'left', containerStyle, textStyle, customTextStyle, }) {
    // TODO: React.memo
    // const shouldComponentUpdate = (nextProps: MessageTextProps<TMessage>) => {
    //   return (
    //     !!currentMessage &&
    //     !!nextProps.currentMessage &&
    //     currentMessage.text !== nextProps.currentMessage.text
    //   )
    // }
    const onLinkPress = (url) => {
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
    ]);
    // const container: ViewStyle = containerStyle && containerStyle[position];
    const backgroundColor = '#1F2640';
    const markdownStyles = StyleSheet.create({
        body: mergedStyles,
        code_inline: {
            backgroundColor: backgroundColor,
        },
        fence: {
            backgroundColor: backgroundColor,
            borderRadius: 0,
            marginTop: 10,
            marginBottom: 10,
            fontSize: 14,
            width: Dimensions.get('screen').width - 100,
        },
        table: {
            backgroundColor: backgroundColor,
            marginTop: 10,
            marginBottom: 10,
            fontSize: 14,
            borderBottomWidth: 1,
            borderColor: '#fff',
            width: Dimensions.get('screen').width - 100,
        },
        tr: {
            borderColor: '#fff',
        },
        ordered_list: {
            marginTop: 8,
            marginBottom: 10,
            width: Dimensions.get('screen').width - 100,
        },
        bullet_list: {
            marginTop: 8,
            marginBottom: 10,
            width: Dimensions.get('screen').width - 100,
        },
    });
    // TODO: links aren't clickable anymore
    return (<View style={[
            styles[position].container,
            containerStyle && containerStyle[position],
        ]}>
      <Markdown onLinkPress={onLinkPress} mergeStyle={true} style={markdownStyles}>
        {currentMessage.text}
      </Markdown>
    </View>);
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
};
//# sourceMappingURL=MessageText.js.map