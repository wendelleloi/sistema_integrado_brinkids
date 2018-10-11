import React from 'react';
import axios from 'axios';
import TypesInput from '../TypesInput.js';

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Saida_Crianca.css';
import './css/style.css';


class SaidaCrianca extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: "MostraCrianca",
            listAdultos: [],
            listCrianca: [],
            CriancasSelecionadas: [],
            
            //Adulto
            NameAdult: "",
            PhoneAdult: "",
            CPFAdult: "",
            ObsAdult: "",
            PhotoAdult: "",
            //Crianca
            Interacao: 1,
            NomeC: "",
            Produto: "",
            PhotoC: "",
            IdadeC: "",
            TempoC: "",
            ObsC: "",
            RetC: "",
            Valor: "",
            Desconto: "",

        }

        this.ChangeValue = this.ChangeValue.bind(this);

        axios.get('/dashboards')
            .then((response) => {
                console.log("Dentro do axios: " + this)
                this.setState({
                    listAdultos: response.data,
                });
            }).catch((error) => {
                console.log("Não deu certo");
                console.log(error)//LOG DE ERRO
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
            })

    }

    //Bloco que muda o status para o atual do formulario.
    ChangeValue(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    Selecionar = (resp1) => {
        console.log(resp1);
        var deubom = true;
        axios.get(`/adult/filter/${resp1}`)
            .then((response) => {
                console.log("Dentro do axios: " + this)
                this.setState({
                    NameAdult: response.data.name,
                    PhoneAdult: response.data.prone,
                    CPFAdult: response.data.cpf,
                    ObsAdult: response.data.observations,
                    PhotoAdult: response.data.photo,
                });

            }).catch((error) => {
                console.log("Não deu certo");
                console.log(error)//LOG DE ERRO
                deubom = false;
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
            })
        axios.get(`/dashboards/filter/${resp1}`)
            .then((response) => {
                console.log("Dentro do axios: " + this)
                this.setState({
                    listCrianca: response.data,
                });
            }).catch((error) => {
                console.log("Não deu certo");
                console.log(error)//LOG DE ERRO
                deubom = false;
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
            })
        if (deubom === true) {
            this.setState({
                page: "UsuarioAdulto",
            })
        }
    }
    selecionaCrianca(identifier) {
        let achou = false;
        console.log("Entrei aqui");
        this.state.CriancasSelecionadas.forEach((crianca, indice, array) => {
            if (crianca._id === identifier) {
                delete array[indice];
                achou = true;
            }
        });

        if (!(achou)) {
            this.state.listCrianca.forEach((crianca) => {
                if (crianca.children._id === identifier) {
                    this.state.confirmaCrianca.push(crianca);
                }
            });
        }

        this.setState({ confirmaCrianca: this.state.confirmaCrianca });
    }
    ProximaTela = (event) =>{
        event.preventDefault();
        var erros = [];
        if(this.state.CriancasSelecionadas.length > 0){
            this.setState({
                NomeC: this.state.CriancasSelecionadas[0].children.name,
                Produto: this.state.CriancasSelecionadas[0].service,
                PhotoC: this.state.CriancasSelecionadas[0].photo,
                IdadeC: this.state.CriancasSelecionadas[0].children.birthday,
                TempoC: this.state.CriancasSelecionadas[0].time,
                ObsC: this.state.CriancasSelecionadas[0].children.observations,
                RetC: this.state.CriancasSelecionadas[0].children.restrictions,
                page: "MostraCrianca",
            })
        }
        else {
            erros.push("Selecione ao menos uma criança, por favor");
            exibeMensagensDeErro(erros);
        }
        function exibeMensagensDeErro(erros){
            var ul = document.querySelector("#mensagens-erro");
            ul.innerHTML = "";

            erros.forEach(function(erro){
                var li = document.createElement("li");
                li.textContent = erro;
                ul.appendChild(li);
            });
        }
    }
    VerificaDesconto = (resp) => {
        console.log("Estou entrando");
    }


    render() {
        if (this.state.page === "Adultos") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Saida de Criança </li>
                        </ol>
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle">Escolha o Responsavel</h3>
                        <div className="graph" >
                            <div className="tables table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-center">
                                        <tr>
                                            <th>#</th>
                                            <th className="text-center">Nome</th>
                                            <th className="text-center">Telefone</th>
                                            <th>Selecionar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th style={{ fontSize: 20 + 'px' }}>1</th>
                                            <td className="td-table text-center">João</td>
                                            <td className="td-table text-center">(84) 996778800</td>
                                            <td>
                                                <button className="btn botao btn-sm" onClick={() => this.Selecionar("João", "abacate")}><i class="fa fa-check"></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ fontSize: 20 + 'px' }}>2</th>
                                            <td className="td-table text-center">Maria</td>
                                            <td className="td-table text-center">(84) 900000000</td>
                                            <td>
                                                <button className="btn botao btn-sm" onClick={() => this.Selecionar("maria", "abacate")}><i class="fa fa-check"></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ fontSize: 20 + 'px' }}>3</th>
                                            <td className="td-table text-center">Firmino</td>
                                            <td className="td-table text-center">(84) 999798909</td>
                                            <td>
                                                <button className="btn botao btn-sm" onClick={() => this.Selecionar("firmino", "abacate")}><i class="fa fa-check"></i></button>
                                            </td>
                                        </tr>
                                        {/* {this.state.listAdultos.map((resp, indice) => {
                                            return (
                                                <tr key={desconto._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td > {resp.adult.name} </td>
                                                    <td >{resp.adult.phone} </td>
                                                    <td ><button className="btn botao btn-xs" onClick={() => this.Selecionar(resp.adult.name)}>Selecionar</button></td>
                                                </tr>
                                            );
                                        })} */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.page === "UsuarioAdulto") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Saida de Criança </li>
                        </ol>
                    </div>
                    <div className="graph-visual" >
                        <h3>Responsavel Escolhido</h3>
                        <div className="graph" >
                            <div className="row">
                                <div className="col-md-4 col-sm-12 com-xs-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>Nome:</b></h5>
                                        <p>{this.state.NameAdult}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 com-xs-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>Telefone:</b></h5>
                                        <p>{this.state.PhoneAdult}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 com-xs-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>CPF:</b></h5>
                                        <p>{this.state.CPFAdult}</p>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="graph" style = {{ padding:10 + "px"}}>
                                        <h5 className = "ltTitulo"><b> Observações: </b></h5>
                                        <p>{this.state.ObsAdult}</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Sua Foto: </b></h5>
                                        <img src={"http://localhost:3000/img-users/" + this.state.PhotoAdult} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="graph">
                            <div className="tables table-responsive">
                                <form>
                                    <table className="table table-hover">
                                        <thead className="text-center">
                                            <tr>
                                                <th>#</th>
                                                <th className="text-center">Nome</th>
                                                <th className="text-center">Produto</th>
                                                <th className="text-center">Tempo</th>
                                                <th>Selecionar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th style={{ fontSize: 20 + 'px' }}>1</th>
                                                <td className="td-table text-center">Mariazinha</td>
                                                <td className="td-table text-center">Aniversario</td>
                                                <td className="td-table text-center"> 10/10/2018 - 12:00</td>
                                                <td>
                                                    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selecionaCrianca("abacate")} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th style={{ fontSize: 20 + 'px' }}>2</th>
                                                <td className="td-table text-center">Maria</td>
                                                <td className="td-table text-center">Aniversario</td>
                                                <td className="td-table text-center"> 10/10/2018 - 12:00</td>
                                                <td>
                                                    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selecionaCrianca("abacate")} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th style={{ fontSize: 20 + 'px' }}>3</th>
                                                <td className="td-table text-center">Firmino</td>
                                                <td className="td-table text-center">Aniversario</td>
                                                <td className="td-table text-center"> 10/10/2018 - 12:00</td>
                                                <td>
                                                    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selecionaCrianca("abacate")} />
                                                </td>
                                            </tr>
                                            {/* {this.state.listChianca.map((resp, indice) => {
                                            return (
                                                <tr key={desconto._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td > {resp.children.name} </td>
                                                    <td >{resp.service}</td>
                                                    <td>{resp.time}
                                                    <td ><input type="checkbox" name="selectchild" value="true" onClick={() => this.selecionaCrianca(findChild._id)} /></td>
                                                </tr>
                                            );
                                        })} */}
                                        </tbody>
                                    </table>
                                    <br></br>
                                    <div className="text-center">
                                        <a className="btn btn-md botao" href="/">Cancelar</a>
                                        <button className="btn btn-md botao botaoAvançar" onClick={this.ProximaTela}>Proximo</button>
                                        <ul id="mensagens-erro" style={{color: "red"}}></ul>
                                    </div>  
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.page === "MostraCrianca"){
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Saida de Criança </li>
                        </ol>
                    </div>
                    <div className="graph-visual" >
                        <h3>Apresentar Crianças</h3>
                        <div className="graph" >
                            <div className="row">
                                <div className="col-md-6 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Sua Foto: </b></h5>
                                        <img src={"http://localhost:3000/img-users/" + this.state.PhotoC} />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>Nome:</b></h5>
                                        <p>{this.state.NomeC}</p>
                                    </div>
                                    <br></br>
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>Idade:</b></h5>
                                        <p>{this.state.IdadeC}</p>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="graph" style = {{ padding:10 + "px"}}>
                                        <h5 className = "ltTitulo"><b> Observações: </b></h5>
                                        <p>{this.state.ObsAdult}</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="graph" style = {{ padding:10 + "px"}}>
                                        <h5 className = "ltTitulo"><b> Restrições: </b></h5>
                                        <p>{this.state.ObsAdult}</p>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-md-4 col-sm-12 com-xs-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>Tempo:</b></h5>
                                        <p>{this.state.TimeC}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 com-xs-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>Produto:</b></h5>
                                        <p>{this.state.Produto}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 com-xs-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>Valor:</b></h5>
                                        <p>{this.state.Valor}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="graph">
                            <form>
                                <TypesInput cod = {1} ClassDiv = {"col-md-12 col-sm-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Codigo do Desconto:"} type = {"text"} id = {"cod"} name= {"Desconto"} Class = {"form-control"} value = {this.state.Desconto}onChange={this.ChangeValue}/>
                                <div className ="text-center">
                                    <button className="btn btn-md botao" onClick={() => this.VerificaDesconto(this.state.Desconto)}>Validar Desconto</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default SaidaCrianca;
