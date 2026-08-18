import React from 'react'
import { useSelector } from 'react-redux'
import NoticesList from './NoticesList'
import ResidentNotices from '../resident-portal/ResidentNotices'

const NoticesPage = () => {
  const role = useSelector((state) => state.auth.role)

  if (role === 'resident') {
    return <ResidentNotices />
  }

  return <NoticesList />
}

export default NoticesPage
