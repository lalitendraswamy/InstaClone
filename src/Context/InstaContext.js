import React from 'react'

const InstaContext = React.createContext({
  searchText: '',
  searchStatus: 'loading',
  searchBtnClick: false,
  searchList: [],
  onClickSearchBtn: () => {},
  updateSearchText: () => {},
})

export default InstaContext
