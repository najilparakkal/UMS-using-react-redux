import React from 'react'
import {  useSelector } from 'react-redux'
import Nave from '../navbar/Nave';


function Home() {
  const userDetails =useSelector(state => state.reducer.userDetails);
  return (
    <div>
       <body>
            <Nave/>
            <br />
            <div id="wrapper">
                <header id="header">
                <br />
                    <span className="avatar">
                        {/* <img src={userDetails.image ? userDetails.image :"" } alt="" width="173" height="178" /> */}
                    </span>
                    <h1>
                        <strong style={{display:'flex',alignItems:'center',justifyContent:'center',paddingTop:'200px',color:'white'}} >Welcome {userDetails.name}</strong>                    <br />                                      <br />
           <br />
           <br />


                    </h1>
                    <br />
                </header>
                <section id="main">
                    <section className="thumbnails">
                        <div>
                        </div>
                    </section>
                </section>
                <br />
            </div>
            <script src="./assets/js/jquery.min.js"></script>
            <script src="./assets/js/jquery.poptrox.min.js"></script>
            <script src="./assets/js/skel.min.js"></script>
            <script src="./assets/js/main.js"></script>
        </body>
    </div>
  )
}

export default Home
