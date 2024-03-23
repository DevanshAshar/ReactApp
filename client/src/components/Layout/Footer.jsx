import React from 'react'

export default function Footer() {
  return (
    <footer style={{ backgroundColor:'#333',padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', placeItems: 'center' }}>
        <div>
          <h3 style={{ fontWeight: 'bold' }}>Links</h3>
          <div style={{ color: '#af99ff' }}>
            <a href='/top'>Home</a>
          </div>
        </div>
        <div>
          <a href='/#top'>
            <img src='/logo.png' alt='JobSeeker Logo' height='64rem' />
          </a>
          <h3 style={{ fontWeight: 'bold' }}>JobSeeker &copy; {new Date().getFullYear()}</h3>
        </div>
      </footer>
  )
}