import React from 'react'
import {Create, TextInput, Edit, SimpleForm, required, ReferenceInput, NumberInput} from 'react-admin'
const EditLesson = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source='title' validate={[required()]} label='Title'/>
                <TextInput source='title' validate={[required()]} label='Title'/>
                <ReferenceInput source='unitId' reference='units'/>
                <NumberInput source='order'
                             validate={[required()]}
                             label='Order'
                />
            </SimpleForm>
        </Edit>
    )
}
export default EditLesson
