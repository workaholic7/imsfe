import React from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';


function TableView(props) {
    return (
        <div>
            <Table striped bordered hover size="sm" responsive >
                <thead>
                    <tr>
                        {props.header.map((element, index) =>
                            <th key={index}>{element}</th>
                        )}
                        {props.download ? <th></th> : <React.Fragment key={'download'}></React.Fragment>}
                        {props.delete ? <th></th> : <React.Fragment key={'delete'}></React.Fragment>}
                        {props.edit ? <th></th> : <React.Fragment key={'edit'}></React.Fragment>}


                    </tr>
                </thead>
                <tbody>
                    {props.body.map((element, index) =>
                        <tr key={index}>

                            {Object.keys(element).map((key, index) =>
                                key !== 'id' ? <td key={key + '_' + index}>
                                    {element[key]}
                                </td> : <React.Fragment key={'id'+index}></React.Fragment>
                            )}
                            {props.download ? <td><FontAwesomeIcon icon={faArrowAltCircleDown} size="lg" onClick={() => props.download(element.id, element[props.downloadFileName])} /></td>
                                : <React.Fragment key={'download'+index}></React.Fragment>}
                            {props.delete ? <td><FontAwesomeIcon icon={faTrashAlt} size="lg" onClick={() => props.delete(element.id)} /></td>
                                : <React.Fragment key={'delete'+index}></React.Fragment>}
                            {props.edit ? <td><FontAwesomeIcon icon={faEdit} size="lg" onClick={() => props.edit(element.id)} /></td>
                                : <React.Fragment key={'edit'+index}></React.Fragment>}
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default TableView;

