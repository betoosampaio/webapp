import React from 'react'
import Form from 'react-bootstrap/Form'


class Logout extends React.Component {

  
  logout = async (event) => {
    console.log(this.state.formulario);

    let res = await fetch({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(this.state.formulario)
    });
    let sucess = await res.ok;
alert('Você foi deslogado com sucesso !')
    localStorage.removeItem('token');
  }


  
  componentDidMount() {
    this.logout();

}


render() {
  return (
     
 <div>

  </div>
  )
}
}
export default Logout