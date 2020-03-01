//para crear el componente
import React, { Component } from 'react';
//creacion de un componente

//creacion de la clase del componente
class MiComponente extends React.Component {
    //metodo render
    render() {
        let distros = {
            nombre: 'Preferidas',
            distro: ['Ubuntu', 'Fedora', 'Mate'],
            Uso: 'programar'

        };
        //que devuelve
        return (
            <div>
                <p>{'Distribuciones ' + distros.nombre}</p>
                <p>{'Cuales uso: '}</p>
                <ol>
                    {
                        //bucle
                        distros.distro.map((distro, i) => {
                            //que se devuelve
                            return (
                                <li key={i}>
                                    {distro}
                                </li>
                            )
                        })


                    }




                </ol>

            </div>
        );



    }



}

export default MiComponente;