import React from 'react'
import {Edit, TextInput, SimpleForm, required, NumberInput} from 'react-admin'
const UnitEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <NumberInput source='id' validate={[required()]} label='Id'/>
                <TextInput source='title' validate={[required()]} label='Title'/>

            </SimpleForm>
        </Edit>
    )
}
export default UnitEdit
