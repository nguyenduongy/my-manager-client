import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1"> 2021 My Manager.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Performed by</span>
        <a href="http://localhost:3000/" target="_blank" rel="noopener noreferrer">
          Nguyện-Minh-Huy
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
