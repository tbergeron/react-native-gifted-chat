import * as React from 'react'

export interface IGiftedChatContext {
  value: any
}

export const GiftedChatContext = React.createContext<any>({
  value: {}
})

export const useChatContext = () => React.useContext(GiftedChatContext)
