import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
  if (keyword) {
    keyword = keyword.split('?keyword=')[1].split('&')[0]
  }

  const adjacentPageCount = 2; // Number of adjacent pages to show
  const pagesToShow = [1]; // Always show first page
  for (let i = page - adjacentPageCount; i <= page + adjacentPageCount; i++) {
    if (i > 1 && i < pages) {
      pagesToShow.push(i)

    }
  }
  if (!pagesToShow.includes(pages) && pages > 1) {
    pagesToShow.push(pages)
  }

  return pages > 1 && (
    <Pagination>
      <LinkContainer
        to={
          !isAdmin
            ? { pathname: '/', search: `?keyword=${keyword}&page=${1}` }
            : { pathname: '/admin/productlist/', search: `?keyword=${keyword}&page=${1}` }
        }
      >
        <Pagination.First disabled={page === 1} />
      </LinkContainer>

      <LinkContainer
        to={!isAdmin ? { pathname: '/', search: `?keyword=${keyword}&page=${page - 1}` } : { pathname: '/admin/productlist/', search: `?keyword=${keyword}&page=${page - 1}` }}
      >
        <Pagination.Prev disabled={page === 1} />
      </LinkContainer>
      {pagesToShow.map((x) => (
        <LinkContainer
          key={x}
          to={!isAdmin ? { pathname: '/', search: `?keyword=${keyword}&page=${x}` } : { pathname: '/admin/productlist/', search: `?keyword=${keyword}&page=${x}` }}
        >
          <Pagination.Item active={x === page} disabled={x === page} >
            {x}
          </Pagination.Item>
        </LinkContainer>
      ))}
      <LinkContainer
        to={!isAdmin ? { pathname: '/', search: `?keyword=${keyword}&page=${page + 1}` } : { pathname: '/admin/productlist/', search: `?keyword=${keyword}&page=${page + 1}` }}
      >
        <Pagination.Next disabled={page === pages} />
      </LinkContainer>
      <LinkContainer
        to={!isAdmin ? { pathname: '/', search: `?keyword=${keyword}&page=${pages}` } : { pathname: '/admin/productlist/', search: `?keyword=${keyword}&page=${pages}` }}
      >
        <Pagination.Last disabled={page === pages} />
      </LinkContainer>
    </Pagination>
  );
}

export default Paginate

