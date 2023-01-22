/// <reference types="react" />
interface Props {
    isTyping?: boolean;
    backgroundColor?: string;
    dotColor?: string;
}
declare const TypingIndicator: ({ isTyping, backgroundColor, dotColor }: Props) => JSX.Element;
export default TypingIndicator;
