import React, { useState, useContext } from 'react'
import querystring from 'querystring'
import styled from 'styled-components'
// context
import HeaderContext from '../contexts/header-context'
// utils
import linkUtils from '../utils/links'
// @twreporter
import Link from '@twreporter/react-components/lib/customized-link'
import { IconButton } from '@twreporter/react-components/lib/button'
import { Member, Search, Bookmark } from '@twreporter/react-components/lib/icon'
import { Dialog } from '@twreporter/react-components/lib/card'
import { SearchBar } from '@twreporter/react-components/lib/input'
import { useOutsideClick } from '@twreporter/react-components/lib/hook'

const IconsContainer = styled.div`
  display: flex;
`

const IconContainer = styled.div`
  position: relative;
  margin-right: 16px;
  a {
    display: flex;
  }
`

const Container = styled.div`
  opacity: ${props => (props.isSearchOpened ? '0' : '1')};
  transition: opacity 300ms ease;
`

const LogContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const SearchContainer = styled.div`
  opacity: ${props => (props.isSearchOpened ? '1' : '0')};
  transition: opacity 300ms ease;
  position: absolute;
  right: 0;
  top: -16px;
  z-index: ${props => (props.isSearchOpened ? 999 : -1)};
`

const StyledDialog = styled(Dialog)`
  opacity: ${props => (props.showDialog ? '1' : '0')};
  transition: opacity 100ms;
  position: absolute;
  top: 24px;
  right: -16px;
  width: max-content;
  cursor: pointer;
`

const LogInOutIcon = () => {
  const [showDialog, setShowDialog] = useState(false)
  const { releaseBranch, theme, isAuthed } = useContext(HeaderContext)
  const onClickIcon = e => {
    e.preventDefault()

    if (isAuthed) {
      setShowDialog(!showDialog)
      return
    }
    const redirectURL = window.location.href
    const query = querystring.stringify({ destination: redirectURL })
    window.location = linkUtils.getLogoutLink(releaseBranch).to + '?' + query
  }
  const onClickLogOut = e => {
    e.preventDefault()

    const redirectURL = window.location.href
    const query = querystring.stringify({ destination: redirectURL })
    window.location = linkUtils.getLoginLink(releaseBranch).to + '?' + query
  }
  const closeDialog = () => setShowDialog(false)
  const ref = useOutsideClick(closeDialog)

  const Icon = <Member releaseBranch={releaseBranch} />
  return (
    <IconContainer key="login">
      <LogContainer onClick={onClickIcon} ref={ref}>
        <IconButton iconComponent={Icon} theme={theme} />
        <StyledDialog
          text="登出"
          size="L"
          showDialog={showDialog}
          onClick={onClickLogOut}
        />
      </LogContainer>
    </IconContainer>
  )
}

const SearchIcon = () => {
  const [isSearchOpened, setSearchOpened] = useState(false)
  const { isLinkExternal, releaseBranch, theme } = useContext(HeaderContext)

  const closeSearchBox = () => {
    setSearchOpened(false)
  }
  const handleClickSearch = e => {
    e.preventDefault()
    setSearchOpened(true)
    if (!ref.current) {
      return
    }
    const input = ref.current.getElementsByTagName('INPUT')[0]
    if (input) {
      input.focus()
    }
  }
  const onSearch = keywords => {
    if (!window) {
      return
    }
    window.location = `${
      linkUtils.getSearchLink(isLinkExternal, releaseBranch).to
    }?q=${keywords}`
  }

  const Icon = <Search releaseBranch={releaseBranch} />
  const ref = useOutsideClick(closeSearchBox)
  return (
    <IconContainer ref={ref} key="search">
      <Container onClick={handleClickSearch} isSearchOpened={isSearchOpened}>
        <IconButton iconComponent={Icon} theme={theme} />
      </Container>
      <SearchContainer isSearchOpened={isSearchOpened}>
        <SearchBar
          placeholder="關鍵字搜尋"
          theme={theme}
          onClose={closeSearchBox}
          onSearch={onSearch}
        />
      </SearchContainer>
    </IconContainer>
  )
}

const BookmarkIcon = () => {
  const { releaseBranch, isLinkExternal, theme } = useContext(HeaderContext)
  const link = linkUtils.getBookmarksLink(isLinkExternal, releaseBranch)
  const Icon = <Bookmark releaseBranch={releaseBranch} />

  return (
    <IconContainer key="bookmark">
      <Link {...link}>
        <IconButton iconComponent={Icon} theme={theme} />
      </Link>
    </IconContainer>
  )
}

const Icons = () => (
  <IconsContainer>
    <SearchIcon />
    <BookmarkIcon />
    <LogInOutIcon />
  </IconsContainer>
)

export default Icons
