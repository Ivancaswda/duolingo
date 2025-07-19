import React from 'react'
import {Create, TextInput, SimpleForm, required, SelectInput, ReferenceInput, NumberInput} from 'react-admin'
const CreateChallenge = () => {
    return (
        <Create>
            <SimpleForm>

                <TextInput source='question' validate={[required()]} label='Question'/>

                <SelectInput source="type" choices={[{
                    id: 'SELECT',
                    name: 'SELECT',
                },
                    {
                        id: 'ASSIST',
                        name: 'ASSIST',
                    }]} validate={[required()]}/>
                <ReferenceInput source="lessonId" reference="lessons" label="Lesson">
                    <SelectInput optionText="title" />
                </ReferenceInput>
                <NumberInput source="order" label="Order" validate={[required()]} />
            </SimpleForm>
        </Create>
    )
}
export default CreateChallenge
