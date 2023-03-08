import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';
import { DEFAULT_PLACEHOLDER } from './Constant';
import Color from './Color';
import { StylePropType } from './utils';
const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        lineHeight: 16,
        ...Platform.select({
            web: {
                paddingTop: 6,
                paddingLeft: 4,
            },
        }),
        marginTop: Platform.select({
            ios: 6,
            android: 0,
            web: 6,
        }),
        marginBottom: Platform.select({
            ios: 5,
            android: 3,
            web: 4,
        }),
    },
});
export function Composer({ disableComposer = false, keyboardAppearance = 'default', multiline = true, onTextChanged = () => { }, placeholder = DEFAULT_PLACEHOLDER, placeholderTextColor = Color.defaultColor, text = '', textInputAutoFocus = false, textInputProps = {}, textInputStyle, setComposerHeight = () => { } }) {
    return (<TextInput testID={placeholder} accessible accessibilityLabel={placeholder} placeholder={placeholder} placeholderTextColor={placeholderTextColor} multiline={multiline} editable={!disableComposer} onChangeText={onTextChanged} onContentSizeChange={event => {
            setComposerHeight(event.nativeEvent.contentSize.height);
        }} style={[
            styles.textInput,
            textInputStyle,
            {
                paddingBottom: 15,
                ...Platform.select({
                    web: {
                        outlineWidth: 0,
                        outlineColor: 'transparent',
                        outlineOffset: 0,
                    },
                }),
            },
        ]} autoFocus={textInputAutoFocus} value={text} enablesReturnKeyAutomatically underlineColorAndroid='transparent' keyboardAppearance={keyboardAppearance} {...textInputProps}/>);
}
Composer.propTypes = {
    setComposerHeight: PropTypes.func,
    composerHeight: PropTypes.number,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    textInputProps: PropTypes.object,
    onTextChanged: PropTypes.func,
    onInputSizeChanged: PropTypes.func,
    multiline: PropTypes.bool,
    disableComposer: PropTypes.bool,
    textInputStyle: StylePropType,
    textInputAutoFocus: PropTypes.bool,
    keyboardAppearance: PropTypes.string,
};
//# sourceMappingURL=Composer.js.map