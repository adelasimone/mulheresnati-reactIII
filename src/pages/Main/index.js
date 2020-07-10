import React, { Component } from 'react';
import api from '../../services/api/api';
import { Link } from 'react-router-dom';
import './styles.css';

class Main extends Component{
    state = {
        biographies: [],
        biographyInfo: [],
        page: 1
    }

    componentDidMount(){
        this.loadbiographies();
    }

    loadbiographies = async ( page = 1 ) => {
        const response = await api.get(`/biographies?page=${page}`)
        //            sprade
        const { docs, ...biographyInfo} = response.data
                
        this.setState({ biographies: docs, page, biographyInfo })
    }

    nextPage = () => {
        const { page, biographyInfo } =  this.state

        if(page === biographyInfo.pages) return

        const pageNumber = page + 1

        this.loadbiographies(pageNumber)
    }

    prevPage = () => {
        const { page } = this.state

        if( page === 1 ) return

        const pageNumber = page - 1

        this.loadbiographies(pageNumber)
    }

    render(){
        const { biographies, page, biographyInfo } = this.state;
        
        return(
            <div className="bio-list">
                { biographies.map( itemBio => (
                    <article key={ itemBio._id }>
                        <strong>{ itemBio.nome }</strong>
                        <p>{ itemBio.description}</p>
                        <Link className="read-more" to={`biography/${itemBio._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === biographyInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        )
    }
}

export default Main;