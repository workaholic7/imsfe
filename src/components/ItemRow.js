import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Col, Row } from 'react-bootstrap';
import FormInput from './common/FormInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const ItemRow = forwardRef(({ itemTypeId, deleteRow, rowId }, ref) => {
    const [itemDetail, setItemDetail] = useState({ description: "", quantity:"", unitPrice:"", amount:"" });
    const onFieldChange = (e) => {
        const item = Object.assign({}, itemDetail);
        item[e.target.name] = e.target.value;
        setItemDetail(item);
    }

    useImperativeHandle(ref, () => ({
        getTotal() {
            return itemDetail.amount;
        },
        getItemDetail() {
            return itemDetail;
        }
    }));

    const updateAmount = () => {
        const item = Object.assign({}, itemDetail);
        item.amount = itemDetail.quantity * itemDetail.unitPrice;
        setItemDetail(item);
    }

    useEffect(() => {
        updateAmount();
    }, [itemDetail.quantity, itemDetail.unitPrice]);

    return (
        <Row>
            <FormInput  name="itemTypeId" hidden defaultValue={itemTypeId} />
            <Col md={{ span: 3, offset: 1 }}>
                <FormInput name="description" placeholder="Item Description" value={itemDetail.description}
                    onChange={onFieldChange} required="required" size="12" />
            </Col>

            <Col md={{ span: 2, offset: 0 }}>
                <FormInput name="quantity" placeholder="QTY" value={itemDetail.quantity} number
                    onChange={onFieldChange} required="required" size="12" />
            </Col>

            <Col md={{ span: 2, offset: 0 }}>
                <FormInput name="unitPrice" placeholder="Unit Price(RM)" value={itemDetail.unitPrice} number
                    onChange={onFieldChange} required="required" size="12" />
            </Col>

            <Col md={{ span: 2, offset: 0 }}>
                <FormInput name="amount" placeholder="Amount(RM)" value={itemDetail.amount} number
                    disabled size="12" />
            </Col>
            <Col md={{ span: 1, offset: 0 }}>
                <FontAwesomeIcon icon={faTrashAlt} size="lg" onClick={() => deleteRow(rowId)} />
            </Col>
        </Row>

    )
})

export default ItemRow;