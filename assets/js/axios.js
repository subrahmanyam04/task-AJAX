let addBtn = document.getElementById('button');

let updateBtn = document.getElementById('upbutton');

let delBtn = document.getElementById('delbutton');

let canBtn = document.getElementById('canbutton');

let username = document.getElementById('fname');

let useremail = document.getElementById('email');

let tbody = document.getElementById('tbody');

let url = "http://localhost:3000/information";

let infor = [];



function getinformation(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            // console.log(xhr.responseText)
            // console.log(typeof(xhr.responseText))
            let data = JSON.parse(xhr.responseText);
            // console.log(data);
            infor = data;
            updatetable();
        }
    };
    xhr.send();
}

getinformation();
            
function updatetable(){
    if(infor.length > 0){
        let tablebody = infor.map(info =>
            `<tr >
                <td class="border border-dark">${info.name}</td>
                <td class="border border-dark">${info.mail}</td>
                <td class="border border-dark"><button class="btn btn-primary ebutton" onclick="editinformation(${info.id})"  >Edit</button></td>
                <td class="border border-dark"><button class="btn btn-danger" onclick="deleteinformation(${info.id})" >Delete</button></td>   
            </tr>`
        ).join('');
        
        tbody.innerHTML=tablebody;
    }
}

addBtn.addEventListener('click', function(event) {
    event.preventDefault();
    
    const newName = username.value;
    const newEmail = useremail.value;

    if (newName && newEmail) {
        let informationdata = { name: newName, mail: newEmail };

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function() {
            if (xhr.status === 201) {
                getinformation();
                username.value = '';
                useremail.value = '';
               
            } else {
                console.error("Error adding information:", xhr.statusText);
            }
        };
        xhr.send(JSON.stringify(informationdata));
       
    } else {
        console.log("Please enter both name and email.");
        document.getElementById("error").innerHTML = "Please enter both name and email.";
    }
   
});

// put operation

function editinformation(id) {
    
    const infoToEdit = infor.find(item => item.id === id );
  
    addBtn.style.display = 'none'; // Hide the "Submit" button
    updateBtn.style.display = 'block';  

    if (infoToEdit) {
        id = infoToEdit.id;
        console.log(id)
        console.log(typeof id)
        username.value = infoToEdit.name;
        useremail.value = infoToEdit.mail;
    }
    updateBtn.addEventListener('click', function(event) {
        event.preventDefault();
        
        const updatedName = username.value;
        const updatedEmail = useremail.value;
    
        id = infoToEdit.id;
            if (updatedName && updatedEmail) {
                const editedData = { name: updatedName, mail: updatedEmail };
    
            let xhr = new XMLHttpRequest();
            xhr.open("PUT", `${url}/${id}`, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function() {
                if (xhr.status === 200) {
                    getinformation();
                    username.value = '';
                    useremail.value = '';
                    addBtn.style.display = 'block'; // Hide the "Submit" button
                    updateBtn.style.display = 'none';
                } else {
                    console.error("Error adding information:", xhr.statusText);
                }
            };
            xhr.send(JSON.stringify(editedData));
           
        } else {
            console.log("Please enter both name and email.");
            document.getElementById("error").innerHTML = "Please enter both name and email.";
        }
       
    });
};


function deleteinformation(id) {
    const infoToDelete = infor.find(item => item.id === id); 
    // Display a confirmation alert
    const confirmation = confirm("Are you sure you want to delete this information?");
      
    if (confirmation) {
        if (infoToDelete) {
            id = infoToDelete.id;
            let xhr = new XMLHttpRequest();
            xhr.open("DELETE", `${url}/${id}`, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function() {
                if (xhr.status === 200) {
                    getinformation();
                    username.value = '';
                    useremail.value = '';
                 
                } else {
                    console.error("Error adding information:", xhr.statusText);
                }
            };
            xhr.send();
        }
    }
    
}


canBtn.addEventListener('click', function() {
    location.reload();
   
   });