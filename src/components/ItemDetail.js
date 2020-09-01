import React, { useState, useEffect, useRef } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { BASE_URL, REST_API } from '../Constants';
import ItemRow from './ItemRow';
import FormSelect from './common/FormSelect';

function ItemDetail({ formData, setFormData }) {

    const childRefs = useRef([]);

    const [itemType, setItemType] = useState([{ id: "", name: "" }]);
    const [itemRow, setItemRow] = useState([]);
    const [rowId, setRowId] = useState(0);
    var itmeTypeId = "";
    const setItemDetails = () => {
        const items = [...formData.items];
    }
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
        })
    }

    const setItemTypeId = (e) => {
        var id = e.target.value;
        if (id !== "") {
            itmeTypeId = id;
        }
    }

    // const addField = (item) => {
    //     var items = formData.items.push(item);
    //     setFormData({...formData, ["items"]: items});
    // }

    const addItemRow = () => {
        if (itmeTypeId !== "") {

            // not allowed AND not working
            setItemRow(itemRow => {
                const list = itemRow.push(<ItemRow key={rowId} rowId={rowId} itemTypeId={itmeTypeId} deleteRow={deleteRow} ref={ins => childRefs.current[rowId] = ins} formData={formData} setFormData={setFormData} />);

                return {
                    list
                };
            });
            //setItemRow({ itemRow.concat(<ItemRow key={rowId} rowId={rowId} itemTypeId={itmeTypeId} deleteRow={deleteRow} ref={ins => childRefs.current[rowId] = ins} formData={formData} setFormData={setFormData} />) });
            setRowId(rowId + 1);
        }
    }

    const deleteRow = (rowId) => {
        //itemRow.splice(rowId, 1);
        setItemRow([...itemRow.splice(rowId, 1)]);
        //childRefs.current.splice(rowId, 1);
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
        setFormData({ ...formData, ["total"]: total, ["items"]: items })
    }

    useEffect(() => {
        getItemTypes();
    }, []);

    return (
        <div className='container'>
            <div style={{ textAlign: 'left', fontWeight: 'bold', marginTop: '20px' }}>Item Details</div>
            <hr />

            <Row>
                <Col md={4}>
                    <FormSelect label="Add Item" dropdDownList={itemType} placeholder="Select Item" onChange={setItemTypeId} />

                </Col>
                <Col md={2}>
                    <Button onClick={addItemRow}>Add</Button>
                </Col>
            </Row>
            {itemRow}
            <Row>
                <Col>
                    <Button onClick={() => calculate()} disabled={itemRow.length < 1}>Calculate</Button>
                </Col>
            </Row>


        </div>
    );
}

export default ItemDetail;