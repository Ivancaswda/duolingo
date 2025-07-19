import React from 'react'
import {Create, TextInput, SimpleForm, required, ReferenceInput, NumberInput} from 'react-admin'
const CreateLesson = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source='title' validate={[required()]} label='Title'/>
                <TextInput source='description' validate={[required()]} label='Description'/>
                <ReferenceInput source='unitId' reference='units'/>
                <NumberInput source='order'
                             validate={[required()]}
                             label='Order'
                />
            </SimpleForm>
        </Create>
    )
}
export default CreateLesson
