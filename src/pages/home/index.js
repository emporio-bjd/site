import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.css'

import imgTeste from '../../img/imgTeste1.jpeg'
import imgTeste2 from '../../img/imgTeste2.jpeg'
import imgTeste4 from '../../img/imgTeste4.png'
import imgTeste5 from '../../img/imgTeste5.png'
import imgTeste6 from '../../img/imgTeste6.webp'

function Home() {


    // vai vir da api
    const data = [

        {
            imageSrc: imgTeste4,
            title: 'Titulo',
            desc: "descricao"

        },
        {
            imageSrc: imgTeste2,
            title: 'Titulo',
            desc: "descricao"

        },
        {
            imageSrc: imgTeste6,
            title: 'Titulo',
            desc: "descricao"

        },
        {
            imageSrc: imgTeste5,
            title: 'Titulo',
            desc: "descricao"

        },
        {
            imageSrc: imgTeste6,
            title: 'Titulo',
            desc: "descricao"

        },
        {
            imageSrc: imgTeste4,
            title: 'Titulo',
            desc: "descricao"

        }

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

                    <div className='boxHome'>

                        <img src={item.imageSrc} alt='teste' />
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>

                    </div>

                ))
            }

        </section>

        <Footer />

    </div>

  );
}

export default Home;
