import React from 'react';
import './Table.scss';

function Table(props) {
    const {data} = props

    if (data.length === 0) {
        return <></>
    }

    const headers = data.shift()

    return (
        <div className='mySlides fade'>
            <table>
                <thead>
                    <tr>
                        {headers.map(header => {
                            return <th key={`th-${header}`}>{header}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => {
                        return(
                            <tr key={`tr-${i}`}>
                                {row.map((value, j) => {
                                    return <td key={`td-${i}-${j}`}>{value}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
