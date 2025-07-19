import React from 'react'
import {Create, TextInput, SimpleForm, required, ReferenceInput, NumberInput, SelectInput} from 'react-admin'
const CreateUnit = () => {
    return (
        <Create>
            <SimpleForm>

                <TextInput source='title' validate={[required()]} label='Title'/>
                <TextInput source="description" validate={[required()]} label='Description'/>

                <ReferenceInput source='courseId' reference='courses'/>
                <NumberInput source='order' validate={[required()]}
                label='order'
                />
                <SelectInput source="color" label="Color" choices={[
                    { id: "#A3E635", name: "Green" },
                    { id: "#60A5FA", name: "Blue" },
                    { id: "#F472B6", name: "Pink" },
                    { id: "#FACC15", name: "Yellow" },
                    { id: "#FB923C", name: "Orange" },
                    { id: "#C084FC", name: "Violet" },
                ]} />
            </SimpleForm>
        </Create>
    )
}
export default CreateUnit
