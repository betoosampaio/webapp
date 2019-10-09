import React from 'react';
import styles from './StyleHome.css';








class Home extends React.Component {



  render() {
    return (
      <div>


        <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">

          <div class="container">

            <a class="navbar-brand" href="index.html">Freedapp</a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">

              <span class="oi oi-menu"></span> Menu
  </button>


            <div class="collapse navbar-collapse" id="ftco-nav">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active"><a href="index.html" class="nav-link">Home</a></li>
                <li class="nav-item"><a href="about.html" class="nav-link">About</a></li>
                <li class="nav-item"><a href="agent.html" class="nav-link">Agent</a></li>
                4          <li class="nav-item"><a href="services.html" class="nav-link">Services</a></li>
                <li class="nav-item"><a href="properties.html" class="nav-link">Properties</a></li>
                <li class="nav-item"><a href="blog.html" class="nav-link">Blog</a></li>
                <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <div id="teste">
          <div class="overlay"></div>
          <div class="container">
            <div class="row no-gutters slider-text justify-content-center align-items-center">
              <div class="col-lg-8 col-md-6 ftco-animate d-flex align-items-end">
                <div class="text text-center">


                  <h1 class="mb-4">Freedapp</h1>
                  <h2 class="mb-4">Livre de filas</h2>
                  <p style={{ fontSize: 20 }}>Reserve. Faça seu pedido. Pague. Simples</p>
                  <form action="#" class="search-location mt-md-5"></form>
                  <div class="row justify-content-center">
                    <div class="col-lg-10 align-items-end">
                      <div class="form-group">
                        <div class="form-field">
                          <input type="text" class="form-control" placeholder="Search location" />
                          <button><span class="ion-ios-search"></span></button>



                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <footer>

          <div class="col-md">
            </div>
         
        </footer>




      </div>
        )
      }
    }
    
    export default Home;
