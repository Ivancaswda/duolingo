import React from 'react'
import {Create,Edit ,TextInput, SimpleForm, required, BooleanInput, ReferenceInput} from 'react-admin'
const EditChallengeOption = () => {
    return (
        <Edit>
            <SimpleForm>

                <TextInput source='text' validate={[required()]} label='Text'/>
                <BooleanInput source='correct' label='Correct option'/>
                <ReferenceInput source='challengeId' reference='challenges'/>
                <TextInput source="imageSrc"  label='Image'/>
                <TextInput source="audioSrc"  label='Audio'/>
            </SimpleForm>
        </Edit>
    )
}
export default EditChallengeOption
