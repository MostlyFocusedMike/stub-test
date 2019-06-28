const Joi = require('joi');

const program = {
    id: {
        description: 'Id for object',
        joi: Joi.number().min(1),
        mock: 1,
    },
    name: {
        description: 'Name of the program',
        joi: Joi.string().max(24),
        mock: 'Fake University',
    }
}


const getMockObject = (obj) => {
    const result = {}
    Object.keys(obj).forEach(field => { result[field] = obj[field].mock; })
    return result;
}

const getJoiSchema = (obj) => {
    const result = {}
    Object.keys(obj).forEach(field => { result[field] = obj[field].joi; })
    return Joi.object(result);
}

const getGQLType = (val) => {
    if (typeof val === 'string') return 'String';
    if (typeof val === 'number') return 'Int'
    return "ID"
}

const getGQLSchemaFields = (obj) => {
    const format = Object.keys(obj).map(key => `${key}: ${getGQLType(obj[key].mock)}\n` )
    return format.join('');
};



const mockProgram = getMockObject(program)
console.log('mockProgram: ', mockProgram);
const joiProgram = getJoiSchema(program);
const foo = joiProgram.validate(mockProgram);
console.log('foo: ', foo);

const schema = `
    type Program {
        ${getGQLSchemaFields(program)}
        courses: [Course]
    }
`

console.log('getGQLSchema: ', schema );