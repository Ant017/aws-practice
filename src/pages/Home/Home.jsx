import React from 'react'
import './Home.scss'
import Header from '../../components/header/header'
// import { Form } from 'react-router-dom'
import Form from '../../components/form/form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AuthSection from '../../components/AuthSection/AuthSection'

function Home() {
  const navigate = useNavigate()

  return (
    <>
      <div className="bg-img">
        <div className="container">
          <div className='topnav-container'>
            <Header />
            <AuthSection />
          </div>
          <div className="welcome">
            <h1 className="heading">Once Upon A Time</h1>
            <p className="heading-text">Dive into the realm of books!</p>
            <button className="btn" onClick={() => {
              navigate('/view-books-general')
            }}>Explore
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
