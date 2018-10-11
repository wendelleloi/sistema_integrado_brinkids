import React from 'react';
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';
import TypesInput from '../TypesInput.js';
import '../Serviços_Extras/estilo.css';


class Gaveta extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className="container-fluid" >
            <div className="sub-heard-part" >
                <ol className="breadcrumb m-b-0" >
                    <li > < a href="/" > Home </a></li >
                    <li >Porta Objetos </li>
                    
                </ol >
            </div>
            <div className="graph-visual" >
                <h3 className="inner-tittle" >Porta Objetos</h3>
                <form>
                    <div className="graph" >
                        <div className="form-group">
                            <div className="row">
                            <div className="col-md-4 col-sm-8 col-xs-12">

<input type="number" id='forms'  onChange={this.changueUnidade} value={this.state.Text} size='5' min='0' max='999' step="1" />
</div>
                            
                            </div>
                        </div>
                    
                            
                        
                    </div>
                    <br></br>
                    <div className="text-center">
                        <a className="btn btn-md botao" href="/">Cancelar</a>
                        {!this.state.editar &&(<button className="btn btn-md botao botaoAvançar" onClick={this.Salvar}>Salvar</button>)}
                        {this.state.editar &&(<button className="btn btn-md botao botaoAvançar" onClick={this.Salvar2}>Salvar</button>)}
                    </div>
                    <div>
                        <ul id="mensagens-erro" style={{ color: "red" }}></ul>
                    </div>
                </form >
            </div>
        </div>
        );
    }
}
export default Gaveta;