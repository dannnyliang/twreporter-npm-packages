import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// utils
import { selectThemeStyle } from '../utils/theme'
// components
import { Cross, Search } from '../../icon'
import { IconButton } from '../../button'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'
import { THEME, THEME_PROP_TYPES } from '@twreporter/core/lib/constants/theme'
// lodash
import get from 'lodash/get'
const _ = {
  get,
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border: none;
  border-radius: 40px;
  margin: 8px;
  background-color: ${props => props.bgColor};
`
const Container = styled.form`
  display: flex;
  align-items: center;
  ${InputContainer} {
    ${props =>
      props.focus
        ? `
      background-color: ${props.focusBgColor};
      border: 1px solid ${props.borderColor};
    `
        : ''}
    ${mq.desktopAndAbove`
      ${props =>
        props.focus
          ? `
        background-color: ${props.desktopBgColor};
      `
          : ''}
    `}
  }
`
const Input = styled.input`
  color: ${props => props.color};
  margin-right: 8px;
  height: 24px;
  &,
  &:focus,
  &:focus-visible {
    border: none;
    background-color: transparent;
    outline: none;
  }
  &:focus,
  &:focus-visible {
    &::placeholder {
      color: ${props => props.focusColor};
    }
  }
  &::placeholder {
    color: ${props => props.placeholderColor};
  }
  &::-webkit-search-cancel-button {
    display: none;
  }
`
const DesktopOnlyIconButton = styled(IconButton)`
  ${mq.tabletAndBelow`
    display: none;
  `}
`

const defaultFunc = () => {}
const SearchBar = ({
  placeholder = '',
  theme = THEME.normal,
  releaseBranch = BRANCH.master,
  onSearch = defaultFunc,
  onClose = defaultFunc,
  ...props
}) => {
  const [keywords, setKeywords] = useState('')
  const [focus, setFocus] = useState(false)
  const {
    bgColor,
    focusBgColor,
    desktopBgColor,
    borderColor,
    color,
    focusColor,
    placeholderColor,
  } = selectThemeStyle(theme)
  const SearchIcon = <Search releaseBranch={releaseBranch} />
  const CrossIcon = <Cross releaseBranch={releaseBranch} />
  const onFocus = () => {
    setFocus(true)
  }
  const onBlur = () => {
    setFocus(false)
  }
  const onSubmit = e => {
    e.preventDefault()
    onSearch(keywords)
  }
  const onChange = e => {
    e.preventDefault()
    const input = _.get(e, 'target.value', '')
    setKeywords(input)
  }
  const onReset = e => {
    e.preventDefault()
    setKeywords('')
  }
  return (
    <Container
      noValidate="novalidate"
      onSubmit={onSubmit}
      onReset={onReset}
      onFocus={onFocus}
      onBlur={onBlur}
      focus={focus}
      focusBgColor={focusBgColor}
      desktopBgColor={desktopBgColor}
      borderColor={borderColor}
      {...props}
    >
      <InputContainer bgColor={bgColor}>
        <Input
          type="search"
          placeholder={placeholder}
          color={color}
          focusColor={focusColor}
          placeholderColor={placeholderColor}
          value={keywords}
          onChange={onChange}
          autoFocus
        />
        <IconButton
          iconComponent={SearchIcon}
          theme="normal"
          onClick={onSubmit}
        />
      </InputContainer>
      <DesktopOnlyIconButton
        iconComponent={CrossIcon}
        theme={theme}
        onClick={onClose}
      />
    </Container>
  )
}
SearchBar.propTypes = {
  placeholder: PropTypes.string,
  theme: THEME_PROP_TYPES,
  releaseBranch: BRANCH_PROP_TYPES,
  onSearch: PropTypes.func,
  onClose: PropTypes.func,
}

export default SearchBar
