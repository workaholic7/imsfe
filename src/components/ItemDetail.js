import React, { useState, useEffect, useRef } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { BASE_URL, REST_API } from '../Constants';
import ItemRow from './ItemRow';
import FormSelect from './common/FormSelect';

function ItemDetail({ formData, setFormData, disableSaveButton }) {

    const childRefs = useRef([]);

    const [itemType, setItemType] = useState([{ id: "", name: "" }]);
    const [itemRow, setItemRow] = useState([]);
    const [rowId, setRowId] = useState(0);
    const [itemTypeId, setItemTypeId] = useState("");
    const [showCalculateButton, setShowCalculateButton] = useState(true);
    
    const getItemTypes = () => {
        var url = BASE_URL + REST_API.GET_ITEM_TYPES;
        fetch(url, {
            method: 'GET'
        }).then(response => {
            console.log(response);
            if (response.status === 200 || response.status === 404)
                return response.json();
        }).then(res => {
            setItemType(res);
        }).catch(err=>{
            console.log(err);
        })
    }

    const updateItemTypeId = (e) => {
        setItemTypeId(e.target.value);
    }

    const addItemRow = () => {
        const items = Object.assign([], itemRow);
        items.push(<ItemRow key={rowId} rowId={rowId} itemTypeId={itemTypeId} deleteRow={deleteRow} ref={ins => childRefs.current[rowId] = ins} formData={formData} setFormData={setFormData} />);
        setItemRow(items);
        setRowId(rowId + 1);
        setShowCalculateButton(false);
        disableSaveButton(true);
    }

    const deleteRow = (rowId) => {
        //itemRow.splice(rowId, 1);
        const items = Object.assign([], itemRow);
        items.splice(rowId, 1);
        setItemRow(items);
        childRefs.current.splice(rowId, 1);
        setShowCalculateButton(false);
        disableSaveButton(true);
    }

    const calculate = () => {
        var total = 0;
        var items = [];
        childRefs.current.forEach(child => {
            if (child != null) {
                total += child.getTotal();
                items.push(child.getItemDetail());
            }
        })
        setFormData({ ...formData, total, items });
        disableSaveButton(false);
    }

    useEffect(() => {
        getItemTypes();
    }, []);

    return (
       <>
            <div style={{ textAlign: 'left', fontWeight: 'bold', marginTop: '20px' }}>Item Details</div>
            <hr />

            <Row>
                <Col md={4}>
                    <FormSelect label="Add Item" span="8" labelSpan="4" labelOffset="0" dropDownList={itemType} placeholder="Select Item" onChange={updateItemTypeId} />

                </Col>
                <Col md={2}>
                    <Button className="add-button" onClick={addItemRow} disabled={itemTypeId===""}>Add</Button>
                </Col>
            </Row>
            {itemRow.length>0?
                <Row>
                <Col md={{ span: 3, offset: 0 }}>
                Item Description
            </Col>

            <Col md={{ span: 2, offset: 0 }}>
                QTY
            </Col>

            <Col md={{ span: 2, offset: 0 }}>
                Unit Price(RM)
            </Col>

            <Col md={{ span: 2, offset: 0 }}>
                Amount(RM)
            </Col>
            
        </Row>
            
            :<></>}
            {itemRow}
            <Row>
                <Col>
                    <Button className="calculate-button" onClick={() => calculate()} disabled={showCalculateButton}>Calculate</Button>
                </Col>
            </Row>
</>

 );
}

export default ItemDetail;