import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import slug from 'slug'

import Loading from './Loading'

function CustomLink({ to, children }) {
  return (
    <Route
      path={to.pathname}
      children={({ match }) => (
        <Link to={to} style={{listStyleType: 'none', fontWeight: match ? 'bold' : 'normal'}}>
          {children}
        </Link>
      )}
    />
  )
}

export default function Sidebar({ title, list, loading, match, location }) {
  return loading
    ? <Loading />
    : <div>
        <h3 className='header'>
          {title}
        </h3>
        <ul className='sidebar-list'>
          {list.map((item) => (
            <CustomLink
              key={item}
              to={{
                pathname:`${match.url}/${slug(item)}`,
                search: location.search
              }}
            >
              {item.toUpperCase()}
            </CustomLink>
          ))}
        </ul>
      </div>
}

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}
