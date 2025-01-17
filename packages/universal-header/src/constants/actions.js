export const actionKeys = {
  support: 'support',
  newsLetter: 'newsLetter',
}

export const ACTION_LABEL = {
  row: {
    [actionKeys.support]: '贊助',
    [actionKeys.newsLetter]: '訂閱',
  },
  column: {
    [actionKeys.support]: '贊助我們',
    [actionKeys.newsLetter]: '訂閱電子報',
  },
}

export const ACTION_BUTTON_TYPE = {
  [actionKeys.support]: 'primary',
  [actionKeys.newsLetter]: 'secondary',
}

export const actionOrder = {
  mobile: [actionKeys.support],
  desktop: [actionKeys.newsLetter, actionKeys.support],
  hamburger: [actionKeys.newsLetter, actionKeys.support],
}

export default {
  actionKeys,
  actionOrder,
  ACTION_LABEL,
  ACTION_BUTTON_TYPE,
}
