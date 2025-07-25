import React from 'react'
import {Datagrid, List, TextField, BooleanField, ReferenceField, NumberField} from 'react-admin'
const ChallengeOptionList = () => {
    return (
        <List>
            <Datagrid rowClick='edit'>
                <NumberField source='id'/>
                <TextField source='title'/>
                <BooleanField source='correct'/>
                <ReferenceField source='challengeId' reference='challenges'/>
                <TextField source="imageSrc"/>
                <TextField source="audioSrc"/>
            </Datagrid>
        </List>
    )
}
export default ChallengeOptionList
