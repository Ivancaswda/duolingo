import React from 'react'
import {Edit, TextInput, SimpleForm, required, ReferenceInput, SelectInput} from 'react-admin'
const EditChallenge = () => {
    return (
        <Edit>
            <SimpleForm>

                <TextInput source='question' validate={[required()]} label='Question'/>
                <ReferenceInput source='lessonId' reference='lessons'/>
                <SelectInput source="type" choices={[{
                    id: 'SELECT',
                    name: 'SELECT',
                },
                    {
                        id: 'ASSIST',
                        name: 'ASSIST',
                    }]} validate={[required()]}/>
            </SimpleForm>
        </Edit>
    )
}
export default EditChallenge
