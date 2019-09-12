import React from 'react'


const Restaurante = props =>{
    return (

<div>



        <form action=' http://localhost:3000/restaurante/insert ' method='POST'>

        <h2>Registrar Restaurante</h2>

            <input type='text' placeholder='Cnpj' name='cnpj' />

            <p></p>

            <input type='text' placeholder='Nome Fantasia' name='nome_Fantasia' />

            <p></p>

            <input type='text' placeholder='Cep' name='cep' />

            <p></p>

            <input type='text' placeholder='Rua' name='rua' />


            <p></p>


            <input type='text' placeholder='Número' name='numero_endereco' />

            <p></p>

            <input type='text' placeholder='Complemento' name='complemento' />

            <p></p>

            <input type='text' placeholder='Bairro' name='bairro' />

            <p></p>

            <input type='text' placeholder='Cidade' name='cidade' />

            <p></p>

            <input type='text' placeholder='Estado' name='estado' />

            <p></p>

            <input type='text' placeholder='Celular' name='celular' />

            <p></p>

            <input type='text' placeholder='E-mail' name='email' />

            <p></p>

            <select name="banco">

            <option value="null" selected> Selecione o seu Banco </option>
            <option value="1"  > BANCO DO BRASIL – cód. 001 </option>
            <option value="2"  > CAIXA ECONÔMICA FEDERAL – cód. 104 </option>
            <option value="3"  >BCO SANTANDER (BRASIL) S.A. – cód. 033  </option>
            <option value="4"  >BCO MERCANTIL DO BRASIL S.A. – cód. 389 </option>
            <option value="5"  >CITIBANK S.A. – cód. 745 </option>
            <option value="6"  >CITIBANK N.A. – cód. 477 </option>
            <option value="7"  >BCO CREFISA S.A. – cód. 069 </option>
            <option value="8"  >BCO BMG S.A – cód. 318 </option>

          </select>

          <p></p>

         <select name="tipo_Conta">

         <option value="0"  selected> Corrente </option>

         <option value="1"  > Poupança </option>

         </select>

         <p></p>

        <input type='text' placeholder='Agência' name='agencia' />

        <p></p>

        <input type='text' placeholder='Conta' name='conta' />

        <p></p>

        <input type='text' placeholder='Cpf' name='cpf' />

        <p></p>

        <input type='text' placeholder='Nome Administrador' name='nome_Administrador' />

        <p></p>

        <input type='text' placeholder='Login Restaurante' name='login_Restaurante' />

        <p></p>

        <input type='text' placeholder='Senha' name='senha' />

        <p></p>



        <p></p>









            <button type='submit'>Submit</button>

        </form>







</div>

    )
}

export default Restaurante
