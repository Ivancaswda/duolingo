import React from 'react'
import { Create, TextInput, SimpleForm , required} from 'react-admin'
const CreateCourse = () => {
    return (
        <Create>
            <SimpleForm>

                <TextInput source='title' validate={[required()]} label='Title'/>
                <TextInput source="imageSrc" validate={[required()]} label='Image'/>
            </SimpleForm>
        </Create>
    )
}
export default CreateCourse
