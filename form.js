let editvalue;

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  editvalue = urlParams.get("id");

  if (editvalue) {
    loadStudentData(editvalue);
  }
};

async function loadStudentData(id) {
  const apiUrl = `https://6684d4e456e7503d1ae14dde.mockapi.io/employee/${id}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching student data: ${response.statusText}`);
    }
    const student = await response.json();
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("phonenum").value = student.phonenum;
    document.getElementById("password").value = student.password;
    document.getElementById("confirmpassword").value = student.confirmpassword;
    document.getElementById("dateofbirth").value = student.dateofbirth;

    if (student.gender === "male") {
      document.getElementById("dot-1").checked = true;
    } else if (student.gender === "female") {
      document.getElementById("dot-2").checked = true;
    }

    const languageCheckboxes = document.querySelectorAll('input[name="language"]');
    languageCheckboxes.forEach(checkbox => {
      checkbox.checked = student.language.includes(checkbox.value);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phonenum = document.getElementById("phonenum").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmpassword = document.getElementById("confirmpassword").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const languages = Array.from(document.querySelectorAll('input[name="language"]:checked')).map(el => el.value);
  const dateofbirth = document.getElementById("dateofbirth").value;
  let isValid = true;

  if (name.length < 3) {
    document.getElementById("name_req").textContent = "Name required**";
    document.getElementById("name_req").style.color = "red";
    isValid = false;
  } else {
    document.getElementById("name_req").textContent = "";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("email_req").textContent = "Email required**";
    document.getElementById("email_req").style.color = "red";
    isValid = false;
  } else {
    document.getElementById("email_req").textContent = "";
  }

  if (!/^\d{3}-\d{3}-\d{4}$/.test(phonenum)) {
    document.getElementById("phonenum_req").textContent = "Number required**";
    document.getElementById("phonenum_req").style.color = "red";
    isValid = false;
  } else {
    document.getElementById("phonenum_req").textContent = "";
  }

 const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{5,20}$/;

if (!passwordPattern.test(password)) {
    document.getElementById("password_req").textContent = "Password required**";
    document.getElementById("password_req").style.color = "red";
    isValid = false;
} else {
    document.getElementById("password_req").textContent = "";
}

if (confirmpassword !== password) {
    document.getElementById("confirmpassword_req").textContent = "Passwords do not match**";
    document.getElementById("confirmpassword_req").style.color = "red";
    isValid = false;
} else {
    document.getElementById("confirmpassword_req").textContent = "";
}
    

    if (!gender) {
        document.getElementById("gender_req").textContent = "Gender required**";
        document.getElementById("gender_req").style.color = "red";
        isValid = false;
    } else {
        document.getElementById("gender_req").textContent = "";
    }

    if (languages.length === 0) {
        document.getElementById("lang_req").textContent = "Language required**";
        document.getElementById("lang_req").style.color = "red";
        isValid = false;
    } else {
        document.getElementById("lang_req").textContent = "";
    }

    // if (!date) {
    //     document.getElementById("dob_req").textContent = "Date of birth required**";
    //     isValid = false;
    // } else {
    //     document.getElementById("dob_req").textContent = "";
    // }


    const dateofbirthPattern = /^\d{2}\?\d{2}\?\d{4}$/;

    if (!dateofbirthPattern.test(dateofbirth)) {
      document.getElementById("dateofbirth_req").textContent = 'Date of birth required**';
      document.getElementById("dateofbirth_req").style.color = "red";
    } else {
      document.getElementById("dateofbirth_req").textContent = '';
    }
    return isValid;
}

function submitForm(event) {
    event.preventDefault();

    if (!validateForm()) {
        return false;
    }

    const studentData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phonenum: document.getElementById("phonenum").value.trim(),
        password: document.getElementById("password").value.trim(),
        confirmpassword: document.getElementById("confirmpassword").value.trim(),
        gender: document.querySelector('input[name="gender"]:checked')?.value,
        language: Array.from(document.querySelectorAll('input[name="language"]:checked')).map(el => el.value),
        dateofbirth: document.getElementById("dateofbirth").value
    };

    sendData(studentData);
    return false;
}

async function sendData(data) {
    try {
        const apiUrl = editvalue 
            ? `https://6684d4e456e7503d1ae14dde.mockapi.io/employee/${editvalue}`
            : "https://6684d4e456e7503d1ae14dde.mockapi.io/employee";
        
        const method = editvalue ? "PUT" : "POST";
        const response = await fetch(apiUrl, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Success:', result);
        window.location.href = "table.html";
    } catch (error) {

        console.error('Error:', error);
    }
}

function table() {
    window.location.href = "table.html";
}




