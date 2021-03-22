import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.css'

import imgTeste from '../../img/imgTeste1.jpeg'
import imgTeste2 from '../../img/imgTeste2.jpeg'
import imgTeste4 from '../../img/imgTeste4.png'
import imgTeste5 from '../../img/imgTeste5.png'
import imgTeste6 from '../../img/imgTeste6.webp'

function Home() {

    const data = [

        {
            ImageSrc: '',
            title: 'Titulo',
            desc: "descricao"

        },
        {
            ImageSrc: '',
            title: 'Titulo',
            desc: "descricao"

        },
        {
            ImageSrc: '',
            title: 'Titulo',
            desc: "descricao"

        },


    ]

  return (

    <div className="App">

        <Header />

        <div className='search' >

            <h1>Empório Bom Jardim</h1>

            <input type="text" placeholder="Procurar.." />

        </div>

        <section>

            {
                data.map(item => (

                    <div>

                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>

                    </div>

                ))
            }

            {/* <div>

                <img src={imgTeste4} alt='teste' />

                <h3>Frutinha hummm</h3>
                <p>Frutas sem nenhum agrotóxico, coisa fina mesmo. Pegamos direto ali do pé do seu zé.</p>

            </div>

            <div>

                <img src={imgTeste6} alt='teste' />

                <h3>Coisa boa é uma fruta né</h3>
                <p>Teste teste teste</p>

            </div>

            <div>

                <img src={imgTeste5} alt='teste' />

                <p>Teste teste teste</p>

            </div>

            <div>

                <img src={imgTeste2} alt='teste' />

                <h3>Hummm saudável</h3>
                <p>Tudo quanto é cor de maçã tem aqui em</p>

            </div>

            <div>

                <img src={imgTeste5} alt='teste' />

                <p>Teste teste teste</p>
                <p>Teste teste teste</p>
                <p>Teste teste teste</p>
                <p>Teste teste teste</p>

            </div>

            <div>

                <img src={imgTeste4} alt='teste' />

                <p>Teste teste teste</p>

            </div>

            <div>

                <img src={imgTeste6} alt='teste' />

                <h3>Criatividade acabou</h3>
                <p>Teste teste teste</p>

            </div>

            <div>

                <img src={imgTeste2} alt='teste' />

                <p>Teste teste teste</p>
                <p>Teste teste teste</p>

            </div>

            <div>

                <img src={imgTeste} alt='teste' />

                <p>Teste teste teste</p>

            </div> */}

        </section>

        <Footer />

    </div>

  );
}

export default Home;
