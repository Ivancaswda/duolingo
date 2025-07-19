'use client'
import {Admin, Resource, ListGuesser} from 'react-admin'
import React from 'react'
import simpleRestProvider from 'ra-data-simple-rest'
import CourseList from "@/app/admin/course/list";
import CreateCourse from "@/app/admin/course/create";
import EditCourse from "@/app/admin/course/edit";

import UnitList from "@/app/admin/unit/list";
import CreateUnit from "@/app/admin/unit/create";
import UnitEdit from "@/app/admin/unit/edit";
import LessonList from "@/app/admin/lesson/list";

import EditLesson from "@/app/admin/lesson/edit";
import CreateLesson from "@/app/admin/lesson/create";

import ChallengeList from "@/app/admin/challenge/list";
import CreateChallenge from "@/app/admin/challenge/create";
import EditChallenge from "@/app/admin/challenge/edit";

import ChallengeOptionList from "@/app/admin/challengeOptions/list";
import CreateChallengeOption from "@/app/admin/challengeOptions/create";
import EditChallengeOption from "@/app/admin/challengeOptions/edit";
const dataProvider = simpleRestProvider('/api')
const App = () => {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource name='courses'
                      list={CourseList}
                      create={CreateCourse}
                      edit={EditCourse}
                recordRepresentation='title'
            />
            <Resource name='units'
                      list={UnitList}
                      create={CreateUnit}
                      edit={UnitEdit}
                      recordRepresentation='title'
            />
            <Resource name='lessons'
                      list={LessonList}
                      create={CreateLesson}
                      edit={EditLesson}
                      recordRepresentation='title'
            />
            <Resource name='challenges'
                      list={ChallengeList}
                      create={CreateChallenge}
                      edit={EditChallenge}
                      recordRepresentation='question'
            />
            <Resource name='challengeOptions'
                      list={ChallengeOptionList}
                      create={CreateChallengeOption}
                      edit={EditChallengeOption}
                      recordRepresentation='text'
                      options={{label: 'Challenge Options'}}
            />
        </Admin>
    )
}
export default App
