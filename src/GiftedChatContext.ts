import * as React from 'react'

export interface IGiftedChatContext {}

export const GiftedChatContext = React.createContext<any>({})

export const useChatContext = () => React.useContext(GiftedChatContext)
