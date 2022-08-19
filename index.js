// const { request } = require('express');
const Joi = require ('joi');
const express = require ('express');
const { request } = require('express');
const app = express();
app.use(express.json());


const courses =[
    {id:1, name: 'Course1'},
    {id:2, name: 'Course2'},
    {id:3, name: 'Course3'},
    {id:4, name: 'Course4'},

]

//CRUD operations
// GET REQUESTS
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.get('/api/courses', (req,res) =>{
    res.send(courses);
});
//by id: request.params
app.get('/api/courses/:id', (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) res.status(404).send('No course with given ID was found');

    res.send(course);
});
//request.params for multiple parameters
app.get('/api/posts/:year/:month', (req,res)=>{
    res.send(req.params);
// request.query for query string parameters(?sortBy=name)
    res.send(req.query);
});


//POST REQUESTS

app.post('/api/courses', (req,res)=>{
    // joi validation (not working)
    const schema = {
        name: Joi.string().min(3).required()

    };

    const result = Joi.validate(req.body, schema);
    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return;  
    }

    const course = {
        id : courses.length +1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
});

// PUT REQUESTS
app.put('/api/courses/:id/',(req,res)=>{
    //find the course
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) res.status(404).send('No course with given ID was found');

    //if course does not exist, return 404
    

    //else, validate the course
    const schema = {
        name: Joi.string().min(3).required()

    };

    const result = Joi.validate(req.body, schema);
    //if invalid, return 400 Bad Request
    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return;  
    }
    //then update the course
    course.name = req.body.name;
    //return the updated course
    res.send(course);
})

//DELETE REQUESTS
const course = courses.find(c => c.id === parseInt(req.params.id));

if (!course) res.status(404).send('No course with given ID was found');
const index = courses.indexOf(course);
courses.slice(index,1);
res.send (course);

//listening port
app.listen(8000, ()=>{
    console.log('app listening on port 8000')
});
