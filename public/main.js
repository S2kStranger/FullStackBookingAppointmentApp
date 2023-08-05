
var nam=document.getElementById('name');
var email=document.getElementById('email');
var phone_no=document.getElementById('phone_no');
var myform = document.getElementById('booking_form');
var userid=document.getElementById('userid');

//console.log("Entered in JS file");
window.addEventListener("DOMContentLoaded", () => {
    //console.log("Calling event listener");
    axios.get("http://localhost:3000/getUsers")
    .then(response => {
    //console.log(response);
    for(var i=0;i<response.data.allusers.length;i++)
    {
        //console.log(response.data.allusers[i]);
        listUser(response.data.allusers[i]);
    }
    })
    .catch(err => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(err);
    })
})

function listUser(obj) {
    var str=`Name: ${obj.name} - Email: ${obj.email} - Phone No: ${obj.phone_no}`;
    //creating li attribute
    var data=document.getElementById('users');
    var li=document.createElement('li');
    li.appendChild(document.createTextNode(str));

    //create delete button
    var deletebtn=document.createElement('button');
    deletebtn.appendChild(document.createTextNode('Delete'));
    li.append(deletebtn);
    deletebtn.classList.add('btn');

    //add eventlistener to delete button
    deletebtn.addEventListener('click',(e) => {
        e.preventDefault();
        li.remove();
        axios.delete(`http://localhost:3000/deleteUser/${obj.id}`)
            .then(result => {
                ;
            })
            .catch(err => {
                document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
                console.log(err);
            })
    })

    var editbtn=document.createElement('button');
    editbtn.appendChild(document.createTextNode('Edit'));
    li.append(editbtn);
    editbtn.classList.add('btn');
    editbtn.addEventListener('click',(e)=>
    {
        e.preventDefault();
        li.remove();
        
        axios.get(`http://localhost:3000/getUser/${obj.id}`)
            .then(response => {
                 console.log(response.data.userdata);
                 const userdata=response.data.userdata;
                 nam.value=userdata.name;
                 email.value=userdata.email;
                 phone_no.value=userdata.phone_no;
                 userid.value=userdata.id;
            }) 
            .catch(err => {
                document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
                console.log(err);
            })
    })


    data.appendChild(li);
}

myform.addEventListener('submit', async (e) =>  {
    e.preventDefault();

    try{

        const userObj={
            name: nam.value,
            email : email.value,
            phone_no : phone_no.value
        }
            
        const response = await axios.post('http://localhost:3000/postUser',userObj);
        const userdetail=response.data.userdata;
        //console.log(userdetail);
        listUser(userdetail);
        myform.reset();
    }catch(err) {
        document.body.innerHTML = document.body.innerHTML+'<h4>Duplicate values</h4>';
        console.log(err);
    }
})


var updatebtn=document.getElementById('update');
updatebtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try
    {
        const userObj={
            name: nam.value,
            email : email.value,
            phone_no : phone_no.value
        }
            
        const response = await axios.patch(`http://localhost:3000/updateDetails/${userid.value}`,userObj);
        const userdetail=response.data.updatedUser;
        //console.log(userdetail);
        listUser(userdetail);
        myform.reset();
    }catch(err) {
        document.body.innerHTML = document.body.innerHTML+'<h4>Update not possible</h4>';
        console.log(err);
    }
})


