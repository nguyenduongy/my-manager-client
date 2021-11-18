import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilUserFollow,
  cilHome,
  cilShortText,
  cilPeople,
  cilTask,
  cilBriefcase,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem} from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/Home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Admin',
    to: '/admins',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'User',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Card',
    to: '/cards',
    icon: <CIcon icon={cilShortText} customClassName="nav-icon" />,
    
  },
  {
    component: CNavItem,
    name: 'Organization',
    to: '/organizations',
    icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
    
  },
  {
    component: CNavItem,
    name: 'Activity',
    to: '/activities',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    
  },
  {
    component: CNavItem,
    name: 'Detail',
    to: '/details',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
  },
]

export default _nav
