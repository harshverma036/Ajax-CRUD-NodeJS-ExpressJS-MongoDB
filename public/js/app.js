console.log('Ajax loaded successfully!');

document.getElementById('crud-form').addEventListener('submit', insertData);

function showData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/getUsers', true);
    xhr.onload = function () {
        if (xhr.status == 200) {
            const datas = JSON.parse(this.responseText);
            let result = '';
            datas.forEach((data) => {
                result += `
                    <tr>
                        <td>${data.firstName}</td>
                        <td>${data.lastName}</td>
                        <td>${data.email}</td>
                        <td>${data.contact}</td>
                        <td><button class='btn btn-small red white-text del' data-did='${data._id}'>Delete</button></td>
                        <td><button class='btn btn-small purple white-text update modal-trigger' data-target='modal1' data-uid='${data._id}'>Update</button></td>
                        </td>
                    </tr>
            `;
            });
            document.getElementById('show-data').innerHTML = result;
        }
        deleteData();
        getupdateData();
        document.getElementById('update-form').addEventListener('submit', updateUser);
    }
    xhr.onerror = function () {
        console.log('Error occured!');
    }
    xhr.send();
}
showData();

function insertData(e) {
    e.preventDefault();
    const fname = document.getElementById('first_name').value;
    const lname = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const values = `first_name=${fname}&last_name=${lname}&email=${email}&contact=${contact}`;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/insertUsers', true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (this.status == 200) {
            M.toast({ html: 'User Successfully Added.' });
            console.log(this.responseText);
            document.getElementById('crud-form').reset();
            showData();
        }
    }
    xhr.onerror = function () {
        console.log('Ajax Error');
    }
    xhr.send(values);
}

// delete data
function deleteData() {
    var delBtn = document.querySelectorAll('.del');
    for (let i = 0; i < delBtn.length; i++) {
        delBtn[i].addEventListener('click', () => {
            // e.preventDefault();
            let delID = delBtn[i].getAttribute('data-did');
            let values = 'deleteID=' + delID;
            console.log(values);
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/delUser', true);
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.onload = () => {
                if (xhr.status == 200) {
                    console.log(xhr.responseText);
                    M.toast({ html: 'User Successfully Deleted.' });
                    showData();
                }
                // M.toast({ html: 'User Successfully Deleted.' });
                // showData();
            }
            xhr.onerror = () => {
                console.log('Error Occured in js');
            }
            xhr.send(values);
        });
    }
}

// get update record
const getupdateData = () => {
    let upbtn = document.querySelectorAll('.update');
    let upid = document.getElementById('id');
    let fname = document.getElementById('ufirst_name');
    let lname = document.getElementById('ulast_name');
    let uemail = document.getElementById('uemail');
    let ucontact = document.getElementById('ucontact');
    for (let i = 0; i < upbtn.length; i++) {
        upbtn[i].addEventListener('click', (e) => {
            e.preventDefault();
            let uid = upbtn[i].getAttribute('data-uid');
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `/getupdaterecord/${uid}`, true);
            xhr.onload = () => {
                if (xhr.status == 200) {
                    const data = JSON.parse(xhr.responseText);
                    upid.value = data._id;
                    fname.value = data.firstName;
                    lname.value = data.lastName;
                    uemail.value = data.email;
                    ucontact.value = data.contact;
                }
            }
            xhr.onerror = () => {
                console.log('Error occured ajax!');
            }
            xhr.send();
        });
    }
}

// update record
const updateUser = (e) => {
    e.preventDefault()
    const update_id = document.getElementById('id').value;
    const fname = document.getElementById('ufirst_name').value;
    const lname = document.getElementById('ulast_name').value;
    const uemail = document.getElementById('uemail').value;
    const ucontact = document.getElementById('ucontact').value;
    const values = `updid=${update_id}&fname=${fname}&lname=${lname}&email=${uemail}&contact=${ucontact}`;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/update', true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log(xhr.responseText);
            showData()
        }
    }
    xhr.onerror = () => {
        console.log('Error occured ajax');
    }
    xhr.send(values);
}