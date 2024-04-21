import React from 'react'

const Nave = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand d-md-none d-xs-block py-3" href="/">
                        <img src="/images/logo.jpeg" height="40" alt="Company Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto">
                            
                            <li className="nav-item">
                                <a className="nav-link mx-2 active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mx-2" aria-current="page" href='/profile'>Profile</a>
                            </li>
                            
                            <li className="nav-item">
                                <a className="nav-link mx-2 px-3 btn rounded-0 btn-danger" id="profileBtn" href='/logout'>Log out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    </div>
  )
}

export default Nave
