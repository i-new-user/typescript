"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const person1 = {
    age: 20,
    name: 'Tom',
    driverLicense: true,
    address: {
        country: 'America',
        city: 'Los Angeles',
        strit: '5 avenu'
    },
    activity: {
        placeOfStudy: 'the University of Economics',
        speciality: 'economist'
    }
};
const person2 = {
    age: 30,
    name: 'Fil',
    driverLicense: true,
    address: {
        country: 'America',
        city: 'Tehas',
        strit: '33 avenu'
    },
    activity: {
        placeOfWork: 'IT',
        profession: 'development'
    }
};
const initial = {
    country: 'America',
    city: 'Los Angeles',
    strit: null
};
const reducer = (state = initial, action) => {
    state.strit = {
        country: '',
        city: '',
        strit: ''
    };
    return state;
};
const response1 = {
    errorCode: 1,
    messages: ['it', 'it'],
    data: {
        firstName: 'string',
        lastName: 'string',
        age: 20
    }
};
const response2 = {
    errorCode: 1,
    messages: ['it', 'it'],
    data: {
        large: 'string',
        small: 'string'
    }
};
const initiall = {
    age: 24,
    name: 'Tom',
    user: null,
    photo: null
};
const reducerr = (state = initiall, action) => {
    switch (action.type) {
        case 'SAT AGE':
            return Object.assign(Object.assign({}, state), { age: action.age });
        case 'SET NAME':
            return Object.assign(Object.assign({}, state), { name: action.firstName + ' ' + action.lastName });
    }
    return state;
};
//MyReturnType<T> = T extends (...args: any[] ) => infer R ? R : never 
const obj = {
    a: { name: 'aaaaa' },
    s: { age: 33 },
    d: { site: { title: 'ttttttt' } },
};
let HipHop = { site: { title: 'jjjjj' } };
const action = {
    ac1: (age) => ({ type: 'SAT AGE', age }),
    ac2: (firstName, lastName) => ({
        type: 'SET NAME',
        firstName,
        lastName
    })
};
let a = {
    firstName: 'string',
    lastName: 'string',
    age: 20
};
let b = {
    large: 'string',
    small: 'string'
};
