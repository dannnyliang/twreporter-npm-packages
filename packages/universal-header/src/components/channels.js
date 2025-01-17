import React, { useContext } from 'react'
import styled from 'styled-components'
import HeaderContext from '../contexts/header-context'
// util
import { getCategoryLink } from '../utils/links'
// @twreporter
import Link from '@twreporter/react-components/lib/customized-link'
import {
  CATEGORY_ORDER,
  CATEGORY_LABEL,
} from '@twreporter/core/lib/constants/category-set'
import { IconButton, TextButton } from '@twreporter/react-components/lib/button'
import { Hamburger } from '@twreporter/react-components/lib/icon'
import Divider from '@twreporter/react-components/lib/divider'
// lodash
import map from 'lodash/map'
const _ = {
  map,
}

const Item = styled.div`
  display: flex;
  align-items: center;
  a {
    text-decoration: none;
  }
`
const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 32px);
  padding: 8px 16px;
`
const ChannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Channel = ({ ...props }) => {
  const { isLinkExternal, releaseBranch, theme } = useContext(HeaderContext)
  const CategoryJsx = _.map(CATEGORY_ORDER, categoryKey => {
    const label = CATEGORY_LABEL[categoryKey]
    const link = getCategoryLink(
      isLinkExternal,
      releaseBranch,
      `categories/${categoryKey}`
    )
    return (
      <Item key={categoryKey}>
        <Link {...link}>
          <TextButton text={label} size="L" theme={theme} />
        </Link>
      </Item>
    )
  })
  const hamburgerIcon = <Hamburger releaseBranch={releaseBranch} />

  return (
    <ChannelContainer {...props}>
      <Divider />
      <CategoryContainer>
        <IconButton iconComponent={hamburgerIcon} theme={theme} />
        {CategoryJsx}
      </CategoryContainer>
      <Divider />
    </ChannelContainer>
  )
}

export default Channel
