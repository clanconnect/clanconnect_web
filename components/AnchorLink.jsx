'use client';
import React from 'react'
import { Link } from '@/lib/router'

const AnchorLink = ({href, children,className}) => {
  return (
    <Link to={href} className=
    {className}>{children}</Link>
  )
}

export default AnchorLink


