import React from 'react'
import './style.scss'

import logoEmporio2 from '../../img/logoEmporio2.png'

import BigHeader from '../../components/bigheader'
import Footer from '../../components/footer'

function About() {
    return (

        <div className="App">

            <BigHeader />

            <div className="about-section">
                <div className="about-container">
                    <video src='/videos/video-2.mp4' autoPlay loop muted />
                    <h1>Delivery de orgânicos</h1>
                </div>

                <div className="about-text">
                    <h2>Sobre o Empório</h2>

                      <p>
                        Nossa história começa em 2018 com uma chácara herdada na região
                        metropolitana de Curitiba. Eu, Lucimara, e meu marido Norberto
                        resolvemos reativar a chácara que era do meu pai e que estava
                        abandonada desde 2011. Queríamos tornar a chácara rentável, já que
                        meu marido havia sido demitido da empresa em que trabalhava por
                        causa da crise da época. Nossa ideia era criar galinhas para
                        comercializar ovos orgânicos.
                      </p>
                      <p>
                        Enquanto arrumávamos o imóvel, eu fazia vários cursos sobre criação
                        de galinhas e cultivo orgânico, e fui gostando cada vez mais desse
                        mundo orgânico: alimentação mais saudável, menos agressão ao meio
                        ambiente e valorização do pequeno produtor. Ao mesmo tempo, já que
                        íamos toda semana para a chácara, começamos a comercializar morangos
                        sem agrotóxicos de um vizinho. E a clientela foi aumentando. Depois
                        também começamos a trazer alguns produtos da chácara, como ovos e
                        hortaliças; pouca coisa ainda.
                      </p>
                      <p>
                        Tentamos legalizar a produção de ovos para poder comercializar em
                        Curitiba, mas, infelizmente, como o processo era muito demorado e as
                        normas muito difíceis de serem atendidas economicamente por um
                        empreendimento de pequeno porte, desistimos da criação de galinhas.
                        Ademais, precisávamos obter receita a curto prazo. Isso foi em 2019.
                      </p>
                      <p>
                        Continuamos trazendo morangos e algumas hortaliças da chácara para
                        nossos clientes em Curitiba. Com a pandemia, no início de 2020,
                        alguns deles pediram outras frutas orgânicas. Com isso buscamos
                        outros produtores orgânicos e aumentamos a variedade ofertada. Assim
                        surgiu o Empório Bom Jardim, antes Chácara Bom Jardim. E continuamos
                        sempre acrescentando produtos em nosso catálogo para melhor atender
                        aos nossos clientes.
                      </p>
                      <p>
                        Ao deixarmos de produzir na chácara e focarmos na comercialização,
                        nossos clientes passaram a ser melhor atendidos e também se mostrou
                        uma ótima opção para os pequenos agricultores da região que têm
                        dificuldade de comercializar sua produção. Passamos também a
                        produzir alimentos congelados e de panificação, o que sempre gostei
                        muito de fazer. Mais produtos para nossos clientes!
                      </p>

                    <div className="logo-2">
                        <img src={logoEmporio2} alt="logo 2 Emporio Bom Jardim" />
                    </div>

                </div>

                <div className="cards-section">

                    <h1>Nosso diferencial</h1>

                    <div className="cards">
                        <div className="card-item">
                            <table className="card-table">
                                <tr>
                                    <td>
                                        <h2 className="card-number">01</h2>
                                    </td>
                                    <td>
                                        <h3>Atendimento personalizado</h3>
                                    </td>
                                </tr>
                                <tr>
                                <td colspan="2">
                                    <p>
                                    O cliente pode fazer seu pedido de acordo com seu consumo,
                                    não se prendendo a pesos e quantidades pré-determinados.
                                    </p>
                                </td>
                                </tr>
                            </table>
                            </div>
                            <div className="card-item">
                            <table className="card-table">
                                <tr>
                                    <td>
                                        <h2 className="card-number">02</h2>
                                    </td>
                                    <td>
                                        <h3>Variedade de produtos</h3>
                                    </td>
                                </tr>
                                <tr>
                                <td colspan="2">
                                    <p>
                                    Além da diversidade de frutas e verduras, temos muitos
                                    outros produtos, incluindo cereais e processados.
                                    </p>
                                </td>
                                </tr>
                            </table>
                            </div>
                            <div className="card-item">
                            <table className="last-one card-table">
                                <tr>
                                    <td>
                                        <h2 className="card-number">03</h2>
                                    </td>
                                    <td>
                                        <h3>Alimentos prontos congelados</h3>
                                    </td>
                                </tr>
                                <tr>
                                <td colspan="2" className="card-text">
                                    <p>Produção própria.</p>
                                </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="process-section">
                    <div className="process-text">
                        <h1>Nosso processo</h1>

                        <p>
                        Nossa lista de produtos disponíveis é atualizada toda
                        quinta-feira, e os clientes podem fazer os pedidos até sábado para
                        programação da colheita e produção dos itens de panificação. Na
                        segunda-feira, as hortaliças são colhidas e, na terça, separamos
                        todos os pedidos e entregamos tudo fresquinho para os clientes.
                        </p>
                    </div>

                    <div className="process-wrapper">
                        <div className="cards-process">
                            <div className="card-process1">
                                <table className="process-table">
                                <tr>
                                        <td>
                                        <h2 className="card-number">01</h2>
                                        </td>
                                        <td>
                                        <h3>Panificação</h3>
                                        </td>
                                </tr>
                                <tr>
                                    <td colspan="2" className="card-text">
                                    <p>
                                        Pães e bolos caseiros produzidos na segunda-feira com
                                        matéria prima orgânica, tendo todo o cuidado com a
                                        higiene, com muito carinho para nossos clientes.
                                    </p>
                                    </td>
                                </tr>
                                </table>
                            </div>
                            <div className="card-process2">
                                <table className="process-table">
                                <tr>
                                        <td>
                                        <h2 className="card-number">02</h2>
                                        </td>
                                        <td>
                                        <h3>Hortaliças</h3>
                                        </td>
                                </tr>
                                <tr>
                                    <td colspan="2" className="card-text">
                                    <p>
                                        Pequenos agricultores parceiros, todos com certificação
                                        orgânica e boas práticas de manipulação de alimentos.
                                    </p>
                                    </td>
                                </tr>
                                </table>
                            </div>
                            <div className="card-process1">
                                <table className="process-table">
                                <tr>
                                        <td>
                                        <h2 className="card-number">03</h2>
                                        </td>
                                        <td>
                                        <h3>Produtos orgânicos</h3>
                                        </td>
                                </tr>
                                <tr>
                                    <td colspan="2" className="card-text">
                                    <p>
                                        Verduras e legumes são cultivados sem uso de
                                        agrotóxicos. somente com controle biológico e adubos
                                        orgânicos.
                                    </p>
                                    </td>
                                </tr>
                                </table>
                            </div>
                            <div className="card-process2">
                                <table className="process-table">
                                <tr>
                                        <td>
                                        <h2 className="card-number">04</h2>
                                        </td>
                                        <td>
                                        <h3>Jornada do produto até sua mesa</h3>
                                        </td>
                                </tr>
                                <tr>
                                    <td colspan="2" className="card-text">
                                    <p>
                                        Todos os pedidos são recebidos pelos produtores até
                                        domingo à noite. Na segunda, os produtos são colhidos e
                                        entregues ao Empório. E, na terça, são separados e
                                        entregues aos clientes.
                                    </p>
                                    </td>
                                </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About
